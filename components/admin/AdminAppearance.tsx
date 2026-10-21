import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import {
  HeroSettings,
  BrandingSettings,
  ThemeSettings,
  MarqueeSectionSettings,
  MarqueeLogoItem,
  AboutSettings,
  SkillItem,
  AboutMetricItem,
  CertificationItem,
  SocialLinksSettings,
} from '../../types';
import {
  Palette,
  Sparkles,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Save,
  Globe,
  Sliders,
  Eye,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Type,
  Layout,
  Layers,
  ArrowRight,
  QrCode,
  Link as LinkIcon,
  Smartphone,
  Code2,
  Zap,
  LayoutGrid,
  Edit2,
  ChevronUp,
  ChevronDown,
  X,
  Play,
  Pause,
  Video,
  Megaphone,
  Upload,
  Cpu,
  Target,
  Award,
  User,
  Share2,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Send,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageUploader } from './ImageUploader';
import { INITIAL_SETTINGS } from '../../src/data/initialData';
const defaultHeroPortrait = '/assets/aistudio/black_875c126c.png';

// Curated primary accent colors
const ACCENT_COLOR_PRESETS = [
  { name: 'Cyber Gold (Original)', hex: '#facc15' },
  { name: 'Neon Emerald', hex: '#22c55e' },
  { name: 'Electric Cyan', hex: '#06b6d4' },
  { name: 'Cosmic Violet', hex: '#a855f7' },
  { name: 'Crimson Rose', hex: '#f43f5e' },
  { name: 'Sunset Amber', hex: '#f97316' },
  { name: 'Sky Blue', hex: '#38bdf8' },
  { name: 'Lime Green', hex: '#84cc16' },
];

// Curated secondary accent colors
const SECONDARY_COLOR_PRESETS = [
  { name: 'Neon Green', hex: '#22c55e' },
  { name: 'Gold / Yellow', hex: '#facc15' },
  { name: 'Sky Cyan', hex: '#06b6d4' },
  { name: 'Indigo Glow', hex: '#6366f1' },
  { name: 'Pink Rose', hex: '#f43f5e' },
  { name: 'Teal Emerald', hex: '#14b8a6' },
];

export const AdminAppearance: React.FC = () => {
  const { settings, updateSettings } = useSiteData();
  const { t } = useLanguage();

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'hero' | 'branding' | 'marquee' | 'theme' | 'about' | 'social'>(() => {
    const tab = searchParams.get('tab');
    if (tab === 'marquee' || tab === 'branding' || tab === 'theme' || tab === 'about' || tab === 'social') return tab;
    return 'hero';
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'marquee' || tab === 'branding' || tab === 'theme' || tab === 'hero' || tab === 'about' || tab === 'social') {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'hero' | 'branding' | 'marquee' | 'theme' | 'about' | 'social') => {
    setActiveTab(tab);
    setSearchParams(tab === 'hero' ? {} : { tab });
  };

  // Local editable copies of Hero, Branding, Theme, Marquee, and Social
  const [heroForm, setHeroForm] = useState<HeroSettings>(settings.hero);
  const [brandingForm, setBrandingForm] = useState<BrandingSettings>(settings.branding);
  const [themeForm, setThemeForm] = useState<ThemeSettings>(settings.theme);
  const [socialForm, setSocialForm] = useState<SocialLinksSettings>(() => {
    return settings.socialLinks || {
      github: 'https://github.com/alhady-mohamed',
      linkedin: 'https://www.linkedin.com/in/alhady-mohamed',
      facebook: 'https://www.facebook.com/Mohamet.Abdirisaak304',
      instagram: 'https://www.instagram.com/alhady_mohamed301',
      youtube: 'https://youtube.com/@mohamed-alhady01',
      twitter: '',
      tiktok: '',
      telegram: '',
      whatsapp: 'https://wa.link/cs6dy4',
      customLinks: [],
    };
  });
  const [marqueeForm, setMarqueeForm] = useState<MarqueeSectionSettings>(() => {
    return settings.marquee || {
      isEnabled: true,
      speed: 30,
      pauseOnHover: true,
      monochromeFilter: true,
      sectionTitle: 'Trusted Technologies & Brand Partners',
      items: [
        { id: '1', name: 'React', iconName: 'react', displayMode: 'both', isActive: true },
        { id: '2', name: 'Next.js', iconName: 'zap', displayMode: 'both', isActive: true },
        { id: '3', name: 'TypeScript', iconName: 'code', displayMode: 'both', isActive: true },
        { id: '4', name: 'Tailwind CSS', iconName: 'layout', displayMode: 'both', isActive: true },
        { id: '5', name: 'Node.js', iconName: 'server', displayMode: 'both', isActive: true },
        { id: '6', name: 'UI/UX Design', iconName: 'palette', displayMode: 'both', isActive: true },
      ],
    };
  });

  // Local editable copy of About section (Key Metrics, Skill Bars, Tech Stack, Narrative)
  const [aboutForm, setAboutForm] = useState<AboutSettings>(() => {
    return settings.about || INITIAL_SETTINGS.about || {
      introBadge: 'Get to know me',
      headingTitle: 'Mohamed Alhady',
      leadText: 'Creative Strategist & Full-Stack Developer bridging engineering precision with cinematic storytelling and digital growth.',
      paragraph1: 'I help modern brands, startups, and enterprises translate ambitious ideas into scalable software, distinctive visual identities, and high-impact digital experiences.',
      paragraph2: 'With over five years at the intersection of technology and creative media, my work spans end-to-end web engineering, visual branding systems, high-production video direction, and data-backed digital marketing.',
      paragraph3: "I believe high-performing software should feel as refined as handcrafted art. When I'm not designing architectures or deploying code, I immerse myself in creative direction, motion design, and exploring cutting-edge web technologies.",
      metrics: [
        { id: 'm1', label: 'Years Experience', value: 5, suffix: '+' },
        { id: 'm2', label: 'Shipped Projects', value: 40, suffix: '+' },
        { id: 'm3', label: 'Client Partners', value: 15, suffix: '+' },
        { id: 'm4', label: 'Lines of Code', value: 1, suffix: 'M+' },
      ],
      skills: [
        { id: 's1', name: 'Software Development', percentage: 95 },
        { id: 's2', name: 'Branding & Visual Identity', percentage: 95 },
        { id: 's3', name: 'Video Production', percentage: 90 },
        { id: 's4', name: 'Social Media Marketing', percentage: 85 },
        { id: 's5', name: 'UI/UX Design', percentage: 90 },
        { id: 's6', name: 'Digital Strategy', percentage: 80 },
      ],
      techStack: [
        'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
        'PostgreSQL', 'Python', 'Framer Motion', 'Figma', 'Premiere Pro',
        'After Effects', 'Docker', 'GraphQL', 'Git'
      ],
      standardsTitle: 'Architecture Standards',
      standardsDescription: 'All projects adhere to WCAG accessibility, strict TypeScript validation, responsive design patterns, and SEO best practices.',
    };
  });

  useEffect(() => {
    if (settings.about) {
      setAboutForm(settings.about);
    }
  }, [settings.about]);

  // About Section Helper Handlers
  const [newAboutTechTag, setNewAboutTechTag] = useState('');

  const handleUpdateMetric = (id: string, field: keyof AboutMetricItem, value: any) => {
    setAboutForm((prev) => ({
      ...prev,
      metrics: prev.metrics.map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    }));
  };

  const handleAddMetric = () => {
    const newMetric: AboutMetricItem = {
      id: `m_${Date.now()}`,
      label: 'Metric Cusub',
      value: 10,
      suffix: '+',
    };
    setAboutForm((prev) => ({
      ...prev,
      metrics: [...prev.metrics, newMetric],
    }));
  };

  const handleDeleteMetric = (id: string) => {
    setAboutForm((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((m) => m.id !== id),
    }));
  };

  const handleUpdateSkill = (id: string, field: keyof SkillItem, value: any) => {
    setAboutForm((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  const handleAddSkill = (presetName?: string, presetPercentage?: number) => {
    const newSkill: SkillItem = {
      id: `s_${Date.now()}`,
      name: presetName || 'Xirfad Cusub',
      percentage: presetPercentage ?? 85,
    };
    setAboutForm((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const handleDeleteSkill = (id: string) => {
    setAboutForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((m) => m.id !== id),
    }));
  };

  const handleMoveSkill = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= aboutForm.skills.length) return;
    const reordered = [...aboutForm.skills];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);
    setAboutForm((prev) => ({
      ...prev,
      skills: reordered,
    }));
  };

  const handleAddAboutTech = (tagToAdd?: string) => {
    const tag = (tagToAdd || newAboutTechTag).trim();
    if (!tag) return;
    if (aboutForm.techStack.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setNewAboutTechTag('');
      return;
    }
    setAboutForm((prev) => ({
      ...prev,
      techStack: [...prev.techStack, tag],
    }));
    setNewAboutTechTag('');
  };

  const handleRemoveAboutTech = (techToRemove: string) => {
    setAboutForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== techToRemove),
    }));
  };

  const handleResetDefaultAbout = () => {
    if (INITIAL_SETTINGS.about) {
      setAboutForm(INITIAL_SETTINGS.about);
    }
  };

  const handleAddCertification = (preset?: Partial<CertificationItem>) => {
    const newCert: CertificationItem = {
      id: `cert_${Date.now()}`,
      title: preset?.title || 'AWS Certified Solutions Architect',
      issuer: preset?.issuer || 'Amazon Web Services • Cloud Infrastructure',
      dateOrValidity: preset?.dateOrValidity || 'Valid 2026',
      badgeText: preset?.badgeText || 'Verified',
      verificationUrl: preset?.verificationUrl || '',
      iconType: preset?.iconType || 'award',
    };
    setAboutForm((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert],
    }));
  };

  const handleUpdateCertification = (id: string, field: keyof CertificationItem, value: any) => {
    setAboutForm((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    }));
  };

  const handleDeleteCertification = (id: string) => {
    setAboutForm((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((c) => c.id !== id),
    }));
  };

  // Quick Logo Upload Board state for instant inline logo uploading
  const [quickLogoName, setQuickLogoName] = useState('');
  const [quickLogoUrl, setQuickLogoUrl] = useState('');
  const [quickDisplayMode, setQuickDisplayMode] = useState<'both' | 'logo-only' | 'text-only'>('both');
  const [quickWebsiteUrl, setQuickWebsiteUrl] = useState('');

  const handleQuickAddLogo = () => {
    const finalName = quickLogoName.trim() || 'Brand Partner';
    const newLogo: MarqueeLogoItem = {
      id: `logo_${Date.now()}`,
      name: finalName,
      logoUrl: quickLogoUrl.trim() || '',
      iconName: 'code',
      displayMode: quickDisplayMode,
      websiteUrl: quickWebsiteUrl.trim() || '',
      category: 'Brand Partner',
      isActive: true,
    };

    setMarqueeForm((prev) => ({
      ...prev,
      items: [newLogo, ...prev.items],
    }));

    setQuickLogoName('');
    setQuickLogoUrl('');
    setQuickWebsiteUrl('');
  };

  // Modal / form state for Adding/Editing a Marquee Logo
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [editingLogoId, setEditingLogoId] = useState<string | null>(null);
  const [logoForm, setLogoForm] = useState<MarqueeLogoItem>({
    id: '',
    name: '',
    logoUrl: '',
    iconName: 'code',
    displayMode: 'both',
    websiteUrl: '',
    category: 'Technology',
    isActive: true,
  });

  // Handlers for Marquee Logo actions
  const handleOpenAddLogo = () => {
    setEditingLogoId(null);
    setLogoForm({
      id: `logo_${Date.now()}`,
      name: '',
      logoUrl: '',
      iconName: 'code',
      displayMode: 'both',
      websiteUrl: '',
      category: 'Technology',
      isActive: true,
    });
    setIsLogoModalOpen(true);
  };

  const handleOpenEditLogo = (logo: MarqueeLogoItem) => {
    setEditingLogoId(logo.id);
    setLogoForm({ ...logo });
    setIsLogoModalOpen(true);
  };

  const handleSaveLogo = () => {
    if (!logoForm.name.trim()) return;

    if (editingLogoId) {
      setMarqueeForm((prev) => ({
        ...prev,
        items: prev.items.map((item) => (item.id === editingLogoId ? logoForm : item)),
      }));
    } else {
      setMarqueeForm((prev) => ({
        ...prev,
        items: [...prev.items, logoForm],
      }));
    }
    setIsLogoModalOpen(false);
  };

  const handleDeleteLogo = (id: string) => {
    setMarqueeForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleToggleLogoActive = (id: string) => {
    setMarqueeForm((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item)),
    }));
  };

  const handleMoveLogo = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= marqueeForm.items.length) return;
    const newItems = [...marqueeForm.items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    setMarqueeForm((prev) => ({ ...prev, items: newItems }));
  };

  const handleResetDefaultLogos = () => {
    setMarqueeForm((prev) => ({
      ...prev,
      items: [
        { id: '1', name: 'React', iconName: 'react', displayMode: 'both', isActive: true },
        { id: '2', name: 'Next.js', iconName: 'zap', displayMode: 'both', isActive: true },
        { id: '3', name: 'TypeScript', iconName: 'code', displayMode: 'both', isActive: true },
        { id: '4', name: 'Tailwind CSS', iconName: 'layout', displayMode: 'both', isActive: true },
        { id: '5', name: 'Node.js', iconName: 'server', displayMode: 'both', isActive: true },
        { id: '6', name: 'UI/UX Design', iconName: 'palette', displayMode: 'both', isActive: true },
      ],
    }));
  };

  const [newTechTag, setNewTechTag] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'idle' | 'saving' | 'saved' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  // Sync state with settings when loaded from Firestore or updated remotely
  const lastRemoteUpdateRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (settings && saveStatus.type !== 'saving') {
      const updateKey = settings.updatedAt || 'initial';
      if (updateKey !== lastRemoteUpdateRef.current) {
        lastRemoteUpdateRef.current = updateKey;
        if (settings.hero) setHeroForm(settings.hero);
        if (settings.branding) setBrandingForm(settings.branding);
        if (settings.theme) setThemeForm(settings.theme);
        if (settings.marquee) setMarqueeForm(settings.marquee);
        if (settings.about) setAboutForm(settings.about);
        if (settings.socialLinks) setSocialForm(settings.socialLinks);
      }
    }
  }, [settings, saveStatus.type]);

  // Handle tech stack tags add / remove
  const handleAddTechTag = () => {
    if (!newTechTag.trim()) return;
    if (heroForm.featuredTech.includes(newTechTag.trim())) {
      setNewTechTag('');
      return;
    }
    setHeroForm((prev) => ({
      ...prev,
      featuredTech: [...prev.featuredTech, newTechTag.trim()],
    }));
    setNewTechTag('');
  };

  const handleRemoveTechTag = (tagToRemove: string) => {
    setHeroForm((prev) => ({
      ...prev,
      featuredTech: prev.featuredTech.filter((t) => t !== tagToRemove),
    }));
  };

  // Save all appearance settings to context and storage
  const handleSaveAll = async () => {
    setSaveStatus({ type: 'saving', message: 'Waa la badbaadinayaa...' });
    try {
      const cleanedMarquee: MarqueeSectionSettings = {
        ...marqueeForm,
        sectionTitle: marqueeForm.sectionTitle || '',
        items: (marqueeForm.items || []).map((item) => ({
          id: item.id || `logo_${Date.now()}`,
          name: item.name || '',
          logoUrl: item.logoUrl || '',
          iconName: item.iconName || 'code',
          displayMode: item.displayMode || 'both',
          websiteUrl: item.websiteUrl || '',
          category: item.category || 'Technology',
          isActive: item.isActive !== false,
        })),
      };

      const res = await updateSettings({
        hero: heroForm,
        branding: brandingForm,
        theme: themeForm,
        marquee: cleanedMarquee,
        about: aboutForm,
        socialLinks: socialForm,
        siteTitle: `${brandingForm.siteName} | ${brandingForm.tagline}`,
        whatsappNumber: socialForm.whatsapp?.trim() || settings.whatsappNumber,
      });

      if (res.success) {
        setSaveStatus({ type: 'saved', message: 'Isbeddelka si guul leh ayaa loo keydiyay!' });
        setTimeout(() => setSaveStatus({ type: 'idle', message: '' }), 3500);
      } else {
        setSaveStatus({ type: 'error', message: res.message || 'Khalad ayaa dhacay.' });
      }
    } catch (err: any) {
      setSaveStatus({ type: 'error', message: err?.message || 'Khalad ayaa dhacay xilligii keydinta.' });
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header zone with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <Palette size={18} />
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
              {t('admin_control_center')}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t('admin_appearance_title')}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {t('admin_appearance_desc')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all"
          >
            <Eye size={15} />
            <span>{t('admin_live_site')}</span>
          </a>

          <button
            onClick={handleSaveAll}
            disabled={saveStatus.type === 'saving'}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer"
          >
            {saveStatus.type === 'saving' ? (
              <>
                <span className="animate-spin text-sm">⏳</span>
                <span>{t('admin_saving_btn')}</span>
              </>
            ) : saveStatus.type === 'saved' ? (
              <>
                <Check size={16} />
                <span>{t('admin_saved_btn')}</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>{t('admin_save_changes_btn')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Status banner */}
      {saveStatus.message && (
        <div
          className={`p-4 rounded-2xl border text-sm flex items-center justify-between ${
            saveStatus.type === 'saved'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : saveStatus.type === 'error'
              ? 'bg-red-500/10 border-red-500/30 text-red-300'
              : 'bg-primary/10 border-primary/30 text-primary'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {saveStatus.type === 'saved' ? (
              <CheckCircle2 size={18} className="text-emerald-400" />
            ) : (
              <Sparkles size={18} />
            )}
            <span>{saveStatus.message}</span>
          </div>
        </div>
      )}

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => handleTabChange('hero')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <ImageIcon size={18} className={activeTab === 'hero' ? 'text-primary' : 'text-slate-500'} />
          <span>{t('admin_tab_hero')}</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('branding')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'branding'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Type size={18} className={activeTab === 'branding' ? 'text-primary' : 'text-slate-500'} />
          <span>{t('admin_tab_branding')}</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('marquee')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'marquee'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Sparkles size={18} className={activeTab === 'marquee' ? 'text-primary' : 'text-slate-500'} />
          <span>{t('admin_tab_marquee')}</span>
          <span className="ml-1 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30">
            {marqueeForm.items.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('theme')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'theme'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Sliders size={18} className={activeTab === 'theme' ? 'text-primary' : 'text-slate-500'} />
          <span>{t('admin_tab_theme')}</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('about')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'about'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Cpu size={18} className={activeTab === 'about' ? 'text-primary' : 'text-slate-500'} />
          <span>{t('admin_tab_about')}</span>
          <span className="ml-1 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30">
            {aboutForm.skills.length + aboutForm.metrics.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('social')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'social'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Share2 size={18} className={activeTab === 'social' ? 'text-primary' : 'text-slate-500'} />
          <span>Baraha Bulshada (Social)</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: HERO SECTION & PICTURE                                  */}
      {/* ============================================================== */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Settings */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Hero Picture Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <ImageIcon size={18} className="text-primary" />
                  <span>Sawirka Hero-ga (Hero Portrait Image)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Aspect Ratio 4:5</span>
              </div>

              <ImageUploader
                label="Sawirka Hero Section-ka (Upload ama URL)"
                value={heroForm.imageUrl}
                onChange={(newUrl) => setHeroForm({ ...heroForm, imageUrl: newUrl })}
                placeholder="https://... ama dooro faylka sawirkaaga"
                helperText="Soo upload garee sawirkaaga (JPG, PNG, WEBP) ama geli link toos ah. Waxaa si toos ah loogu kaydinayaa website-ka."
                bucketName="portfolio-media"
                folderPath="hero"
                recommendedSize="Cabirka ugu wanaagsan: 800x1000px (4:5 ratio)"
              />



              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Alt Text (Sharraxaadda Sawirka)
                </label>
                <input
                  type="text"
                  value={heroForm.imageAlt}
                  onChange={(e) => setHeroForm({ ...heroForm, imageAlt: e.target.value })}
                  placeholder="Mohamed Alhady - Creative Strategist"
                  className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-primary"
                />
              </div>

              {/* QAABKA & XAYNDAABKA SAWIRKA (Frameless / Transparent Mode) */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Qaabka & Xayndaabka Sawirka (Frameless Mode)
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-mono font-semibold">
                    Transparent Support
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Haddii aad sawirka usoo galiso adigoo aan gadaal waxba ku lahayn (Transparent PNG / Cutout), dooro qaabka Transparent si meesha looga saaro dhammaan xuduudaha ama sanduuqyada.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHeroForm({ ...heroForm, isTransparentImage: true, imageFit: 'contain' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      heroForm.isTransparentImage !== false
                        ? 'bg-primary/10 border-primary text-white ring-1 ring-primary/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-primary">✨ Transparent Cutout (Aan Xayndaab Lahayn)</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Kasaar dhammaan frames-ka, sanduuqyada iyo xayndaabka si sawirka PNG ee transparent ah uu si toos ah oo dabiici ah ugu muuqdo.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHeroForm({ ...heroForm, isTransparentImage: false, imageFit: 'cover' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      heroForm.isTransparentImage === false
                        ? 'bg-primary/10 border-primary text-white ring-1 ring-primary/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">🖼️ Card Photo (Sanduuq Leh)</p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Sawir caadi ah oo buuxiya sanduuqa leydi ah oo leh geeso wareegsan.
                    </p>
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/80 gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="heroWidgets"
                      checked={heroForm.showWidgets !== false}
                      onChange={(e) => setHeroForm({ ...heroForm, showWidgets: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="heroWidgets" className="text-xs text-slate-300 cursor-pointer">
                      Muuji Badhanka Contact Widget (Scan to Connect)
                    </label>
                  </div>
                </div>
              </div>

              {/* XAJMIGA SAWIRKA & AUTO-SCALE (1:1 Square Auto-Fit) */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-secondary/20 text-secondary">
                      <Sparkles size={14} />
                    </span>
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      Auto-Scale & Cabbirka Sawirka (1:1 Ratio)
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-semibold">
                    1:1 Auto-Scale
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Marka aad sawir 1:1 (labajibbaar) soo geliso, nidaamku wuxuu si toos ah u yeelayaa cabbirka 1:1 auto-scale si sawirku uusan u dhimin, uusan u dhuubanin, ama boos maran uga harin.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHeroForm({ ...heroForm, aspectRatio: 'auto', autoScale: true })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      heroForm.aspectRatio === 'auto' || !heroForm.aspectRatio
                        ? 'bg-primary/10 border-primary text-white ring-1 ring-primary/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-primary">⚡ Auto Scale (Toos ah)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Wuxuu si toos ah u cabbirayaa sawirka 1:1 ama 4:5 sidiisa dabiiciga ah.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHeroForm({ ...heroForm, aspectRatio: '1:1', autoScale: true })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      heroForm.aspectRatio === '1:1'
                        ? 'bg-primary/10 border-primary text-white ring-1 ring-primary/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">⬛ 1:1 Labajibbaar (Square)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Ku qasbaya cabbirka 1:1 (Square), aad ugu habboon sawirrada labajibbaaran.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHeroForm({ ...heroForm, aspectRatio: '4:5', autoScale: false })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      heroForm.aspectRatio === '4:5'
                        ? 'bg-primary/10 border-primary text-white ring-1 ring-primary/40'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">📱 4:5 Taagnaa (Portrait)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Cabbirka caadiga ah ee studio-ga ee taagan.
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Hero Headings & Bio */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800/80 pb-3">
                <Type size={18} className="text-primary" />
                <span>Qoraallada & Cinwaannada (Titles & Bio)</span>
              </div>

              {/* Status badge */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">Status Badge (Calaamadda Hadda Diyaar ah)</p>
                  <p className="text-[11px] text-slate-400">Muuji badhanka cagaaran ee libiqsanaya</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={heroForm.badgeText}
                    onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                    className="w-40 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                    placeholder="Available for Hire"
                  />
                  <input
                    type="checkbox"
                    checked={heroForm.isBadgeVisible !== false}
                    onChange={(e) => setHeroForm({ ...heroForm, isBadgeVisible: e.target.checked })}
                    className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Cinwaanka Khadka 1-aad
                  </label>
                  <input
                    type="text"
                    value={heroForm.titleLine1}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                    placeholder="Building the"
                    className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Cinwaanka Khadka 2-aad (Gradient)
                  </label>
                  <input
                    type="text"
                    value={heroForm.titleLine2}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                    placeholder="Digital Future"
                    className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-primary font-bold text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Bio / Qoraalka Hor-dhaca (Introduction)
                </label>
                <textarea
                  rows={3}
                  value={heroForm.bio}
                  onChange={(e) => setHeroForm({ ...heroForm, bio: e.target.value })}
                  placeholder="I'm Mohamed Alhady, a Creative Strategist & Developer..."
                  className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-sm leading-relaxed focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Vertical Accent Badge (Qoraalka dhinaca sawirka)
                </label>
                <input
                  type="text"
                  value={heroForm.verticalBadgeText}
                  onChange={(e) => setHeroForm({ ...heroForm, verticalBadgeText: e.target.value })}
                  placeholder="LET'S BEGIN"
                  className="w-full px-4 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            {/* 3. Action Buttons & Tech Tags */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800/80 pb-3">
                <Sliders size={18} className="text-primary" />
                <span>Badhamada (CTAs) & Xirfadaha (Tech Stack)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <p className="text-xs font-bold text-white">Badhanka 1-aad (Primary CTA)</p>
                  <input
                    type="text"
                    value={heroForm.primaryCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                    placeholder="View Work"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                  <input
                    type="text"
                    value={heroForm.primaryCtaLink}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                    placeholder="/projects"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-xs font-mono"
                  />
                </div>

                <div className="space-y-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <p className="text-xs font-bold text-white">Badhanka 2-aad (Secondary CTA)</p>
                  <input
                    type="text"
                    value={heroForm.secondaryCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                    placeholder="Contact Me"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                  />
                  <input
                    type="text"
                    value={heroForm.secondaryCtaLink}
                    onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                    placeholder="/contact"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Tech stack tags editor */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Featured Tech Stack Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {heroForm.featuredTech.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechTag(tag)}
                        className="text-slate-400 hover:text-red-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTechTag}
                    onChange={(e) => setNewTechTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechTag())}
                    placeholder="Ku dar xirfad cusub (e.g. Python, Docker, Flutter)..."
                    className="flex-1 px-3.5 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechTag}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700"
                  >
                    + Ku Dar
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Hero QR Code Widget & Link (Scan to Connect) */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                  <QrCode size={18} className="text-primary" />
                  <span>4. QR Code-ka Hero-ga & Link-giisa (Scan to Connect)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-mono font-semibold">
                  Scannable Link
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Halkan ka maamul link-ga uu furayo badhanka QR Code-ka ee ku yaalla geeska sawirka hero-ga. Qofka bogga soo booqda wuxuu taleefankiisa ku sawiran karaa QR-kan ama toos ayuu u riixi karaa.
              </p>

              {/* Show / Hide QR Widget Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-white">Muuji Badhanka QR Code-ka ee Hero-ga</p>
                  <p className="text-[11px] text-slate-400">Ku muuji badhanka Scan to Connect sawirka hero-ga hoostiisa</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heroForm.showQrCodeWidget !== false}
                    onChange={(e) => setHeroForm({ ...heroForm, showQrCodeWidget: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Destination Link Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Link-ga QR Code-ku Furaayo (Destination Link / URL)
                  </label>
                  {heroForm.qrCodeLink && (
                    <a
                      href={heroForm.qrCodeLink}
                      target={heroForm.qrCodeLink.startsWith('http') ? '_blank' : '_self'}
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                    >
                      <span>Tijaabi Link-ga</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <LinkIcon size={15} />
                  </div>
                  <input
                    type="text"
                    value={heroForm.qrCodeLink ?? ''}
                    onChange={(e) => setHeroForm({ ...heroForm, qrCodeLink: e.target.value })}
                    placeholder="https://wa.link/cs6dy4 ama /contact ama https://..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1.5">
                    Ku dar degdeg ah (Quick Presets):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, qrCodeLink: settings.whatsappNumber || 'https://wa.link/cs6dy4' })}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      💬 WhatsApp Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, qrCodeLink: '/contact' })}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-sky-400 hover:text-sky-300 font-medium transition-colors"
                    >
                      ✉️ Bogga Contact-ka (/contact)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, qrCodeLink: '/projects' })}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                    >
                      📁 Mashaariicda (/projects)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, qrCodeLink: window.location.origin })}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-primary hover:text-yellow-300 font-medium transition-colors"
                    >
                      🌐 Bogga Hore (Home URL)
                    </button>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle labels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Cinwaanka Badhanka (Title Text)
                  </label>
                  <input
                    type="text"
                    value={heroForm.qrCodeTitle ?? ''}
                    onChange={(e) => setHeroForm({ ...heroForm, qrCodeTitle: e.target.value })}
                    placeholder="Scan to Connect"
                    className="w-full px-3.5 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Tusaale: Scan to Connect, WhatsApp, iwm.</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Qoraalka Sare (Subtitle / Badge)
                  </label>
                  <input
                    type="text"
                    value={heroForm.qrCodeSubtitle ?? ''}
                    onChange={(e) => setHeroForm({ ...heroForm, qrCodeSubtitle: e.target.value })}
                    placeholder="Quick Connect"
                    className="w-full px-3.5 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Tusaale: Contact, Quick Scan, WhatsApp</span>
                </div>
              </div>

              {/* Live QR Code Preview & Test in Admin */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-32 h-32 p-2 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                      heroForm.qrCodeLink && heroForm.qrCodeLink.startsWith('http')
                        ? heroForm.qrCodeLink
                        : typeof window !== 'undefined'
                        ? `${window.location.origin}${heroForm.qrCodeLink?.startsWith('/') ? heroForm.qrCodeLink : `/${heroForm.qrCodeLink || 'contact'}`}`
                        : 'https://wa.link/cs6dy4'
                    )}&bgcolor=ffffff&color=020617&margin=6&format=svg`}
                    alt="Admin QR Code Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    <Smartphone size={12} />
                    <span>Tijaabi Hadda (Live Scan)</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">
                    Kamaradda taleefankaaga ku fiiq QR Code-kan
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    QR-kan wuxuu si toos ah u furayaa: <span className="text-primary font-mono font-semibold break-all">{heroForm.qrCodeLink || 'https://wa.link/cs6dy4'}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Eye size={16} className="text-primary" />
                  <span>Muuqaalka Tooska ah (Live Preview)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>

              {/* Mini Preview Box */}
              <div className="p-5 rounded-2xl bg-dark border border-white/10 space-y-4 overflow-hidden relative">
                {heroForm.isBadgeVisible !== false && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span>{heroForm.badgeText || 'Available for Hire'}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {heroForm.titleLine1 || 'Building the'}{' '}
                    <span className="text-primary">{heroForm.titleLine2 || 'Digital Future'}</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                    {heroForm.bio}
                  </p>
                </div>

                <div className="flex gap-2 pt-1">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-dark text-xs font-bold shadow-sm">
                    {heroForm.primaryCtaText || 'View Work'}
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10">
                    {heroForm.secondaryCtaText || 'Contact'}
                  </span>
                </div>

                {/* Portrait preview card with 1:1 Auto Scale */}
                <div className={`relative mx-auto mt-4 max-w-[220px] transition-all ${
                  heroForm.aspectRatio === '1:1'
                    ? 'aspect-square flex items-center justify-center'
                    : 'aspect-[4/5] flex items-end justify-center'
                } ${
                  heroForm.isTransparentImage !== false
                    ? 'bg-transparent border-0 shadow-none'
                    : 'rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black'
                }`}>
                  <img
                    src={heroForm.imageUrl || defaultHeroPortrait}
                    alt="Preview"
                    className={`w-full h-full ${
                      heroForm.isTransparentImage !== false
                        ? heroForm.aspectRatio === '1:1'
                          ? 'object-contain object-center drop-shadow-lg'
                          : 'object-contain object-bottom drop-shadow-lg'
                        : 'object-cover'
                    }`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.dataset.hasFailed) return;
                      target.dataset.hasFailed = 'true';
                      target.src = defaultHeroPortrait;
                    }}
                  />
                  {heroForm.isTransparentImage === false && (
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />
                  )}
                  {heroForm.verticalBadgeText && (
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 py-2 px-1 bg-primary text-black rounded-full font-bold text-[7px] [writing-mode:vertical-lr] flex items-center justify-center gap-1">
                      <span>{heroForm.verticalBadgeText}</span>
                      <span className="w-2 h-2 rounded-full bg-dark flex items-center justify-center shrink-0">
                        <span className="w-0.5 h-0.5 rounded-full bg-white shrink-0" />
                      </span>
                    </div>
                  )}
                  {heroForm.showWidgets !== false && heroForm.showQrCodeWidget !== false && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 rounded-xl bg-slate-950/90 border border-white/10 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <div className="w-4 h-4 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <QrCode size={10} />
                      </div>
                      <span className="text-[8px] font-bold text-white whitespace-nowrap">
                        {heroForm.qrCodeTitle || 'Scan to Connect'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSaveAll}
                className="w-full py-3 rounded-xl bg-primary hover:opacity-90 text-dark font-bold text-xs transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save size={15} />
                <span>Kaydi Hero Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: BRANDING & LOGO                                         */}
      {/* ============================================================== */}
      {activeTab === 'branding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800/80 pb-3">
                <Type size={18} className="text-primary" />
                <span>Magaca Websaytka & Shakhsiyadda (Identity)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Magaca Website-ka / Magacaaga (Owner Name)
                </label>
                <input
                  type="text"
                  value={brandingForm.siteName}
                  onChange={(e) => setBrandingForm({ ...brandingForm, siteName: e.target.value })}
                  placeholder="Mohamed Alhady"
                  className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-primary font-bold"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Magacani wuxuu ka muuqanayaa madaxa websaytka (Navbar), footer-ka, iyo ciwaanka tab-ka browser-ka.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Xirfadda / Tagline
                </label>
                <input
                  type="text"
                  value={brandingForm.tagline}
                  onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                  placeholder="Creative Strategist & Developer"
                  className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Qoraalka Xuquuqda (Copyright Name)
                </label>
                <input
                  type="text"
                  value={brandingForm.copyrightName}
                  onChange={(e) => setBrandingForm({ ...brandingForm, copyrightName: e.target.value })}
                  placeholder="Mohamed Alhady"
                  className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Faahfaahinta Footer-ka (Footer Bio)
                </label>
                <textarea
                  rows={3}
                  value={brandingForm.footerBio}
                  onChange={(e) => setBrandingForm({ ...brandingForm, footerBio: e.target.value })}
                  placeholder="Building high-performance web applications..."
                  className="w-full px-4 py-3 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs leading-relaxed focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Logo Customization Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Layout size={18} className="text-primary" />
                  <span>Habka Logada & Astaanta (Logo Customization)</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono font-medium">
                  Auto-Fit & Responsive
                </span>
              </div>

              {/* Logo Mode Selector - 3 Modes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Dooro Nooca Logada (Logo Format):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Option 1: Full Logo */}
                  <button
                    type="button"
                    onClick={() =>
                      setBrandingForm({
                        ...brandingForm,
                        logoType: 'full',
                        showSiteName: false,
                      })
                    }
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      brandingForm.logoType === 'full'
                        ? 'bg-primary/15 border-primary text-white shadow-lg shadow-primary/10'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles size={13} className="text-primary" />
                        Full Logo
                      </span>
                      {brandingForm.logoType === 'full' && (
                        <Check size={14} className="text-primary" />
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-slate-300 leading-tight">
                      Astaan + Magac (Icon & Name)
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Magaca qoraalka wuu ka baxayaa Header & Footer
                    </p>
                  </button>

                  {/* Option 2: Logo Icon Only */}
                  <button
                    type="button"
                    onClick={() =>
                      setBrandingForm({
                        ...brandingForm,
                        logoType: 'image',
                        showSiteName: true,
                      })
                    }
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      brandingForm.logoType === 'image'
                        ? 'bg-primary/15 border-primary text-white shadow-lg shadow-primary/10'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">Logo Icon Kaliya</span>
                      {brandingForm.logoType === 'image' && (
                        <Check size={14} className="text-primary" />
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-slate-300 leading-tight">
                      Astaan yar oo kaliya (Icon)
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Magaca qoraalka ah ayaa barbar soconaya
                    </p>
                  </button>

                  {/* Option 3: Text / Initials */}
                  <button
                    type="button"
                    onClick={() =>
                      setBrandingForm({
                        ...brandingForm,
                        logoType: 'text',
                        showSiteName: true,
                      })
                    }
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      brandingForm.logoType === 'text'
                        ? 'bg-primary/15 border-primary text-white shadow-lg shadow-primary/10'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white">Qoraal / Xuruuf</span>
                      {brandingForm.logoType === 'text' && (
                        <Check size={14} className="text-primary" />
                      )}
                    </div>
                    <p className="text-[11px] font-medium text-slate-300 leading-tight">
                      Initials (e.g. M&A)
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Xuruuf gaagaaban oo sanduuq ku jira
                    </p>
                  </button>
                </div>
              </div>

              {/* Informational callout for Full Logo */}
              {brandingForm.logoType === 'full' && (
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                  <Sparkles size={16} className="text-primary mt-0.5 shrink-0" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Full Logo Mode:</span> Magaca qoraalka ah ee
                    websaytka (<span className="text-primary font-mono">{brandingForm.siteName || 'Magaca'}</span>)
                    si toos ah ayaa looga qariyay Header-ka iyo Footer-ka sababtoo ah sawirka ayaa horay ugu
                    jira magaca. Logadu waxay si toos ah u samaynaysaa <span className="text-white font-semibold">Auto-Fit</span>.
                  </div>
                </div>
              )}

              {/* Detail fields based on logoType */}
              {brandingForm.logoType === 'text' ? (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Xuruufta Logada (Initials)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={brandingForm.logoText}
                    onChange={(e) => setBrandingForm({ ...brandingForm, logoText: e.target.value })}
                    placeholder="M&A"
                    className="w-36 px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-base font-bold tracking-widest text-center focus:outline-none focus:border-primary"
                  />
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Xuruuftan waxay ku dhex muuqan doonaan sanduuqa naqshadaysan ee Header-ka iyo Footer-ka.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  {/* Image uploader */}
                  <ImageUploader
                    label={
                      brandingForm.logoType === 'full'
                        ? 'Sawirka Full Logo-ga (Upload PNG/SVG ama URL)'
                        : 'Sawirka Logo Icon-ka (Upload PNG/SVG ama URL)'
                    }
                    value={brandingForm.logoImageUrl || ''}
                    onChange={(newUrl) => setBrandingForm({ ...brandingForm, logoImageUrl: newUrl })}
                    placeholder="https://.../logo.png"
                    helperText={
                      brandingForm.logoType === 'full'
                        ? 'Soo upload-garee Full Logo-gaaga (Astaan + Magac oo isku jira). PNG transparent ama SVG vector ayaa ugu wanaagsan.'
                        : 'Soo upload-garee Icon-ka logada (PNG transparent ama SVG). Waxay u ekaanaysaa astaan yar oo magacu barbar yaalo.'
                    }
                    bucketName="portfolio-media"
                    folderPath="logos"
                    recommendedSize={
                      brandingForm.logoType === 'full'
                        ? 'Cabirka lagu talinayo: 300x80px / 400x120px (Landscape) ama SVG'
                        : 'Cabirka lagu talinayo: 200x200px (Square 1:1) ama SVG'
                    }
                  />

                  {/* Orientation & Aspect Ratio support (Vertical, Landscape, Square, Auto-Fit) */}
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Nooca & Qaabka Logada (Orientation & Auto-Fit):
                      </label>
                      <span className="text-[11px] font-mono text-primary font-medium">
                        {brandingForm.logoOrientation || 'auto'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {/* Auto Fit */}
                      <button
                        type="button"
                        onClick={() => setBrandingForm({ ...brandingForm, logoOrientation: 'auto' })}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          (brandingForm.logoOrientation || 'auto') === 'auto'
                            ? 'bg-primary/20 border-primary text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs">⚡ Auto-Fit</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Isku habeyn toos ah</p>
                      </button>

                      {/* Landscape / Jiif */}
                      <button
                        type="button"
                        onClick={() => setBrandingForm({ ...brandingForm, logoOrientation: 'landscape' })}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          brandingForm.logoOrientation === 'landscape'
                            ? 'bg-primary/20 border-primary text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs">↔ Jiif (Landscape)</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Ballaaran / Horizontal</p>
                      </button>

                      {/* Square / Labajibbaar */}
                      <button
                        type="button"
                        onClick={() => setBrandingForm({ ...brandingForm, logoOrientation: 'square' })}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          brandingForm.logoOrientation === 'square'
                            ? 'bg-primary/20 border-primary text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs">⊞ Square (1:1)</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Labajibbaar siman</p>
                      </button>

                      {/* Vertical / Taagan */}
                      <button
                        type="button"
                        onClick={() => setBrandingForm({ ...brandingForm, logoOrientation: 'vertical' })}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          brandingForm.logoOrientation === 'vertical'
                            ? 'bg-primary/20 border-primary text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs">↕ Taagan (Vertical)</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Stacked / Dheer</p>
                      </button>
                    </div>
                  </div>

                  {/* Name Visibility Toggle */}
                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Muuji Magaca Qoraalka ah (Site Name in Header & Footer)
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {brandingForm.logoType === 'full'
                          ? 'Dami haddii aad doonayso in kaliya Full Logo-gu muuqdo (lagula taliyay)'
                          : 'Daar si magacu u barbar yaalo icon-ka logada'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
                      <input
                        type="checkbox"
                        checked={
                          brandingForm.logoType === 'full'
                            ? brandingForm.showSiteName === true
                            : brandingForm.showSiteName !== false
                        }
                        onChange={(e) =>
                          setBrandingForm({
                            ...brandingForm,
                            showSiteName: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Website Icon / Favicon Upload Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Globe size={18} className="text-primary" />
                  <span>Astaanta Website-ka (Website Icon / Favicon)</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono font-medium">
                  Browser Tab & Web App
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <p>
                  Soo upload-garee <strong className="text-white">astaanta sawirka ah (Website Icon)</strong> ee website-kaaga. Sawirkani wuxuu si toos ah uga dhex muuqanayaa <span className="text-primary font-semibold">Tab-ka Browser-ka (Favicon)</span>, bookmarks-ka, natiijooyinka raadinta, iyo astaanta app-ka marka qofku uu website-ka ku daro Home Screen-ka mobilkiisa.
                </p>
              </div>

              {/* Image Uploader for Website Icon */}
              <ImageUploader
                label="Sawirka Website Icon-ka (Upload PNG, SVG, ama ICO)"
                value={brandingForm.faviconUrl || brandingForm.siteIconUrl || ''}
                onChange={(newUrl) =>
                  setBrandingForm({
                    ...brandingForm,
                    faviconUrl: newUrl,
                    siteIconUrl: newUrl,
                  })
                }
                placeholder="https://.../favicon.png"
                helperText="Soo upload-garee sawir labajibbaaran (Square 1:1). PNG transparent ama SVG vector ayaa ugu habboon."
                bucketName="portfolio-media"
                folderPath="favicons"
                recommendedSize="Cabirka lagu talinayo: 32x32px, 64x64px, 128x128px, ama 512x512px (Square 1:1)"
              />

              {/* Quick Actions for Favicon */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                {brandingForm.logoImageUrl && !brandingForm.faviconUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setBrandingForm({
                        ...brandingForm,
                        faviconUrl: brandingForm.logoImageUrl,
                        siteIconUrl: brandingForm.logoImageUrl,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Sparkles size={13} />
                    <span>⚡ Isticmaal Sawirka Logada oo Website Icon ka dhig</span>
                  </button>
                )}

                {(brandingForm.faviconUrl || brandingForm.siteIconUrl) && (
                  <button
                    type="button"
                    onClick={() =>
                      setBrandingForm({
                        ...brandingForm,
                        faviconUrl: '',
                        siteIconUrl: '',
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs transition-all cursor-pointer ml-auto"
                  >
                    <Trash2 size={13} />
                    <span>Tirtir Website Icon-ka</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Branding Preview */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Eye size={16} className="text-primary" />
                  <span>Sida ay Header, Footer & Tab ugu muuqdaan</span>
                </div>
              </div>

              {/* Browser Tab & Favicon Mockup Preview */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Globe size={11} className="text-primary" />
                    Browser Tab & Favicon Preview
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                    Live
                  </span>
                </div>

                {/* Simulated Browser Window Header */}
                <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-xl">
                  {/* Browser Tab Strip */}
                  <div className="bg-slate-950 px-3 pt-2 flex items-center gap-2 border-b border-slate-800">
                    <div className="flex items-center gap-1 mr-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    {/* Active Browser Tab */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-850 rounded-t-lg border-t border-x border-slate-700 text-white max-w-[230px] truncate shadow-sm">
                      {brandingForm.faviconUrl || brandingForm.siteIconUrl ? (
                        <img
                          src={brandingForm.faviconUrl || brandingForm.siteIconUrl}
                          alt="Website Icon"
                          className="w-4 h-4 rounded-sm object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : brandingForm.logoImageUrl ? (
                        <img
                          src={brandingForm.logoImageUrl}
                          alt="Logo Icon"
                          className="w-4 h-4 rounded-sm object-contain shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-4 h-4 rounded-sm bg-primary/20 text-primary flex items-center justify-center font-bold text-[9px] shrink-0">
                          {brandingForm.logoText?.slice(0, 2) || 'MA'}
                        </div>
                      )}
                      <span className="text-[11px] font-medium text-slate-200 truncate">
                        {brandingForm.siteName || 'Mohamed Alhady'} | {brandingForm.tagline?.slice(0, 16) || 'Portfolio'}
                      </span>
                      <span className="text-[10px] text-slate-500 hover:text-white shrink-0 ml-auto">✕</span>
                    </div>
                  </div>

                  {/* Browser URL bar */}
                  <div className="px-3 py-1.5 bg-slate-900 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-slate-400">https://</span>
                    <span className="text-white font-semibold truncate">
                      {(brandingForm.siteName || 'mohamed').toLowerCase().replace(/\s+/g, '')}.dev
                    </span>
                  </div>
                </div>

                {/* Mobile Web App Shortcut Preview */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-850 to-slate-800 border border-slate-700/80 p-1.5 flex items-center justify-center shadow-lg shadow-black/40 shrink-0">
                    {brandingForm.faviconUrl || brandingForm.siteIconUrl ? (
                      <img
                        src={brandingForm.faviconUrl || brandingForm.siteIconUrl}
                        alt="App Icon"
                        className="w-full h-full rounded-xl object-contain"
                      />
                    ) : brandingForm.logoImageUrl ? (
                      <img
                        src={brandingForm.logoImageUrl}
                        alt="App Icon"
                        className="w-full h-full rounded-xl object-contain"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {brandingForm.logoText?.slice(0, 2) || 'MA'}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {brandingForm.siteName || 'Mohamed Alhady'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Mobile App / Bookmark Icon
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini Navbar Preview */}
              <div className="p-4 rounded-2xl bg-dark/95 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    Header Navbar Preview
                  </span>
                  <span className="text-[10px] text-primary font-mono uppercase">
                    {brandingForm.logoType === 'full'
                      ? 'Full Logo'
                      : brandingForm.showSiteName === false
                      ? 'No Name Text'
                      : 'Icon + Name'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {brandingForm.logoType === 'full' && brandingForm.logoImageUrl ? (
                      <div className="flex items-center">
                        <img
                          src={brandingForm.logoImageUrl}
                          alt="Full Logo"
                          className={
                            brandingForm.logoOrientation === 'landscape'
                              ? 'h-8 sm:h-9 w-auto max-w-[190px] object-contain'
                              : brandingForm.logoOrientation === 'square'
                              ? 'h-9 w-9 object-contain'
                              : brandingForm.logoOrientation === 'vertical'
                              ? 'h-10 w-auto max-w-[100px] object-contain'
                              : 'h-8 sm:h-9 w-auto max-w-[190px] object-contain'
                          }
                        />
                      </div>
                    ) : brandingForm.logoType === 'image' && brandingForm.logoImageUrl ? (
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary/10 to-secondary/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-md p-1">
                        <img
                          src={brandingForm.logoImageUrl}
                          alt="Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-md shadow-primary/20 overflow-hidden shrink-0">
                        <span>{brandingForm.logoText || 'M&A'}</span>
                      </div>
                    )}

                    {/* Show site name only if NOT full logo, or if explicitly enabled */}
                    {(brandingForm.logoType === 'full'
                      ? brandingForm.showSiteName === true
                      : brandingForm.showSiteName !== false) && (
                      <span className="text-sm font-bold text-white">
                        {brandingForm.siteName || 'Mohamed Alhady'}
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                    Hire Me
                  </span>
                </div>
              </div>

              {/* Mini Footer Preview */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Footer Preview
                </span>
                <div className="flex items-center gap-2.5">
                  {brandingForm.logoType === 'full' && brandingForm.logoImageUrl ? (
                    <div className="flex items-center">
                      <img
                        src={brandingForm.logoImageUrl}
                        alt="Full Logo"
                        className={
                          brandingForm.logoOrientation === 'landscape'
                            ? 'h-8 sm:h-9 w-auto max-w-[190px] object-contain'
                            : brandingForm.logoOrientation === 'square'
                            ? 'h-9 w-9 object-contain'
                            : brandingForm.logoOrientation === 'vertical'
                            ? 'h-10 w-auto max-w-[100px] object-contain'
                            : 'h-8 sm:h-9 w-auto max-w-[190px] object-contain'
                        }
                      />
                    </div>
                  ) : brandingForm.logoType === 'image' && brandingForm.logoImageUrl ? (
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary/10 to-secondary/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-md p-1">
                      <img
                        src={brandingForm.logoImageUrl}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-md shadow-primary/20 overflow-hidden shrink-0">
                      <span>{brandingForm.logoText || 'M&A'}</span>
                    </div>
                  )}

                  {(brandingForm.logoType === 'full'
                    ? brandingForm.showSiteName === true
                    : brandingForm.showSiteName !== false) && (
                    <span className="text-sm font-bold text-white">
                      {brandingForm.siteName || 'Mohamed Alhady'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {brandingForm.footerBio || 'Building high-performance web applications...'}
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                  © {new Date().getFullYear()} {brandingForm.copyrightName || brandingForm.siteName}. All rights reserved.
                </div>
              </div>

              <button
                onClick={handleSaveAll}
                className="w-full py-3 rounded-xl bg-primary hover:opacity-90 text-dark font-bold text-xs transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save size={15} />
                <span>Kaydi Branding Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: ANIMATED MARQUEE & BRAND PARTNER LOGOS                  */}
      {/* ============================================================== */}
      {activeTab === 'marquee' && (
        <div className="space-y-8">
          {/* Top Marquee Control Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Sparkles size={16} />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                    Homepage Animated Loop
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {t('admin_marquee_title')}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {t('admin_marquee_desc')}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleResetDefaultLogos}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Ku celi 6-da Tech Stack ee asalka ah"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Ku celi Asalka</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddLogo}
                  className="px-4 py-2.5 rounded-xl bg-primary hover:opacity-90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Ku dar Logo Cusub</span>
                </button>
              </div>
            </div>

            {/* Quick Marquee Settings Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
              {/* Toggle Enable/Disable */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Muuji Marquee-ga</p>
                  <p className="text-[10px] text-slate-400">Daar/dami qaybtan homepage-ka</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                  <input
                    type="checkbox"
                    checked={marqueeForm.isEnabled !== false}
                    onChange={(e) =>
                      setMarqueeForm({ ...marqueeForm, isEnabled: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Speed Control */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-white">Xawaaraha Wareegga</p>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    {marqueeForm.speed || 30}s
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1">
                  {[
                    { label: 'Dheereeya', sec: 20 },
                    { label: 'Dhexdhexaad', sec: 30 },
                    { label: 'Deggan', sec: 45 },
                  ].map((speed) => (
                    <button
                      key={speed.sec}
                      type="button"
                      onClick={() => setMarqueeForm({ ...marqueeForm, speed: speed.sec })}
                      className={`py-1 rounded-lg text-[10px] font-medium border text-center transition-all ${
                        (marqueeForm.speed || 30) === speed.sec
                          ? 'bg-primary/20 border-primary text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {speed.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pause on Hover Toggle */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Jooji Marka la Dul Istaago</p>
                  <p className="text-[10px] text-slate-400">Pause on mouse hover</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                  <input
                    type="checkbox"
                    checked={marqueeForm.pauseOnHover !== false}
                    onChange={(e) =>
                      setMarqueeForm({ ...marqueeForm, pauseOnHover: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Monochrome Style Toggle */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Monochrome Filter</p>
                  <p className="text-[10px] text-slate-400">Midab noqda marka la dul maro</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-2">
                  <input
                    type="checkbox"
                    checked={marqueeForm.monochromeFilter !== false}
                    onChange={(e) =>
                      setMarqueeForm({ ...marqueeForm, monochromeFilter: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Interactive Live Marquee Preview Box */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Eye size={16} className="text-primary" />
                <span>Muuqaalka Tooska ah ee Marquee-ga (Live Preview)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {marqueeForm.items.filter((i) => i.isActive).length} Logos Active
              </span>
            </div>

            <div className="py-8 px-4 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative group/preview">
              {/* Vignette gradients */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

              <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                  className="flex items-center gap-12 px-6 min-w-full"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{
                    repeat: Infinity,
                    ease: 'linear',
                    duration: marqueeForm.speed || 30,
                  }}
                >
                  {[...Array(2)].map((_, rep) => (
                    <React.Fragment key={rep}>
                      {marqueeForm.items
                        .filter((i) => i.isActive)
                        .map((logo) => (
                          <div
                            key={`${rep}-${logo.id}`}
                            className="flex items-center gap-3 text-slate-400 hover:text-white font-bold text-base uppercase tracking-widest transition-all shrink-0 select-none group/logo"
                          >
                            {logo.logoUrl ? (
                              <div className="h-7 flex items-center justify-center shrink-0">
                                <img
                                  src={logo.logoUrl}
                                  alt={logo.name}
                                  className={`h-6 w-auto max-w-[120px] object-contain transition-all duration-300 ${
                                    marqueeForm.monochromeFilter !== false
                                      ? 'filter grayscale brightness-90 group-hover/logo:grayscale-0 group-hover/logo:brightness-100 opacity-80 group-hover/logo:opacity-100'
                                      : 'opacity-90 group-hover/logo:opacity-100'
                                  }`}
                                />
                              </div>
                            ) : (
                              <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <Code2 size={18} />
                              </div>
                            )}
                            {logo.displayMode !== 'logo-only' && (
                              <span className="text-xs">{logo.name}</span>
                            )}
                          </div>
                        ))}
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* LOGO ADD BOARD / QUICK UPLOADER                                */}
          {/* ============================================================== */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Upload size={16} />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Logo Add Board
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Ku dar / Upload-garee Logo Cusub
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Soo upload-garee sawir logo ah (PNG transparent ama SVG vector) ama qor magaca shirkadda/tech-ka.
                </p>
              </div>

              {/* Preset Quick Adds */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-mono text-slate-400 mr-1">Presets:</span>
                {[
                  { name: 'Google', icon: 'zap' },
                  { name: 'Microsoft', icon: 'layout' },
                  { name: 'Figma', icon: 'palette' },
                  { name: 'GitHub', icon: 'code' },
                  { name: 'Supabase', icon: 'server' },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setQuickLogoName(preset.name);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 text-[10px] font-medium transition-all cursor-pointer"
                  >
                    +{preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Upload Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Image Uploader widget (Left) */}
              <div className="lg:col-span-7">
                <ImageUploader
                  label="Sawirka Logada (Upload PNG, SVG, WEBP ama JPG)"
                  value={quickLogoUrl}
                  onChange={(url) => setQuickLogoUrl(url)}
                  placeholder="https://.../logo.png"
                  helperText="Sawirka wuxuu toos ugu wareegayaa homepage-ka. PNG transparent ayaa ugu qurux badan."
                  bucketName="portfolio-media"
                  folderPath="marquee-logos"
                  recommendedSize="Cabirka: 160x50px, 200x80px, ama Vector SVG"
                />
              </div>

              {/* Logo Details & Submit (Right) */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Magaca Logada / Shirkadda *
                  </label>
                  <input
                    type="text"
                    value={quickLogoName}
                    onChange={(e) => setQuickLogoName(e.target.value)}
                    placeholder="e.g. Google, Vercel, Stripe, AWS..."
                    className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Habka Muujinta (Display Mode):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'both', label: 'Sawir & Qoraal' },
                      { id: 'logo-only', label: 'Sawir Kaliya' },
                      { id: 'text-only', label: 'Qoraal Kaliya' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setQuickDisplayMode(mode.id as any)}
                        className={`py-2 px-1 text-center rounded-xl text-[11px] font-medium border transition-all cursor-pointer ${
                          quickDisplayMode === mode.id
                            ? 'bg-primary/20 border-primary text-white font-bold'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Website Link (Ikhtiyaari):
                  </label>
                  <input
                    type="text"
                    value={quickWebsiteUrl}
                    onChange={(e) => setQuickWebsiteUrl(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full px-3.5 py-2 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleQuickAddLogo}
                  disabled={!quickLogoName.trim() && !quickLogoUrl}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-primary hover:opacity-95 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Ku dar Liiska Logooyinka (Add to Marquee)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Logo Cards Management Grid */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <LayoutGrid size={18} className="text-primary" />
                  <span>Liiska Logooyinka ({marqueeForm.items.length})</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Guji "Wax ka beddel" si aad sawir logo ah ugu upload-garayso ama "Ku dar Logo Cusub".
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddLogo}
                className="px-4 py-2 rounded-xl bg-primary hover:opacity-90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus size={15} />
                <span>+ Ku dar Logo</span>
              </button>
            </div>

            {/* Grid of Logos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {marqueeForm.items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    item.isActive
                      ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 shadow-md'
                      : 'bg-slate-950/40 border-slate-850 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 overflow-hidden shrink-0 shadow-inner">
                      {item.logoUrl ? (
                        <img
                          src={item.logoUrl}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="text-primary font-bold text-xs flex flex-col items-center">
                          <Code2 size={20} />
                          <span className="text-[9px] font-mono mt-0.5">Icon</span>
                        </div>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                        {item.isActive ? (
                          <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            Active
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-500">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                        {item.category || 'Tech Stack'}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                        {item.displayMode === 'logo-only'
                          ? 'Sawir Kaliya'
                          : item.displayMode === 'text-only'
                          ? 'Icon & Magac'
                          : 'Sawir & Magac'}
                      </span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                    {/* Order up / down buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveLogo(idx, 'up')}
                        disabled={idx === 0}
                        title="Dhaqaaji xagga hore"
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronUp size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveLogo(idx, 'down')}
                        disabled={idx === marqueeForm.items.length - 1}
                        title="Dhaqaaji xagga dambe"
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronDown size={13} />
                      </button>
                    </div>

                    {/* Toggle, Edit, Delete */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleLogoActive(item.id)}
                        className={`text-[11px] px-2 py-1 rounded-lg border font-medium transition-all cursor-pointer ${
                          item.isActive
                            ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                            : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40 hover:bg-emerald-900/40'
                        }`}
                      >
                        {item.isActive ? 'Dami' : 'Daar'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEditLogo(item)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer"
                        title="Wax ka beddel"
                      >
                        <Edit2 size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteLogo(item.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                        title="Tirtir"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Save Action Button */}
          <div className="pt-4 flex justify-end border-t border-slate-800">
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saveStatus.type === 'saving'}
              className="px-8 py-3 rounded-xl bg-primary hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer flex items-center gap-2"
            >
              <Save size={16} />
              <span>Badbaadi Isbeddelka Marquee-ga</span>
            </button>
          </div>

          {/* MODAL: ADD / EDIT MARQUEE LOGO */}
          {isLogoModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                      <Sparkles size={16} />
                    </span>
                    <h3 className="font-bold text-white text-base">
                      {editingLogoId ? 'Wax ka beddel Logada' : 'Ku dar Logo Cusub'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLogoModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* Image Upload section */}
                  <ImageUploader
                    label="Sawirka Logada (Upload PNG, SVG, WEBP, ama JPG)"
                    value={logoForm.logoUrl || ''}
                    onChange={(newUrl) => setLogoForm({ ...logoForm, logoUrl: newUrl })}
                    placeholder="https://.../logo.svg"
                    helperText="Soo upload-garee sawirka logada (PNG transparent ama SVG vector ayaa ugu fiican). Haddii aadan sawir haysan, qor magaca hoose."
                    bucketName="portfolio-media"
                    folderPath="marquee-logos"
                    recommendedSize="Cabirka lagu talinayo: 150x50px, 200x80px, ama SVG Vector"
                  />

                  {/* Logo Name Input */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Magaca Logada / Shirkadda / Tool-ka *
                    </label>
                    <input
                      type="text"
                      value={logoForm.name}
                      onChange={(e) => setLogoForm({ ...logoForm, name: e.target.value })}
                      placeholder="e.g. React, Google, Vercel, Figma, Supabase"
                      className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-semibold"
                    />
                  </div>

                  {/* Display Mode Options */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Habka Muujinta ee Marquee-ga (Display Mode):
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        {
                          id: 'both',
                          label: 'Sawir & Magac',
                          desc: 'Logo Image + Name',
                        },
                        {
                          id: 'logo-only',
                          label: 'Sawir Kaliya',
                          desc: 'Logo Only (Partners)',
                        },
                        {
                          id: 'text-only',
                          label: 'Icon & Magac',
                          desc: 'Icon + Name text',
                        },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() =>
                            setLogoForm({
                              ...logoForm,
                              displayMode: mode.id as 'both' | 'logo-only' | 'text-only',
                            })
                          }
                          className={`p-3 rounded-xl border text-left transition-all ${
                            logoForm.displayMode === mode.id
                              ? 'bg-primary/20 border-primary text-white font-bold shadow-md shadow-primary/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <p className="text-xs text-white font-bold">{mode.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{mode.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Preset Tech Stack Name Suggestions */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                      Talooyinka degdegga ah (Quick Tech Suggestions):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'React',
                        'Next.js',
                        'TypeScript',
                        'Tailwind CSS',
                        'Node.js',
                        'Python',
                        'Figma',
                        'Docker',
                        'AWS',
                        'Firebase',
                        'Supabase',
                        'Vercel',
                      ].map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => setLogoForm({ ...logoForm, name: tech })}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-mono border border-slate-700 transition-all cursor-pointer"
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category & Website URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Category / Qeybta
                      </label>
                      <input
                        type="text"
                        value={logoForm.category || ''}
                        onChange={(e) => setLogoForm({ ...logoForm, category: e.target.value })}
                        placeholder="e.g. Tech Stack, Brand Partner, Client"
                        className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Website Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={logoForm.websiteUrl || ''}
                        onChange={(e) => setLogoForm({ ...logoForm, websiteUrl: e.target.value })}
                        placeholder="https://react.dev"
                        className="w-full px-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Active Switch */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white">Muuji Logadan</p>
                      <p className="text-[10px] text-slate-400">Logadani way ka dhex muuqan doontaa marquee-ga</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={logoForm.isActive !== false}
                        onChange={(e) => setLogoForm({ ...logoForm, isActive: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsLogoModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Ka noqo
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLogo}
                    disabled={!logoForm.name.trim()}
                    className="px-5 py-2 rounded-xl bg-primary hover:opacity-90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-primary/20 disabled:opacity-50 cursor-pointer"
                  >
                    Badbaadi Logada
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: THEME, BACKGROUND COLOR & ACCENTS                       */}
      {/* ============================================================== */}
      {activeTab === 'theme' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Background Palette Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800/80 pb-3">
                <Layers size={18} className="text-primary" />
                <span>Midabka Asalka (Background Theme Palette)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Deep Emerald */}
                <button
                  type="button"
                  onClick={() => setThemeForm({ ...themeForm, bgPalette: 'emerald' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    themeForm.bgPalette === 'emerald'
                      ? 'bg-[#020f0a] border-primary ring-2 ring-primary/30 text-white'
                      : 'bg-[#020f0a]/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                      <span className="font-bold text-xs text-white">Deep Emerald (Default)</span>
                    </div>
                    {themeForm.bgPalette === 'emerald' && <Check size={14} className="text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Asalka cagaarka qoto dheer leh ee loo doortay portfolio-ga Mohamed.
                  </p>
                </button>

                {/* 2. Cyber Slate */}
                <button
                  type="button"
                  onClick={() => setThemeForm({ ...themeForm, bgPalette: 'slate' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    themeForm.bgPalette === 'slate'
                      ? 'bg-[#0a0f1a] border-primary ring-2 ring-primary/30 text-white'
                      : 'bg-[#0a0f1a]/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#38bdf8]" />
                      <span className="font-bold text-xs text-white">Cyber Slate</span>
                    </div>
                    {themeForm.bgPalette === 'slate' && <Check size={14} className="text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Madoow casri ah oo u dhow slate / charcoal, aad ugu fiican tech apps.
                  </p>
                </button>

                {/* 3. True Obsidian Black */}
                <button
                  type="button"
                  onClick={() => setThemeForm({ ...themeForm, bgPalette: 'obsidian' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    themeForm.bgPalette === 'obsidian'
                      ? 'bg-[#000000] border-primary ring-2 ring-primary/30 text-white'
                      : 'bg-[#000000]/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-white" />
                      <span className="font-bold text-xs text-white">True Obsidian Black</span>
                    </div>
                    {themeForm.bgPalette === 'obsidian' && <Check size={14} className="text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Madow saafi ah (Pure AMOLED Black) oo aad u xarrago badan.
                  </p>
                </button>

                {/* 4. Midnight Navy */}
                <button
                  type="button"
                  onClick={() => setThemeForm({ ...themeForm, bgPalette: 'midnight' })}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    themeForm.bgPalette === 'midnight'
                      ? 'bg-[#030712] border-primary ring-2 ring-primary/30 text-white'
                      : 'bg-[#030712]/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#6366f1]" />
                      <span className="font-bold text-xs text-white">Midnight Navy</span>
                    </div>
                    {themeForm.bgPalette === 'midnight' && <Check size={14} className="text-primary" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Buluug habeenimo ah oo qoto dheer leh, style xirfadeed.
                  </p>
                </button>
              </div>

              {/* Custom background hex option */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Midab Asal Gaar ah (Custom Hex Color)</p>
                    <p className="text-[11px] text-slate-400">Geli midabkaaga aad jeceshahay haddii aadan dooran kuwa kore</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeForm.customBgHex || '#0a0f1a'}
                      onChange={(e) =>
                        setThemeForm({
                          ...themeForm,
                          bgPalette: 'custom',
                          customBgHex: e.target.value,
                        })
                      }
                      className="w-9 h-9 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.customBgHex || ''}
                      onChange={(e) =>
                        setThemeForm({
                          ...themeForm,
                          bgPalette: 'custom',
                          customBgHex: e.target.value,
                        })
                      }
                      placeholder="#0a0f1a"
                      className="w-24 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Accent Color Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Palette size={18} className="text-primary" />
                  <span>Midabka Koowaad (Primary Accent Color)</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-white/20 shadow-sm"
                    style={{ backgroundColor: themeForm.primaryColor }}
                  />
                  <span>{themeForm.primaryColor}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-3">
                  Midabkani wuxuu beddelayaa dhammaan badhamada, gradients-ka, icons-ka, iyo glowing effects-ka websaytka:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ACCENT_COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setThemeForm({ ...themeForm, primaryColor: preset.hex })}
                      className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                        themeForm.primaryColor.toLowerCase() === preset.hex.toLowerCase()
                          ? 'border-white bg-slate-800 text-white shadow-md'
                          : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: preset.hex }}
                      />
                      <span className="text-[11px] font-medium truncate">{preset.name}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                  <span className="text-xs text-slate-300 font-medium">Dooro Midabkale (Custom Hex / Color Picker):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeForm.primaryColor}
                      onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                      className="w-9 h-9 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.primaryColor}
                      onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                      className="w-24 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Accent Color Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Sparkles size={18} className="text-secondary" />
                  <span>Midabka Labaad (Secondary Accent Color)</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-white/20 shadow-sm"
                    style={{ backgroundColor: themeForm.secondaryColor }}
                  />
                  <span>{themeForm.secondaryColor}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SECONDARY_COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => setThemeForm({ ...themeForm, secondaryColor: preset.hex })}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                      themeForm.secondaryColor.toLowerCase() === preset.hex.toLowerCase()
                        ? 'border-white bg-slate-800 text-white shadow-md'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: preset.hex }}
                    />
                    <span className="text-[11px] font-medium truncate">{preset.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                <span className="text-xs text-slate-300 font-medium">Dooro Midabka Labaad (Custom Hex):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={themeForm.secondaryColor}
                    onChange={(e) => setThemeForm({ ...themeForm, secondaryColor: e.target.value })}
                    className="w-9 h-9 rounded-xl border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={themeForm.secondaryColor}
                    onChange={(e) => setThemeForm({ ...themeForm, secondaryColor: e.target.value })}
                    className="w-24 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Theme Live Preview Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Eye size={16} className="text-primary" />
                  <span>Sida Midabadu u Muuqanayaan</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Live Demo</span>
              </div>

              {/* Sample components with selected colors */}
              <div className="p-5 rounded-2xl bg-dark border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Gradient Heading:</span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded text-black font-bold"
                    style={{ backgroundColor: themeForm.primaryColor }}
                  >
                    Active Accent
                  </span>
                </div>

                <div
                  className="text-xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeForm.primaryColor}, #ffffff, ${themeForm.secondaryColor})`,
                  }}
                >
                  Building the Digital Future
                </div>

                {/* Sample button */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Buttons & Badges:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full font-bold text-xs text-black shadow-md transition-all"
                      style={{ backgroundColor: themeForm.primaryColor }}
                    >
                      Primary Button
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full font-bold text-xs text-white border border-white/20 bg-white/5"
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>

                {/* Sample card with glowing border */}
                <div
                  className="p-3.5 rounded-xl border bg-slate-900/60"
                  style={{ borderColor: `${themeForm.primaryColor}40` }}
                >
                  <p className="text-xs font-semibold text-white">Preview Card</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Dhammaan qaybaha websaytka (Projects, About, Contact, Testimonials) waxay qaadanayaan midabadan.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSaveAll}
                className="w-full py-3 rounded-xl bg-primary hover:opacity-90 text-dark font-bold text-xs transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save size={15} />
                <span>Kaydi Midabada & Asalka</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: ABOUT, SKILLS & TECH STACK                              */}
      {/* ============================================================== */}
      {activeTab === 'about' && (
        <div className="space-y-8">
          {/* Top Control Banner */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Cpu size={16} />
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                    About Page Control Hub
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Xirfadaha, Tech Stack & Key Metrics (About Page)
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Halkan waxaad si toos ah uga beddeli kartaa Key Performance Metrics (5+ Years, 40+ Projects), Core Competencies (Skill Bars), Tech Stack tags, iyo dhammaan qoraallada About page.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleResetDefaultAbout}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Ku celi xogta asalka ah ee About page"
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Ku celi Asalka</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={saveStatus.type === 'saving'}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <Save size={15} />
                  <span>Badbaadi Isbeddelka</span>
                </button>
              </div>
            </div>

            {/* Quick stats counter ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Key Metrics</p>
                  <p className="text-lg font-bold text-white mt-0.5">{aboutForm.metrics.length} Tirooyin</p>
                </div>
                <Award className="text-primary opacity-80" size={24} />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Core Competencies</p>
                  <p className="text-lg font-bold text-white mt-0.5">{aboutForm.skills.length} Xirfadood</p>
                </div>
                <Target className="text-secondary opacity-80" size={24} />
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Tech Stack Tags</p>
                  <p className="text-lg font-bold text-white mt-0.5">{aboutForm.techStack.length} Ecosystem Tags</p>
                </div>
                <Layers className="text-primary opacity-80" size={24} />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 0: ABOUT PROFILE PHOTO & VISUAL IDENTITY               */}
          {/* ============================================================== */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                    <ImageIcon size={15} />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    0. Sawirka Shakhsiga ah ee About Page (Professional Portrait)
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Halkan ku soo dar ama ku beddel sawirkaaga shakhsiga ah si uu ugu dhex muuqdo About Page-ka si professional ah oo heersare ah.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAboutForm((prev) => ({ ...prev, imageUrl: '/assets/aistudio/black_875c126c.png' }))}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white text-[11px] font-semibold border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Sawirka Rasmiga ah ee Sculpted (Dark Theme)"
                >
                  <Sparkles size={12} className="text-amber-400" />
                  <span>Sawirka Rasmiga ah (Dark)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAboutForm((prev) => ({ ...prev, imageUrl: '/assets/aistudio/white__43ddcbfb.png' }))}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-yellow-300 hover:text-white text-[11px] font-semibold border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Sawirka Rasmiga ah ee Sculpted (Gold Accent)"
                >
                  <Sparkles size={12} className="text-yellow-400" />
                  <span>Sawirka Rasmiga ah (Gold)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAboutForm((prev) => ({ ...prev, imageUrl: heroForm.imageUrl }))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Isticmaal sawirka ku jira Hero Section-ka"
                >
                  <span>Hero Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAboutForm((prev) => ({ ...prev, imageUrl: '/assets/aistudio/black_875c126c.png' }))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Ku celi sawirka asalka ah"
                >
                  <RotateCcw size={12} />
                  <span>Dib u celi</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <ImageUploader
                  label="Soo geli Sawirkaaga (Upload Photo ama Image URL)"
                  value={aboutForm.imageUrl || ''}
                  onChange={(newUrl) => setAboutForm({ ...aboutForm, imageUrl: newUrl })}
                  placeholder="https://... ama dooro faylka sawirkaaga"
                  helperText="Soo upload garee sawirkaaga shakhsiga ah (JPG, PNG, WEBP) ama gali link toos ah. Sawirkaagu wuxuu yeelanayaa qaabka quruxda badan (Sculpted Shape)."
                  bucketName="portfolio-media"
                  folderPath="about-portrait"
                  recommendedSize="Cabirka ugu habboon: Transparent Cutout PNG ama 800x1000px"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Magaca Xirfadlaha / Badge Title
                    </label>
                    <input
                      type="text"
                      value={aboutForm.badgeBioTitle || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, badgeBioTitle: e.target.value })}
                      placeholder="Senior Full-Stack & Creative Technologist"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Xaaladda Shaqada (Availability Status)
                    </label>
                    <input
                      type="text"
                      value={aboutForm.availabilityStatus || ''}
                      onChange={(e) => setAboutForm({ ...aboutForm, availabilityStatus: e.target.value })}
                      placeholder="Available for Select Projects"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Alt Text (Sharraxaadda Sawirka SEO)
                  </label>
                  <input
                    type="text"
                    value={aboutForm.imageAlt || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, imageAlt: e.target.value })}
                    placeholder="Mohamed Alhady - Creative Strategist & Full-Stack Developer"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Preview Card (Frameless Sculpted Shape Presentation) */}
              <div className="lg:col-span-5">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <Sparkles size={13} />
                      Muuqaalka About (Frameless Sculpted)
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      <ShieldCheck size={11} /> Verified Pro
                    </span>
                  </div>

                  <div className="relative rounded-2xl p-4 bg-slate-900/60 border border-white/5 flex items-center justify-center min-h-[320px] overflow-hidden">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-primary/10 to-transparent pointer-events-none" />

                    {aboutForm.imageUrl ? (
                      <div className="relative w-full max-w-[260px] flex flex-col items-center">
                        <img
                          src={aboutForm.imageUrl}
                          alt={aboutForm.imageAlt || 'About Portrait'}
                          className="w-full h-auto max-h-[300px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] filter select-none transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/aistudio/black_875c126c.png';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-center p-6 text-slate-500">
                        <ImageIcon size={40} className="mx-auto mb-2 opacity-40 text-amber-400" />
                        <p className="text-xs">Weli ma jiro sawir la doortay</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 1: KEY PERFORMANCE METRICS (CSS SELECTOR 1)            */}
          {/* ============================================================== */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Award size={15} />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    1. Key Performance Metrics Grid
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Tirooyinka iyo guulaha muuqda qaybta sare ee About page (e.g. "5+ Years Experience", "40+ Shipped Projects").
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddMetric}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>Ku dar Metric Cusub</span>
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {aboutForm.metrics.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group/metric"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        Metric #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteMetric(m.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Tirtir Metric-kan"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Tirada (Value)
                        </label>
                        <input
                          type="number"
                          value={m.value}
                          onChange={(e) => handleUpdateMetric(m.id, 'value', Number(e.target.value) || 0)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                          placeholder="5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Daba-galka (Suffix)
                        </label>
                        <input
                          type="text"
                          value={m.suffix}
                          onChange={(e) => handleUpdateMetric(m.id, 'suffix', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                          placeholder="+, M+, %"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Magaca / Faahfaahinta (Label)
                      </label>
                      <input
                        type="text"
                        value={m.label}
                        onChange={(e) => handleUpdateMetric(m.id, 'label', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-amber-500 focus:outline-none"
                        placeholder="e.g. Years Experience"
                      />
                    </div>
                  </div>

                  {/* Live Visual Preview Card */}
                  <div className="mt-4 pt-3 border-t border-slate-850">
                    <p className="text-[10px] uppercase tracking-wider font-mono text-slate-500 text-center mb-1.5">
                      Muuqaalka Bogga Hore:
                    </p>
                    <div className="bg-slate-900/90 border border-white/10 rounded-xl p-3 text-center shadow-inner">
                      <div className="text-2xl font-black text-primary">
                        {m.value}{m.suffix}
                      </div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-0.5 truncate">
                        {m.label || 'Metric Label'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 2: CORE COMPETENCIES / SKILL BARS (CSS SELECTOR 2)     */}
          {/* ============================================================== */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                    <Target size={15} />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    2. Core Competencies & Skill Progress Bars
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Xirfadaha farsamo iyo boqolkiiba (%) animated progress bars-ka ku dhex yaal qaybta Technical Proficiency.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddSkill()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                <span>Ku dar Xirfad Cusub</span>
              </button>
            </div>

            {/* Quick Skill Presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-medium text-slate-400 block">
                Talooyin xirfado diyaarsan (Guji si aad ugu darto):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'DevOps & CI/CD Pipelines', pct: 88 },
                  { name: 'Mobile Apps (React Native / Flutter)', pct: 85 },
                  { name: 'GraphQL & REST Architecture', pct: 92 },
                  { name: 'UI/UX & Interactive Design', pct: 90 },
                  { name: 'Cloud Infrastructure (GCP / AWS)', pct: 85 },
                  { name: 'Cybersecurity & Auth Systems', pct: 82 },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleAddSkill(preset.name, preset.pct)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] transition-colors cursor-pointer"
                  >
                    <Plus size={11} className="text-primary" />
                    <span>{preset.name} ({preset.pct}%)</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Skills List */}
            <div className="space-y-3 pt-2">
              {aboutForm.skills.map((skill, index) => (
                <div
                  key={skill.id || index}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group/skill"
                >
                  {/* Skill Name & Order */}
                  <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                    <div className="flex flex-col gap-0.5">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMoveSkill(index, 'up')}
                        className="p-0.5 rounded text-slate-500 hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 cursor-pointer"
                        title="U qaad kor"
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        type="button"
                        disabled={index === aboutForm.skills.length - 1}
                        onClick={() => handleMoveSkill(index, 'down')}
                        className="p-0.5 rounded text-slate-500 hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 cursor-pointer"
                        title="U qaad hoos"
                      >
                        <ChevronDown size={14} />
                      </button>
                    </div>

                    <div className="flex-1">
                      <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                        Magaca Xirfadda
                      </label>
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleUpdateSkill(skill.id, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs font-semibold focus:border-primary focus:outline-none"
                        placeholder="e.g. Software Development"
                      />
                    </div>
                  </div>

                  {/* Percentage Slider & Progress Bar Preview */}
                  <div className="flex-1 min-w-[250px] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase text-slate-400">
                        Boqolkiiba (%)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={skill.percentage}
                          onChange={(e) => handleUpdateSkill(skill.id, 'percentage', Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
                          className="w-16 px-2 py-1 bg-slate-900 border border-slate-700/80 rounded-lg text-primary text-xs font-mono font-bold text-right focus:border-primary focus:outline-none"
                        />
                        <span className="text-xs font-bold text-primary">%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={skill.percentage}
                        onChange={(e) => handleUpdateSkill(skill.id, 'percentage', Number(e.target.value))}
                        className="w-full accent-primary h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Gradient Progress Bar Preview */}
                    <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 relative">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-yellow-300 to-secondary rounded-full relative transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
                      />
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-center justify-end shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Tirtir xirfaddan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 3: TECHNOLOGIES & ECOSYSTEM TAGS (CSS SELECTOR 3)      */}
          {/* ============================================================== */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-secondary/10 text-secondary border border-secondary/20">
                    <Layers size={15} />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    3. Technologies & Ecosystem (Tech Stack Tags)
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Agabka, luqadaha barnaamijyada, iyo frameworks-ka ku muuqda qaybta "Technologies & Ecosystem".
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-secondary bg-secondary/10 border border-secondary/20 px-2.5 py-1 rounded-lg">
                  {aboutForm.techStack.length} Tags
                </span>
              </div>
            </div>

            {/* Quick Add Tech Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newAboutTechTag}
                  onChange={(e) => setNewAboutTechTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAboutTech();
                    }
                  }}
                  placeholder="Geli magac cusub (e.g. Flutter, Rust, AWS, Supabase, Redis)..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs placeholder-slate-500 focus:border-secondary focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAddAboutTech()}
                className="px-5 py-2.5 rounded-xl bg-secondary hover:opacity-90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-secondary/20 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={15} />
                <span>Ku dar Tag</span>
              </button>
            </div>

            {/* One-click Popular Presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-medium text-slate-400 block">
                Guji mid ka mid ah si aad ugu darto isla markiiba:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
                  'PostgreSQL', 'Python', 'Docker', 'GraphQL', 'Framer Motion',
                  'Figma', 'AWS', 'Redis', 'Supabase', 'Git', 'Vue.js',
                  'Flutter', 'Swift', 'Rust', 'Golang', 'Prisma', 'Kubernetes'
                ].map((tech) => {
                  const isAlreadyAdded = aboutForm.techStack.some((t) => t.toLowerCase() === tech.toLowerCase());
                  return (
                    <button
                      key={tech}
                      type="button"
                      disabled={isAlreadyAdded}
                      onClick={() => handleAddAboutTech(tech)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                        isAlreadyAdded
                          ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 hover:border-secondary/50 cursor-pointer'
                      }`}
                    >
                      {isAlreadyAdded ? <Check size={11} className="text-slate-600" /> : <Plus size={11} className="text-secondary" />}
                      <span>{tech}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tags Cloud */}
            <div className="pt-3 border-t border-slate-800">
              <label className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
                Tech Stack-ka Hadda Shaqeynaya ({aboutForm.techStack.length}):
              </label>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-4 rounded-xl bg-slate-950/60 border border-slate-850">
                {aboutForm.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-gray-200 border border-white/10 hover:border-secondary/40 text-xs font-semibold group transition-all"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAboutTech(tech)}
                      className="p-0.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                      title={`Ka saar ${tech}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                {aboutForm.techStack.length === 0 && (
                  <p className="text-xs text-slate-500 italic py-2">
                    Weli wax tags ah kuma jiraan. Fadlan kor ka ku dar.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 4: ABOUT NARRATIVE & BIO HEADINGS                      */}
          {/* ============================================================== */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                  <User size={15} />
                </span>
                <h3 className="text-base font-bold text-white">
                  4. About Narrative & Bio Content
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Cinwaannada, hordhaca, sheekada shakhsiga ah, iyo heerarka tayada software-ka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Badge Hordhac (Intro Badge)
                </label>
                <input
                  type="text"
                  value={aboutForm.introBadge || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, introBadge: e.target.value })}
                  placeholder="Get to know me"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Cinwaanka Weyn (Heading Title)
                </label>
                <input
                  type="text"
                  value={aboutForm.headingTitle || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, headingTitle: e.target.value })}
                  placeholder="Mohamed Alhady"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Faallada Hordhaca ah (Lead Summary Text)
              </label>
              <textarea
                rows={2}
                value={aboutForm.leadText || ''}
                onChange={(e) => setAboutForm({ ...aboutForm, leadText: e.target.value })}
                placeholder="Creative Strategist & Full-Stack Developer bridging engineering precision with cinematic storytelling and digital growth."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold uppercase text-slate-400 block">
                Qoraalka Sheekada (3 Bio Paragraphs):
              </label>
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">Paragaraafka 1 (Hordhac & Himilada):</span>
                <textarea
                  rows={2}
                  value={aboutForm.paragraph1 || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">Paragaraafka 2 (Khibradda & Takhasuska):</span>
                <textarea
                  rows={2}
                  value={aboutForm.paragraph2 || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">Paragaraafka 3 (Falsafadda & Xilliyada Firaaqada):</span>
                <textarea
                  rows={2}
                  value={aboutForm.paragraph3 || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, paragraph3: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Standards Box Title
                </label>
                <input
                  type="text"
                  value={aboutForm.standardsTitle || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, standardsTitle: e.target.value })}
                  placeholder="Architecture Standards"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Standards Box Description
                </label>
                <input
                  type="text"
                  value={aboutForm.standardsDescription || ''}
                  onChange={(e) => setAboutForm({ ...aboutForm, standardsDescription: e.target.value })}
                  placeholder="All projects adhere to WCAG accessibility, strict TypeScript validation..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION 5: CERTIFICATIONS & VERIFIED CREDENTIALS               */}
          {/* ============================================================== */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                    <Award size={15} />
                  </span>
                  <h3 className="text-base font-bold text-white">
                    5. Shahaadooyinka & Aqoonsiyada (Certifications & Credentials)
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  Maamul shahaadooyinkaaga, aqoonsiyada caalamiga ah, iyo xiriirinta xaqiijinta tooska ah (Verification URLs).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddCertification()}
                  className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-slate-950 text-xs font-bold transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Ku dar Shahaado</span>
                </button>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-medium text-slate-400 block">
                Ku dar tusaale diyaar ah 1-guji kaliya:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services (AWS)', iconType: 'award' as const, badgeText: 'AWS Certified', dateOrValidity: 'Valid 2027', verificationUrl: 'https://aws.amazon.com/verification' },
                  { title: 'Google Cloud Professional Architect', issuer: 'Google Cloud Platform (GCP)', iconType: 'award' as const, badgeText: 'GCP Certified', dateOrValidity: 'Valid 2026', verificationUrl: 'https://cloud.google.com/certification' },
                  { title: 'Meta Frontend Developer Professional', issuer: 'Meta / Coursera', iconType: 'code' as const, badgeText: 'Verified', dateOrValidity: '2024', verificationUrl: 'https://coursera.org/verify' },
                  { title: '1st Place Winner - Best Innovation', issuer: 'Global TechHackathon', iconType: 'sparkles' as const, badgeText: 'Winner', dateOrValidity: 'Winner', verificationUrl: '' },
                  { title: 'CompTIA Security+ Certified', issuer: 'CompTIA • Cybersecurity', iconType: 'shield' as const, badgeText: 'Sec+ Certified', dateOrValidity: 'Valid 2026', verificationUrl: 'https://www.comptia.org/certifications/security' },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleAddCertification(item)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-primary/40 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={11} className="text-primary" />
                    <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* List of Certifications */}
            <div className="space-y-4">
              {(aboutForm.certifications || []).map((cert, index) => (
                <div
                  key={cert.id || index}
                  className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-850">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Award size={15} className="text-primary" />
                      Shahaadada #{index + 1}: {cert.title || 'Untitled'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCertification(cert.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Ka saar shahaadadan"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Magaca Shahaadada (Title)
                      </label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => handleUpdateCertification(cert.id, 'title', e.target.value)}
                        placeholder="AWS Certified Solutions Architect"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Hay'adda ama Bixiyaha (Issuer)
                      </label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => handleUpdateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services • Cloud Infrastructure"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Xilliga / Taariikhda (Validity)
                      </label>
                      <input
                        type="text"
                        value={cert.dateOrValidity}
                        onChange={(e) => handleUpdateCertification(cert.id, 'dateOrValidity', e.target.value)}
                        placeholder="Valid 2026"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                        Qoraalka Badge-ka (Badge Text)
                      </label>
                      <input
                        type="text"
                        value={cert.badgeText || ''}
                        onChange={(e) => handleUpdateCertification(cert.id, 'badgeText', e.target.value)}
                        placeholder="Verified ama Valid 2026"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Xiriirka Xaqiijinta Shahaadada (Verification URL)
                    </label>
                    <input
                      type="url"
                      value={cert.verificationUrl || ''}
                      onChange={(e) => handleUpdateCertification(cert.id, 'verificationUrl', e.target.value)}
                      placeholder="https://aws.amazon.com/verification ama https://www.credly.com/..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              ))}

              {(!aboutForm.certifications || aboutForm.certifications.length === 0) && (
                <div className="p-6 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40">
                  <p className="text-xs text-slate-500">Weli wax shahaadooyin ah kuma jiraan.</p>
                  <button
                    type="button"
                    onClick={() => handleAddCertification()}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/30 text-xs font-semibold hover:bg-primary/30 transition-all cursor-pointer"
                  >
                    <Plus size={13} />
                    Ku dar Shahaado Hadda
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Save Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={saveStatus.type === 'saving'}
                className="px-6 py-3 rounded-xl bg-primary hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-primary/25 flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Save size={16} />
                <span>Badbaadi Dhammaan Isbeddelka About-ka</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 6: SOCIAL MEDIA PROFILES & CHANNELS                        */}
      {/* ============================================================== */}
      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Settings */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                    <Share2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Baraha Bulshada (Social Channels)</h3>
                    <p className="text-xs text-slate-400">
                      Geli cinwaannada barahaaga bulshada si ay toos uga dhex muuqdaan bogga Contact iyo Footer-ka
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* GitHub */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Github size={16} className="text-white" />
                    <span>GitHub Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.github || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, github: e.target.value })}
                    placeholder="https://github.com/alhady-mohamed"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* LinkedIn */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Linkedin size={16} className="text-[#0A66C2]" />
                    <span>LinkedIn Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.linkedin || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/alhady-mohamed"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* Facebook */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Facebook size={16} className="text-[#1877F2]" />
                    <span>Facebook Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.facebook || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, facebook: e.target.value })}
                    placeholder="https://facebook.com/Mohamet.Abdirisaak304"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* Instagram */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Instagram size={16} className="text-[#E4405F]" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.instagram || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    placeholder="https://instagram.com/alhady_mohamed301"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* YouTube */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Youtube size={16} className="text-[#FF0000]" />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.youtube || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                    placeholder="https://youtube.com/@mohamed-alhady01"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* Twitter / X */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Twitter size={16} className="text-sky-400" />
                    <span>Twitter / X Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.twitter || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                    placeholder="https://x.com/username"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* TikTok */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <span className="text-pink-400 font-bold text-xs">🎵</span>
                    <span>TikTok Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.tiktok || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, tiktok: e.target.value })}
                    placeholder="https://tiktok.com/@username"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>

                {/* Telegram */}
                <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <Send size={16} className="text-sky-400" />
                    <span>Telegram URL / Username</span>
                  </label>
                  <input
                    type="text"
                    value={socialForm.telegram || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, telegram: e.target.value })}
                    placeholder="https://t.me/username"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:border-primary focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveAll}
                  disabled={saveStatus.type === 'saving'}
                  className="px-6 py-3 rounded-xl bg-primary hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-primary/25 flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <Save size={16} />
                  <span>Keydi Dhammaan Baraha Bulshada</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 sticky top-24 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Eye size={18} className="text-primary" />
                  <span>Muuqaalka Tooska ah (Live Preview)</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CONTACT & FOOTER
                </span>
              </div>

              {/* Preview Box imitating Contact page card */}
              <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                  Social Profiles (Sida ay u muuqdaan)
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {socialForm.github && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-300" title="GitHub">
                      <Github size={20} />
                    </div>
                  )}
                  {socialForm.linkedin && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#0A66C2]" title="LinkedIn">
                      <Linkedin size={20} />
                    </div>
                  )}
                  {socialForm.facebook && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#1877F2]" title="Facebook">
                      <Facebook size={20} />
                    </div>
                  )}
                  {socialForm.instagram && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#E4405F]" title="Instagram">
                      <Instagram size={20} />
                    </div>
                  )}
                  {socialForm.youtube && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#FF0000]" title="YouTube">
                      <Youtube size={20} />
                    </div>
                  )}
                  {socialForm.twitter && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-sky-400" title="Twitter / X">
                      <Twitter size={20} />
                    </div>
                  )}
                  {socialForm.tiktok && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-pink-400 text-sm font-bold flex items-center justify-center" title="TikTok">
                      🎵
                    </div>
                  )}
                  {socialForm.telegram && (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-sky-400" title="Telegram">
                      <Send size={20} />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-primary block">Talo / Note:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Goob kasta oo aad maran kaga tagto (blank) kama soo muuqan doonto website-ka. Kaliya profiles-ka aad link u geliso ayaa si toos ah u soo bixi doona.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
