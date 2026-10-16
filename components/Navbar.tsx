import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { useSiteData } from '../src/context/SiteDataContext';
import { useLanguage } from '../src/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

/**
 * Global Header Navbar Component
 * Maintains reactive scroll states, light/dark styling togglers, and collapsible mobile drawer states.
 * Fully responsive across devices with optimal absolute blur layer integration.
 */
const Navbar: React.FC = () => {
  const { settings } = useSiteData();
  const branding = settings.branding;

  // tracks standard vertical window scroll height to add design borders and blur depth on downscroll
  const [isScrolled, setIsScrolled] = useState(false);
  // controls show/hide state of mobile drop down links
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // handles visual mode context
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check local storage or system preference to read saved user design theme
    if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }

    // Scroll listeners toggling isScrolled flag upon cross-sliding index 20px
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Switches theme context classes between dark and light variants and stores preferences
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav_home'), href: '/' },
    { label: t('nav_about'), href: '/about' },
    { label: t('nav_projects'), href: '/projects' },
    { label: t('nav_contact'), href: '/contact' },
  ];

  const isFullLogo = branding?.logoType === 'full';
  const showSiteName = !isFullLogo && (branding?.showSiteName !== false);
  const logoOrientation = branding?.logoOrientation || 'auto';

  // Responsive styling according to orientation
  const getNavbarLogoClass = () => {
    switch (logoOrientation) {
      case 'landscape':
        return 'h-9 sm:h-10 w-auto max-w-[200px] sm:max-w-[240px] object-contain';
      case 'square':
        return 'h-9 w-9 sm:h-10 sm:w-10 object-contain';
      case 'vertical':
        return 'h-10 sm:h-11 w-auto max-w-[120px] object-contain';
      case 'auto':
      default:
        return 'h-9 sm:h-10 w-auto max-w-[220px] object-contain';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark/95 backdrop-blur-md border-b border-white/10 py-3 lg:py-4'
          : 'bg-dark/50 backdrop-blur-sm py-4 lg:py-6'
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        {/* Brand Logo - Wraps back to top of root page */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0">
          {isFullLogo && branding?.logoImageUrl ? (
            <div className="flex items-center group-hover:opacity-90 transition-opacity shrink-0">
              <img
                src={branding.logoImageUrl}
                alt={branding.siteName}
                className={getNavbarLogoClass()}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : branding?.logoType === 'image' && branding?.logoImageUrl ? (
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-gradient-to-tr from-primary/10 to-secondary/10 border border-white/10 rounded-xl group-hover:scale-105 transition-transform overflow-hidden shrink-0 shadow-md shadow-primary/10 p-1">
              <img
                src={branding.logoImageUrl}
                alt={branding.siteName}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-gradient-to-tr from-primary to-secondary rounded-xl group-hover:scale-105 transition-transform overflow-hidden shrink-0 shadow-md shadow-primary/20">
              <span className="text-white font-bold text-xs sm:text-sm tracking-widest">{branding?.logoText || 'M&A'}</span>
            </div>
          )}

          {showSiteName && (
            <span className="text-base sm:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap truncate max-w-[130px] sm:max-w-[180px] lg:max-w-none">
              {branding?.siteName || 'Mohamed Alhady'}
            </span>
          )}
        </Link>

        {/* Desktop & Laptop Navigation Links */}
        <div className="hidden md:flex items-center gap-2.5 md:gap-3.5 lg:gap-5 xl:gap-6 shrink-0">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-2.5 lg:gap-4 xl:gap-5">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `text-xs md:text-[13px] lg:text-sm font-medium px-2 py-1 rounded-lg relative group transition-colors whitespace-nowrap ${
                    isActive ? 'text-primary font-semibold' : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {/* Decorative glowing bottom slider line active upon navigation */}
                    <span
                      className={`absolute -bottom-1 left-2 right-2 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          {/* Controls group */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            {/* Language Switcher Dropdown (English, Somali, Arabic) */}
            <LanguageSelector variant="public" />

            {/* Light/Dark Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} className="lg:w-5 lg:h-5" /> : <Moon size={18} className="lg:w-5 lg:h-5" />}
            </button>

            {/* Action Call for custom engagement */}
            <a
              href={settings.whatsappNumber || "https://wa.link/cs6dy4"}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 md:px-3.5 md:py-1.5 lg:px-5 lg:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-xs lg:text-sm font-medium text-white shadow-sm whitespace-nowrap shrink-0 hover:border-white/20 hover:scale-[1.02]"
            >
              {t('nav_hire_me')}
            </a>
          </div>
        </div>

        {/* Mobile Toolbar Trigger Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Luqadda / Language:</span>
                <LanguageSelector variant="public" />
              </div>
              <a
                href={settings.whatsappNumber || "https://wa.link/cs6dy4"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 text-center px-5 py-3 rounded-lg bg-primary text-dark font-bold hover:opacity-90 transition-colors"
              >
                {t('nav_hire_me')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;