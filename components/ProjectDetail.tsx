import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Github, LayoutGrid, Calendar, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = PROJECTS.find(p => p.id === Number(id));
  
  useEffect(() => {
    // Scroll to top when loading new project
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-dark text-white">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <button 
          onClick={() => navigate('/projects')}
          className="text-primary hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back to Projects
        </button>
      </div>
    );
  }

  // Find related projects (same category, exclude current)
  const relatedProjects = PROJECTS.filter(p => p.category === project.category && p.id !== project.id).slice(0, 2);
  
  // Find recent projects (just some other projects, excluding current and related)
  const recentProjects = PROJECTS.filter(p => p.id !== project.id && !relatedProjects.find(rp => rp.id === p.id)).slice(0, 3);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-medium mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                {project.category}
              </span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Calendar size={14} /> 2024
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4 shrink-0"
          >
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 font-bold"
            >
               <Github size={20} /> Repository
            </a>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-primary hover:bg-yellow-400 text-dark border border-primary/20 transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2 font-bold"
            >
               <ExternalLink size={20} /> View Live
            </a>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Main Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-2/3"
          >
            <div className="rounded-3xl overflow-hidden bg-black border border-white/5 shadow-2xl mb-12 aspect-[16/9]">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                This project was built to address significant challenges in the domain of {project.category.toLowerCase()}. 
                The core objective was to create a highly scalable, maintainable, and performant application that delivers 
                an exceptional user experience. {project.description} We focused heavily on modern development practices, 
                incorporating clean architecture and a robust component library.
              </p>
              
              <h3 className="text-xl font-bold text-white mb-4">The Challenge</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Prior implementations suffered from slow load times, poor state management, and an outdated user interface. 
                Integrating various third-party services while maintaining high security standards and real-time responsiveness 
                proved to be a significant technical hurdle.
              </p>
              
              <h3 className="text-xl font-bold text-white mb-4">The Solution</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                By leveraging {project.technologies.slice(0, 2).join(" and ")}, we established a modern foundation. 
                This allowed us to implement efficient server-side rendering and static site generation where appropriate. 
                The user interface was completely overhauled to follow a minimalist, accessible design language.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5 my-12">
               <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                 <div className="text-2xl font-bold text-primary mb-1">100%</div>
                 <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">Lighthouse Score</div>
               </div>
               <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                 <div className="text-2xl font-bold text-secondary mb-1">&lt; 1s</div>
                 <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">Load Time</div>
               </div>
               <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                 <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                 <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">Uptime</div>
               </div>
               <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                 <div className="text-2xl font-bold text-white mb-1">5 Stars</div>
                 <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">User Rating</div>
               </div>
            </div>
          </motion.div>
          
          {/* Right Column - Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            {/* Tech Stack widget */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Tag size={18} className="text-primary" /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-gray-300 text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                  <LayoutGrid size={18} className="text-secondary" /> Related Work
                </h4>
                <div className="space-y-4">
                  {relatedProjects.map(rp => (
                    <Link 
                      key={rp.id} 
                      to={`/project/${rp.id}`}
                      className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                        <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-white font-bold text-sm group-hover:text-primary transition-colors">{rp.title}</h5>
                        <p className="text-gray-500 text-xs line-clamp-1 mt-1">{rp.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recent Projects */}
            {recentProjects.length > 0 && (
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                  <ChevronRight size={18} className="text-white" /> Other Projects
                </h4>
                <div className="space-y-4">
                  {recentProjects.map(rp => (
                    <Link 
                      key={rp.id} 
                      to={`/project/${rp.id}`}
                      className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                        <img src={rp.imageUrl} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-white font-bold text-sm group-hover:text-secondary transition-colors">{rp.title}</h5>
                        <p className="text-gray-500 text-xs line-clamp-1 mt-1">{rp.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
