import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { getFirebaseDiagnostics, FirebaseDiagnostics } from '../../src/lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  Settings,
  Database,
  Globe,
  Check,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Sparkles,
  FolderGit2,
  GraduationCap,
  Star,
  Mail,
  Save,
  Trash2,
  Share2,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Send,
  Plus,
  ExternalLink,
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const {
    settings,
    updateSettings,
    syncAllToFirebase,
    isFirebaseConnected,
    resetToDefaults,
    clearAllData,
    projects,
    timelines,
    testimonials,
    messages,
  } = useSiteData();
  const { t } = useLanguage();

  const [siteTitle, setSiteTitle] = useState(settings.siteTitle || '');
  const [adminEmail, setAdminEmail] = useState(settings.adminEmail || 'admin@portfolio.local');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '+252615000000');
  const [hasSaved, setHasSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Social Links State
  const [socialLinks, setSocialLinks] = useState({
    github: settings.socialLinks?.github || 'https://github.com/alhady-mohamed',
    linkedin: settings.socialLinks?.linkedin || 'https://www.linkedin.com/in/alhady-mohamed',
    facebook: settings.socialLinks?.facebook || 'https://www.facebook.com/Mohamet.Abdirisaak304',
    instagram: settings.socialLinks?.instagram || 'https://www.instagram.com/alhady_mohamed301',
    youtube: settings.socialLinks?.youtube || 'https://youtube.com/@mohamed-alhady01',
    twitter: settings.socialLinks?.twitter || '',
    tiktok: settings.socialLinks?.tiktok || '',
    telegram: settings.socialLinks?.telegram || '',
    whatsapp: settings.socialLinks?.whatsapp || settings.whatsappNumber || 'https://wa.link/cs6dy4',
    customLinks: settings.socialLinks?.customLinks || [],
  });
  const [socialSaved, setSocialSaved] = useState(false);
  const [isSavingSocial, setIsSavingSocial] = useState(false);
  const [newCustomLabel, setNewCustomLabel] = useState('');
  const [newCustomUrl, setNewCustomUrl] = useState('');

  // Firebase Live Diagnostics & Remote Sync State
  const [firebaseDiagnostics, setFirebaseDiagnostics] = useState<FirebaseDiagnostics | null>(null);
  const [isFirebaseDiagnosing, setIsFirebaseDiagnosing] = useState(false);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [firebaseSyncFeedback, setFirebaseSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const runFirebaseDiagnostics = async () => {
    setIsFirebaseDiagnosing(true);
    try {
      const diag = await getFirebaseDiagnostics();
      setFirebaseDiagnostics(diag);
    } catch (e: any) {
      console.warn('Firebase Diagnostics error:', e);
    } finally {
      setIsFirebaseDiagnosing(false);
    }
  };

  useEffect(() => {
    runFirebaseDiagnostics();
  }, []);

  const handleSyncFirebase = async () => {
    setIsFirebaseSyncing(true);
    setFirebaseSyncFeedback(null);
    try {
      const res = await syncAllToFirebase();
      setFirebaseSyncFeedback(res);
      await runFirebaseDiagnostics();
    } catch (e: any) {
      setFirebaseSyncFeedback({ success: false, message: e.message || 'Cilad shubista xogta Firebase' });
    } finally {
      setIsFirebaseSyncing(false);
    }
  };

  const handleClearData = async () => {
    if (window.confirm('Ma hubtaa inaad tirtirto dhammaan xogta dummy-ga ah ee koodhka ku jirta si aad adigu gacantaada ugu darto mashaariicdaada saxda ah?')) {
      setIsClearing(true);
      setFirebaseSyncFeedback(null);
      try {
        const res = await clearAllData();
        setFirebaseSyncFeedback(res);
        await runFirebaseDiagnostics();
      } catch (e: any) {
        setFirebaseSyncFeedback({
          success: false,
          message: `Cilad: ${e.message || 'Lama tirtiri karin'}`,
        });
      } finally {
        setIsClearing(false);
      }
    }
  };

  const handleSaveGeneralSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    await updateSettings({
      siteTitle: siteTitle.trim(),
      adminEmail: adminEmail.trim(),
      whatsappNumber: whatsappNumber.trim(),
    });

    setIsSaving(false);
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 3000);
  };

  const handleSaveSocialLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSocial(true);

    await updateSettings({
      socialLinks: {
        github: socialLinks.github.trim(),
        linkedin: socialLinks.linkedin.trim(),
        facebook: socialLinks.facebook.trim(),
        instagram: socialLinks.instagram.trim(),
        youtube: socialLinks.youtube.trim(),
        twitter: socialLinks.twitter.trim(),
        tiktok: socialLinks.tiktok.trim(),
        telegram: socialLinks.telegram.trim(),
        whatsapp: socialLinks.whatsapp.trim(),
        customLinks: socialLinks.customLinks,
      },
      // Keep whatsappNumber in sync if provided
      whatsappNumber: socialLinks.whatsapp.trim() || whatsappNumber,
    });

    setIsSavingSocial(false);
    setSocialSaved(true);
    setTimeout(() => setSocialSaved(false), 3500);
  };

  const handleAddCustomLink = () => {
    if (!newCustomLabel.trim() || !newCustomUrl.trim()) return;
    const item = {
      id: `custom_${Date.now()}`,
      label: newCustomLabel.trim(),
      url: newCustomUrl.trim(),
    };
    setSocialLinks((prev) => ({
      ...prev,
      customLinks: [...(prev.customLinks || []), item],
    }));
    setNewCustomLabel('');
    setNewCustomUrl('');
  };

  const handleRemoveCustomLink = (id: string) => {
    setSocialLinks((prev) => ({
      ...prev,
      customLinks: (prev.customLinks || []).filter((c) => c.id !== id),
    }));
  };

  const handleExportJson = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      firebaseProject: firebaseConfig.projectId,
      projects,
      timelines,
      testimonials,
      messages,
      settings,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = href;
    a.download = `portfolio-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(href);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Ma hubtaa inaad dib ugu celiso dhammaan xogta portfolio-ga sidii asalka ahayd?')) {
      resetToDefaults();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="text-primary" size={26} />
          <span>{t('admin_settings_title')}</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {t('admin_settings_subtitle')}
        </p>
      </div>

      {/* CLOUD DATABASE: Firebase Firestore */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900/90 border-2 border-amber-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Database size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Firebase Firestore (Google Cloud DB)</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {isFirebaseConnected ? 'FIRFIRCOON (ACTIVE)' : 'CONNECTING...'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Database-ka tooska ah ee la xiray mashruucaaga Google Cloud. Xogtu waxay ku kaydsan tahay Firestore.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runFirebaseDiagnostics}
              disabled={isFirebaseDiagnosing}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={isFirebaseDiagnosing ? 'animate-spin' : ''} />
              <span>{isFirebaseDiagnosing ? 'Hubinayaa...' : 'Dib u Hubi Firestore'}</span>
            </button>
          </div>
        </div>

        {/* Firebase Config Meta Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 font-mono">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Firebase Project ID</span>
            <span className="text-amber-300 font-bold">{firebaseDiagnostics?.projectId || firebaseConfig.projectId}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Firestore Database ID</span>
            <span className="text-slate-300 truncate block text-[11px]">{firebaseDiagnostics?.databaseId || firebaseConfig.firestoreDatabaseId || '(default)'}</span>
          </div>
        </div>

        {/* 4-Collection Live Counters Ribbon for Firestore */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Mashaariicda</span>
              <FolderGit2 size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {firebaseDiagnostics ? firebaseDiagnostics.projectsCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">/projects</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Timeline</span>
              <GraduationCap size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {firebaseDiagnostics ? firebaseDiagnostics.timelinesCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">/timelines</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Marag-fur</span>
              <Star size={16} className="text-yellow-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {firebaseDiagnostics ? firebaseDiagnostics.testimonialsCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">/testimonials</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Farriimaha</span>
              <Mail size={16} className="text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {firebaseDiagnostics ? firebaseDiagnostics.messagesCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">/contact_messages</span>
          </div>
        </div>

        {/* Sync feedback for Firebase */}
        {firebaseSyncFeedback && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
              firebaseSyncFeedback.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            {firebaseSyncFeedback.success ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertTriangle size={16} className="shrink-0" />}
            <span>{firebaseSyncFeedback.message}</span>
          </div>
        )}

        {/* Seed & Clear Database Controls */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>Maamulka Xogta Firebase (Database Data Controls)</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Xogta toos ugu shub database-ka Firebase, ama ka saar xogtii dummy-ga ahayd si aad xogtaada dhabta ah u geliso.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleClearData}
              disabled={isClearing || isFirebaseSyncing}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 font-semibold text-xs border border-red-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isClearing ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              <span>{isClearing ? 'Nadiifinayaa...' : '🗑️ Ka Saar Dummy Data'}</span>
            </button>

            <button
              onClick={handleSyncFirebase}
              disabled={isFirebaseSyncing || isClearing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isFirebaseSyncing ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              <span>{isFirebaseSyncing ? 'Shubayaa...' : '🔥 Ku Shub Xogta Firebase'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* General Site Configuration Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
            <Globe size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Xogta Guud ee Websaytka (General Settings)</h2>
            <span className="text-xs text-slate-400">
              Cinwaanka guud, email-ka xiriirka iyo lambarka WhatsApp-ka
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveGeneralSettings} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Cinwaanka Websaytka (Site Title)
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Mohamed Alhady | Creative Strategist & Developer"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Email-ka Admin-ka (Notifications)
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@portfolio.local"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Lambarka / Link-ga WhatsApp (Quick Contact)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="https://wa.link/cs6dy4"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-dark font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{hasSaved ? 'Waa la keydiyay!' : 'Keydi Isbeddelka'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Baraha Bulshada (Social Media Profiles & Channels) */}
      <div id="social" className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <Share2 size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">Baraha Bulshada (Social Media Profiles)</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LIVE ON SITE
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Geli ama beddel links-ka barahaaga bulshada ee ka muuqanaya bogga Contact iyo Footer-ka
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveSocialLinks} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GitHub */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Github size={16} className="text-white" />
                <span>GitHub Profile URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.github}
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                placeholder="https://github.com/alhady-mohamed"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Linkedin size={16} className="text-[#0A66C2]" />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/alhady-mohamed"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* Facebook */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Facebook size={16} className="text-[#1877F2]" />
                <span>Facebook Profile URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                placeholder="https://facebook.com/Mohamet.Abdirisaak304"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Instagram size={16} className="text-[#E4405F]" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                placeholder="https://instagram.com/alhady_mohamed301"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* YouTube */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Youtube size={16} className="text-[#FF0000]" />
                <span>YouTube Channel URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.youtube}
                onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                placeholder="https://youtube.com/@mohamed-alhady01"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* Twitter / X */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Twitter size={16} className="text-sky-400" />
                <span>Twitter / X Profile URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.twitter}
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                placeholder="https://x.com/username"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* TikTok */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <span className="text-pink-400 font-bold text-xs">🎵</span>
                <span>TikTok Profile URL</span>
              </label>
              <input
                type="url"
                value={socialLinks.tiktok}
                onChange={(e) => setSocialLinks({ ...socialLinks, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@username"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>

            {/* Telegram */}
            <div className="space-y-1.5 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Send size={16} className="text-sky-400" />
                <span>Telegram URL / Username</span>
              </label>
              <input
                type="text"
                value={socialLinks.telegram}
                onChange={(e) => setSocialLinks({ ...socialLinks, telegram: e.target.value })}
                placeholder="https://t.me/username"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          {/* Custom Extra Social Profiles */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Plus size={14} className="text-primary" />
              <span>Links Kale oo Gaar ah (Custom Profiles & Portfolios)</span>
            </h4>

            {socialLinks.customLinks && socialLinks.customLinks.length > 0 && (
              <div className="space-y-2">
                {socialLinks.customLinks.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Globe size={15} className="text-primary shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-white block">{item.label}</span>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-1 font-mono text-[11px] truncate">
                          <span className="truncate">{item.url}</span>
                          <ExternalLink size={10} className="shrink-0" />
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomLink(item.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0 ml-2"
                      title="Ka saar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
              <input
                type="text"
                placeholder="Magaca (tusaale: Behance, Dribbble, Medium)"
                value={newCustomLabel}
                onChange={(e) => setNewCustomLabel(e.target.value)}
                className="sm:col-span-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
              />
              <input
                type="url"
                placeholder="URL (https://...)"
                value={newCustomUrl}
                onChange={(e) => setNewCustomUrl(e.target.value)}
                className="sm:col-span-2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-primary font-mono"
              />
              <button
                type="button"
                onClick={handleAddCustomLink}
                disabled={!newCustomLabel.trim() || !newCustomUrl.trim()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-semibold disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus size={14} />
                <span>Ku dar</span>
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSavingSocial}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSavingSocial ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{socialSaved ? 'Waa la keydiyay baraha bulshada!' : 'Keydi Baraha Bulshada'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Backup and Restore Utilities */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Kaydinta & Dib-u-soo-celinta (Backup & Restore)</h2>
        <p className="text-xs text-slate-400">
          Waxaad soo degsan kartaa dhammaan xogta CMS-ka adigoo u qaadanaya fayl JSON ah si aad nuqul u haysato.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer"
          >
            <Download size={15} />
            <span>Soo Degso Backup (JSON)</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium transition-colors cursor-pointer"
          >
            <RotateCcw size={15} />
            <span>Ku celi Xogtii Asalka ahayd (Reset)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
