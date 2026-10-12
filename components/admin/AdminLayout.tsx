import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../src/context/AdminAuthContext';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { LanguageSelector } from '../LanguageSelector';
import {
  LayoutDashboard,
  FolderGit2,
  GraduationCap,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  ShieldCheck,
  CheckCircle2,
  Palette,
  Layers,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const { messages, isSupabaseConnected } = useSiteData();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Clean grouped navigation structure without repetitive single-item categories
  const navSections = [
    {
      title: t('admin_overview'),
      items: [
        {
          to: '/admin',
          label: t('admin_overview'),
          icon: LayoutDashboard,
          exact: true,
        },
        {
          to: '/admin/appearance',
          label: t('admin_appearance'),
          icon: Palette,
        },
      ],
    },
    {
      title: t('admin_modules'),
      items: [
        {
          to: '/admin/projects',
          label: t('admin_projects'),
          icon: FolderGit2,
        },
        {
          to: '/admin/timeline',
          label: t('admin_timeline'),
          icon: GraduationCap,
        },
        {
          to: '/admin/testimonials',
          label: t('admin_testimonials'),
          icon: Star,
        },
        {
          to: '/admin/messages',
          label: t('admin_messages'),
          icon: MessageSquare,
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
        },
      ],
    },
    {
      title: t('admin_system'),
      items: [
        {
          to: '/admin/settings',
          label: t('admin_settings'),
          icon: Settings,
        },
      ],
    },
  ];

  // Active breadcrumb label
  const getActiveTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return { title: t('admin_overview'), icon: LayoutDashboard };
    if (path.startsWith('/admin/appearance')) return { title: t('admin_appearance'), icon: Palette };
    if (path.startsWith('/admin/projects')) return { title: t('admin_projects'), icon: FolderGit2 };
    if (path.startsWith('/admin/timeline')) return { title: t('admin_timeline'), icon: GraduationCap };
    if (path.startsWith('/admin/testimonials')) return { title: t('admin_testimonials'), icon: Star };
    if (path.startsWith('/admin/messages')) return { title: t('admin_messages'), icon: MessageSquare };
    if (path.startsWith('/admin/settings')) return { title: t('admin_settings'), icon: Settings };
    return { title: t('admin_portal'), icon: Layers };
  };

  const activeBreadcrumb = getActiveTitle();
  const ActiveIcon = activeBreadcrumb.icon;

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white ${
        isRTL ? 'rtl' : 'ltr'
      }`}
    >
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Admin CMS</h2>
            <span className="text-[10px] text-slate-400 font-mono">Portfolio Control</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <LanguageSelector variant="admin" compact />

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 ${
          isRTL ? 'right-0' : 'left-0'
        } h-screen w-64 bg-slate-900 ${
          isRTL ? 'border-l' : 'border-r'
        } border-slate-800 flex flex-col justify-between z-50 transition-transform duration-200 backdrop-blur-xl ${
          sidebarOpen
            ? 'translate-x-0'
            : isRTL
            ? 'translate-x-full md:translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo Zone */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white shadow-md shadow-primary/25">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h1 className="font-bold text-white text-sm tracking-tight">{t('admin_portal')}</h1>
                <p className="text-[10px] text-slate-400 font-mono">CMS Control Panel</p>
              </div>
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Compact Connection Indicator */}
          <div className="px-4 pt-3 pb-1">
            <div
              className={`px-3 py-1.5 rounded-xl border text-[11px] flex items-center justify-between ${
                isSupabaseConnected
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Database size={13} className="shrink-0 text-primary" />
                <span className="truncate font-medium">
                  {isSupabaseConnected ? 'Database: Synced' : 'Storage: Browser Mode'}
                </span>
              </div>
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isSupabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
            </div>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="p-3 space-y-4 flex-1">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {section.title}
                </p>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white font-semibold shadow-md shadow-primary/25'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon size={16} className="shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* User Account Bar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/50">
            <div className="flex items-center justify-between px-2 py-1">
              <div className="truncate mr-2">
                <p className="text-xs font-medium text-white truncate">{user?.email || 'Admin'}</p>
                <span className="text-[10px] text-slate-400 font-mono">
                  {user?.isDemo ? 'Demo Mode' : 'Verified Admin'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                title={t('admin_logout')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-h-screen bg-slate-950 flex flex-col overflow-x-hidden">
        {/* Clean, High-Polish Top Bar on Desktop */}
        <div className="hidden md:flex items-center justify-between px-8 py-3.5 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-0 z-30">
          {/* Breadcrumb Indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-500">{t('admin_portal')}</span>
            <span className="text-slate-600">/</span>
            <div className="flex items-center gap-1.5 text-white font-bold bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700/60">
              <ActiveIcon size={14} className="text-primary" />
              <span>{activeBreadcrumb.title}</span>
            </div>
          </div>

          {/* Header Actions: Language Switcher, Live Site, Quick User Actions */}
          <div className="flex items-center gap-3">
            {/* Multi-language Selector (English, Somali, Arabic) */}
            <LanguageSelector variant="admin" />

            {/* View Live Site */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              title={t('admin_live_site')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 px-3 py-1.5 rounded-xl transition-all shadow-sm"
            >
              <ExternalLink size={13} />
              <span>{t('admin_live_site')}</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Nested Screen Route */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
