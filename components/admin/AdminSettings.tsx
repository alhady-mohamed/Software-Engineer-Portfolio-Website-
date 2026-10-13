import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { getSupabaseDiagnostics, SupabaseDiagnostics } from '../../src/lib/supabase';
import { getFirebaseDiagnostics, FirebaseDiagnostics } from '../../src/lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  Settings,
  Database,
  Key,
  Globe,
  Copy,
  Check,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Info,
  Loader2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Layers,
  FolderGit2,
  GraduationCap,
  Star,
  Mail,
  HelpCircle,
} from 'lucide-react';

const SQL_SCHEMA_CONTENT = `-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web App',
  summary TEXT,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT DEFAULT '#',
  github_url TEXT DEFAULT '',
  featured BOOLEAN DEFAULT false,
  metrics JSONB DEFAULT '{}'::jsonb,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TIMELINES TABLE (Education & Work Experience)
CREATE TABLE IF NOT EXISTS public.timelines (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  type TEXT CHECK (type IN ('education', 'experience')) NOT NULL,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  company TEXT,
  avatar_url TEXT,
  rating INT DEFAULT 5,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. POLICIES (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Public Read Timelines" ON public.timelines;
DROP POLICY IF EXISTS "Public Read Approved Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public Insert Messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Full Access Projects" ON public.projects;
DROP POLICY IF EXISTS "Full Access Timelines" ON public.timelines;
DROP POLICY IF EXISTS "Full Access Testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Full Access Messages" ON public.contact_messages;

CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Timelines" ON public.timelines FOR SELECT USING (true);
CREATE POLICY "Public Read Approved Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Full Access Projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Timelines" ON public.timelines FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Testimonials" ON public.testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full Access Messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);`;

export const AdminSettings: React.FC = () => {
  const {
    settings,
    updateSettings,
    checkSupabaseStatus,
    syncAllToSupabase,
    syncAllToFirebase,
    loadFromSupabase,
    isSupabaseConnected,
    isSupabaseConfigured,
    isFirebaseConnected,
    resetToDefaults,
    projects,
    timelines,
    testimonials,
    messages,
  } = useSiteData();
  const { t } = useLanguage();

  const [url, setUrl] = useState(settings.supabaseUrl || '');
  const [anonKey, setAnonKey] = useState(settings.supabaseAnonKey || '');
  const [siteTitle, setSiteTitle] = useState(settings.siteTitle || '');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '+252615000000');

  const [testingStatus, setTestingStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [hasCopiedSql, setHasCopiedSql] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  // Firebase Live Diagnostics & Remote Sync State
  const [firebaseDiagnostics, setFirebaseDiagnostics] = useState<FirebaseDiagnostics | null>(null);
  const [isFirebaseDiagnosing, setIsFirebaseDiagnosing] = useState(false);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState(false);
  const [firebaseSyncFeedback, setFirebaseSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Supabase Diagnostics State
  const [diagnostics, setDiagnostics] = useState<SupabaseDiagnostics | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);

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

  const runDiagnostics = async () => {
    setIsDiagnosing(true);
    try {
      const diag = await getSupabaseDiagnostics();
      setDiagnostics(diag);
    } catch (e: any) {
      console.warn('Diagnostics error:', e);
    } finally {
      setIsDiagnosing(false);
    }
  };

  useEffect(() => {
    runFirebaseDiagnostics();
    runDiagnostics();
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

  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncAllToSupabase();
      setSyncFeedback(res);
      await runDiagnostics();
    } catch (e: any) {
      setSyncFeedback({ success: false, message: e.message || 'Cilad shubista xogta' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTesting(true);
    setTestingStatus('Checking connection...');

    const res = await updateSettings({
      supabaseUrl: url.trim(),
      supabaseAnonKey: anonKey.trim(),
      siteTitle: siteTitle.trim(),
      whatsappNumber: whatsappNumber.trim(),
    });

    setIsTesting(false);
    setTestingStatus(res.message);
    setHasSaved(true);
    await runDiagnostics();
    setTimeout(() => setHasSaved(false), 3000);
  };

  const handleTestNow = async () => {
    setIsTesting(true);
    setTestingStatus('Testing connection...');
    const res = await checkSupabaseStatus();
    setIsTesting(false);
    setTestingStatus(res.message);
    await runDiagnostics();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_CONTENT);
    setHasCopiedSql(true);
    setTimeout(() => setHasCopiedSql(false), 2500);
  };

  const handleExportJson = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
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
    if (window.confirm('Reset all portfolio data to defaults?')) {
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

      {/* PRIMARY CLOUD DATABASE: Firebase Firestore */}
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
                  FIRFIRCOON (ACTIVE)
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

        {/* 1-Click Seed Button to push current data to Firebase */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>Ku Shub Dhammaan Xogta Firebase (One-Click Seed Firestore)</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Hal gujin kaliya ku shub dhammaan mashaariicda iyo waayo-aragnimada database-ka Firebase Firestore.
            </p>
          </div>

          <button
            onClick={handleSyncFirebase}
            disabled={isFirebaseSyncing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isFirebaseSyncing ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            <span>{isFirebaseSyncing ? 'Shubayaa Firebase...' : '🔥 Ku Shub Xogta Firebase'}</span>
          </button>
        </div>
      </div>

      {/* Trusted Domain FAQ / Clarification Card */}
      <div className="p-5 md:p-6 rounded-3xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/40 border border-sky-800/60 shadow-xl space-y-3">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0 mt-0.5">
            <HelpCircle size={22} />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-white text-sm">
                Ma u baahan yahay in "Trusted Domain" lagu daro Supabase?
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Maya, haba yaraatee looma baahna!
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Supabase Database-ka (PostgREST API) uma baahna wax <strong>Trusted Domain</strong> ah ama CORS whitelist ah. Qof kasta oo haysta <em>Publishable / Anon Key-ga</em> si toos ah ayuu database-ka uga akhriyi karaa uguna qori karaa meel kasta.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              "Trusted Domain / Site URL" ee ka muuqda Supabase Authentication waxaa loo isticmaalaa <strong>kaliya</strong> markii qof Email login link loo dirayo ama Google OAuth lagu soo galayo. Database-ka caadiga ah wax domain ah uma xirna.
            </p>
          </div>
        </div>
      </div>

      {/* Live Supabase Diagnostics & Remote Row Counters Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck size={20} />
              </div>
              <h2 className="text-base font-bold text-white">Xaaladda Tooska ah ee Database-ka (Live Cloud Status)</h2>
            </div>
            <p className="text-xs text-slate-400">
              Tirada dhabta ah ee xogta hadda ku jirta jadwallada Supabase (Remote Cloud DB)
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={runDiagnostics}
              disabled={isDiagnosing}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={13} className={isDiagnosing ? 'animate-spin' : ''} />
              <span>{isDiagnosing ? 'Hubinayaa...' : 'Dib u Hubi Xisaabta'}</span>
            </button>
          </div>
        </div>

        {/* 4-Table Live Counters Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Mashaariicda</span>
              <FolderGit2 size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {diagnostics ? diagnostics.projectsCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">public.projects</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Timeline</span>
              <GraduationCap size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {diagnostics ? diagnostics.timelinesCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">public.timelines</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Marag-fur</span>
              <Star size={16} className="text-yellow-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {diagnostics ? diagnostics.testimonialsCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">public.testimonials</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold">Farriimaha</span>
              <Mail size={16} className="text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {diagnostics ? diagnostics.messagesCount : '—'}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">public.contact_messages</span>
          </div>
        </div>

        {/* Sync feedback notification */}
        {syncFeedback && (
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
              syncFeedback.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
          >
            {syncFeedback.success ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertTriangle size={16} className="shrink-0" />}
            <span>{syncFeedback.message}</span>
          </div>
        )}

        {/* 1-Click Seed Button to push current data to Supabase */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Ku Shub Xogta Hadda Diyaar ah Supabase (Sync & Seed Remote DB)</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Haddii jadwalladaadu maran yihiin (0 rows), guji badhankan si mashaariicda iyo waayo-aragnimada toos loogu shubo database-ka fog.
            </p>
          </div>

          <button
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isSyncing ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            <span>{isSyncing ? 'Shubayaa Xogta...' : '🚀 Ku Shub Xogta Supabase'}</span>
          </button>
        </div>
      </div>

      {/* Supabase Connection Setup Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Xiriirinta Supabase (Cloud Database)</h2>
              <span className="text-xs text-slate-400">
                Geli URL-ka iyo Anon Key-ga aad ka hesho mashruucaaga Supabase
              </span>
            </div>
          </div>

          <div
            className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-2 border ${
              isSupabaseConnected
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {isSupabaseConnected ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
            <span>{isSupabaseConnected ? 'Connected & Synced' : 'Offline / Local Mode'}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSaveCredentials} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Supabase Project URL *
            </label>
            <div className="relative">
              <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="https://xyzcompany.supabase.co"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Ka hel: Supabase Dashboard &gt; Project Settings &gt; API &gt; Project URL
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Supabase Anon Public Key *
            </label>
            <div className="relative">
              <Key size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Ka hel: Supabase Dashboard &gt; Project Settings &gt; API &gt; Project API keys (anon public)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Cinwaanka Websaytka (Site Title)
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="Mohamed Portfolio"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Lambarka WhatsApp (Quick Contact)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+252615000000"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {testingStatus && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                isSupabaseConnected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              }`}
            >
              <Info size={16} className="shrink-0" />
              <span>{testingStatus}</span>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isTesting}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              {isTesting ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
              <span>{hasSaved ? 'Waa la keydiyay!' : 'Keydi & Xir Supabase'}</span>
            </button>

            <button
              type="button"
              onClick={handleTestNow}
              disabled={isTesting}
              className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-colors"
            >
              Tijaabi Xiriirka (Test Connection)
            </button>
          </div>
        </form>
      </div>

      {/* SQL Schema Copy Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Database size={18} className="text-primary" />
              <span>Supabase SQL Script (Jadwalka Xogta)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ku shub script-kan Supabase SQL Editor si uu kuu abuuro jadwallada: projects, timelines, testimonials, iyo messages.
            </p>
          </div>

          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-md shadow-primary/20 transition-all self-start sm:self-auto"
          >
            {hasCopiedSql ? <Check size={14} /> : <Copy size={14} />}
            <span>{hasCopiedSql ? 'Waa la koobiyeeyay!' : 'Nuqul Ka Qaad (Copy SQL)'}</span>
          </button>
        </div>

        <div className="relative">
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-56 overflow-y-auto leading-relaxed">
            {SQL_SCHEMA_CONTENT}
          </pre>
        </div>
      </div>

      {/* Backup and Restore Utilities */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white">Kaydinta & Dib-u-soo-celinta (Backup & Restore)</h2>
        <p className="text-xs text-slate-400">
          Waxaad soo degsan kartaa dhammaan xogta CMS-ka adigoo u qaadanaya fayl JSON ah.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
          >
            <Download size={15} />
            <span>Soo Degso Backup (JSON)</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium transition-colors"
          >
            <RotateCcw size={15} />
            <span>Ku celi Xogtii Asalka ahayd (Reset)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
