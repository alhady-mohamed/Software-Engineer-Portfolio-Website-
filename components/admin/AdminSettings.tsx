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
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{hasSaved ? 'Waa la keydiyay!' : 'Keydi Isbeddelka'}</span>
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
