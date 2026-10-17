import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  TimelineItem,
  TestimonialItem,
  ContactMessage,
  SiteSettings,
  ThemeSettings,
  SystemUser,
  SystemRole,
  AuditLogItem,
  SecurityAuditItem,
  AccountStatus,
} from '../../types';
import {
  INITIAL_PROJECTS,
  INITIAL_TIMELINES,
  INITIAL_TESTIMONIALS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS,
  INITIAL_ROLES,
  INITIAL_SYSTEM_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SECURITY_LOGS,
  RBAC_PAGES_CATALOG,
} from '../data/initialData';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch } from 'firebase/firestore';

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

// Helper to recursively remove all undefined properties from objects and arrays for Firestore safety
function removeUndefinedFields<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return null as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj
      .filter((item) => item !== undefined)
      .map((item) => removeUndefinedFields(item)) as unknown as T;
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, any> = {};
    for (const [key, val] of Object.entries(obj)) {
      if (val !== undefined) {
        cleaned[key] = removeUndefinedFields(val);
      }
    }
    return cleaned as T;
  }
  return obj;
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

  // Set active palette attribute
  root.setAttribute('data-palette', theme.bgPalette || 'emerald');

  if (theme.bgPalette === 'midnight') {
    root.classList.add('midnight-theme');
    root.classList.remove('emerald-theme');
  } else {
    root.classList.remove('midnight-theme');
    root.classList.add('emerald-theme');
  }

  switch (theme.bgPalette) {
    case 'emerald':
      root.style.setProperty('--color-bg-base', '2 15 10');
      root.style.setProperty('--color-bg-card', '6 36 24');
      root.style.setProperty('--color-bg-secondary', '0 5 2');
      root.style.setProperty('--color-text-base', '255 255 255');
      root.style.setProperty('--color-text-muted', '153 178 162');
      root.style.setProperty('--color-border', '12 72 48');
      break;
    case 'slate':
      root.style.setProperty('--color-bg-base', '10 15 26');
      root.style.setProperty('--color-bg-card', '15 23 42');
      root.style.setProperty('--color-bg-secondary', '2 6 23');
      root.style.setProperty('--color-text-base', '255 255 255');
      root.style.setProperty('--color-text-muted', '148 163 184');
      root.style.setProperty('--color-border', '30 41 59');
      break;
    case 'obsidian':
      root.style.setProperty('--color-bg-base', '5 5 7');
      root.style.setProperty('--color-bg-card', '18 18 22');
      root.style.setProperty('--color-bg-secondary', '0 0 0');
      root.style.setProperty('--color-text-base', '255 255 255');
      root.style.setProperty('--color-text-muted', '161 161 170');
      root.style.setProperty('--color-border', '39 39 42');
      break;
    case 'midnight':
      // High-contrast Midnight dark mode theme
      root.style.setProperty('--color-bg-base', '3 7 18');       // Deep Midnight Navy/Black
      root.style.setProperty('--color-bg-card', '15 23 42');     // Crisp Slate-900 Card
      root.style.setProperty('--color-bg-secondary', '2 4 12');  // Ultra dark Midnight
      root.style.setProperty('--color-text-base', '255 255 255'); // Pure White text
      root.style.setProperty('--color-text-muted', '148 163 184'); // High-contrast Slate-400
      root.style.setProperty('--color-border', '51 65 85');       // High-contrast Slate-700 Border
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
  isFirebaseConnected: boolean;
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

  // Enterprise RBAC & Security State & Actions
  users: SystemUser[];
  roles: SystemRole[];
  auditLogs: AuditLogItem[];
  securityAuditLogs: SecurityAuditItem[];
  currentUser: SystemUser | null;
  setCurrentUser: (user: SystemUser | null) => void;
  addUser: (userData: Omit<SystemUser, 'id' | 'createdAt'>) => Promise<{ success: boolean; id?: string; message?: string }>;
  updateUser: (id: string, updates: Partial<SystemUser>) => Promise<{ success: boolean; message?: string }>;
  toggleUserLock: (id: string) => Promise<{ success: boolean; message?: string }>;
  deleteUser: (id: string) => Promise<{ success: boolean; message?: string }>;
  addRole: (roleData: Omit<SystemRole, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean; id?: string; message?: string }>;
  updateRole: (id: string, updates: Partial<SystemRole>) => Promise<{ success: boolean; message?: string }>;
  cloneRole: (id: string, newName: string) => Promise<{ success: boolean; id?: string; message?: string }>;
  toggleRoleLock: (id: string) => Promise<{ success: boolean; message?: string }>;
  deleteRole: (id: string) => Promise<{ success: boolean; message?: string }>;
  logAction: (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => Promise<void>;
  logSecurityEvent: (event: Omit<SecurityAuditItem, 'id' | 'timestamp'>) => Promise<void>;
  hasTabPermission: (pageId: string, tabId: string, customRoleId?: string) => boolean;

  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<{ success: boolean; message: string }>;
  syncAllToFirebase: () => Promise<{ success: boolean; message: string; counts?: { projects: number; timelines: number; testimonials: number } }>;
  resetToDefaults: () => void;
  clearAllData: () => Promise<{ success: boolean; message: string }>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'portfolio_cms_projects',
  TIMELINES: 'portfolio_cms_timelines',
  TESTIMONIALS: 'portfolio_cms_testimonials',
  MESSAGES: 'portfolio_cms_messages',
  SETTINGS: 'portfolio_cms_settings',
  USERS: 'portfolio_cms_users',
  ROLES: 'portfolio_cms_roles',
  AUDIT_LOGS: 'portfolio_cms_audit_logs',
  SECURITY_LOGS: 'portfolio_cms_security_logs',
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
          marquee: parsed.marquee ? { ...INITIAL_SETTINGS.marquee, ...parsed.marquee } : INITIAL_SETTINGS.marquee,
          about: parsed.about ? { ...INITIAL_SETTINGS.about, ...parsed.about } : INITIAL_SETTINGS.about,
        };
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // RBAC & Security Administration State
  const [users, setUsers] = useState<SystemUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_SYSTEM_USERS;
    } catch {
      return INITIAL_SYSTEM_USERS;
    }
  });

  const [roles, setRoles] = useState<SystemRole[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLES);
      return saved ? JSON.parse(saved) : INITIAL_ROLES;
    } catch {
      return INITIAL_ROLES;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [securityAuditLogs, setSecurityAuditLogs] = useState<SecurityAuditItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SECURITY_LOGS);
      return saved ? JSON.parse(saved) : INITIAL_SECURITY_LOGS;
    } catch {
      return INITIAL_SECURITY_LOGS;
    }
  });

  const [currentUser, setCurrentUser] = useState<SystemUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      const parsed = saved ? JSON.parse(saved) : INITIAL_SYSTEM_USERS;
      return parsed.find((u: SystemUser) => u.roleId === 'super_admin') || parsed[0] || null;
    } catch {
      return INITIAL_SYSTEM_USERS[0] || null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  // RBAC system users localStorage persistence effect
  useEffect(() => {
    if (users && users.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      } catch (e) {
        console.warn('Failed to sync users to localStorage:', e);
      }
    }
  }, [users]);

  // Apply theme variables dynamically whenever settings.theme changes
  useEffect(() => {
    if (settings.theme) {
      applyThemeVariables(settings.theme);
    }
  }, [settings.theme]);

  // Apply dynamic website icon / favicon whenever settings.branding.faviconUrl changes
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const DEFAULT_FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='25' fill='%2322c55e'/%3E%3Ctext x='50' y='67' font-size='52' font-family='sans-serif' font-weight='900' text-anchor='middle' fill='%23050b14'%3EM%3C/text%3E%3C/svg%3E";
    const targetUrl = settings.branding?.faviconUrl || settings.branding?.siteIconUrl || DEFAULT_FAVICON;

    let mimeType = '';
    if (targetUrl.includes('image/svg+xml') || targetUrl.endsWith('.svg')) {
      mimeType = 'image/svg+xml';
    } else if (targetUrl.includes('image/png') || targetUrl.endsWith('.png')) {
      mimeType = 'image/png';
    } else if (targetUrl.includes('image/webp') || targetUrl.endsWith('.webp')) {
      mimeType = 'image/webp';
    } else if (targetUrl.includes('image/jpeg') || targetUrl.endsWith('.jpg') || targetUrl.endsWith('.jpeg')) {
      mimeType = 'image/jpeg';
    }

    const iconSelectors = ["link[rel~='icon']", "link[rel='shortcut icon']", "link[rel='apple-touch-icon']"];
    iconSelectors.forEach((selector) => {
      let link = document.querySelector<HTMLLinkElement>(selector);
      if (!link) {
        link = document.createElement('link');
        link.rel = selector.includes('apple') ? 'apple-touch-icon' : 'icon';
        document.head.appendChild(link);
      }
      link.href = targetUrl;
      if (mimeType) {
        link.type = mimeType;
      } else {
        link.removeAttribute('type');
      }
    });
  }, [settings.branding?.faviconUrl, settings.branding?.siteIconUrl]);

  // Real-time synchronization with Firebase Firestore
  useEffect(() => {
    // 1. Projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteProjects: Project[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const fallback = INITIAL_PROJECTS.find(p => String(p.id) === String(docSnap.id));
          const title = data.title || fallback?.title;
          if (title) {
            remoteProjects.push({
              id: docSnap.id,
              title: title,
              category: data.category || fallback?.category || 'Web App',
              summary: data.summary || fallback?.summary || (data.description ? data.description.slice(0, 110) : ''),
              description: data.description || fallback?.description || '',
              imageUrl: data.imageUrl || fallback?.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
              galleryUrls: Array.isArray(data.galleryUrls) ? data.galleryUrls : (fallback?.galleryUrls || []),
              technologies: Array.isArray(data.technologies) ? data.technologies : (fallback?.technologies || ['React', 'TypeScript']),
              link: data.link || fallback?.link || '#',
              githubUrl: data.githubUrl || fallback?.githubUrl || '',
              featured: typeof data.featured === 'boolean' ? data.featured : Boolean(fallback?.featured),
              metrics: data.metrics || fallback?.metrics,
              createdAt: data.createdAt || fallback?.createdAt || new Date().toISOString(),
            });
          }
        });
        if (remoteProjects.length > 0) {
          setProjects(remoteProjects);
        }
        setIsFirebaseConnected(true);
      }
    }, (err) => {
      console.warn('Firestore projects listener error:', err);
    });

    // 2. Timelines
    const unsubTimelines = onSnapshot(collection(db, 'timelines'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteTimelines: TimelineItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          remoteTimelines.push({
            id: docSnap.id,
            type: data.type,
            title: data.title,
            institution: data.institution,
            period: data.period,
            description: data.description,
            skills: data.skills || [],
            displayOrder: data.displayOrder ?? 0,
            createdAt: data.createdAt || new Date().toISOString(),
          });
        });
        setTimelines(remoteTimelines);
      }
    }, (err) => {
      console.warn('Firestore timelines listener error:', err);
    });

    // 3. Testimonials
    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteTestimonials: TestimonialItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          remoteTestimonials.push({
            id: docSnap.id,
            clientName: data.clientName,
            clientRole: data.clientRole,
            company: data.company,
            avatarUrl: data.avatarUrl,
            rating: data.rating ?? 5,
            content: data.content,
            isApproved: data.isApproved ?? true,
            createdAt: data.createdAt || new Date().toISOString(),
          });
        });
        setTestimonials(remoteTestimonials);
      }
    }, (err) => {
      console.warn('Firestore testimonials listener error:', err);
    });

    // 4. Contact messages
    const unsubMessages = onSnapshot(collection(db, 'contact_messages'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteMessages: ContactMessage[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          remoteMessages.push({
            id: docSnap.id,
            name: data.name,
            email: data.email,
            subject: data.subject || '',
            message: data.message,
            isRead: Boolean(data.isRead),
            replied: Boolean(data.replied),
            createdAt: data.createdAt || new Date().toISOString(),
          });
        });
        setMessages(remoteMessages);
      }
    }, (err) => {
      console.warn('Firestore messages listener error:', err);
    });

    // 5. Site Settings
    const unsubSettings = onSnapshot(doc(db, 'site_settings', 'current'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings(prev => ({
          ...prev,
          siteTitle: data.siteTitle || prev.siteTitle,
          adminEmail: data.adminEmail || prev.adminEmail,
          whatsappNumber: data.whatsappNumber || prev.whatsappNumber,
          hero: data.hero ? { ...prev.hero, ...data.hero } : prev.hero,
          branding: data.branding ? { ...prev.branding, ...data.branding } : prev.branding,
          theme: data.theme ? { ...prev.theme, ...data.theme } : prev.theme,
          marquee: data.marquee ? { ...(prev.marquee || INITIAL_SETTINGS.marquee), ...data.marquee } : prev.marquee,
          about: data.about ? { ...(prev.about || INITIAL_SETTINGS.about), ...data.about } : prev.about,
          updatedAt: data.updatedAt,
        }));
      }
    }, (err) => {
      console.warn('Firestore settings error:', err);
    });

    // 6. System Users
    const unsubUsers = onSnapshot(collection(db, 'system_users'), async (snapshot) => {
      if (!snapshot.empty) {
        const remoteUsers: SystemUser[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          const fallbackUser = INITIAL_SYSTEM_USERS.find(
            (u) => u.id === docSnap.id || u.username === (d.username || docSnap.id)
          );
          remoteUsers.push({
            id: docSnap.id,
            fullName: d.fullName || fallbackUser?.fullName || 'User',
            username: d.username || docSnap.id,
            email: d.email || fallbackUser?.email || '',
            password: d.password !== undefined && d.password !== '' ? d.password : (fallbackUser?.password || (d.roleId === 'super_admin' ? 'Admin@2026' : undefined)),
            roleId: d.roleId || fallbackUser?.roleId || 'content_editor',
            status: d.status || fallbackUser?.status || 'active',
            customOverrides: d.customOverrides || fallbackUser?.customOverrides,
            avatarUrl: d.avatarUrl || fallbackUser?.avatarUrl,
            createdAt: d.createdAt || fallbackUser?.createdAt || new Date().toISOString(),
            lastLoginAt: d.lastLoginAt,
            lastLoginIp: d.lastLoginIp,
            notes: d.notes,
          });
        });
        setUsers(remoteUsers);
        try {
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(remoteUsers));
        } catch (e) {
          console.warn('LocalStorage save error:', e);
        }
      } else {
        // Auto-seed initial RBAC users into Firestore if collection is empty
        try {
          const batch = writeBatch(db);
          INITIAL_SYSTEM_USERS.forEach((u) => {
            const ref = doc(db, 'system_users', u.id);
            batch.set(ref, removeUndefinedFields(u));
          });
          await batch.commit();
        } catch (e) {
          console.warn('Auto-seed system_users Firestore error:', e);
        }
      }
    }, (err) => {
      console.warn('Firestore users listener error:', err);
    });

    // 7. System Roles
    const unsubRoles = onSnapshot(collection(db, 'system_roles'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteRoles: SystemRole[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          remoteRoles.push({
            id: docSnap.id,
            name: d.name || 'Role',
            description: d.description || '',
            isCoreLocked: Boolean(d.isCoreLocked),
            color: d.color || '#3b82f6',
            permissions: d.permissions || {},
            createdAt: d.createdAt || new Date().toISOString(),
            updatedAt: d.updatedAt || new Date().toISOString(),
          });
        });
        setRoles(remoteRoles);
      }
    }, (err) => {
      console.warn('Firestore roles listener error:', err);
    });

    // 8. Audit Logs (History Actions)
    const unsubAudit = onSnapshot(collection(db, 'audit_logs'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteLogs: AuditLogItem[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          remoteLogs.push({
            id: docSnap.id,
            timestamp: d.timestamp || new Date().toISOString(),
            userId: d.userId || '',
            userName: d.userName || 'System',
            userRole: d.userRole || 'Admin',
            actionType: d.actionType || 'update',
            targetPage: d.targetPage || '',
            targetTab: d.targetTab,
            details: d.details || '',
            deviceInfo: d.deviceInfo,
            ipAddress: d.ipAddress,
          });
        });
        remoteLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setAuditLogs(remoteLogs);
      }
    }, (err) => {
      console.warn('Firestore audit logs error:', err);
    });

    // 9. Security Audit Logs
    const unsubSec = onSnapshot(collection(db, 'security_audit_logs'), (snapshot) => {
      if (!snapshot.empty) {
        const remoteSec: SecurityAuditItem[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          remoteSec.push({
            id: docSnap.id,
            timestamp: d.timestamp || new Date().toISOString(),
            eventType: d.eventType || 'failed_login',
            userId: d.userId,
            userName: d.userName,
            severity: d.severity || 'medium',
            ipAddress: d.ipAddress || '127.0.0.1',
            device: d.device || 'Unknown',
            details: d.details || '',
          });
        });
        remoteSec.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setSecurityAuditLogs(remoteSec);
      }
    }, (err) => {
      console.warn('Firestore security logs error:', err);
    });

    return () => {
      unsubProjects();
      unsubTimelines();
      unsubTestimonials();
      unsubMessages();
      unsubSettings();
      unsubUsers();
      unsubRoles();
      unsubAudit();
      unsubSec();
    };
  }, []);

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to cache users:', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
    } catch (e) {
      console.warn('Failed to cache roles:', e);
    }
  }, [roles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed to cache audit logs:', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SECURITY_LOGS, JSON.stringify(securityAuditLogs));
    } catch (e) {
      console.warn('Failed to cache security logs:', e);
    }
  }, [securityAuditLogs]);

  // Project Actions
  const addProject = async (projectData: Omit<Project, 'id'>): Promise<Project> => {
    const newId = 'proj-' + Date.now();
    const newProject: Project = {
      ...projectData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setProjects(prev => [newProject, ...prev]);

    try {
      await setDoc(doc(db, 'projects', newId), {
        title: newProject.title,
        category: newProject.category,
        summary: newProject.summary || '',
        description: newProject.description,
        imageUrl: newProject.imageUrl,
        galleryUrls: newProject.galleryUrls || [],
        technologies: newProject.technologies || [],
        link: newProject.link || '#',
        githubUrl: newProject.githubUrl || '',
        featured: newProject.featured || false,
        createdAt: newProject.createdAt,
      });
    } catch (e) {
      console.warn('Firestore addProject error:', e);
    }

    return newProject;
  };

  const updateProject = async (id: string | number, updates: Partial<Project>) => {
    let completeUpdatedProject: Project | undefined;

    setProjects(prev => {
      return prev.map(p => {
        if (String(p.id) === String(id)) {
          const merged = { ...p, ...updates };
          completeUpdatedProject = merged;
          return merged;
        }
        return p;
      });
    });

    try {
      if (completeUpdatedProject) {
        await setDoc(doc(db, 'projects', String(id)), removeUndefinedFields(completeUpdatedProject), { merge: true });
      } else {
        await setDoc(doc(db, 'projects', String(id)), removeUndefinedFields(updates), { merge: true });
      }
    } catch (e) {
      console.warn('Firestore updateProject error:', e);
    }
  };

  const deleteProject = async (id: string | number) => {
    setProjects(prev => prev.filter(p => String(p.id) !== String(id)));

    try {
      await deleteDoc(doc(db, 'projects', String(id)));
    } catch (e) {
      console.warn('Firestore deleteProject error:', e);
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

    try {
      await setDoc(doc(db, 'timelines', newId), removeUndefinedFields({
        type: newItem.type,
        title: newItem.title,
        institution: newItem.institution,
        period: newItem.period,
        description: newItem.description,
        skills: newItem.skills || [],
        displayOrder: newItem.displayOrder || 0,
        createdAt: newItem.createdAt,
      }));
    } catch (e) {
      console.warn('Firestore addTimeline error:', e);
    }

    return newItem;
  };

  const updateTimeline = async (id: string, updates: Partial<TimelineItem>) => {
    setTimelines(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );

    try {
      await setDoc(doc(db, 'timelines', id), removeUndefinedFields(updates), { merge: true });
    } catch (e) {
      console.warn('Firestore updateTimeline error:', e);
    }
  };

  const deleteTimeline = async (id: string) => {
    setTimelines(prev => prev.filter(t => t.id !== id));

    try {
      await deleteDoc(doc(db, 'timelines', id));
    } catch (e) {
      console.warn('Firestore deleteTimeline error:', e);
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

    try {
      await setDoc(doc(db, 'testimonials', newId), removeUndefinedFields({
        clientName: newItem.clientName,
        clientRole: newItem.clientRole,
        company: newItem.company || '',
        avatarUrl: newItem.avatarUrl,
        rating: newItem.rating,
        content: newItem.content,
        isApproved: newItem.isApproved,
        createdAt: newItem.createdAt,
      }));
    } catch (e) {
      console.warn('Firestore addTestimonial error:', e);
    }

    return newItem;
  };

  const updateTestimonial = async (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );

    try {
      await setDoc(doc(db, 'testimonials', id), removeUndefinedFields(updates), { merge: true });
    } catch (e) {
      console.warn('Firestore updateTestimonial error:', e);
    }
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));

    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (e) {
      console.warn('Firestore deleteTestimonial error:', e);
    }
  };

  // Contact Messages Actions
  const addMessage = async (msgData: { name: string; email: string; subject: string; message: string }): Promise<ContactMessage> => {
    const newId = 'msg-' + Date.now();
    const newMsg: ContactMessage = {
      id: newId,
      name: msgData.name,
      email: msgData.email,
      subject: msgData.subject,
      message: msgData.message,
      isRead: false,
      replied: false,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [newMsg, ...prev]);

    try {
      await setDoc(doc(db, 'contact_messages', newId), {
        name: newMsg.name,
        email: newMsg.email,
        subject: newMsg.subject,
        message: newMsg.message,
        isRead: false,
        replied: false,
        createdAt: newMsg.createdAt,
      });
    } catch (e) {
      console.warn('Firestore addMessage error:', e);
    }

    return newMsg;
  };

  const markMessageRead = async (id: string, isRead: boolean = true) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, isRead } : m))
    );

    try {
      await setDoc(doc(db, 'contact_messages', id), { isRead }, { merge: true });
    } catch (e) {
      console.warn('Firestore markMessageRead error:', e);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));

    try {
      await deleteDoc(doc(db, 'contact_messages', id));
    } catch (e) {
      console.warn('Firestore deleteMessage error:', e);
    }
  };

  // Settings Actions
  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<{ success: boolean; message: string }> => {
    const updated: SiteSettings = {
      ...settings,
      ...newSettings,
      hero: newSettings.hero ? { ...settings.hero, ...newSettings.hero } : settings.hero,
      branding: newSettings.branding ? { ...settings.branding, ...newSettings.branding } : settings.branding,
      theme: newSettings.theme ? { ...settings.theme, ...newSettings.theme } : settings.theme,
      marquee: newSettings.marquee ? { ...settings.marquee, ...newSettings.marquee } : settings.marquee,
      about: newSettings.about ? { ...(settings.about || INITIAL_SETTINGS.about), ...newSettings.about } : settings.about,
    };

    setSettings(updated);

    // Save to localStorage immediately so changes persist locally even before Firestore
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    try {
      const rawPayload = {
        siteTitle: updated.siteTitle || '',
        adminEmail: updated.adminEmail || '',
        whatsappNumber: updated.whatsappNumber || '',
        hero: updated.hero,
        branding: updated.branding,
        theme: updated.theme,
        marquee: updated.marquee || null,
        about: updated.about || null,
        updatedAt: new Date().toISOString(),
      };

      const sanitizedPayload = removeUndefinedFields(rawPayload);

      await setDoc(doc(db, 'site_settings', 'current'), sanitizedPayload, { merge: true });

      return { success: true, message: 'Settings saved successfully.' };
    } catch (e: any) {
      console.error('Firestore settings update error:', e);
      return {
        success: false,
        message: e?.message || 'Cilad baa dhacday marka database-ka la kaydinayay',
      };
    }
  };

  const syncAllToFirebase = async (): Promise<{ success: boolean; message: string; counts?: { projects: number; timelines: number; testimonials: number } }> => {
    try {
      setIsLoading(true);
      const batch = writeBatch(db);

      const projectsToPush = (projects && projects.length > 0 ? projects : INITIAL_PROJECTS);
      projectsToPush.forEach((p, idx) => {
        const id = p.id ? String(p.id) : `proj-${idx + 1}`;
        const ref = doc(db, 'projects', id);
        batch.set(ref, {
          title: p.title,
          category: p.category,
          summary: p.summary || p.description.slice(0, 110),
          description: p.description,
          imageUrl: p.imageUrl,
          galleryUrls: p.galleryUrls || [],
          technologies: p.technologies || [],
          link: p.link || '#',
          githubUrl: p.githubUrl || '',
          featured: p.featured || false,
          metrics: p.metrics || {},
          displayOrder: idx,
          createdAt: p.createdAt || new Date().toISOString(),
        });
      });

      const timelinesToPush = (timelines && timelines.length > 0 ? timelines : INITIAL_TIMELINES);
      timelinesToPush.forEach((t, idx) => {
        const id = t.id ? String(t.id) : `time-${idx + 1}`;
        const ref = doc(db, 'timelines', id);
        batch.set(ref, {
          type: t.type,
          title: t.title,
          institution: t.institution,
          period: t.period,
          description: t.description,
          skills: t.skills || [],
          displayOrder: idx,
          createdAt: t.createdAt || new Date().toISOString(),
        });
      });

      const testimonialsToPush = (testimonials && testimonials.length > 0 ? testimonials : INITIAL_TESTIMONIALS);
      testimonialsToPush.forEach((tm, idx) => {
        const id = tm.id ? String(tm.id) : `test-${idx + 1}`;
        const ref = doc(db, 'testimonials', id);
        batch.set(ref, {
          clientName: tm.clientName,
          clientRole: tm.clientRole,
          company: tm.company || '',
          avatarUrl: tm.avatarUrl,
          rating: tm.rating || 5,
          content: tm.content,
          isApproved: tm.isApproved ?? true,
          createdAt: tm.createdAt || new Date().toISOString(),
        });
      });

      // Also sync RBAC system users (including passwords) and roles to Firestore
      const usersToPush = (users && users.length > 0 ? users : INITIAL_SYSTEM_USERS);
      usersToPush.forEach((u) => {
        const ref = doc(db, 'system_users', u.id);
        batch.set(ref, removeUndefinedFields(u), { merge: true });
      });

      const rolesToPush = (roles && roles.length > 0 ? roles : INITIAL_ROLES);
      rolesToPush.forEach((r) => {
        const ref = doc(db, 'system_roles', r.id);
        batch.set(ref, removeUndefinedFields(r), { merge: true });
      });

      await batch.commit();
      setIsFirebaseConnected(true);

      return {
        success: true,
        message: `Dhammaan xogtii si toos ah ayaa loogu shubay Firebase Firestore! (${projectsToPush.length} Mashaariic, ${timelinesToPush.length} Timeline, ${testimonialsToPush.length} Testimonials)`,
        counts: {
          projects: projectsToPush.length,
          timelines: timelinesToPush.length,
          testimonials: testimonialsToPush.length,
        },
      };
    } catch (err: any) {
      console.error('Failed to sync all to Firebase:', err);
      return {
        success: false,
        message: `Cilad Firebase: ${err.message || 'Xogta lama shubi karin'}`,
      };
    } finally {
      setIsLoading(false);
    }
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

  const clearAllData = async (): Promise<{ success: boolean; message: string }> => {
    try {
      setIsLoading(true);
      // Clear local state
      setProjects([]);
      setTimelines([]);
      setTestimonials([]);
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.TIMELINES, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify([]));

      // Attempt to clear remote documents if connected
      const batch = writeBatch(db);
      for (const p of projects) {
        batch.delete(doc(db, 'projects', String(p.id)));
      }
      for (const t of timelines) {
        batch.delete(doc(db, 'timelines', String(t.id)));
      }
      for (const tm of testimonials) {
        batch.delete(doc(db, 'testimonials', String(tm.id)));
      }
      await batch.commit();

      return {
        success: true,
        message: 'Dhammaan xogtii dummy-ga ahayd waa laga saaray nidaamka iyo Firebase!',
      };
    } catch (err: any) {
      console.warn('Error clearing remote documents:', err);
      return {
        success: true,
        message: 'Xogtii dummy-ga ahayd waa la nadiifiyay!',
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to log user actions into the Audit Log (History Actions)
  const logAction = async (log: Omit<AuditLogItem, 'id' | 'timestamp'>) => {
    const newId = 'log_' + Date.now();
    const entry: AuditLogItem = {
      ...log,
      id: newId,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [entry, ...prev]);
    try {
      await setDoc(doc(db, 'audit_logs', newId), removeUndefinedFields(entry));
    } catch (e) {
      console.warn('Failed to persist audit log to Firestore:', e);
    }
  };

  // Helper to log security events into the Security Audit Log
  const logSecurityEvent = async (event: Omit<SecurityAuditItem, 'id' | 'timestamp'>) => {
    const newId = 'sec_' + Date.now();
    const entry: SecurityAuditItem = {
      ...event,
      id: newId,
      timestamp: new Date().toISOString(),
    };
    setSecurityAuditLogs((prev) => [entry, ...prev]);
    try {
      await setDoc(doc(db, 'security_audit_logs', newId), removeUndefinedFields(entry));
    } catch (e) {
      console.warn('Failed to persist security audit log to Firestore:', e);
    }
  };

  // User Actions
  const addUser = async (userData: Omit<SystemUser, 'id' | 'createdAt'>): Promise<{ success: boolean; id?: string; message?: string }> => {
    const newId = 'usr_' + Date.now();
    const newUser: SystemUser = {
      ...userData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: userData.status || 'active',
    };

    const updatedList = [newUser, ...users];
    setUsers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedList));
    } catch {}

    // Record audit logs
    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'create',
      targetPage: 'Security & Access Control',
      targetTab: 'System Users',
      details: `Registered new user "${newUser.fullName}" (@${newUser.username}) with role ${newUser.roleId}`,
    });

    try {
      await setDoc(doc(db, 'system_users', newId), removeUndefinedFields(newUser));
      return { success: true, id: newId, message: 'Isticmaalaha cusub si guul leh ayaa loo diiwaangeliyay looguna kaydiyay database-ka!' };
    } catch (e: any) {
      console.warn('Firestore addUser error:', e);
      return { success: true, id: newId, message: 'Isticmaalaha waxaa lagu kaydiyay kaydka browser-ka (offline).' };
    }
  };

  const updateUser = async (id: string, updates: Partial<SystemUser>): Promise<{ success: boolean; message?: string }> => {
    const existing = users.find((u) => u.id === id);
    if (!existing) return { success: false, message: 'Isticmaalaha lama helin' };

    const updatedUser = { ...existing, ...updates };
    const updatedList = users.map((u) => (u.id === id ? updatedUser : u));
    setUsers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedList));
    } catch {}

    if (currentUser?.id === id) {
      setCurrentUser(updatedUser);
    }

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'update',
      targetPage: 'Security & Access Control',
      targetTab: 'System Users',
      details: updates.password
        ? `Updated password and credentials for user "${updatedUser.fullName}" (@${updatedUser.username})`
        : `Updated profile details for user "${updatedUser.fullName}" (@${updatedUser.username})`,
    });

    try {
      await setDoc(doc(db, 'system_users', id), removeUndefinedFields(updatedUser), { merge: true });
      return { success: true, message: 'Xogta isticmaalaha iyo furaha sirta ah (Password) si toos ah ayaa loogu kaydiyay database-ka Firestore!' };
    } catch (e: any) {
      console.warn('Firestore updateUser error:', e);
      return { success: true, message: 'Xogta waxaa lagu cusboonaysiiyay kaydka browser-ka.' };
    }
  };

  const toggleUserLock = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const target = users.find((u) => u.id === id);
    if (!target) return { success: false, message: 'Isticmaalaha lama helin' };

    // Prevent locking the primary super admin
    if (target.roleId === 'super_admin' && users.filter((u) => u.roleId === 'super_admin' && u.status === 'active').length <= 1 && target.status === 'active') {
      return { success: false, message: 'Ma qufuli kartid Super Admin-ka kaliya ee firfircoon!' };
    }

    const nextStatus: AccountStatus = target.status === 'locked' ? 'active' : 'locked';
    const updated = { ...target, status: nextStatus };
    const updatedList = users.map((u) => (u.id === id ? updated : u));
    setUsers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedList));
    } catch {}

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'update',
      targetPage: 'Security & Access Control',
      targetTab: 'System Users',
      details: nextStatus === 'locked' ? `Locked user account for @${target.username}` : `Unlocked user account for @${target.username}`,
    });

    await logSecurityEvent({
      eventType: 'account_lock',
      userId: target.id,
      userName: target.fullName,
      severity: nextStatus === 'locked' ? 'medium' : 'low',
      ipAddress: target.lastLoginIp || '127.0.0.1',
      device: 'Admin Console Event',
      details: nextStatus === 'locked' ? `Account @${target.username} was locked by ${currentUser?.fullName || 'Super Admin'}` : `Account @${target.username} was unlocked by ${currentUser?.fullName || 'Super Admin'}`,
    });

    try {
      await setDoc(doc(db, 'system_users', id), { status: nextStatus }, { merge: true });
    } catch (e) {
      console.warn('Firestore toggle lock error:', e);
    }

    return {
      success: true,
      message: nextStatus === 'locked' ? `Account-ka @${target.username} hadda waa la qufulay!` : `Account-ka @${target.username} hadda waa la furay oo waa firfircoon yahay!`,
    };
  };

  const deleteUser = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const target = users.find((u) => u.id === id);
    if (!target) return { success: false, message: 'Isticmaalaha lama helin' };

    if (target.roleId === 'super_admin') {
      return { success: false, message: 'Lama tirtiri karo Super Admin!' };
    }

    const updatedList = users.filter((u) => u.id !== id);
    setUsers(updatedList);
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedList));
    } catch {}

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'delete',
      targetPage: 'Security & Access Control',
      targetTab: 'System Users',
      details: `Deleted user @${target.username} (${target.fullName})`,
    });

    try {
      await deleteDoc(doc(db, 'system_users', id));
    } catch (e) {
      console.warn('Firestore delete user error:', e);
    }

    return { success: true, message: `Isticmaalaha @${target.username} waa la tirtiray!` };
  };

  // Role Actions
  const addRole = async (roleData: Omit<SystemRole, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; id?: string; message?: string }> => {
    const newId = 'role_' + Date.now();
    const newRole: SystemRole = {
      ...roleData,
      id: newId,
      isCoreLocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRoles((prev) => [...prev, newRole]);

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'create',
      targetPage: 'Security & Access Control',
      targetTab: 'Powers & Role Matrix',
      details: `Created new custom Role Preset: "${newRole.name}"`,
    });

    try {
      await setDoc(doc(db, 'system_roles', newId), removeUndefinedFields(newRole));
      return { success: true, id: newId, message: `Doorka cusub ee "${newRole.name}" si guul leh ayaa loo abuuray!` };
    } catch (e: any) {
      console.warn('Firestore addRole error:', e);
      return { success: true, id: newId, message: `Doorka "${newRole.name}" waxaa lagu keydiyay kaydka browser-ka.` };
    }
  };

  const updateRole = async (id: string, updates: Partial<SystemRole>): Promise<{ success: boolean; message?: string }> => {
    const existing = roles.find((r) => r.id === id);
    if (!existing) return { success: false, message: 'Doorka lama helin' };

    // Disallow modifying permissions of core super admin if unauthorized
    if (existing.id === 'super_admin' && updates.permissions && currentUser?.roleId !== 'super_admin') {
      return { success: false, message: 'Kaliya Super Admin ayaa wax ka beddeli kara doorka Super Admin!' };
    }

    const updatedRole: SystemRole = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    setRoles((prev) => prev.map((r) => (r.id === id ? updatedRole : r)));

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'permission_change',
      targetPage: 'Security & Access Control',
      targetTab: 'Powers & Role Matrix',
      details: `Modified capability matrix / permissions for Role "${updatedRole.name}"`,
    });

    await logSecurityEvent({
      eventType: 'role_change',
      userId: currentUser?.id,
      userName: currentUser?.fullName,
      severity: 'low',
      ipAddress: currentUser?.lastLoginIp || '127.0.0.1',
      device: 'Capability Matrix Editor',
      details: `Role "${updatedRole.name}" capability matrix modified and synchronized to all assigned users.`,
    });

    try {
      await setDoc(doc(db, 'system_roles', id), removeUndefinedFields(updatedRole), { merge: true });
      return { success: true, message: `Doorka "${updatedRole.name}" awoodihiisa waa la cusboonaysiiyay!` };
    } catch (e: any) {
      console.warn('Firestore updateRole error:', e);
      return { success: true, message: `Doorka awoodihiisa waxaa lagu cusboonaysiiyay browser-ka.` };
    }
  };

  const cloneRole = async (id: string, newName: string): Promise<{ success: boolean; id?: string; message?: string }> => {
    const source = roles.find((r) => r.id === id);
    if (!source) return { success: false, message: 'Doorka asalka ah lama helin' };

    const newId = 'role_clone_' + Date.now();
    const clonedRole: SystemRole = {
      ...source,
      id: newId,
      name: newName.trim() || `${source.name} (Nuqul)`,
      description: `Cloned from ${source.name}. ${source.description}`,
      isCoreLocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRoles((prev) => [...prev, clonedRole]);

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'create',
      targetPage: 'Security & Access Control',
      targetTab: 'Powers & Role Matrix',
      details: `Cloned role "${source.name}" into new role "${clonedRole.name}"`,
    });

    try {
      await setDoc(doc(db, 'system_roles', newId), removeUndefinedFields(clonedRole));
      return { success: true, id: newId, message: `Doorka "${clonedRole.name}" nuqulkiisa waa la abuuray!` };
    } catch (e: any) {
      console.warn('Firestore cloneRole error:', e);
      return { success: true, id: newId, message: `Nuqulka doorka waxaa lagu keydiyay browser-ka.` };
    }
  };

  const toggleRoleLock = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const role = roles.find((r) => r.id === id);
    if (!role) return { success: false, message: 'Doorka lama helin' };

    if (role.id === 'super_admin') {
      return { success: false, message: 'Doorka Super Admin waa mid xidhan oo aan marna la furi karin!' };
    }

    const nextLock = !role.isCoreLocked;
    const updated = { ...role, isCoreLocked: nextLock, updatedAt: new Date().toISOString() };
    setRoles((prev) => prev.map((r) => (r.id === id ? updated : r)));

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'permission_change',
      targetPage: 'Security & Access Control',
      targetTab: 'Powers & Role Matrix',
      details: nextLock ? `Locked core role "${role.name}"` : `Unlocked role "${role.name}"`,
    });

    try {
      await setDoc(doc(db, 'system_roles', id), { isCoreLocked: nextLock }, { merge: true });
    } catch (e) {
      console.warn('Firestore toggleRoleLock error:', e);
    }

    return {
      success: true,
      message: nextLock ? `Doorka "${role.name}" hadda waa la xidhay (Core Protected)!` : `Doorka "${role.name}" hadda waa la furay waxna waa laga beddeli karaa.`,
    };
  };

  const deleteRole = async (id: string): Promise<{ success: boolean; message?: string }> => {
    const role = roles.find((r) => r.id === id);
    if (!role) return { success: false, message: 'Doorka lama helin' };

    if (role.isCoreLocked || role.id === 'super_admin') {
      return { success: false, message: 'Ma tirtiri kartid door core ah oo nidaamku ku shaqeeyo!' };
    }

    const assignedUsers = users.filter((u) => u.roleId === id);
    if (assignedUsers.length > 0) {
      return {
        success: false,
        message: `Ma tirtiri kartid doorkan sababtoo ah waxaa ku jira ${assignedUsers.length} isticmaale. Fadlan marka hore u wareeji door kale.`,
      };
    }

    setRoles((prev) => prev.filter((r) => r.id !== id));

    await logAction({
      userId: currentUser?.id || 'admin',
      userName: currentUser?.fullName || 'Super Admin',
      userRole: currentUser?.roleId || 'super_admin',
      actionType: 'delete',
      targetPage: 'Security & Access Control',
      targetTab: 'Powers & Role Matrix',
      details: `Deleted custom role preset "${role.name}"`,
    });

    try {
      await deleteDoc(doc(db, 'system_roles', id));
    } catch (e) {
      console.warn('Firestore deleteRole error:', e);
    }

    return { success: true, message: `Doorka "${role.name}" waa la tirtiray!` };
  };

  // Permission resolution helper: Role -> Page -> Tab + User Overrides
  const hasTabPermission = (pageId: string, tabId: string, customRoleId?: string): boolean => {
    const effectiveRoleId = customRoleId || currentUser?.roleId || 'super_admin';

    // Super Admin has unrestricted access everywhere
    if (effectiveRoleId === 'super_admin') return true;

    // Check optional custom super-admin overrides on the current user
    if (!customRoleId && currentUser?.customOverrides?.[pageId]?.[tabId] !== undefined) {
      return Boolean(currentUser.customOverrides[pageId][tabId]);
    }

    // Check role preset capability matrix
    const role = roles.find((r) => r.id === effectiveRoleId);
    if (!role || !role.permissions) return false;

    return Boolean(role.permissions[pageId]?.[tabId]);
  };

  return (
    <SiteDataContext.Provider
      value={{
        projects,
        timelines,
        testimonials,
        messages,
        settings,
        isFirebaseConnected,
        isLoading,
        users,
        roles,
        auditLogs,
        securityAuditLogs,
        currentUser,
        setCurrentUser,
        addUser,
        updateUser,
        toggleUserLock,
        deleteUser,
        addRole,
        updateRole,
        cloneRole,
        toggleRoleLock,
        deleteRole,
        logAction,
        logSecurityEvent,
        hasTabPermission,
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
        syncAllToFirebase,
        resetToDefaults,
        clearAllData,
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
