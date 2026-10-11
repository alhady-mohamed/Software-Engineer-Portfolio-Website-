import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2, Database, Globe, Cpu, Layers, Lock, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../src/context/SiteDataContext';
import { useLanguage } from '../src/context/LanguageContext';

/**
 * Hero component of the portfolio landing page.
 * Completely dynamic: managed from the Admin CMS Dashboard.
 */
const Hero: React.FC = () => {
  const { settings } = useSiteData();
  const { t } = useLanguage();
  const hero = settings.hero;
  // Staggered child node reveal triggers
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Standard spring slide-up reveal for items inside the left panel
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-dark">
      {/* Decorative Professional Grid System Backdrop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Soft abstract ambient radial glows */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Title, Intro text, CTAs, and featured technologies */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            {/* Status pill badge with pulsing online dot indicator */}
            {hero.isBadgeVisible !== false && (
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide w-fit mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {hero.badgeText || t('hero_available_badge')}
              </motion.div>
            )}

            {/* Main Title Heading styling dual accents and color transitions */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {hero.titleLine1 || 'Building the'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-secondary animate-gradient-x">
                {hero.titleLine2 || 'Digital Future'}
              </span>
            </motion.h1>
            
            {/* Short Bio snippet profiling competencies */}
            <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              {hero.bio}
            </motion.p>
            
            {/* Interactive navigation links and downloads */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link
                to={hero.primaryCtaLink || '/projects'}
                className="group flex items-center gap-2 px-8 py-3.5 bg-primary hover:opacity-90 text-dark rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                {hero.primaryCtaText || t('hero_view_work')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to={hero.secondaryCtaLink || '/contact'}
                className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all backdrop-blur-sm hover:border-white/20"
              >
                {hero.secondaryCtaText || t('hero_contact_me')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: High Fidelity Portrait Card & Floating Micro-Widgets */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Dynamic background lighting layers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-secondary/10 via-primary/5 to-transparent rounded-full blur-3xl -z-10" />

            {/* Clean, Frameless Hero Portrait Container with zero bounding boxes or fences */}
            <div className={`relative mx-auto max-w-[420px] aspect-[4/5] flex items-end justify-center transition-all duration-500 group ${
              hero.isTransparentImage !== false
                ? 'bg-transparent border-0 shadow-none overflow-visible'
                : 'rounded-3xl overflow-hidden shadow-2xl bg-slate-900/30 border border-white/5'
            }`}>
              <img
                src={hero.imageUrl || '/src/assets/images/hero_portrait_1781209944400.jpg'}
                alt={hero.imageAlt || 'Hero portrait'}
                className={`w-full h-full transition-all duration-700 ease-out group-hover:scale-105 ${
                  hero.isTransparentImage !== false || hero.imageFit === 'contain'
                    ? 'object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]'
                    : 'object-cover object-center'
                }`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/hero_portrait_1781209944400.jpg';
                }}
              />

              {/* Only show bottom gradient veil if explicitly enabled for normal rectangular cards */}
              {hero.showOverlay === true && hero.isTransparentImage === false && (
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Vertical Accent text label (subtly placed on edge, customizable) */}
              {hero.verticalBadgeText && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 py-4 px-2.5 bg-primary text-black rounded-full font-sans font-extrabold uppercase text-[8px] tracking-[0.15em] [writing-mode:vertical-lr] flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300 z-10">
                  <span className="font-sans font-black">{hero.verticalBadgeText}</span>
                  <span className="text-[7px] text-white bg-black/40 px-1.5 py-0.5 rounded-full tracking-widest font-mono">CMS</span>
                </div>
              )}

              {/* Scan to Connect widget */}
              {hero.showWidgets !== false && (
                <div className="absolute bottom-2 left-0 p-2.5 rounded-2xl bg-dark/90 backdrop-blur-md border border-white/10 flex items-center gap-2.5 shadow-xl max-w-[160px] hover:border-primary/20 transition-colors duration-300 z-10">
                  <div className="p-1.5 bg-primary/20 rounded-xl text-primary border border-primary/20 flex items-center justify-center shrink-0">
                    <QrCode size={16} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">{t('nav_contact')}</p>
                    <p className="text-[9px] font-bold text-white whitespace-nowrap">{t('hero_scan_connect')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Floating micro-badges around image (can be toggled in Admin CMS) */}
            {hero.showWidgets !== false && (
              <>
                {/* floating Badge 1: CLOUD SECURITY */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 -left-6 z-20 p-3 rounded-2xl bg-dark/95 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <Lock size={15} />
                  </div>
                  <div className="text-[9px] font-bold text-white tracking-widest mr-1">CLOUD SECURITY</div>
                </motion.div>

                {/* floating Badge 2: COGNITIVE AI */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/3 -left-12 z-20 p-3 rounded-2xl bg-dark/95 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Cpu size={15} />
                  </div>
                  <div className="text-[9px] font-bold text-white tracking-widest mr-1">COGNITIVE AI</div>
                </motion.div>

                {/* floating Badge 3: ENTERPRISE DATA */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 -left-10 z-20 p-3 rounded-2xl bg-dark/95 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <Database size={15} />
                  </div>
                  <div className="text-[9px] font-bold text-white tracking-widest mr-1">DATABASE ARCH</div>
                </motion.div>

                {/* Floating Badge 4: Status Indicator displaying live hire readiness */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 bg-dark/95 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4 z-20"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 bg-secondary rounded-full animate-ping absolute opacity-75"></div>
                    <div className="w-2.5 h-2.5 bg-secondary rounded-full relative z-10"></div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">{t('hero_status')}</p>
                    <p className="text-sm font-bold text-white">{t('hero_accepting_projects')}</p>
                  </div>
                </motion.div>
              </>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;