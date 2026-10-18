import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Palette, Zap, LayoutGrid, Github, ExternalLink, Video, Megaphone, Star, MessageSquareQuote, Sparkles } from 'lucide-react';
import Hero from './Hero';
import { PROJECTS, EXPERIENCE } from '../constants';
import { useSiteData } from '../src/context/SiteDataContext';
import { MarqueeLogoItem } from '../types';

// High-fidelity brand SVG icons for tech stacks and partner ecosystems
const renderTechLogo = (name?: string, iconName?: string) => {
  const key = `${iconName || ''} ${name || ''}`.toLowerCase().trim();

  if (key.includes('react')) {
    return (
      <svg className="w-5 h-5 text-cyan-400 shrink-0" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }
  if (key.includes('next')) {
    return (
      <svg className="w-5 h-5 text-white shrink-0" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="88" fill="#000" stroke="#333" strokeWidth="4" />
        <path d="M149.5 157.5L69.1 54H54v72h12V69.4l74 95.4c3.3-2.2 6.5-4.6 9.5-7.3z" fill="#FFF" />
        <rect x="115" y="54" width="12" height="72" fill="#FFF" />
      </svg>
    );
  }
  if (key.includes('ts') || key.includes('typescript')) {
    return (
      <svg className="w-5 h-5 shrink-0 rounded" viewBox="0 0 128 128">
        <rect width="128" height="128" fill="#3178C6" rx="16" />
        <path d="M113.8 63.8c-1.7-1.1-4-2.2-6.8-3.3-2.9-1.1-6-2.2-9.4-3.3-3.4-1.1-6.8-2.3-10-3.6-3.3-1.3-6.1-2.9-8.5-4.8-2.4-1.9-4.2-4.3-5.3-7.1-1.1-2.8-1.7-6.2-1.7-10.2 0-4.6 1-8.7 3-12.4 2-3.7 4.9-6.8 8.6-9.2 3.7-2.4 8.2-4.2 13.5-5.3 5.3-1.1 11.2-1.7 17.7-1.7 4.2 0 8.2.4 12 1.1 3.8.7 7.2 1.8 10.2 3.2v20.4c-3.1-2-6.5-3.6-10.2-4.8-3.7-1.2-7.5-1.8-11.4-1.8-3.6 0-6.6.5-9 1.6-2.4 1.1-4.2 2.5-5.5 4.3-1.3 1.8-1.9 3.8-1.9 6.2 0 2.2.5 4.1 1.6 5.6 1.1 1.5 2.6 2.8 4.6 3.9 2 1.1 4.4 2.1 7.2 3 2.8.9 5.8 1.9 9.1 3 3.3 1.1 6.7 2.4 10.2 3.8 3.5 1.4 6.7 3.2 9.5 5.3 2.8 2.1 5 4.8 6.6 8 1.6 3.2 2.4 7.2 2.4 12 0 4.9-1.1 9.3-3.2 13.2-2.1 3.9-5.1 7.1-8.9 9.6-3.8 2.5-8.4 4.3-13.8 5.4-5.4 1.1-11.4 1.7-18 1.7-5.1 0-10-.6-14.7-1.8-4.7-1.2-8.9-3-12.6-5.4V82.7c3.9 2.7 8.2 4.8 12.9 6.3 4.7 1.5 9.5 2.2 14.4 2.2 4.1 0 7.6-.6 10.4-1.8 2.8-1.2 4.9-2.9 6.4-5 1.5-2.1 2.2-4.7 2.2-7.8 0-2.8-.7-5.1-2.1-6.9-1.4-1.8-3.4-3.4-6-4.7zM36.4 29.5v88.2H14.1V29.5H0V11.2h49.6v18.3H36.4z" fill="#FFF" />
      </svg>
    );
  }
  if (key.includes('tailwind') || key.includes('css') || key.includes('layout')) {
    return (
      <svg className="w-5 h-5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    );
  }
  if (key.includes('node') || key.includes('server')) {
    return (
      <svg className="w-5 h-5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3 7.2v10.4l9 5.2 9-5.2V7.2L12 2zm6.75 14.28L12 20.35l-6.75-4.07V8.62L12 4.55l6.75 4.07v7.66z" />
      </svg>
    );
  }
  if (key.includes('figma') || key.includes('palette') || key.includes('ui')) {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    );
  }
  if (key.includes('python')) {
    return (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 110 110">
        <path d="M54.5 1c-26.6 0-25 11.5-25 11.5l.03 12h25.4v3.6H17.8C6.1 28.1 0 35.2 0 46.9c0 13.5 8.1 18.2 18.2 18.2h7.6v-10.7c0-7.8 7.1-14.7 15.2-14.7h25.3c6.7 0 12.2-5.7 12.2-12.4V13.1S80.4 1 54.5 1zm-13.6 7.4c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z" fill="#366D9C"/>
        <path d="M55.5 109c26.6 0 25-11.5 25-11.5l-.03-12H55.1v-3.6h37.1c11.7 0 17.8-7.1 17.8-18.8 0-13.5-8.1-18.2-18.2-18.2h-7.6v10.7c0 7.8-7.1 14.7-15.2 14.7H43.7c-6.7 0-12.2 5.7-12.2 12.4v14.2s-1.9 12.1 24 12.1zm13.6-7.4c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="#FFD845"/>
      </svg>
    );
  }
  if (key.includes('docker')) {
    return (
      <svg className="w-5 h-5 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186zm-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.929 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185zm-2.965 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.888c0 .102.084.185.186.185zm-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.207a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185m21.758-1.554c-.37-.478-.89-.785-1.464-.863-.585-.08-1.168.04-1.688.334-.747.42-1.353 1.055-1.765 1.833-.87-.333-1.802-.497-2.738-.497H1.144c-.63 0-1.144.513-1.144 1.144v.228c0 3.743 1.623 7.303 4.475 9.813 2.85 2.511 6.58 3.896 10.457 3.896 6.945 0 13.064-4.225 15.35-10.601.557-1.55.728-3.21.503-4.853-.02-.14-.078-.27-.168-.374z" />
      </svg>
    );
  }
  if (key.includes('github') || key.includes('git')) {
    return <Github size={20} className="text-white shrink-0" />;
  }
  if (key.includes('video') || key.includes('media')) {
    return <Video size={20} className="text-amber-400 shrink-0" />;
  }
  if (key.includes('marketing') || key.includes('social')) {
    return <Megaphone size={20} className="text-emerald-400 shrink-0" />;
  }
  return <Code2 size={20} className="text-primary shrink-0" />;
};

// Robust single Marquee Logo Card component with error fallback
const MarqueeLogoItemCard: React.FC<{
  logo: MarqueeLogoItem;
  monochromeFilter: boolean;
}> = ({ logo, monochromeFilter }) => {
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(logo.logoUrl && !imgError);

  const innerContent = (
    <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-primary/40 text-slate-300 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 group/item shrink-0 select-none shadow-sm hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm">
      {showImage ? (
        <div className="h-6 sm:h-7 min-w-[24px] flex items-center justify-center shrink-0">
          <img
            src={logo.logoUrl}
            alt={logo.name || 'Brand Logo'}
            onError={() => setImgError(true)}
            className={`h-5 sm:h-6 w-auto max-w-[120px] object-contain transition-all duration-300 ${
              monochromeFilter
                ? 'filter grayscale brightness-90 group-hover/item:grayscale-0 group-hover/item:brightness-110 opacity-80 group-hover/item:opacity-100'
                : 'opacity-90 group-hover/item:opacity-100'
            }`}
          />
        </div>
      ) : (
        renderTechLogo(logo.name, logo.iconName)
      )}
      {logo.displayMode !== 'logo-only' && (
        <span className="tracking-wider whitespace-nowrap font-semibold">
          {logo.name}
        </span>
      )}
    </div>
  );

  if (logo.websiteUrl) {
    return (
      <a
        href={logo.websiteUrl}
        target="_blank"
        rel="noreferrer"
        className="transition-transform hover:scale-105 inline-flex items-center shrink-0"
        title={logo.name}
      >
        {innerContent}
      </a>
    );
  }
  return innerContent;
};

const Home: React.FC = () => {
  const { projects: dynamicProjects, testimonials, timelines, settings } = useSiteData();
  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : PROJECTS;

  // Marquee settings & dynamic logo items
  const marqueeSettings = settings?.marquee;
  const isMarqueeEnabled = marqueeSettings?.isEnabled !== false;
  const marqueeSpeed = marqueeSettings?.speed || 30;
  const pauseOnHover = marqueeSettings?.pauseOnHover !== false;
  const monochromeFilter = marqueeSettings?.monochromeFilter !== false;

  const defaultMarqueeLogos: MarqueeLogoItem[] = [
    { id: '1', name: 'React', iconName: 'react', displayMode: 'both', isActive: true },
    { id: '2', name: 'Next.js', iconName: 'next', displayMode: 'both', isActive: true },
    { id: '3', name: 'TypeScript', iconName: 'typescript', displayMode: 'both', isActive: true },
    { id: '4', name: 'Tailwind CSS', iconName: 'tailwind', displayMode: 'both', isActive: true },
    { id: '5', name: 'Node.js', iconName: 'node', displayMode: 'both', isActive: true },
    { id: '6', name: 'UI/UX Design', iconName: 'figma', displayMode: 'both', isActive: true },
  ];

  const activeLogos = (marqueeSettings?.items && marqueeSettings.items.length > 0)
    ? marqueeSettings.items.filter((item) => item.isActive !== false)
    : defaultMarqueeLogos;

  // Prioritize featured projects from CMS, fill remaining slots up to 3 (or show all up to 6)
  const cmsFeatured = allProjects.filter((p) => p.featured);
  const nonFeatured = allProjects.filter((p) => !p.featured);
  const featuredProjects = cmsFeatured.length >= 3
    ? cmsFeatured.slice(0, 6)
    : [...cmsFeatured, ...nonFeatured].slice(0, 3);

  // Dynamic experiences from CMS
  const dynamicExp = timelines.filter((t) => t.type === 'experience');
  const featuredExperience = dynamicExp.length > 0
    ? dynamicExp.slice(0, 2).map((e) => ({
        id: e.id,
        role: e.title,
        company: e.institution,
        period: e.period,
        description: e.description,
      }))
    : EXPERIENCE.slice(0, 2);

  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const getShortDescription = (proj?: { summary?: string; description?: string }) => {
    if (!proj) return '';
    if (proj.summary && proj.summary.trim()) {
      return proj.summary
        .replace(/<[^>]*>/g, '')
        .replace(/^[#*>-]+\s*/gm, '')
        .replace(/[*_~`]/g, '')
        .trim();
    }
    if (proj.description && proj.description.trim()) {
      const plain = proj.description
        .replace(/<[^>]*>/g, '')
        .replace(/^[#*>-]+\s*/gm, '')
        .replace(/[*_~`]/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/\n+/g, ' ')
        .trim();
      return plain.length > 140 ? `${plain.slice(0, 140)}...` : plain;
    }
    return '';
  };

  return (
    <div className="bg-dark min-h-screen">
      {/* Intro hero showcasing title assets */}
      <Hero />
      
      {/* Infinite Tech Stack & Brand Logos Marquee loop banner */}
      {isMarqueeEnabled && activeLogos.length > 0 && (
        <section className={`py-10 md:py-14 border-y border-white/[0.08] bg-slate-950/70 backdrop-blur-md overflow-hidden relative ${pauseOnHover ? 'group-marquee' : ''}`}>
          {/* Subtle ambient spotlight glow behind marquee */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-36 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with Title */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 mx-auto">
              <span className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-primary/60" />
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400 font-bold flex items-center gap-2 select-none text-center">
                <Sparkles size={13} className="text-primary shrink-0" />
                {marqueeSettings?.sectionTitle || 'Trusted Technologies & Brand Partners'}
              </span>
              <span className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent via-primary/30 to-primary/60" />
            </div>
          </div>

          {/* Vignette mask overlays targeting seamless crop entries */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-28 md:w-56 bg-gradient-to-r from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-28 md:w-56 bg-gradient-to-l from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
          
          {/* Continuous Hardware-Accelerated Marquee Strip */}
          <div className="flex overflow-hidden">
            <div
              className="animate-marquee-smooth flex items-center gap-4 sm:gap-6 px-4"
              style={{ ['--marquee-speed' as string]: `${marqueeSpeed}s` }}
            >
              {/* Seamless quad repetition ensuring no blank space or glitches on any screen size */}
              {[0, 1, 2, 3].flatMap((setIdx) =>
                activeLogos.map((logo, logoIdx) => (
                  <MarqueeLogoItemCard
                    key={`marquee-${setIdx}-${logo.id || logoIdx}-${logo.name}`}
                    logo={logo}
                    monochromeFilter={monochromeFilter}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services Section displaying modular capability descriptions split in three */}
      <section className="py-24 relative overflow-hidden bg-slate-900/10 border-b border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header titles highlighting capabilities */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Engineered Solutions
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-secondary">Core Capabilities</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Delivering high-performance, accessible digital products through rigorous architecture standards, modern technology stacks, and human-centric design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Capability Card 1: Software Development */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="group bg-slate-900/40 border border-white/5 hover:border-primary/20 p-8 md:p-10 rounded-[2rem] hover:bg-slate-900/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 h-full shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Code2 size={26} />
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-500 tracking-widest group-hover:text-primary transition-colors">01 / DEV</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Software Development</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Scaffolding sturdy websites, performant APIs, and type-safe frontends using modern, clean architecture.
                </p>
              </div>
              
              <ul className="space-y-3.5 border-t border-white/5 pt-6 text-xs text-gray-400 font-medium font-sans">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Full-Stack Architecture
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Frontend & UI Development
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Responsive & Accessible Apps
                </li>
              </ul>
            </motion.div>

            {/* Capability Card 2: Branding */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="group bg-slate-900/40 border border-white/5 hover:border-secondary/20 p-8 md:p-10 rounded-[2rem] hover:bg-slate-900/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 h-full shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Palette size={26} />
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-500 tracking-widest group-hover:text-secondary transition-colors">02 / BRD</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">Branding & Visual Identity</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Creating memorable brand experiences through cohesive visual language, typography, and logo design that resonates.
                </p>
              </div>
              
              <ul className="space-y-3.5 border-t border-white/5 pt-6 text-xs text-gray-400 font-medium font-sans">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Logo & Typography Systems
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Brand Guidelines & Books
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Visual Asset Creation
                </li>
              </ul>
            </motion.div>
            
            {/* Capability Card 3: Visual interfaces, animations and responsive elements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-slate-900/40 border border-white/5 hover:border-primary/20 p-8 md:p-10 rounded-[2rem] hover:bg-slate-900/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 h-full shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Video size={26} />
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-500 tracking-widest group-hover:text-primary transition-colors">03 / VID</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">Video Production</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Crafting compelling visual narratives from pre-production planning to final cut editing and color grading.
                </p>
              </div>
              
              <ul className="space-y-3.5 border-t border-white/5 pt-6 text-xs text-gray-400 font-medium font-sans">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Storyboarding & Direction
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  High-Quality Video Editing
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Motion Graphics & VFX
                </li>
              </ul>
            </motion.div>

            {/* Capability Card 4: Optimizations, loading checks, SEO integrations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-slate-900/40 border border-white/5 hover:border-secondary/20 p-8 md:p-10 rounded-[2rem] hover:bg-slate-900/60 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 h-full shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors pointer-events-none" />
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Megaphone size={26} />
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-500 tracking-widest group-hover:text-secondary transition-colors">04 / SMM</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">Social Media Marketing</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Strategizing and executing impactful campaigns to build communities, drive engagement, and grow online presence.
                </p>
              </div>
              
              <ul className="space-y-3.5 border-t border-white/5 pt-6 text-xs text-gray-400 font-medium font-sans">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Content Strategy & Planning
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Community Engagement
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Paid Ads & Analytics
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Work grid presenting 3 top pieces */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-primary font-medium tracking-wider text-sm uppercase mb-4">
                <LayoutGrid size={16} />
                <span>Selected Work</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Recent Projects
              </h2>
            </div>
            {/* View full routing link */}
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-medium border-b border-white/20 pb-1 hover:border-primary shrink-0"
            >
              View Full Portfolio <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-slate-900/80 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 h-full shadow-lg"
              >
                {/* Visual Cover linking to deep case detail route */}
                <Link to={`/project/${project.id}`} className="relative h-56 overflow-hidden shrink-0 bg-black block cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80 z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 flex-wrap justify-end">
                    {project.featured && (
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-slate-950 rounded-full border border-amber-400 flex items-center gap-1 shadow-md shadow-amber-500/25">
                        <Star size={11} className="fill-slate-950" />
                        Featured
                      </span>
                    )}
                    <span className="px-3 py-1 text-xs font-bold bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </Link>

                {/* Content area covering details, technologies, and action indicators */}
                <div className="p-8 flex flex-col flex-grow">
                  <Link to={`/project/${project.id}`}>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors cursor-pointer inline-block">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                    {getShortDescription(project)}
                  </p>
                  
                  {/* Skill technology indicators */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 text-xs font-medium bg-black/40 text-gray-300 rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 text-xs font-medium bg-black/40 text-gray-300 rounded-md border border-white/5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions bar */}
                  <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
                    <Link 
                      to={`/project/${project.id}`}
                      className="text-sm font-bold text-white group-hover:text-primary transition-colors flex items-center gap-1"
                    >
                      Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex gap-2">
                       <a href={project.githubUrl} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Github code">
                         <Github size={18} />
                       </a>
                       <a href={project.link} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Live Demo Link">
                         <ExternalLink size={18} />
                       </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline Preview showcasing chronological milestones */}
      <section className="py-24 relative overflow-hidden bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
            {/* Details and direct route back to Resume */}
            <div className="w-full md:w-1/3">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Professional <span className="text-secondary">Journey</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                With a background in diverse tech environments, I've had the privilege of working alongside talented teams to build software that scales. Here is a snapshot of my recent roles.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all backdrop-blur-sm"
              >
                View Full Resume <ArrowRight size={18} className="translate-y-[1px]" />
              </Link>
            </div>

            {/* Structured CSS grid tracing timeline steps */}
            <div className="w-full md:w-2/3">
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-[19px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-secondary/50 before:via-white/10 before:to-transparent pl-12">
                 {featuredExperience.map((job, index) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                      {/* Timeline Year indicator circles */}
                      <div className="absolute -left-[48px] mt-1.5 w-10 h-10 rounded-full border-4 border-dark bg-secondary shadow-lg z-10 flex items-center justify-center text-white text-xs font-bold">
                        {job.period.split(' ')[0]}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                        <h4 className="text-xl font-bold text-white">{job.role}</h4>
                        <span className="text-xs text-secondary font-medium px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 w-fit">{job.period}</span>
                      </div>
                      <div className="text-sm text-gray-300 font-medium mb-4 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-primary block"></span>
                         {job.company}
                      </div>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {job.description}
                      </p>
                    </motion.div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Client Testimonials Section from CMS */}
      {approvedTestimonials.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-slate-900/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wider uppercase mb-3">
                <Star size={14} className="fill-amber-400" />
                <span>Client Feedback & Recommendations</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">Say</span>
              </h2>
              <p className="text-gray-400 text-base">
                Real feedback and recommendations from industry founders, directors, and collaborative partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {approvedTestimonials.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-8 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-6 shadow-xl relative group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <Star
                          key={sIdx}
                          size={15}
                          className={sIdx < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}
                        />
                      ))}
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      "{t.content}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center gap-3.5">
                    {t.avatarUrl ? (
                      <img
                        src={t.avatarUrl}
                        alt={t.clientName}
                        className="w-11 h-11 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-sm">
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.clientName}</h4>
                      <p className="text-xs text-gray-400">
                        {t.clientRole} {t.company ? `• ${t.company}` : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero CTA section directing leads to connection form interfaces */}
      <section className="py-24 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-gradient-to-r from-slate-900 to-slate-800 p-12 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
            >
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
               <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
               
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                 Have a project in mind?
               </h2>
               <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
                 Let's build something amazing together. I'm currently available for freelance projects and open to new opportunities.
               </p>
               <Link 
                 to="/contact"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-white text-dark font-bold rounded-full hover:bg-gray-200 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 relative z-10"
               >
                 Get in touch <ArrowRight size={20} />
               </Link>
            </motion.div>
         </div>
      </section>
    </div>
  );
};

export default Home;
