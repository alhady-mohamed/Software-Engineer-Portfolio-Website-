import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../../src/context/AdminAuthContext';
import { useSiteData } from '../../src/context/SiteDataContext';
import { ShieldCheck, Lock, Mail, ArrowLeft, Sparkles, Key, AlertCircle, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLogin: React.FC = () => {
  const { loginWithSupabase, loginWithDemo, isAuthenticated } = useAdminAuth();
  const { isSupabaseConfigured, isSupabaseConnected } = useSiteData();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSupabaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const result = await loginWithSupabase(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMsg(result.error || 'Gelitaanku ma guuleysan.');
    }
  };

  const handleDemoAccess = () => {
    loginWithDemo('admin@portfolio.local');
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Return home link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Ku noqo Websaytka</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4 shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Xarunta Maamulka (CMS)</h1>
          <p className="text-sm text-slate-400 mt-1">Admin Dashboard & Supabase Content Manager</p>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-slate-800/80 border border-slate-700/60 text-slate-300">
            <Database size={12} className={isSupabaseConnected ? 'text-emerald-400' : 'text-amber-400'} />
            <span>
              {isSupabaseConnected
                ? 'Supabase: Connected'
                : isSupabaseConfigured
                ? 'Supabase: Syncing'
                : 'Backend: Local / Demo Mode'}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Supabase Account Form */}
        <form onSubmit={handleSupabaseSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email-ka Admin-ka
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Furaha Sirta ah (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-700/70 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
          >
            <Key size={16} />
            <span>{isSubmitting ? 'Gelaya...' : 'Soo Gal (Supabase Auth)'}</span>
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative px-3 bg-slate-900 text-xs font-mono uppercase tracking-wider text-slate-500">
            ama tijaabi si toos ah
          </span>
        </div>

        {/* Instant Demo Access Button */}
        <button
          onClick={handleDemoAccess}
          type="button"
          className="w-full py-3.5 px-4 bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-emerald-400 hover:text-emerald-300 font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm group"
        >
          <Sparkles size={16} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span>Gelitaan Degdeg ah (One-Click Demo Mode)</span>
        </button>

        <div className="mt-5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <p className="font-semibold text-slate-300 flex items-center gap-1.5">
            <span>🔒</span> Sida WordPress loogu galo (Direct Access):
          </p>
          <p className="text-slate-400 leading-relaxed">
            Bogagga guud ee websaytka looma ogolaan badhanka Admin-ka si uu u noqdo 100% professional. Waxaad toos uga soo geli kartaa adigoo browser-ka ku qoraya <code className="text-primary font-mono px-1 py-0.5 bg-slate-800 rounded">/#/admin</code> ama <code className="text-primary font-mono px-1 py-0.5 bg-slate-800 rounded">/#/wp-admin</code>, ama riixaya <kbd className="text-white font-mono px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">Alt + A</kbd>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
