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
  ChevronLeft,
  ChevronRight,
  Moon,
  Sparkles,
  Cpu,
  Share2,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const { messages, isFirebaseConnected, settings, updateSettings } = useSiteData();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('admin_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadMessagesCount = messages.filter((m) => !m.isRead).length;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Theme toggle state: Emerald Green (Default) vs High-Contrast 'Midnight' dark mode
  const isMidnight = settings?.theme?.bgPalette === 'midnight';
  const [isThemeToggling, setIsThemeToggling] = useState(false);

  const handleToggleTheme = async () => {
    setIsThemeToggling(true);
    try {
      const nextPalette = isMidnight ? 'emerald' : 'midnight';
      await updateSettings({
        theme: {
          ...(settings?.theme || { primaryColor: '#facc15', secondaryColor: '#22c55e' }),
          bgPalette: nextPalette,
        },
      });
    } finally {
      setIsThemeToggling(false);
    }
  };

  // Determine active nav item accounting for query parameters like ?tab=marquee
  const isItemActive = (to: string, exact?: boolean) => {
    if (to.includes('?')) {
      const [path, search] = to.split('?');
      return location.pathname === path && location.search.includes(search);
    }
    if (to === '/admin/appearance') {
      return location.pathname === '/admin/appearance' && !location.search.includes('tab=marquee') && !location.search.includes('tab=about');
    }
    return exact ? location.pathname === to : location.pathname.startsWith(to);
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
        {
          to: '/admin/appearance?tab=marquee',
          label: t('admin_marquee_nav'),
          icon: Sparkles,
          badge: settings?.marquee?.items?.length ? `${settings.marquee.items.length}` : undefined,
        },
        {
          to: '/admin/appearance?tab=about',
          label: t('admin_about_nav'),
          icon: Cpu,
          badge: settings?.about?.skills?.length ? `${settings.about.skills.length}` : undefined,
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
          to: '/admin/users-roles',
          label: t('admin_users_roles_nav', 'Security & Access'),
          icon: ShieldCheck,
        },
        {
          to: '/admin/settings#social',
          label: 'Social Profiles',
          icon: Share2,
        },
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
    if (path.startsWith('/admin/users-roles')) return { title: t('admin_users_roles_title', 'Security & Access'), icon: ShieldCheck };
    if (path.startsWith('/admin/settings')) return { title: t('admin_settings'), icon: Settings };
    return { title: t('admin_portal'), icon: Layers };
  };

  const activeBreadcrumb = getActiveTitle();
  const ActiveIcon = activeBreadcrumb.icon;

  return (
    <div
      className={`min-h-screen ${
        isMidnight ? 'bg-[#030712]' : 'bg-slate-950'
      } text-slate-100 flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white ${
        isRTL ? 'rtl' : 'ltr'
      }`}
    >
      {/* Mobile Top Header */}
      <header
        className={`md:hidden flex items-center justify-between px-4 py-3 ${
          isMidnight ? 'bg-[#070d19] border-slate-800' : 'bg-slate-900 border-slate-800'
        } border-b sticky top-0 z-40`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">{t('admin_portal')}</h2>
            <span className="text-[10px] text-slate-400 font-mono">{t('admin_control_center')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle Button */}
          <button
            type="button"
            onClick={handleToggleTheme}
            disabled={isThemeToggling}
            title={isMidnight ? 'U beddel Emerald Green' : 'U beddel Midnight Dark Mode'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isMidnight
                ? 'bg-slate-900 border-indigo-500/50 text-cyan-300 hover:text-white shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                : 'bg-slate-900 border-emerald-500/40 text-emerald-300 hover:text-white shadow-[0_0_10px_rgba(34,197,94,0.18)]'
            }`}
            aria-label="Toggle Theme"
          >
            {isMidnight ? <Moon size={16} className="fill-cyan-400/20" /> : <Sparkles size={16} />}
          </button>

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
        } h-screen ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } w-64 bg-slate-900 ${
          isRTL ? 'border-l' : 'border-r'
        } border-slate-800 flex flex-col justify-between z-50 transition-all duration-300 backdrop-blur-xl shrink-0 ${
          sidebarOpen
            ? 'translate-x-0'
            : isRTL
            ? 'translate-x-full md:translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Floating Circular Edge Toggle Button (Mounted on border) */}
        <button
          type="button"
          onClick={toggleCollapse}
          className={`hidden md:flex absolute top-6 ${
            isRTL ? '-left-3.5' : '-right-3.5'
          } z-30 w-7 h-7 rounded-full bg-slate-900 border border-slate-700/80 hover:border-rose-500 text-slate-300 hover:text-white items-center justify-center shadow-xl shadow-black/50 hover:shadow-[0_0_12px_rgba(225,29,72,0.35)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group`}
          title={isCollapsed ? `${t('admin_expand_sidebar')} (Ctrl+B)` : `${t('admin_collapse_sidebar')} (Ctrl+B)`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            isRTL ? (
              <ChevronLeft size={14} className="group-hover:text-rose-400 transition-transform group-hover:-translate-x-0.5" />
            ) : (
              <ChevronRight size={14} className="group-hover:text-rose-400 transition-transform group-hover:translate-x-0.5" />
            )
          ) : (
            isRTL ? (
              <ChevronRight size={14} className="group-hover:text-rose-400 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ChevronLeft size={14} className="group-hover:text-rose-400 transition-transform group-hover:-translate-x-0.5" />
            )
          )}
        </button>

        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden relative">
          {/* Logo Zone & Collapse Button */}
          <div
            className={`border-b border-slate-800 flex items-center transition-all duration-300 ${
              isCollapsed
                ? 'p-3 flex-col gap-2.5 justify-center items-center'
                : 'p-4 justify-between items-center'
            }`}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center w-full' : 'min-w-0'}`}>
              {settings?.branding?.logoImageUrl ? (
                <img
                  src={settings.branding.logoImageUrl}
                  alt={settings?.branding?.siteName || 'Logo'}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700/80 shadow-md shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8b151b] via-rose-700 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-950/40 shrink-0 font-bold text-sm ring-2 ring-rose-500/20"
                  title={settings?.branding?.siteName || t('admin_portal')}
                >
                  <ShieldCheck size={20} />
                </div>
              )}
              {!isCollapsed && (
                <div className="truncate min-w-0">
                  <h1 className="font-bold text-white text-sm tracking-tight truncate">
                    {settings?.branding?.siteName || t('admin_portal')}
                  </h1>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{t('admin_control_center')}</p>
                </div>
              )}
            </div>

            {/* Close button on mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
              aria-label="Close Navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Compact Connection Indicator */}
          <div className={isCollapsed ? 'px-2 pt-3 pb-1 flex justify-center' : 'px-4 pt-3 pb-1'}>
            {isCollapsed ? (
              <div
                className={`w-10 h-10 rounded-xl border flex items-center justify-center relative cursor-help transition-all ${
                  isFirebaseConnected
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
                title={isFirebaseConnected ? 'Firebase: Synced' : 'Storage: Browser Mode'}
              >
                <Database size={16} className="shrink-0 text-slate-300" />
                <span
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                    isFirebaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
              </div>
            ) : (
              <div
                className={`px-3 py-1.5 rounded-xl border text-[11px] flex items-center justify-between ${
                  isFirebaseConnected
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Database size={13} className="shrink-0 text-slate-300" />
                  <span className="truncate font-medium">
                    {isFirebaseConnected ? 'Firebase: Synced' : 'Storage: Browser Mode'}
                  </span>
                </div>
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isFirebaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
              </div>
            )}
          </div>

          {/* Grouped Navigation Links */}
          <nav className={`space-y-4 flex-1 ${isCollapsed ? 'p-2' : 'p-3'}`}>
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                {!isCollapsed ? (
                  <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </p>
                ) : (
                  sIdx > 0 && <div className="my-2 border-t border-slate-800 mx-2" />
                )}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const itemActive = isItemActive(item.to, item.exact);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.exact}
                      onClick={() => setSidebarOpen(false)}
                      title={isCollapsed ? undefined : item.label}
                      className={
                        isCollapsed
                          ? `group relative flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-all duration-200 ${
                              itemActive
                                ? 'bg-[#8b151b] text-white font-semibold shadow-lg shadow-[#8b151b]/35 ring-1 ring-rose-500/40'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                            }`
                          : `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                              itemActive
                                ? 'bg-[#8b151b] text-white font-semibold shadow-lg shadow-[#8b151b]/30 ring-1 ring-rose-500/40'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                            }`
                      }
                    >
                      {() =>
                        isCollapsed ? (
                          <>
                            <Icon size={19} className="shrink-0 transition-transform group-hover:scale-105" />
                            {item.badge !== undefined && (
                              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950 flex items-center justify-center shadow">
                                {item.badge}
                              </span>
                            )}
                            {/* Hover Flyout Tooltip in Collapsed Mode */}
                            <div
                              className={`hidden md:flex items-center gap-2 absolute ${
                                isRTL ? 'right-full mr-3.5' : 'left-full ml-3.5'
                              } px-3 py-1.5 rounded-lg bg-slate-900/95 text-white text-xs font-semibold shadow-2xl border border-slate-700/80 pointer-events-none whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 backdrop-blur-md`}
                            >
                              <span>{item.label}</span>
                              {item.badge !== undefined && (
                                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950">
                                  {item.badge}
                                </span>
                              )}
                              <div
                                className={`absolute top-1/2 -translate-y-1/2 ${
                                  isRTL ? '-right-1 border-l-slate-700 border-l-[4px]' : '-left-1 border-r-slate-700 border-r-[4px]'
                                } border-y-transparent border-y-[4px] border-solid`}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2.5 truncate">
                              <Icon
                                size={17}
                                className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                                  itemActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                                }`}
                              />
                              <span className="truncate">{item.label}</span>
                            </div>
                            {item.badge !== undefined ? (
                              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                                {item.badge}
                              </span>
                            ) : itemActive ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-300 ring-2 ring-rose-400/50 shrink-0" />
                            ) : null}
                          </>
                        )
                      }
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* User Account & Unified Sign Out Zone */}
          <div
            className={`border-t border-slate-800 bg-slate-950/70 ${
              isCollapsed ? 'p-2 space-y-2 flex flex-col items-center' : 'p-3 space-y-2.5'
            }`}
          >
            {/* User Account Info */}
            {isCollapsed ? (
              <div
                className="relative cursor-default"
                title={`${user?.email || 'Admin'} • ${user?.isDemo ? 'Demo Mode' : 'Verified Admin'}`}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {user?.email ? user.email.slice(0, 2).toUpperCase() : 'AD'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
              </div>
            ) : (
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-slate-900/70 border border-slate-800/80">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {user?.email ? user.email.slice(0, 2).toUpperCase() : 'AD'}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate leading-tight">{user?.email || 'Admin'}</p>
                  <span className="text-[10px] text-slate-400 font-mono block leading-tight">
                    {user?.isDemo ? 'Demo Mode' : 'Verified Admin'}
                  </span>
                </div>
              </div>
            )}

            {/* Single Unified Professional Sign Out Button */}
            {isCollapsed ? (
              <button
                onClick={handleLogout}
                title={t('admin_logout')}
                aria-label={t('admin_logout')}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-500 transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <LogOut size={16} />
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-500 transition-all duration-200 cursor-pointer shadow-sm group active:scale-[0.98]"
              >
                <LogOut size={15} className="transition-transform group-hover:-translate-x-0.5" />
                <span>{t('admin_logout')}</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className={`flex-1 min-h-screen ${isMidnight ? 'bg-[#030712]' : 'bg-slate-950'} flex flex-col overflow-x-hidden`}>
        {/* Clean, High-Polish Top Bar on Desktop */}
        <div
          className={`hidden md:flex items-center justify-between px-8 py-3.5 border-b border-slate-800/80 ${
            isMidnight ? 'bg-[#070d19]/80' : 'bg-slate-900/40'
          } backdrop-blur-md sticky top-0 z-30`}
        >
          <div className="flex items-center gap-3">
            {/* Active Screen Indicator */}
            <div className="flex items-center gap-1.5 text-white font-bold bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-sm text-xs">
              <ActiveIcon size={14} className="text-primary" />
              <span>{activeBreadcrumb.title}</span>
            </div>
          </div>

          {/* Header Actions: Theme Toggle, Language Switcher, Live Site */}
          <div className="flex items-center gap-3">
            {/* High-Contrast Midnight vs Emerald Green Theme Toggle */}
            <button
              type="button"
              onClick={handleToggleTheme}
              disabled={isThemeToggling}
              title={
                isMidnight
                  ? 'Guji si aad ugu beddesho Naqshadda Cagaarka ah (Switch to Emerald Green)'
                  : "Guji si aad ugu beddesho High-Contrast 'Midnight' Dark Mode"
              }
              className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm select-none ${
                isMidnight
                  ? 'bg-slate-900/90 border-indigo-500/50 text-indigo-200 hover:border-indigo-400 hover:text-white hover:bg-indigo-950/40 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                  : 'bg-slate-900/90 border-emerald-500/40 text-emerald-200 hover:border-emerald-400 hover:text-white hover:bg-emerald-950/30 shadow-[0_0_15px_rgba(34,197,94,0.18)]'
              }`}
              aria-label="Toggle High-Contrast Midnight or Emerald Green Theme"
            >
              {isMidnight ? (
                <>
                  <div className="w-5 h-5 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-cyan-300">
                    <Moon size={12} className="fill-cyan-400/30" />
                  </div>
                  <span className="font-mono text-white text-xs font-bold">Midnight</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono font-medium">
                    High-Contrast
                  </span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                    <Sparkles size={12} />
                  </div>
                  <span className="font-mono text-white text-xs font-bold">Emerald</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-medium">
                    Green
                  </span>
                </>
              )}
            </button>

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
