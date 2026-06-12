import React from 'react';
import { SKILLS_DATA, EXPERIENCE } from '../constants';
import { Terminal, Cpu, Globe, Briefcase, GraduationCap, ChevronRight, User, Award, Users, Code2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * About Component
 * Renders the introductory profile of the engineer.
 * Displays:
 * - Bio and stats block.
 * - Core architectural values grid.
 * - Work & leadership timeline.
 * - Formal academic history & digital credentials/awards.
 * - Interactive technical proficiency charts and business workflow guidelines.
 */
const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-dark to-slate-900 overflow-hidden">
      {/* Page Header presenting main intro title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2 text-primary font-medium tracking-wider text-sm uppercase mb-4">
            <User size={16} />
            <span>Get to know me</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-primary">Me</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>
        
        {/* Abstract background glowing overlay */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Content Column: Bio, Value systems, work experiences, certifications */}
          <div className="lg:col-span-7">
            {/* Extended Biographic details overview */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="prose prose-invert prose-lg text-gray-400 mb-12"
            >
              <p className="text-xl text-gray-300 font-medium leading-relaxed mb-6">
                I am a passionate <span className="text-white">Senior Software Engineer</span> with over 5 years of experience in building scalable digital products and interactive user interfaces.
              </p>
              <p className="mb-6">
                My journey into software development began with a deep curiosity for how things work on the internet. That curiosity led me to dive deep into modern web technologies, starting with HTML, CSS, and plain JavaScript, before exploring the world of React, Node.js, and cloud architectures.
              </p>
              <p>
                I thrive in collaborative environments where I can translate complex business requirements into elegant, user-centric, and highly performant applications. When I'm not writing code, you can find me exploring nature trails, reading sci-fi novels, or experimenting with emerging AI tools.
              </p>
            </motion.div>

            {/* Quick numeric numerical counters highlighting achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-bold text-primary mb-1">5+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Years Exp</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-bold text-secondary mb-1">40+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Projects</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Clients</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-bold text-white mb-1">1M+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">Lines Code</div>
              </motion.div>
            </div>

            {/* Core Architectural Value frameworks mapping principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors hover:shadow-lg hover:shadow-primary/5"
              >
                <Terminal className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Clean Code</h3>
                <p className="text-sm text-gray-400">Maintainable, typed, and scalable architecture.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors hover:shadow-lg hover:shadow-primary/5"
              >
                <Globe className="w-10 h-10 text-secondary mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Responsive</h3>
                <p className="text-sm text-gray-400">Pixel-perfect, mobile-first design systems.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors hover:shadow-lg hover:shadow-primary/5"
              >
                <Cpu className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-white font-bold text-lg mb-2">Performant</h3>
                <p className="text-sm text-gray-400">Optimized for speed and accessibility.</p>
              </motion.div>
            </div>

            {/* Complete Work Experience Timeline */}
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Briefcase className="text-primary" size={24} />
              </div>
              Work Experience
            </h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[2.25rem] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-white/10 before:to-transparent pl-12 md:pl-20">
               {EXPERIENCE.map((job, index) => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Visual indicator lines and timeline ticks */}
                    <div className="absolute -left-12 md:-left-20 mt-1.5 flex items-center justify-center w-10 h-10 rounded-full border-4 border-dark bg-primary shadow-lg z-10 hidden md:flex">
                      <Briefcase size={16} className="text-dark" />
                    </div>
                    <div className="absolute -left-12 mt-2 w-4 h-4 rounded-full border-2 border-primary bg-dark z-10 md:hidden"></div>
                    
                    {/* Expanded detail card mapping company credentials */}
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors relative group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{job.role}</h4>
                        <span className="text-xs text-primary font-medium px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">{job.period}</span>
                      </div>
                      <div className="text-sm text-gray-300 font-medium mb-4 flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-secondary block"></span>
                         {job.company}
                      </div>
                      <p className="text-base text-gray-400 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </motion.div>
               ))}
            </div>
            
            {/* Education History Block */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <GraduationCap className="text-secondary" size={24} />
                </div>
                Education
              </h3>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">Bachelor of Science in Computer Science</h4>
                  <p className="text-gray-400">University of Technology • Graduated with Honors</p>
                </div>
                <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20 shrink-0">
                  2014 - 2018
                </span>
              </div>
            </div>

            {/* Credential listings and awards lists */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Award className="text-primary" size={24} />
                </div>
                Certifications & Awards
              </h3>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">AWS Certified Solutions Architect</h4>
                    <p className="text-sm text-gray-400">Amazon Web Services • Valid till 2026</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Frontend Developer Certificate</h4>
                    <p className="text-sm text-gray-400">Meta / Coursera • 2022</p>
                  </div>
                </div>
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Best Innovation Demo</h4>
                    <p className="text-sm text-gray-400">TechHackathon 2021 • 1st Place Winner</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: Technical proficiency tracks and custom agile framework blueprints */}
          <div className="lg:col-span-5 space-y-8">
            {/* Custom technical skills horizontal graphs */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="bg-slate-800/50 p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-8">Technical Proficiency</h3>
              <div className="space-y-6">
                {SKILLS_DATA.map((skill, index) => (
                  <div key={skill.subject}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-200 font-medium">{skill.subject}</span>
                      <span className="text-primary font-bold text-sm tracking-widest">{skill.A}%</span>
                    </div>
                    {/* Customized bar loading visualizers */}
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.A}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Methodology processes mapping the step-by-step cycle of client consulting */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-slate-800/50 p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-6">Workflow & Approach</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-white/10 before:to-transparent">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-dark border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <h4 className="text-white font-bold mb-1">1. Discovery & Planning</h4>
                  <p className="text-sm text-gray-400">Understanding requirements, target audience, and business goals.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-dark border-2 border-secondary flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                  </div>
                  <h4 className="text-white font-bold mb-1">2. Architecture & Design</h4>
                  <p className="text-sm text-gray-400">Prototyping UI/UX and designing scalable system architecture.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-dark border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <h4 className="text-white font-bold mb-1">3. Agile Development</h4>
                  <p className="text-sm text-gray-400">Iterative coding focusing on clean code and robust features.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-dark border-2 border-white/50 flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <h4 className="text-white font-bold mb-1">4. Testing & Delivery</h4>
                  <p className="text-sm text-gray-400">Rigorous QA, automated testing, and seamless deployment.</p>
                </div>
              </div>
            </motion.div>
            
            {/* Connection teaser prompt box link */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-white/10 relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
               <h4 className="text-2xl font-bold text-white mb-3">Ready to collaborate?</h4>
               <p className="text-gray-400 mb-8 leading-relaxed">
                 I'm currently looking for new opportunities and freelancing projects. Let's build something amazing together!
               </p>
               <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-dark font-bold rounded-full hover:bg-gray-200 transition-colors w-fit">
                 Let's Talk <ChevronRight size={18} />
               </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;