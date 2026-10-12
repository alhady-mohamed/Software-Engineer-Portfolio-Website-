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
  QrCode,
  Link as LinkIcon,
  Smartphone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageUploader } from './ImageUploader';



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
                    src={heroForm.imageUrl || '/src/assets/images/hero_portrait_1781209944400.jpg'}
                    alt="Preview"
                    className={`w-full h-full ${
                      heroForm.isTransparentImage !== false
                        ? heroForm.aspectRatio === '1:1'
                          ? 'object-contain object-center drop-shadow-lg'
                          : 'object-contain object-bottom drop-shadow-lg'
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
