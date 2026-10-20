import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../../src/context/AdminAuthContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { LanguageSelector } from '../LanguageSelector';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowLeft,
  Key,
  AlertCircle,
  Eye,
  EyeOff,
  Sliders,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLogin: React.FC = () => {
  const { loginWithPassword, logout, isLoading } = useAdminAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  // Always reset and logout any in-memory session when arriving at login page
  // Ensures username and password must be explicitly entered every single time
  React.useEffect(() => {
    logout();
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const result = await loginWithPassword(identifier, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(result.error || t('login_error_failed'));
      }
    } catch (err: any) {
      setErrorMsg(err?.message || t('login_error_general'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Return home link, Language Switcher, and Security Badge */}
      <div className="w-full max-w-lg mb-4 flex items-center justify-between gap-2 flex-wrap">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft size={14} className={isRTL ? 'rotate-180' : ''} />
          <span>{t('login_return_to_site')}</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Language Selector in Login View */}
          <LanguageSelector variant="admin" />

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t('login_rbac_governance_active')}</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/20 to-indigo-500/20 border border-primary/30 text-primary mb-3 shadow-inner">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{t('login_cms_title')}</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            {t('login_cms_subtitle')}
          </p>
        </div>

        {/* Error notification banner */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
            <span className="leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              {t('login_identity_label')}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400`}>
                <User size={16} />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={t('login_identity_placeholder')}
                className={`w-full ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4 text-left'} py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs sm:text-sm font-medium`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              {t('login_password_label')}
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400`}>
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login_password_placeholder')}
                className={`w-full ${isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10 text-left'} py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs sm:text-sm font-mono`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-slate-400 hover:text-white cursor-pointer`}
                title={showPassword ? t('login_hide_password') : t('login_show_password')}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full mt-3 py-3 px-5 bg-gradient-to-r from-primary via-amber-400 to-yellow-400 hover:from-primary/95 hover:via-amber-300 hover:to-yellow-300 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Key size={16} className={isRTL ? 'rotate-180' : ''} />
            <span>{isSubmitting ? t('login_verifying') : t('login_submit_btn')}</span>
          </button>
        </form>

        <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
          <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('login_footer_note')}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
