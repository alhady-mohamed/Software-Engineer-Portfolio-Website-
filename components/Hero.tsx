import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2, Database, Globe, Cpu, Layers, Lock, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Hero component of the portfolio landing page.
 * Renders a split view:
 * - Left column: High-impact typography, subheadings, call-to-action buttons, and active skill indicators.
 * - Right column: Beautiful styled card structure framing the generated professional portrait, decorative circuit layouts, and staggered floating badge widgets.
 */
const Hero: React.FC = () => {
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
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Hire
            </motion.div>

            {/* Main Title Heading styling dual accents and color transitions */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-secondary animate-gradient-x">
                Digital Future
              </span>
            </motion.h1>
            
            {/* Short Bio snippet profiling competencies */}
            <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              I'm <span className="text-white font-semibold">Alex</span>, a Senior Full Stack Engineer specializing in building exceptional digital experiences. I transform complex problems into elegant, scalable solutions.
            </motion.p>
            
            {/* Interactive navigation links and downloads */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/projects"
                className="group flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-yellow-400 text-dark rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                View Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact"
                className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all backdrop-blur-sm hover:border-white/20"
              >
                Contact Me
              </Link>
            </motion.div>

            {/* Featured horizontal stacks highlighting developer tool belts */}
            <motion.div variants={itemVariants} className="border-t border-white/10 pt-8">
              <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Featured Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer shadow-lg shadow-black/10">
                  <Code2 size={16} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold tracking-wide">React</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer shadow-lg shadow-black/10">
                  <Terminal size={16} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold tracking-wide">TypeScript</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer shadow-lg shadow-black/10">
                  <Layers size={16} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold tracking-wide">Next.js</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 group cursor-pointer shadow-lg shadow-black/10">
                  <Database size={16} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold tracking-wide">Node.js</span>
                </div>
              </div>
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

            {/* Motherboard circuit decor mapping vector traces behind visual frames */}
            <div className="absolute inset-0 pointer-events-none -z-10 opacity-30 select-none">
              <svg className="w-full h-full" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 100 L 100 100 L 120 120 L 120 250" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="50" cy="100" r="4" fill="#22c55e" />
                <path d="M 350 400 L 300 400 L 280 380 L 280 250" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="350" cy="400" r="4" fill="#facc15" />
                <path d="M 20 200 L 60 200 L 80 220 L 80 320" stroke="#22c55e" strokeWidth="1.5" />
                <circle cx="20" cy="200" r="3" fill="#22c55e" />
              </svg>
            </div>

            {/* Container for generated studio engineer portrait image */}
            <div className="relative mx-auto max-w-[390px] aspect-[4/5] rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl p-4 shadow-2xl overflow-hidden group hover:bg-slate-900/60 transition-colors duration-500">
              
              <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-black/80">
                <img
                  src="/src/assets/images/hero_portrait_1781209944400.jpg"
                  alt="Senior Software Architect"
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Vignette Overlay masking the image baseline */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-90" />

                {/* Vertical Accent text label */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 py-5 px-3 bg-primary text-black rounded-full font-sans font-extrabold uppercase text-[9px] tracking-[0.15em] [writing-mode:vertical-lr] flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300">
                  <span className="font-sans font-black">LET'S BEGIN</span>
                  <span className="text-[7px] text-white bg-black/40 px-2 py-0.5 rounded-full tracking-widest font-mono">TECH TRENDS</span>
                </div>

                {/* Scan to Connect Glass widget (interactive mock) */}
                <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-dark/90 backdrop-blur-md border border-white/10 flex items-center gap-3 shadow-xl max-w-[170px] hover:border-primary/20 transition-colors duration-300">
                  <div className="p-2 bg-primary/20 rounded-xl text-primary border border-primary/20 flex items-center justify-center shrink-0">
                    <QrCode size={18} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Contact</p>
                    <p className="text-[9px] font-bold text-white whitespace-nowrap">SCAN TO CONNECT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* floating Badge 1: CLOUD SECURITY (with floating animation block) */}
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
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Status</p>
                <p className="text-sm font-bold text-white">Accepting Projects</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;