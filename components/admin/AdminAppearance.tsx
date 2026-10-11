import React, { useState } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { HeroSettings, BrandingSettings, ThemeSettings } from '../../types';
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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageUploader } from './ImageUploader';

// Sample curated portraits for quick 1-click selection
const PORTRAIT_PRESETS = [
  {
    name: 'Current Studio Portrait',
    url: '/src/assets/images/hero_portrait_1781209944400.jpg',
    desc: 'Original generated high-fidelity studio engineer photo',
  },
  {
    name: 'Tech Architect (Dark Minimal)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    desc: 'Modern sleek creative architect portrait',
  },
  {
    name: 'Software Engineer (Cyber Neon)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    desc: 'Confident executive developer in dark ambient studio',
  },
  {
    name: 'Digital Strategist (Monochrome Studio)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    desc: 'High contrast professional portrait lighting',
  },
];

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

  // Local editable copies of Hero, Branding, and Theme
  const [activeTab, setActiveTab] = useState<'hero' | 'branding' | 'theme'>('hero');
  const [heroForm, setHeroForm] = useState<HeroSettings>(settings.hero);
  const [brandingForm, setBrandingForm] = useState<BrandingSettings>(settings.branding);
  const [themeForm, setThemeForm] = useState<ThemeSettings>(settings.theme);

  const [newTechTag, setNewTechTag] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'idle' | 'saving' | 'saved' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

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
      const res = await updateSettings({
        hero: heroForm,
        branding: brandingForm,
        theme: themeForm,
        siteTitle: `${brandingForm.siteName} | ${brandingForm.tagline}`,
        whatsappNumber: brandingForm.tagline ? settings.whatsappNumber : settings.whatsappNumber,
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
              CMS Customizer
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Naqshadda, Hero & Brand Identity
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Halkan ka maamul sawirka hero-ga, qoraallada, magaca websaytka, logada, iyo midabada asalka.
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
            <span>Fiiri Websaytka (Live)</span>
          </a>

          <button
            onClick={handleSaveAll}
            disabled={saveStatus.type === 'saving'}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-primary/25 disabled:opacity-60 cursor-pointer"
          >
            {saveStatus.type === 'saving' ? (
              <>
                <span className="animate-spin text-sm">⏳</span>
                <span>Waa la keydinayaa...</span>
              </>
            ) : saveStatus.type === 'saved' ? (
              <>
                <Check size={16} />
                <span>Waa la keydiyay!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Badbaadi Isbeddelka</span>
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
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
            activeTab === 'hero'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <ImageIcon size={18} className={activeTab === 'hero' ? 'text-primary' : 'text-slate-500'} />
          <span>1. Hero Section & Sawirka</span>
        </button>

        <button
          onClick={() => setActiveTab('branding')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
            activeTab === 'branding'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Type size={18} className={activeTab === 'branding' ? 'text-primary' : 'text-slate-500'} />
          <span>2. Magaca & Logada (Branding)</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
            activeTab === 'theme'
              ? 'bg-slate-800 text-white border-b-2 border-primary shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Palette size={18} className={activeTab === 'theme' ? 'text-primary' : 'text-slate-500'} />
          <span>3. Midabada & Background-ka (Colors)</span>
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
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Dooro Sawir Diyaarsan (Presets):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PORTRAIT_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setHeroForm({ ...heroForm, imageUrl: preset.url })}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                        heroForm.imageUrl === preset.url
                          ? 'bg-primary/10 border-primary text-white'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-10 h-12 rounded-lg object-cover shrink-0 border border-slate-700"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/hero_portrait_1781209944400.jpg';
                        }}
                      />
                      <div className="truncate">
                        <p className="text-xs font-bold truncate">{preset.name}</p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{preset.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

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

                {/* Portrait preview card */}
                <div className={`relative mx-auto mt-4 max-w-[220px] aspect-[4/5] flex items-end justify-center transition-all ${
                  heroForm.isTransparentImage !== false
                    ? 'bg-transparent border-0 shadow-none'
                    : 'rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black'
                }`}>
                  <img
                    src={heroForm.imageUrl || '/src/assets/images/hero_portrait_1781209944400.jpg'}
                    alt="Preview"
                    className={`w-full h-full ${
                      heroForm.isTransparentImage !== false
                        ? 'object-contain object-bottom drop-shadow-lg'
                        : 'object-cover'
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/hero_portrait_1781209944400.jpg';
                    }}
                  />
                  {heroForm.isTransparentImage === false && (
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />
                  )}
                  {heroForm.verticalBadgeText && (
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 py-2 px-1 bg-primary text-black rounded-full font-bold text-[7px] [writing-mode:vertical-lr]">
                      {heroForm.verticalBadgeText}
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
              <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800/80 pb-3">
                <Layout size={18} className="text-primary" />
                <span>Habka Logada (Logo Customization)</span>
              </div>

              {/* Logo Type Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBrandingForm({ ...brandingForm, logoType: 'text' })}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    brandingForm.logoType === 'text'
                      ? 'bg-primary/10 border-primary text-white font-bold'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-sm">Qoraal / Xuruuf (Initials)</p>
                  <p className="text-[10px] text-slate-400 mt-1">Tusaale: M&A</p>
                </button>

                <button
                  type="button"
                  onClick={() => setBrandingForm({ ...brandingForm, logoType: 'image' })}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    brandingForm.logoType === 'image'
                      ? 'bg-primary/10 border-primary text-white font-bold'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-sm">Sawir Logo ah (Image URL)</p>
                  <p className="text-[10px] text-slate-400 mt-1">PNG ama SVG astaan ah</p>
                </button>
              </div>

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
                </div>
              ) : (
                <div className="pt-1">
                  <ImageUploader
                    label="Sawirka Logada (Upload Logo PNG/SVG ama URL)"
                    value={brandingForm.logoImageUrl || ''}
                    onChange={(newUrl) => setBrandingForm({ ...brandingForm, logoImageUrl: newUrl })}
                    placeholder="https://.../logo.png"
                    helperText="Soo upload garee sawirka logada (PNG transparent ama SVG ayaa ugu fiican). Waxay toos ugu muuqanaysaa Navbar-ka iyo Footer-ka."
                    bucketName="portfolio-media"
                    folderPath="logos"
                    recommendedSize="Cabirka lagu talinayo: 200x200px ama SVG vector"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Branding Preview */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Eye size={16} className="text-primary" />
                  <span>Sida ay Header & Footer ugu muuqdaan</span>
                </div>
              </div>

              {/* Mini Navbar Preview */}
              <div className="p-4 rounded-2xl bg-dark/95 border border-white/10 space-y-3">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Header Navbar Preview
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xs shadow-md shadow-primary/20 overflow-hidden">
                      {brandingForm.logoType === 'image' && brandingForm.logoImageUrl ? (
                        <img src={brandingForm.logoImageUrl} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <span>{brandingForm.logoText || 'M&A'}</span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-white">
                      {brandingForm.siteName || 'Mohamed Alhady'}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium">
                    Hire Me
                  </span>
                </div>
              </div>

              {/* Mini Footer Preview */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  Footer Preview
                </span>
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
      {/* TAB 3: THEME, BACKGROUND COLOR & ACCENTS                       */}
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
    </div>
  );
};
