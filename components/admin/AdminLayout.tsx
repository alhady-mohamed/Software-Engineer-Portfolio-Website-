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
  Sun,
  Monitor,
  Sparkles,
} from 'lucide-react';

export type ThemeMode = 'day' | 'night' | 'system';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const { messages, isFirebaseConnected, settings, updateSettings, users } = useSiteData();
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

  // Theme mode management: Day / Night / System
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('theme_mode');
      if (saved === 'day' || saved === 'night' || saved === 'system') {
        return saved as ThemeMode;
      }
      if (localStorage.getItem('theme') === 'light') return 'day';
      if (localStorage.getItem('theme') === 'dark') return 'night';
      return 'system';
    } catch {
      return 'system';
    }
  });

  const [isSystemDark, setIsSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(media.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsSystemDark(e.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isMidnight = settings?.theme?.bgPalette === 'midnight';
  const effectiveTheme = themeMode === 'system' ? (isSystemDark ? 'night' : 'day') : themeMode;
  const isDayMode = effectiveTheme === 'day';

  const handleSelectThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
    try {
      localStorage.setItem('theme_mode', mode);
      const isNight = mode === 'system' ? isSystemDark : mode === 'night';
      if (!isNight) {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('midnight-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    } catch (e) {
      console.warn('Failed to save theme mode:', e);
    }
  };

  // Keep DOM classList synchronized with active theme mode
  React.useEffect(() => {
    try {
      if (isDayMode) {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('midnight-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    } catch {}
  }, [isDayMode]);

  // Determine active nav item cleanly without duplicate query hacks
  const isItemActive = (to: string, exact?: boolean) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  // Streamlined, deduplicated 3-pillar navigation structure
  const navSections = [
    {
      title: t('admin_portal', 'Governance & Dashboard'),
      items: [
        {
          to: '/admin',
          label: t('admin_overview'),
          icon: LayoutDashboard,
          exact: true,
        },
        {
          to: '/admin/users-roles',
          label: t('admin_users_roles_nav', 'Security & Access'),
          icon: ShieldCheck,
          badge: users?.length ? `${users.length}` : undefined,
        },
      ],
    },
    {
      title: t('admin_modules', 'Content Modules'),
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
      title: t('admin_system', 'Design & Settings'),
      items: [
        {
          to: '/admin/appearance',
          label: t('admin_appearance'),
          icon: Palette,
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
        isDayMode
          ? 'bg-slate-100 text-slate-900'
          : isMidnight
            ? 'bg-[#030712] text-slate-100'
            : 'bg-slate-950 text-slate-100'
      } flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white ${
        isRTL ? 'rtl' : 'ltr'
      }`}
    >
      {/* Mobile Top Header */}
      <header
        className={`md:hidden flex items-center justify-between px-4 py-3 ${
          isDayMode
            ? 'bg-white border-slate-200 shadow-sm'
            : isMidnight
              ? 'bg-[#070d19] border-slate-800'
              : 'bg-slate-900 border-slate-800'
        } border-b sticky top-0 z-40 transition-colors`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className={`text-sm font-bold leading-tight ${isDayMode ? 'text-slate-900' : 'text-white'}`}>{t('admin_portal')}</h2>
            <span className={`text-[10px] font-mono ${isDayMode ? 'text-slate-500' : 'text-slate-400'}`}>{t('admin_control_center')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle Button: Day / Night / System */}
          <button
            type="button"
            onClick={() => {
              const nextMode: ThemeMode = themeMode === 'day' ? 'night' : themeMode === 'night' ? 'system' : 'day';
              handleSelectThemeMode(nextMode);
            }}
            title={`Mode: ${themeMode.toUpperCase()} (Day / Night / System)`}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 ${
              isDayMode
                ? 'bg-slate-100 border-slate-300 text-amber-600'
                : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}
            aria-label="Toggle Theme Mode"
          >
            {themeMode === 'day' && <Sun size={16} className="text-amber-500 fill-amber-400/30" />}
            {themeMode === 'night' && <Moon size={16} className="text-indigo-400 fill-indigo-400/30" />}
            {themeMode === 'system' && <Monitor size={16} className="text-emerald-400" />}
            <span className="text-[10px] font-mono uppercase font-bold">{themeMode}</span>
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
      <main className={`flex-1 min-h-screen ${
        isDayMode
          ? 'bg-slate-50'
          : isMidnight
            ? 'bg-[#030712]'
            : 'bg-slate-950'
      } flex flex-col overflow-x-hidden transition-colors`}>
        {/* Clean, High-Polish Top Bar on Desktop */}
        <div
          className={`hidden md:flex items-center justify-between px-8 py-3.5 border-b ${
            isDayMode
              ? 'bg-white/90 border-slate-200/90 text-slate-800'
              : isMidnight
                ? 'bg-[#070d19]/90 border-slate-800/80 text-white'
                : 'bg-slate-900/60 border-slate-800/80 text-white'
          } backdrop-blur-md sticky top-0 z-30 transition-colors duration-200 shadow-sm`}
        >
          <div className="flex items-center gap-3">
            {/* Active Screen Indicator */}
            <div
              className={`flex items-center gap-2 font-bold px-3.5 py-1.5 rounded-xl border shadow-sm text-xs transition-colors ${
                isDayMode
                  ? 'bg-slate-100 border-slate-200 text-slate-900'
                  : 'bg-slate-800/80 border-slate-700/60 text-white'
              }`}
            >
              <ActiveIcon size={14} className="text-primary" />
              <span>{activeBreadcrumb.title}</span>
            </div>
          </div>

          {/* Header Actions: Day/Night/System Theme Segmented Control, Language Switcher, Live Site */}
          <div className="flex items-center gap-3">
            {/* Professional Day / Night / System Theme Switcher */}
            <div
              className={`flex items-center p-1 rounded-xl border shadow-inner transition-colors ${
                isDayMode
                  ? 'bg-slate-100 border-slate-300/80'
                  : 'bg-slate-900/95 border-slate-800'
              }`}
              role="radiogroup"
              aria-label="Theme mode selector"
            >
              {/* Day Option */}
              <button
                type="button"
                onClick={() => handleSelectThemeMode('day')}
                title="Day Mode / Maalin (Iftiin)"
                aria-checked={themeMode === 'day'}
                role="radio"
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  themeMode === 'day'
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 shadow-sm font-bold scale-[1.02]'
                    : isDayMode
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Sun
                  size={14}
                  className={`transition-transform duration-200 group-hover:rotate-45 ${
                    themeMode === 'day' ? 'text-amber-500 fill-amber-400/30' : ''
                  }`}
                />
                <span className="tracking-wide">Day</span>
              </button>

              {/* Night Option */}
              <button
                type="button"
                onClick={() => handleSelectThemeMode('night')}
                title="Night Mode / Habeen (Mugdi)"
                aria-checked={themeMode === 'night'}
                role="radio"
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  themeMode === 'night'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm font-bold scale-[1.02]'
                    : isDayMode
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Moon
                  size={14}
                  className={`transition-transform duration-200 group-hover:-rotate-12 ${
                    themeMode === 'night' ? 'text-indigo-400 fill-indigo-400/30' : ''
                  }`}
                />
                <span className="tracking-wide">Night</span>
              </button>

              {/* System Option */}
              <button
                type="button"
                onClick={() => handleSelectThemeMode('system')}
                title="System Auto Mode / Nidaamka Qalabka (Auto Detect)"
                aria-checked={themeMode === 'system'}
                role="radio"
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  themeMode === 'system'
                    ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 shadow-sm font-bold scale-[1.02]'
                    : isDayMode
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Monitor
                  size={14}
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    themeMode === 'system' ? 'text-emerald-500' : ''
                  }`}
                />
                <span className="tracking-wide">System</span>
                {themeMode === 'system' && (
                  <span className={`text-[9px] font-mono px-1 py-0.2 rounded border uppercase ${
                    isSystemDark
                      ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
                      : 'bg-amber-100 text-amber-700 border-amber-300'
                  }`}>
                    {isSystemDark ? 'Dark' : 'Light'}
                  </span>
                )}
              </button>
            </div>

            {/* Multi-language Selector (English, Somali, Arabic) */}
            <LanguageSelector variant="admin" />

            {/* View Live Site */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              title={t('admin_live_site')}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all shadow-sm ${
                isDayMode
                  ? 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-300'
                  : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700'
              }`}
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
