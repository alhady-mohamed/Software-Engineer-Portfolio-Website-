import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Twitter, Terminal, Code2, Database, Globe, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-dark">
      {/* Professional Grid Background */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-secondary/20 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wide w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Hire
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-x">
                Digital Future
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              I'm <span className="text-white font-semibold">Alex</span>, a Senior Full Stack Engineer specializing in building exceptional digital experiences. I transform complex problems into elegant, scalable solutions.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/projects"
                className="group flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-indigo-600 text-white rounded-full font-medium transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
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

            <motion.div variants={itemVariants} className="border-t border-white/10 pt-8">
              <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">Tech Stack</p>
              <div className="flex gap-6 text-gray-400">
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors">
                  <Code2 size={24} />
                  <span className="text-[10px]">React</span>
                </div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors">
                  <Terminal size={24} />
                  <span className="text-[10px]">TypeScript</span>
                </div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors">
                  <Layers size={24} />
                  <span className="text-[10px]">Next.js</span>
                </div>
                <div className="flex flex-col items-center gap-2 hover:text-white transition-colors">
                  <Database size={24} />
                  <span className="text-[10px]">Node</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Code Window Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Abstract glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10" />

            {/* Code Window */}
            <div className="relative rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-4 px-3 py-1 bg-black/30 rounded text-xs text-gray-400 font-mono">Developer.tsx</div>
              </div>
              
              {/* Window Body */}
              <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
                <div className="flex gap-4">
                  <div className="flex flex-col text-gray-600 select-none text-right">
                    <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                  </div>
                  <div>
                    <p><span className="text-pink-400">const</span> <span className="text-blue-400">Developer</span> <span className="text-white">=</span> <span className="text-yellow-400">()</span> <span className="text-pink-400">=&gt;</span> <span className="text-yellow-400">{`{`}</span></p>
                    <p className="pl-4"><span className="text-pink-400">const</span> <span className="text-white">skills</span> <span className="text-pink-400">=</span> <span className="text-purple-400">[</span></p>
                    <p className="pl-8"><span className="text-green-400">'React'</span>,</p>
                    <p className="pl-8"><span className="text-green-400">'Next.js'</span>,</p>
                    <p className="pl-8"><span className="text-green-400">'TypeScript'</span>,</p>
                    <p className="pl-8"><span className="text-green-400">'Node.js'</span></p>
                    <p className="pl-4"><span className="text-purple-400">]</span>;</p>
                    <p className="br">&nbsp;</p>
                    <p className="pl-4"><span className="text-pink-400">return</span> <span className="text-purple-400">(</span></p>
                    <p className="pl-8"><span className="text-blue-300">&lt;Card&gt;</span></p>
                    <p className="pl-12"><span className="text-white">Start Building</span></p>
                    <p className="pl-8"><span className="text-blue-300">&lt;/Card&gt;</span></p>
                    <p className="pl-4"><span className="text-purple-400">)</span>;</p>
                    <p><span className="text-yellow-400">{`}`}</span>;</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-dark/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Globe className="text-green-400 w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Current Status</p>
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