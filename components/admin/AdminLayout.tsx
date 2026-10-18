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
  ChevronDown,
  Check,
  Moon,
  Sun,
  Monitor,
  Sparkles,
  Mail,
  User as UserIcon,
  Clock,
  FileText,
} from 'lucide-react';

export type ThemeMode = 'day' | 'night' | 'system';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const { messages, isFirebaseConnected, settings, updateSettings, users, roles, currentUser } = useSiteData();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const activeUser = currentUser || (user ? users.find((u) => u.id === user.id) : null);
  const displayName = activeUser?.fullName || user?.fullName || user?.username || user?.email?.split('@')[0] || 'Admin';
  const roleTitle = activeUser?.roleId ? activeUser.roleId.replace(/_/g, ' ') : (user?.roleId ? user.roleId.replace(/_/g, ' ') : 'Super Admin');
  const avatarUrl = activeUser?.avatarUrl || user?.avatarUrl;
  const initials = (displayName || 'AD').slice(0, 2).toUpperCase();

  const userRole = roles?.find((r) => r.id === (activeUser?.roleId || user?.roleId));
  const roleName = userRole?.name || (roleTitle ? roleTitle.toUpperCase() : 'SUPER ADMIN');
  const userEmail = activeUser?.email || user?.email || 'admin@portfolio.local';
  const username = activeUser?.username || user?.username || 'admin';
  const description = activeUser?.notes || userRole?.description || 'Awood buuxda oo maamul, xakameynta amniga (RBAC), iyo beddelidda nidaamka oo dhan.';
  const lastLoginText = activeUser?.lastLoginAt ? new Date(activeUser.lastLoginAt).toLocaleString() : undefined;

  const siteFaviconUrl =
    settings?.branding?.faviconUrl ||
    settings?.branding?.siteIconUrl ||
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='25' fill='%2322c55e'/%3E%3Ctext x='50' y='67' font-size='52' font-family='sans-serif' font-weight='900' text-anchor='middle' fill='%23050b14'%3EM%3C/text%3E%3C/svg%3E";

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

  // Dropdown open/close state for top bar theme selector and user profile popover
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = React.useRef<HTMLDivElement>(null);

  const [userProfileDropdownOpen, setUserProfileDropdownOpen] = useState(false);
  const userProfileDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
      if (userProfileDropdownRef.current && !userProfileDropdownRef.current.contains(e.target as Node)) {
        setUserProfileDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setThemeDropdownOpen(false);
        setUserProfileDropdownOpen(false);
      }
    };
    if (themeDropdownOpen || userProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [themeDropdownOpen, userProfileDropdownOpen]);

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
      className={`h-screen max-h-screen overflow-hidden ${
        isDayMode
          ? 'bg-slate-100 text-slate-900'
          : isMidnight
            ? 'bg-[#030712] text-slate-100'
            : 'bg-slate-950 text-slate-100'
      } flex flex-col md:flex-row font-sans selection:bg-primary selection:text-white ${
        isRTL ? 'rtl' : 'ltr'
      }`}
    >
      {/* Mobile Top Header - Stable & Fixed */}
      <header
        className={`md:hidden shrink-0 flex items-center justify-between px-4 py-3 ${
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

          {/* User Account Avatar in Mobile Header Corner */}
          <div
            className="flex items-center relative"
            title={`${displayName} • ${roleTitle}`}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-7 h-7 rounded-lg object-cover border border-slate-700/80 shadow-sm"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-[10px] shadow-sm">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950" />
          </div>

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
          } z-[60] w-7 h-7 rounded-full bg-slate-900 border border-slate-700/90 hover:border-primary text-slate-300 hover:text-white items-center justify-center shadow-2xl shadow-black/80 ring-1 ring-white/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer group`}
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
          {/* Logo Zone & Collapse Button - Standalone Enclosed Section with Bottom Divider */}
          <div
            className={`sticky top-0 z-30 shrink-0 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md transition-all duration-300 flex items-center ${
              isCollapsed
                ? 'h-[70.4px] px-2 justify-center'
                : 'h-[70.4px] w-[256.2px] max-w-full px-3.5'
            }`}
          >
            <div className={`flex items-center w-full ${isCollapsed ? 'flex-col gap-2 justify-center' : 'justify-between'}`}>
              <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center w-full' : 'min-w-0'}`}>
                <img
                  src={siteFaviconUrl}
                  alt={settings?.branding?.siteName || 'Favicon'}
                  className="w-[40px] h-[42px] rounded-xl object-contain border border-slate-700/80 shadow-md shrink-0 p-0 bg-slate-900/90"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='25' fill='%2322c55e'/%3E%3Ctext x='50' y='67' font-size='52' font-family='sans-serif' font-weight='900' text-anchor='middle' fill='%23050b14'%3EM%3C/text%3E%3C/svg%3E";
                  }}
                />
                {!isCollapsed && (
                  <div className="truncate min-w-0">
                    <h1 className="font-bold text-white text-[19px] tracking-tight truncate leading-tight">
                      {settings?.branding?.siteName || t('admin_portal')}
                    </h1>
                    <p className="text-[11px] text-slate-400 font-mono truncate leading-tight mt-0.5">{t('admin_control_center')}</p>
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
          </div>

          {/* Crisp Horizontal Divider Below Header */}
          <div className="h-px w-full bg-slate-800/80 shrink-0 shadow-sm" />



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

        </div>
      </aside>

      {/* Main Content Pane */}
      <main className={`flex-1 h-full min-w-0 min-h-0 ${
        isDayMode
          ? 'bg-slate-50'
          : isMidnight
            ? 'bg-[#030712]'
            : 'bg-slate-950'
      } flex flex-col overflow-hidden transition-colors`}>
        {/* Clean, High-Polish Top Bar on Desktop - Stable, Fixed & Standing */}
        <div
          className={`hidden md:flex items-center justify-between px-8 py-3.5 border-b ${
            isDayMode
              ? 'bg-white/95 border-slate-200/90 text-slate-800'
              : isMidnight
                ? 'bg-[#070d19]/95 border-slate-800/80 text-white'
                : 'bg-slate-900/90 border-slate-800/80 text-white'
          } backdrop-blur-md shrink-0 sticky top-0 z-30 transition-colors duration-200 shadow-sm`}
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
            {/* Professional Day / Night / System Theme Dropdown */}
            <div ref={themeDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setThemeDropdownOpen((prev) => !prev)}
                title={`Theme Mode: ${themeMode.toUpperCase()} (Riix si aad u doorato)`}
                aria-expanded={themeDropdownOpen}
                aria-haspopup="listbox"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                  themeDropdownOpen
                    ? isDayMode
                      ? 'bg-amber-500/10 border-amber-500/50 text-slate-900 ring-2 ring-amber-500/20'
                      : 'bg-indigo-500/20 border-indigo-500/50 text-white ring-2 ring-indigo-500/20'
                    : isDayMode
                      ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-800'
                      : isMidnight
                        ? 'bg-[#0d1527] hover:bg-[#121c33] border-slate-800 text-slate-200'
                        : 'bg-slate-900 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                }`}
              >
                {themeMode === 'day' && (
                  <Sun size={15} className="text-amber-500 fill-amber-400/30 shrink-0" />
                )}
                {themeMode === 'night' && (
                  <Moon size={15} className="text-indigo-400 fill-indigo-400/30 shrink-0" />
                )}
                {themeMode === 'system' && (
                  <Monitor size={15} className="text-emerald-400 shrink-0" />
                )}

                <span className="capitalize font-medium">
                  {themeMode === 'day' ? 'Day' : themeMode === 'night' ? 'Night' : 'System'}
                </span>

                {themeMode === 'system' && (
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded border uppercase font-bold ${
                      isSystemDark
                        ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
                        : 'bg-amber-100 text-amber-700 border-amber-300'
                    }`}
                  >
                    {isSystemDark ? 'Dark' : 'Light'}
                  </span>
                )}

                <ChevronDown
                  size={13}
                  className={`text-slate-400 transition-transform duration-200 ${
                    themeDropdownOpen ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>

              {/* Theme Dropdown Menu */}
              {themeDropdownOpen && (
                <div
                  role="listbox"
                  className={`absolute ${
                    isRTL ? 'left-0' : 'right-0'
                  } mt-2 w-56 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDayMode
                      ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50'
                      : isMidnight
                        ? 'bg-[#09101f]/95 border-slate-800 text-slate-100 shadow-black/80'
                        : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-black/80'
                  }`}
                >
                  <div className="px-2.5 py-1.5 mb-1 border-b border-slate-700/40 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Dooro Theme-ka
                    </span>
                    <span className="text-[9px] font-mono text-primary font-bold">
                      {themeMode.toUpperCase()}
                    </span>
                  </div>

                  {/* Day Option */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={themeMode === 'day'}
                    onClick={() => {
                      handleSelectThemeMode('day');
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                      themeMode === 'day'
                        ? isDayMode
                          ? 'bg-amber-500/15 text-amber-800 font-bold'
                          : 'bg-amber-500/20 text-amber-300 font-bold'
                        : isDayMode
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-slate-800/70 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                        <Sun size={15} className="fill-amber-400/30" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold leading-tight">Day (Maalin)</p>
                        <p className="text-[10px] text-slate-400">Iftiin cad oo nadiif ah</p>
                      </div>
                    </div>
                    {themeMode === 'day' && <Check size={14} className="text-amber-500 shrink-0 ml-2" />}
                  </button>

                  {/* Night Option */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={themeMode === 'night'}
                    onClick={() => {
                      handleSelectThemeMode('night');
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer mt-0.5 ${
                      themeMode === 'night'
                        ? isDayMode
                          ? 'bg-indigo-500/15 text-indigo-800 font-bold'
                          : 'bg-indigo-500/20 text-indigo-300 font-bold'
                        : isDayMode
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-slate-800/70 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                        <Moon size={15} className="fill-indigo-400/30" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold leading-tight">Night (Habeen)</p>
                        <p className="text-[10px] text-slate-400">Mugdi indhaha u roon</p>
                      </div>
                    </div>
                    {themeMode === 'night' && <Check size={14} className="text-indigo-400 shrink-0 ml-2" />}
                  </button>

                  {/* System Option */}
                  <button
                    type="button"
                    role="option"
                    aria-selected={themeMode === 'system'}
                    onClick={() => {
                      handleSelectThemeMode('system');
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all cursor-pointer mt-0.5 ${
                      themeMode === 'system'
                        ? isDayMode
                          ? 'bg-emerald-500/15 text-emerald-800 font-bold'
                          : 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : isDayMode
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-slate-800/70 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Monitor size={15} />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold leading-tight">System Auto</p>
                        <p className="text-[10px] text-slate-400">
                          La jaanqaad qalabka ({isSystemDark ? 'Dark' : 'Light'})
                        </p>
                      </div>
                    </div>
                    {themeMode === 'system' && <Check size={14} className="text-emerald-400 shrink-0 ml-2" />}
                  </button>
                </div>
              )}
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

            {/* Subtle Divider */}
            <div className={`h-6 w-px ${isDayMode ? 'bg-slate-300' : 'bg-slate-800'} mx-0.5`} />

            {/* User Profile Dropdown Popover in Top Header Corner */}
            <div ref={userProfileDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setUserProfileDropdownOpen((prev) => !prev)}
                aria-expanded={userProfileDropdownOpen}
                aria-haspopup="dialog"
                title={`${displayName} (@${username}) • Riix si aad u aragto profile-ka`}
                className={`flex items-center gap-2.5 py-1.5 px-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-sm group ${
                  userProfileDropdownOpen
                    ? isDayMode
                      ? 'bg-primary/10 border-primary text-slate-900 ring-2 ring-primary/20'
                      : 'bg-primary/20 border-primary/60 text-white ring-2 ring-primary/20'
                    : isDayMode
                      ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-800'
                      : isMidnight
                        ? 'bg-[#0b1220] hover:bg-[#121c33] border-slate-800 text-white'
                        : 'bg-slate-900/90 hover:bg-slate-850 border-slate-800 text-white'
                }`}
              >
                <div className="relative shrink-0">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-700/80 shadow-sm"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-[11px] shadow-sm">
                      {initials}
                    </div>
                  )}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950 animate-pulse" />
                </div>
                <div className="hidden xl:block text-left min-w-0 max-w-[130px]">
                  <p className={`text-xs font-semibold leading-tight truncate ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
                    {displayName}
                  </p>
                  <span className={`text-[10px] font-mono block leading-tight capitalize truncate ${isDayMode ? 'text-slate-500' : 'text-slate-400'}`}>
                    {roleTitle}
                  </span>
                </div>
                <ChevronDown
                  size={13}
                  className={`text-slate-400 transition-transform duration-200 ${
                    userProfileDropdownOpen ? 'rotate-180 text-primary' : 'group-hover:text-slate-200'
                  }`}
                />
              </button>

              {/* User Profile Popover Card - Compact, Organized & Executive Design */}
              {userProfileDropdownOpen && (
                <div
                  className={`absolute ${
                    isRTL ? 'left-0' : 'right-0'
                  } mt-2 w-72 sm:w-80 rounded-2xl border p-3 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    isDayMode
                      ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/50'
                      : isMidnight
                        ? 'bg-[#09101f]/95 border-slate-800 text-slate-100 shadow-black/80'
                        : 'bg-slate-900/95 border-slate-800 text-slate-100 shadow-black/80'
                  }`}
                >
                  {/* Compact Header: Avatar + Identity */}
                  <div className="flex items-center gap-3 p-1 pb-2.5 border-b border-slate-800/70">
                    <div className="relative shrink-0">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-10 h-10 rounded-xl object-cover border border-primary/30 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {initials}
                        </div>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className={`text-xs font-bold truncate leading-tight ${isDayMode ? 'text-slate-900' : 'text-white'}`}>
                          {displayName}
                        </h4>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-primary font-mono truncate leading-tight mt-0.5">
                        @{username}
                      </p>
                      <span className={`inline-block text-[10px] font-medium capitalize truncate mt-0.5 ${isDayMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {roleName}
                      </span>
                    </div>
                  </div>

                  {/* Compact Body: Essential User Info */}
                  <div className="py-2.5 px-1 space-y-2 text-xs">
                    {/* Email item */}
                    <div className="flex items-center gap-2 text-[11px]">
                      <Mail size={13} className="text-slate-400 shrink-0" />
                      <span className={`truncate font-medium ${isDayMode ? 'text-slate-700' : 'text-slate-200'}`} title={userEmail}>
                        {userEmail}
                      </span>
                    </div>

                    {/* Description snippet */}
                    <div className="flex items-start gap-2 text-[11px]">
                      <FileText size={13} className="text-slate-400 shrink-0 mt-0.5" />
                      <p className={`line-clamp-2 leading-relaxed text-[11px] ${isDayMode ? 'text-slate-600' : 'text-slate-300'}`} title={description}>
                        {description}
                      </p>
                    </div>

                    {/* Last active info */}
                    {lastLoginText && (
                      <div className={`flex items-center gap-2 pt-0.5 text-[10px] font-mono ${isDayMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Clock size={11} className="shrink-0" />
                        <span className="truncate">Joogitaankii: {lastLoginText}</span>
                      </div>
                    )}
                  </div>

                  {/* Compact Footer: Sleek Sign Out Button */}
                  <div className="pt-2 border-t border-slate-800/70">
                    <button
                      type="button"
                      onClick={() => {
                        setUserProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full py-1.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-500 text-rose-300 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                      <LogOut size={13} />
                      <span>Ka Bax (Sign Out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Viewport - Only this bottom section scrolls */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
