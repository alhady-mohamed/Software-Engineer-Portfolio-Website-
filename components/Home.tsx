import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Palette, Zap, LayoutGrid, Github, ExternalLink } from 'lucide-react';
import Hero from './Hero';
import { PROJECTS, EXPERIENCE } from '../constants';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);
  const featuredExperience = EXPERIENCE.slice(0, 2);

  return (
    <div className="bg-dark min-h-screen">
      <Hero />
      
      {/* Tech Stack Marquee */}
      <section className="py-10 border-y border-white/5 bg-black/20 overflow-hidden relative">
         <div className="absolute inset-x-0 top-0 h-full w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
         <div className="absolute inset-x-0 right-0 h-full w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none opacity-100 float-right" />
         <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
         
         <div className="flex whitespace-nowrap">
            <motion.div 
               className="flex items-center gap-16 px-8 min-w-full"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
               {/* Items repeated twice for seamless loop */}
               {[...Array(2)].map((_, i) => (
                 <React.Fragment key={i}>
                   <div className="flex items-center gap-3 text-gray-500 font-bold text-xl uppercase tracking-widest"><Code2 size={24} /> React</div>
                   <div className="flex items-center gap-3 text-gray-500 font-bold text-xl uppercase tracking-widest"><Zap size={24} /> Next.js</div>
                   <div className="flex items-center gap-3 text-gray-500 font-bold text-xl uppercase tracking-widest"><span className="font-mono">{"{ }"}</span> TypeScript</div>
                   <div className="flex items-center gap-3 text-gray-500 font-bold text-xl uppercase tracking-widest"><LayoutGrid size={24} /> Tailwind CSS</div>
                   <div className="flex items-center gap-3 text-gray-500 font-bold text-xl uppercase tracking-widest"><Code2 size={24} /> Node.js</div>
                   <div className="flex items-center gap-3 text-gray-500 font-bold text-xl uppercase tracking-widest"><Palette size={24} /> UI/UX</div>
                 </React.Fragment>
               ))}
            </motion.div>
         </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Services</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              I specialize in full-stack web development, creating high-performance applications with beautiful, intuitive interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.07] hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Code2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Functional Development</h3>
              <p className="text-gray-400 leading-relaxed">
                Building scalable, maintainable architectures using React, Next.js, and TypeScript. Focusing on clean code and robust systems.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.07] hover:border-secondary/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
                <Palette size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">UI/UX Design Implementation</h3>
              <p className="text-gray-400 leading-relaxed">
                Translating complex design requirements into pixel-perfect, responsive, and accessible user interfaces.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/[0.07] hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Performance Optimization</h3>
              <p className="text-gray-400 leading-relaxed">
                Ensuring applications run smoothly and load quickly, optimizing assets, minimizing web vitals metrics, and improving SEO.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
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
                <div className="relative h-56 overflow-hidden shrink-0 bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80 z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  
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

                  <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-white group-hover:text-primary transition-colors flex items-center gap-1"
                    >
                      Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="flex gap-2">
                       <a href={project.githubUrl} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                         <Github size={18} />
                       </a>
                       <a href={project.link} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
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

      {/* Experience Timeline Preview */}
      <section className="py-24 relative overflow-hidden bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            
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
                      {/* Timeline Dot */}
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

      {/* CTA Section */}
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
