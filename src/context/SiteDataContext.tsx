import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, TimelineItem, TestimonialItem, ContactMessage, SiteSettings, ThemeSettings } from '../../types';
import { INITIAL_PROJECTS, INITIAL_TIMELINES, INITIAL_TESTIMONIALS, INITIAL_MESSAGES, INITIAL_SETTINGS } from '../data/initialData';
import { getSupabaseClient, getSupabaseUrl, getSupabaseAnonKey, saveSupabaseCredentials, testSupabaseConnection } from '../lib/supabase';

// Helper to convert hex to RGB components for Tailwind alpha blending
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
  }
  return null;
}

// Dynamically injects CSS variables to documentElement for full-site real-time retheming
function applyThemeVariables(theme?: ThemeSettings) {
  if (typeof document === 'undefined' || !theme) return;
  const root = document.documentElement;

  if (theme.primaryColor) {
    root.style.setProperty('--color-primary', theme.primaryColor);
  }
  if (theme.secondaryColor) {
    root.style.setProperty('--color-secondary', theme.secondaryColor);
  }

  switch (theme.bgPalette) {
    case 'emerald':
      root.style.setProperty('--color-bg-base', '2 15 10');
      root.style.setProperty('--color-bg-card', '6 36 24');
      root.style.setProperty('--color-bg-secondary', '0 5 2');
      break;
    case 'slate':
      root.style.setProperty('--color-bg-base', '10 15 26');
      root.style.setProperty('--color-bg-card', '15 23 42');
      root.style.setProperty('--color-bg-secondary', '2 6 23');
      break;
    case 'obsidian':
      root.style.setProperty('--color-bg-base', '5 5 7');
      root.style.setProperty('--color-bg-card', '18 18 22');
      root.style.setProperty('--color-bg-secondary', '0 0 0');
      break;
    case 'midnight':
      root.style.setProperty('--color-bg-base', '3 7 18');
      root.style.setProperty('--color-bg-card', '15 23 42');
      root.style.setProperty('--color-bg-secondary', '2 4 12');
      break;
    case 'custom':
      if (theme.customBgHex) {
        const rgb = hexToRgb(theme.customBgHex);
        if (rgb) {
          root.style.setProperty('--color-bg-base', `${rgb.r} ${rgb.g} ${rgb.b}`);
        }
      }
      if (theme.customCardHex) {
        const cardRgb = hexToRgb(theme.customCardHex);
        if (cardRgb) {
          root.style.setProperty('--color-bg-card', `${cardRgb.r} ${cardRgb.g} ${cardRgb.b}`);
        }
      }
      break;
  }
}

interface SiteDataContextType {
  projects: Project[];
  timelines: TimelineItem[];
  testimonials: TestimonialItem[];
  messages: ContactMessage[];
  settings: SiteSettings;
  isSupabaseConfigured: boolean;
  isSupabaseConnected: boolean;
  isLoading: boolean;
  
  // Project Actions
  addProject: (project: Omit<Project, 'id'>) => Promise<Project>;
  updateProject: (id: string | number, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string | number) => Promise<void>;
  
  // Timeline Actions
  addTimeline: (item: Omit<TimelineItem, 'id'>) => Promise<TimelineItem>;
  updateTimeline: (id: string, updates: Partial<TimelineItem>) => Promise<void>;
  deleteTimeline: (id: string) => Promise<void>;
  
  // Testimonial Actions
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => Promise<TestimonialItem>;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  
  // Contact Inquiries Actions
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<ContactMessage>;
  markMessageRead: (id: string, isRead?: boolean) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  
  // Settings & DB Actions
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<{ success: boolean; message: string }>;
  checkSupabaseStatus: () => Promise<{ success: boolean; message: string }>;
  resetToDefaults: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_cms_projects',
  TIMELINES: 'portfolio_cms_timelines',
  TESTIMONIALS: 'portfolio_cms_testimonials',
  MESSAGES: 'portfolio_cms_messages',
  SETTINGS: 'portfolio_cms_settings',
};

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local state with localStorage fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [timelines, setTimelines] = useState<TimelineItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMELINES);
      return saved ? JSON.parse(saved) : INITIAL_TIMELINES;
    } catch {
      return INITIAL_TIMELINES;
    }
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SETTINGS,
          ...parsed,
          hero: { ...INITIAL_SETTINGS.hero, ...(parsed.hero || {}) },
          branding: { ...INITIAL_SETTINGS.branding, ...(parsed.branding || {}) },
          theme: { ...INITIAL_SETTINGS.theme, ...(parsed.theme || {}) },
        };
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  const isSupabaseConfigured = Boolean(settings.supabaseUrl && settings.supabaseAnonKey);

  // Apply theme variables dynamically whenever settings.theme changes
  useEffect(() => {
    if (settings.theme) {
      applyThemeVariables(settings.theme);
    }
  }, [settings.theme]);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.warn('Failed to cache projects:', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TIMELINES, JSON.stringify(timelines));
    } catch (e) {
      console.warn('Failed to cache timelines:', e);
    }
  }, [timelines]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    } catch (e) {
      console.warn('Failed to cache testimonials:', e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to cache messages:', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to cache settings:', e);
    }
  }, [settings]);

  // Initial fetch from Supabase if configured
  const loadFromSupabase = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) {
      setIsSupabaseConnected(false);
      return;
    }

    setIsLoading(true);
    try {
      // 1. Projects
      const { data: dbProjects, error: pErr } = await client.from('projects').select('*').order('display_order', { ascending: true });
      if (!pErr && dbProjects && dbProjects.length > 0) {
        setProjects(dbProjects.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          summary: p.summary || p.description?.slice(0, 100),
          description: p.description,
          imageUrl: p.image_url,
          galleryUrls: p.gallery_urls,
          technologies: p.tech_stack || [],
          link: p.live_url || '#',
          githubUrl: p.github_url || '',
          featured: p.featured,
          metrics: p.metrics,
          createdAt: p.created_at,
        })));
      }

      // 2. Timelines
      const { data: dbTimelines, error: tErr } = await client.from('timelines').select('*').order('display_order', { ascending: true });
      if (!tErr && dbTimelines && dbTimelines.length > 0) {
        setTimelines(dbTimelines.map((t: any) => ({
          id: t.id,
          type: t.type,
          title: t.title,
          institution: t.institution,
          period: t.period,
          description: t.description,
          skills: t.skills || [],
          displayOrder: t.display_order,
          createdAt: t.created_at,
        })));
      }

      // 3. Testimonials
      const { data: dbTestimonials, error: tmErr } = await client.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!tmErr && dbTestimonials && dbTestimonials.length > 0) {
        setTestimonials(dbTestimonials.map((tm: any) => ({
          id: tm.id,
          clientName: tm.client_name,
          clientRole: tm.client_role,
          company: tm.company,
          avatarUrl: tm.avatar_url,
          rating: tm.rating,
          content: tm.content,
          isApproved: tm.is_approved,
          createdAt: tm.created_at,
        })));
      }

      // 4. Messages
      const { data: dbMessages, error: mErr } = await client.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (!mErr && dbMessages && dbMessages.length > 0) {
        setMessages(dbMessages.map((m: any) => ({
          id: m.id,
          name: m.name,
          email: m.email,
          subject: m.subject || '',
          message: m.message,
          isRead: m.is_read,
          replied: m.replied,
          createdAt: m.created_at,
        })));
      }

      setIsSupabaseConnected(true);
    } catch (err) {
      console.warn('Supabase remote query failed, continuing with cached/local mode:', err);
      setIsSupabaseConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFromSupabase();
  }, [loadFromSupabase]);

  // Project Actions
  const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const newId = 'proj-' + Date.now();
    const newProject: Project = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setProjects(prev => [newProject, ...prev]);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('projects').insert({
          title: newProject.title,
          category: newProject.category,
          summary: newProject.summary || '',
          description: newProject.description,
          image_url: newProject.imageUrl,
          tech_stack: newProject.technologies,
          live_url: newProject.link,
          github_url: newProject.githubUrl,
          featured: newProject.featured || false,
        });
      } catch (e) {
        console.warn('Supabase project insert failed:', e);
      }
    }

    return newProject;
  };

  const updateProject = async (id: string | number, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => (String(p.id) === String(id) ? { ...p, ...updates } : p))
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        const payload: any = {};
        if (updates.title) payload.title = updates.title;
        if (updates.category) payload.category = updates.category;
        if (updates.summary) payload.summary = updates.summary;
        if (updates.description) payload.description = updates.description;
        if (updates.imageUrl) payload.image_url = updates.imageUrl;
        if (updates.technologies) payload.tech_stack = updates.technologies;
        if (updates.link) payload.live_url = updates.link;
        if (updates.githubUrl !== undefined) payload.github_url = updates.githubUrl;
        if (updates.featured !== undefined) payload.featured = updates.featured;

        await client.from('projects').update(payload).eq('id', String(id));
      } catch (e) {
        console.warn('Supabase project update failed:', e);
      }
    }
  };

  const deleteProject = async (id: string | number) => {
    setProjects(prev => prev.filter(p => String(p.id) !== String(id)));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('projects').delete().eq('id', String(id));
      } catch (e) {
        console.warn('Supabase project delete failed:', e);
      }
    }
  };

  // Timeline Actions
  const addTimeline = async (itemData: Omit<TimelineItem, 'id'>): Promise<TimelineItem> => {
    const newId = 'time-' + Date.now();
    const newItem: TimelineItem = {
      ...itemData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setTimelines(prev => [newItem, ...prev]);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('timelines').insert({
          type: newItem.type,
          title: newItem.title,
          institution: newItem.institution,
          period: newItem.period,
          description: newItem.description,
          skills: newItem.skills || [],
        });
      } catch (e) {
        console.warn('Supabase timeline insert failed:', e);
      }
    }

    return newItem;
  };

  const updateTimeline = async (id: string, updates: Partial<TimelineItem>) => {
    setTimelines(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('timelines').update(updates).eq('id', id);
      } catch (e) {
        console.warn('Supabase timeline update failed:', e);
      }
    }
  };

  const deleteTimeline = async (id: string) => {
    setTimelines(prev => prev.filter(t => t.id !== id));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('timelines').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase timeline delete failed:', e);
      }
    }
  };

  // Testimonials Actions
  const addTestimonial = async (itemData: Omit<TestimonialItem, 'id'>): Promise<TestimonialItem> => {
    const newId = 'test-' + Date.now();
    const newItem: TestimonialItem = {
      ...itemData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setTestimonials(prev => [newItem, ...prev]);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('testimonials').insert({
          client_name: newItem.clientName,
          client_role: newItem.clientRole,
          company: newItem.company,
          avatar_url: newItem.avatarUrl,
          rating: newItem.rating,
          content: newItem.content,
          is_approved: newItem.isApproved,
        });
      } catch (e) {
        console.warn('Supabase testimonial insert failed:', e);
      }
    }

    return newItem;
  };

  const updateTestimonial = async (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('testimonials').update(updates).eq('id', id);
      } catch (e) {
        console.warn('Supabase testimonial update failed:', e);
      }
    }
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('testimonials').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase testimonial delete failed:', e);
      }
    }
  };

  // Contact Messages Actions
  const addMessage = async (msgData: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> => {
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      name: msgData.name,
      email: msgData.email,
      subject: msgData.subject,
      message: msgData.message,
      isRead: false,
      replied: false,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [newMsg, ...prev]);

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('contact_messages').insert({
          name: newMsg.name,
          email: newMsg.email,
          subject: newMsg.subject,
          message: newMsg.message,
          is_read: false,
        });
      } catch (e) {
        console.warn('Supabase message insert failed:', e);
      }
    }

    return newMsg;
  };

  const markMessageRead = async (id: string, isRead: boolean = true) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, isRead } : m))
    );

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('contact_messages').update({ is_read: isRead }).eq('id', id);
      } catch (e) {
        console.warn('Supabase message update failed:', e);
      }
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));

    const client = getSupabaseClient();
    if (client) {
      try {
        await client.from('contact_messages').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase message delete failed:', e);
      }
    }
  };

  // Settings Actions
  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<{ success: boolean; message: string }> => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    if (newSettings.supabaseUrl !== undefined || newSettings.supabaseAnonKey !== undefined) {
      saveSupabaseCredentials(updated.supabaseUrl, updated.supabaseAnonKey);
      const testResult = await testSupabaseConnection();
      setIsSupabaseConnected(testResult.success);
      if (testResult.success) {
        loadFromSupabase();
      }
      return testResult;
    }

    return { success: true, message: 'Settings saved successfully.' };
  };

  const checkSupabaseStatus = async () => {
    const res = await testSupabaseConnection();
    setIsSupabaseConnected(res.success);
    return res;
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    setTimelines(INITIAL_TIMELINES);
    setTestimonials(INITIAL_TESTIMONIALS);
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TIMELINES);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
  };

  return (
    <SiteDataContext.Provider
      value={{
        projects,
        timelines,
        testimonials,
        messages,
        settings,
        isSupabaseConfigured,
        isSupabaseConnected,
        isLoading,
        addProject,
        updateProject,
        deleteProject,
        addTimeline,
        updateTimeline,
        deleteTimeline,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addMessage,
        markMessageRead,
        deleteMessage,
        updateSettings,
        checkSupabaseStatus,
        resetToDefaults,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = (): SiteDataContextType => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
