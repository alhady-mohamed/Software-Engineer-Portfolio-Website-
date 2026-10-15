import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Palette, Zap, LayoutGrid, Github, ExternalLink, Video, Megaphone, Star, MessageSquareQuote, Sparkles } from 'lucide-react';
import Hero from './Hero';
import { PROJECTS, EXPERIENCE } from '../constants';
import { useSiteData } from '../src/context/SiteDataContext';

const Home: React.FC = () => {
  const { projects: dynamicProjects, testimonials, timelines, settings } = useSiteData();
  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : PROJECTS;

  // Marquee settings & dynamic logo items
  const marqueeSettings = settings?.marquee;
  const isMarqueeEnabled = marqueeSettings?.isEnabled !== false;
  const marqueeSpeed = marqueeSettings?.speed || 30;
  const pauseOnHover = marqueeSettings?.pauseOnHover !== false;
  const monochromeFilter = marqueeSettings?.monochromeFilter !== false;

  const defaultMarqueeLogos = [
    { id: '1', name: 'React', iconName: 'react', displayMode: 'both' as const, isActive: true },
    { id: '2', name: 'Next.js', iconName: 'zap', displayMode: 'both' as const, isActive: true },
    { id: '3', name: 'TypeScript', iconName: 'code', displayMode: 'both' as const, isActive: true },
    { id: '4', name: 'Tailwind CSS', iconName: 'layout', displayMode: 'both' as const, isActive: true },
    { id: '5', name: 'Node.js', iconName: 'server', displayMode: 'both' as const, isActive: true },
    { id: '6', name: 'UI/UX Design', iconName: 'palette', displayMode: 'both' as const, isActive: true },
  ];

  const activeLogos = (marqueeSettings?.items && marqueeSettings.items.length > 0)
    ? marqueeSettings.items.filter((item) => item.isActive !== false)
    : defaultMarqueeLogos;

  const renderMarqueeIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'zap':
      case 'next':
      case 'nextjs':
        return <Zap size={22} className="text-secondary shrink-0" />;
      case 'code':
      case 'ts':
      case 'typescript':
        return <span className="font-mono text-primary font-bold shrink-0 text-lg">{"{ }"}</span>;
      case 'layout':
      case 'tailwind':
      case 'css':
        return <LayoutGrid size={22} className="text-cyan-400 shrink-0" />;
      case 'palette':
      case 'figma':
      case 'ui':
      case 'ui/ux':
        return <Palette size={22} className="text-rose-400 shrink-0" />;
      case 'video':
      case 'media':
        return <Video size={22} className="text-amber-400 shrink-0" />;
      case 'marketing':
      case 'social':
        return <Megaphone size={22} className="text-emerald-400 shrink-0" />;
      case 'server':
      case 'node':
      case 'nodejs':
      case 'node.js':
        return <Code2 size={22} className="text-emerald-400 shrink-0" />;
      default:
        return <Code2 size={22} className="text-primary shrink-0" />;
    }
  };

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

  return (
    <div className="bg-dark min-h-screen">
      {/* Intro hero showcasing title assets */}
      <Hero />
      
      {/* Infinite Tech Stack & Brand Logos Marquee loop banner */}
      {isMarqueeEnabled && activeLogos.length > 0 && (
        <section className="py-12 md:py-16 border-y border-white/[0.08] bg-slate-950/70 backdrop-blur-md overflow-hidden relative group">
          {/* Subtle ambient spotlight glow behind marquee */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-36 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with Title and Optional Admin Quick Link */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 mb-7 flex items-center justify-between">
            <div className="flex items-center gap-3 mx-auto">
              <span className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-primary/60" />
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400 font-bold flex items-center gap-2 select-none">
                <Sparkles size={13} className="text-primary" />
                {marqueeSettings?.sectionTitle || 'Trusted Technologies & Brand Partners'}
              </span>
              <span className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent via-primary/30 to-primary/60" />
            </div>
          </div>

          {/* Vignette mask overlays targeting seamless crop entries */}
          <div className="absolute inset-y-0 left-0 w-28 md:w-56 bg-gradient-to-r from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-28 md:w-56 bg-gradient-to-l from-dark via-dark/80 to-transparent z-10 pointer-events-none" />
          
          <div className="flex whitespace-nowrap">
            {/* Horizontal Framer motion translation timeline set to run infinitely */}
            <motion.div 
              className={`flex items-center gap-6 px-8 min-w-full ${
                pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
              }`}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: marqueeSpeed }}
            >
              {/* Items repeated twice for seamless loop without visual breaks */}
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {activeLogos.map((logo) => {
                    const logoItem = (
                      <div
                        key={`${i}-${logo.id}`}
                        className="flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-primary/40 text-slate-300 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 group/item shrink-0 select-none shadow-sm hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm"
                      >
                        {logo.logoUrl ? (
                          <div className="h-7 min-w-[28px] flex items-center justify-center shrink-0">
                            <img
                              src={logo.logoUrl}
                              alt={logo.name}
                              className={`h-6 sm:h-7 w-auto max-w-[130px] object-contain transition-all duration-300 ${
                                monochromeFilter
                                  ? 'filter grayscale brightness-90 group-hover/item:grayscale-0 group-hover/item:brightness-110 opacity-80 group-hover/item:opacity-100'
                                  : 'opacity-90 group-hover/item:opacity-100'
                              }`}
                            />
                          </div>
                        ) : (
                          renderMarqueeIcon(logo.iconName)
                        )}
                        {logo.displayMode !== 'logo-only' && (
                          <span className="tracking-wider whitespace-nowrap text-xs sm:text-sm font-semibold">{logo.name}</span>
                        )}
                      </div>
                    );

                    return logo.websiteUrl ? (
                      <a
                        key={`${i}-${logo.id}`}
                        href={logo.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-transform hover:scale-105 inline-flex items-center"
                        title={logo.name}
                      >
                        {logoItem}
                      </a>
                    ) : (
                      logoItem
                    );
                  })}
                </React.Fragment>
              ))}
            </motion.div>
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
                    {project.description}
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
