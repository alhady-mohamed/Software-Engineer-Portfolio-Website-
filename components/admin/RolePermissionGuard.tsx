import React from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { ShieldAlert, ArrowLeft, KeyRound, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RolePermissionGuardProps {
  pageId: string;
  tabId: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RolePermissionGuard: React.FC<RolePermissionGuardProps> = ({
  pageId,
  tabId,
  children,
  fallback,
}) => {
  const { hasTabPermission, currentUser, roles } = useSiteData();
  const isAllowed = hasTabPermission(pageId, tabId);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const currentRole = roles.find((r) => r.id === currentUser?.roleId);

  return (
    <div className="rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-950/20 via-slate-900/60 to-slate-950/80 p-8 sm:p-12 text-center backdrop-blur-md">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 shadow-lg shadow-red-500/5">
        <ShieldAlert className="w-8 h-8 animate-pulse" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono font-medium mb-3 border border-red-500/20">
        <Lock className="w-3.5 h-3.5" />
        403 · Access Denied · Ogolaansho Ma Haysatid
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
        Ogolaanshaha Tab-kan Waa La Xidhay
      </h3>

      <p className="text-sm text-slate-400 max-w-lg mx-auto mb-6 leading-relaxed">
        Doorkaaga hadda ee <span className="font-semibold text-amber-400">{currentRole?.name || currentUser?.roleId || 'Restricted Role'}</span> ma haysto ogolaanshaha uu ku galo qaybtan (<span className="font-mono text-slate-300">{pageId} / {tabId}</span>).
        Waxaa loo baahan yahay in Super Admin uu kugu daro Capability Matrix-ka doorkan.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          Ku Noqo Dashboard-ka
        </Link>
        <Link
          to="/admin/users-roles"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-xs font-semibold transition-all border border-primary/30"
        >
          <KeyRound className="w-4 h-4" />
          Fiiri Awoodaha & Doorarka
        </Link>
      </div>
    </div>
  );
};
