import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Terminal,
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Lock,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  X,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../src/context/SiteDataContext';
import { useLanguage } from '../src/context/LanguageContext';
const defaultHeroPortrait = '/assets/aistudio/black_875c126c.png';

/**
 * Hero component of the portfolio landing page.
 * Completely dynamic: managed from the Admin CMS Dashboard.
 */
const Hero: React.FC = () => {
  const { settings } = useSiteData();
  const { t } = useLanguage();
  const hero = settings.hero;

  // State for interactive QR code modal and link copy
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Compute destination link configured in Admin Dashboard
  const qrTargetLink = hero.qrCodeLink || settings.whatsappNumber || hero.secondaryCtaLink || '/contact';
  const fullScanUrl =
    typeof window !== 'undefined' && !qrTargetLink.startsWith('http') && !qrTargetLink.startsWith('//')
      ? `${window.location.origin}${qrTargetLink.startsWith('/') ? qrTargetLink : `/${qrTargetLink}`}`
      : qrTargetLink;

  // Crisp high-resolution SVG QR code generated in real-time
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    fullScanUrl
  )}&bgcolor=ffffff&color=020617&margin=10&format=svg`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullScanUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Track detected natural image aspect ratio to support 1:1 auto-scaling
  const [detectedRatio, setDetectedRatio] = useState<'1:1' | '4:5' | 'auto'>('auto');

  useEffect(() => {
    // Reset detection when imageUrl changes to recalculate on new image load
    setDetectedRatio('auto');
  }, [hero.imageUrl]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      const ratio = naturalWidth / naturalHeight;
      // If width / height is close to 1:1 (between 0.82 and 1.2), automatically switch to 1:1 square
      if (ratio >= 0.82 && ratio <= 1.2) {
        setDetectedRatio('1:1');
      } else {
        setDetectedRatio('4:5');
      }
    }
  };

  // Determine if square 1:1 mode is active:
  // Explicitly set to 1:1 OR auto-detected as square 1:1
  const isSquare =
    hero.aspectRatio === '1:1' ||
    (hero.aspectRatio !== '4:5' && (detectedRatio === '1:1' || hero.autoScale !== false && detectedRatio === '1:1'));
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
    <section id="home" className="relative min-h-screen flex items-center lg:items-end pt-20 overflow-hidden bg-dark">
      {/* Decorative Professional Grid System Backdrop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Soft abstract ambient radial glows */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center lg:items-end w-full">
          
          {/* Left Column: Title, Intro text, CTAs, and featured technologies */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ marginLeft: '20px' }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full min-w-0 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-none mx-auto lg:mx-0 lg:ml-[20px] lg:pb-10 xl:pb-14"
          >
            {/* Status pill badge with pulsing online dot indicator */}
            {hero.isBadgeVisible !== false && (
              <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide w-fit mb-6 mx-auto lg:mx-0 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {hero.badgeText || t('hero_available_badge')}
              </motion.div>
            )}

            {/* Main Title Heading styling dual accents and color transitions - Expanded Width & Centered for Mobile/Tablet */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15] w-full max-w-none break-normal [overflow-wrap:break-word] text-center lg:text-left mx-auto lg:mx-0"
            >
              {hero.titleLine1 || 'Building the'}{' '}
              <br className="hidden sm:inline lg:inline" />
              <span className="inline-block w-full max-w-none text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-secondary animate-gradient-x break-normal [overflow-wrap:break-word] mt-1 pb-3 pl-0 ml-0 mr-0">
                {hero.titleLine2 || 'Digital Future'}
              </span>
            </motion.h1>
            
            {/* Short Bio snippet profiling competencies */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-300/90 mb-8 max-w-lg sm:max-w-xl md:max-w-2xl leading-relaxed mx-auto lg:mx-0 text-center lg:text-left px-2 sm:px-0">
              {hero.bio}
            </motion.p>
            
            {/* Interactive navigation links and downloads */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto mx-auto lg:mx-0">
              <Link
                to={hero.primaryCtaLink || '/projects'}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:opacity-90 text-dark rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 text-center w-full sm:w-auto lg:w-[191px]"
              >
                {hero.primaryCtaText || t('hero_view_work')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to={hero.secondaryCtaLink || '/contact'}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all backdrop-blur-sm hover:border-white/20 text-center w-full sm:w-auto lg:w-[190px]"
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
            className="lg:col-span-5 xl:col-span-5 relative flex items-center lg:items-end justify-center mt-10 lg:mt-0 w-full lg:self-end"
          >
            {/* Dynamic background lighting layers */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-secondary/10 via-primary/5 to-transparent rounded-full blur-3xl -z-10" />

            {/* Clean, Frameless Hero Portrait Container with dynamic 1:1 Auto-Scale */}
            <div className={`relative mx-auto transition-all duration-500 group ${
              isSquare
                ? 'max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] xl:max-w-[530px] aspect-square flex items-center lg:items-end justify-center'
                : 'max-w-[370px] sm:max-w-[400px] lg:max-w-[410px] xl:max-w-[440px] max-h-[490px] lg:max-h-[530px] xl:max-h-[560px] aspect-[4/5] flex items-end justify-center'
            } ${
              hero.isTransparentImage !== false
                ? 'bg-transparent border-0 shadow-none overflow-visible'
                : 'rounded-3xl overflow-hidden shadow-2xl bg-slate-900/30 border border-white/5'
            }`}>
              <img
                src={hero.imageUrl || defaultHeroPortrait}
                alt={hero.imageAlt || 'Hero portrait'}
                onLoad={handleImageLoad}
                style={{ marginBottom: '-40px' }}
                className={`w-full h-full -mb-[40px] transition-all duration-700 ease-out origin-bottom ${
                  isSquare
                    ? 'lg:scale-[1.06] xl:scale-[1.10] group-hover:scale-[1.14]'
                    : 'scale-100 lg:scale-[0.98] xl:scale-[1.00] group-hover:scale-[1.03]'
                } ${
                  hero.isTransparentImage !== false || hero.imageFit === 'contain'
                    ? 'object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]'
                    : 'object-cover object-bottom'
                }`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.dataset.hasFailed) return;
                  target.dataset.hasFailed = 'true';
                  target.src = defaultHeroPortrait;
                }}
              />

              {/* Only show bottom gradient veil if explicitly enabled for normal rectangular cards */}
              {hero.showOverlay === true && hero.isTransparentImage === false && (
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Vertical Accent text label (subtly placed on edge, customizable) */}
              {hero.verticalBadgeText && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 py-4 px-2.5 bg-primary text-black rounded-full font-sans font-extrabold uppercase text-[8px] tracking-[0.15em] [writing-mode:vertical-lr] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300 z-10">
                  <span className="font-sans font-black">{hero.verticalBadgeText}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-dark flex items-center justify-center shadow-inner border border-black/30 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 block shadow-xs" />
                  </span>
                </div>
              )}

              {/* Scan to Connect / QR Code Widget (Interactive, Scannable & Dynamic) */}
              {hero.showWidgets !== false && hero.showQrCodeWidget !== false && (
                <a
                  href={fullScanUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQrModal(true);
                  }}
                  title={hero.qrCodeTitle || t('hero_scan_connect')}
                  aria-label={hero.qrCodeTitle || t('hero_scan_connect')}
                  className="absolute bottom-3 left-3 sm:left-4 z-20 group p-2.5 sm:p-3 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10 hover:border-primary/50 shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/15 border border-primary/25 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black transition-colors duration-300 relative">
                    <QrCode size={16} />
                  </div>
                  <div className="pr-1 text-left">
                    <p className="text-[8px] text-primary/90 font-bold uppercase tracking-wider leading-tight mb-0.5">
                      {hero.qrCodeSubtitle || t('nav_contact')}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-white whitespace-nowrap leading-tight">
                        {hero.qrCodeTitle || t('hero_scan_connect')}
                      </span>
                      <ArrowRight size={11} className="text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              )}
            </div>



          </motion.div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* INTERACTIVE QR CODE MODAL DIALOG                               */}
      {/* ============================================================== */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-7 shadow-2xl z-10 text-center space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-1">
                  <QrCode size={14} />
                  <span>{hero.qrCodeTitle || t('hero_qr_modal_title')}</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {hero.qrCodeTitle || t('hero_qr_modal_title')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  {t('hero_qr_modal_desc')}
                </p>
              </div>

              {/* Scannable QR Code Frame */}
              <div className="relative mx-auto w-52 h-52 sm:w-56 sm:h-56 p-3.5 rounded-2xl bg-white shadow-xl shadow-black/40 flex items-center justify-center group overflow-hidden">
                <img
                  src={qrCodeImageUrl}
                  alt="Scannable QR Code"
                  className="w-full h-full object-contain"
                />

                {/* Subtle scanner glow line animation */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse pointer-events-none opacity-70" />
              </div>

              {/* Camera instruction pill */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                <Smartphone size={14} className="text-primary" />
                <span>Kamaradda taleefankaaga ku toosi si aad u furto</span>
              </div>

              {/* Destination URL Box & Actions */}
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5 text-left">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Link-ga ku dhex jira (Target URL):
                </p>
                <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-200 font-mono truncate max-w-[210px]">
                    {fullScanUrl}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title={t('hero_qr_copy_link')}
                  >
                    {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="flex gap-2 pt-1">
                  <a
                    href={fullScanUrl}
                    target={fullScanUrl.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-primary hover:opacity-90 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
                  >
                    <ExternalLink size={14} />
                    <span>{t('hero_qr_open_link')}</span>
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all"
                  >
                    {copiedLink ? (
                      <>
                        <Check size={14} className="text-emerald-400" />
                        <span className="text-emerald-400">{t('hero_qr_copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>{t('hero_qr_copy_link')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;