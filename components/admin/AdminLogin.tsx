import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../../src/context/AdminAuthContext';
import { useSiteData } from '../../src/context/SiteDataContext';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowLeft,
  Key,
  AlertCircle,
  Database,
  Eye,
  EyeOff,
  Sliders,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLogin: React.FC = () => {
  const { loginWithPassword, isAuthenticated, isLoading } = useAdminAuth();
  const { isFirebaseConnected } = useSiteData();
  const navigate = useNavigate();
  const location = useLocation();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/admin';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const result = await loginWithPassword(identifier, password);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMsg(result.error || 'Gelitaanku ma guuleysan. Fadlan hubi xogtaada.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Cilad ayaa dhacday intii lagu guda jiray gelitaanka.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Return home link */}
      <div className="w-full max-w-lg mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft size={14} />
          <span>Ku noqo Websaytka</span>
        </Link>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>RBAC Governance Active</span>
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
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Xarunta Maamulka (CMS)</h1>
          <p className="text-xs text-slate-400 mt-1">
            Galitaanka Ammaanka leh ee ku xiran Security & Access Governance (RBAC)
          </p>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-800/90 border border-slate-700/70 text-slate-300">
              <Database size={11} className={isFirebaseConnected ? 'text-amber-400' : 'text-slate-400'} />
              <span>{isFirebaseConnected ? 'Firestore Synced' : 'Local Storage Mode'}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              <Key size={11} className="text-indigo-400" />
              <span>Password Authenticated</span>
            </span>
          </div>
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
              Email ama Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User size={16} />
              </div>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. alhady ama admin@portfolio.local"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs sm:text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Furaha Sirta ah (Password)
              </label>
              <span className="text-[10px] text-slate-500 font-mono">RBAC Security Key</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Geli furahaaga sirta ah"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/70 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-xs sm:text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
                title={showPassword ? 'Qari furaha' : 'Muuji furaha'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-primary via-primary to-indigo-600 hover:from-primary/95 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/25 disabled:opacity-60 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-[0.99]"
          >
            <Key size={16} />
            <span>{isSubmitting ? 'Waa la xaqiijinayaa...' : 'Soo Gal (Log In with RBAC)'}</span>
          </button>
        </form>

        <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2.5">
          <Sliders size={14} className="text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Boggani wuxuu toos ugu xiran yahay nidaamka <strong>Security & Access Governance (RBAC)</strong>. Geli cinwaankaaga iyo furahaaga sirta ah si aad u gasho qeybta maamulka.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
