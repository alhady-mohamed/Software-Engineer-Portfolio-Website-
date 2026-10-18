import React, { useState } from "react";
import { PROJECTS } from "../constants";
import {
  ExternalLink,
  Github,
  ArrowRight,
  LayoutGrid,
  Star,
  GitPullRequest,
  Download,
  TrendingUp,
  Users,
  Code,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { useSiteData } from "../src/context/SiteDataContext";
import { useLanguage } from "../src/context/LanguageContext";

// Fixed categorizations defining portfolio filters
const Categories = ["All", "Featured ⭐", "Web App", "Mobile", "AI/ML"];

const Projects: React.FC = () => {
  const { projects: dynamicProjects } = useSiteData();
  const { t } = useLanguage();
  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : PROJECTS;

  // Active category filter
  const [activeCategory, setActiveCategory] = useState("All");

  // Dynamic list of featured projects
  const featuredProjects = allProjects.filter((p) => p.featured);
  const [selectedSpotlightId, setSelectedSpotlightId] = useState<string | number | null>(null);

  // The active spotlight project is either the user-selected one, or the first featured project, or the first project
  const spotlightProject =
    (selectedSpotlightId ? allProjects.find((p) => String(p.id) === String(selectedSpotlightId)) : null) ||
    featuredProjects[0] ||
    allProjects[0];

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : activeCategory === "Featured ⭐"
      ? allProjects.filter((p) => p.featured)
      : allProjects.filter((p) => p.category === activeCategory);

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
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      {/* Page Header text elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 text-primary font-medium tracking-wider text-sm uppercase mb-4">
            <LayoutGrid size={16} />
            <span>{t('projects_badge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('projects_title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-8">
            A curated selection of my recent projects. Each project represents a
            unique challenge solved through thoughtful architecture and design.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        {/* Background ambient light blob */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Spotlight Highlight Box (Top Showcase Item) */}
        {spotlightProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col lg:flex-row shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-amber-400 to-secondary"></div>

            {/* Spotlight text details and main statistics metrics */}
            <div className="lg:w-1/2 p-8 md:p-12 border-r border-white/5 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold tracking-widest uppercase w-fit shadow-sm shadow-amber-500/10">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  Featured Spotlight Project
                </div>
                {featuredProjects.length > 1 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-slate-400 font-mono">Featured ({featuredProjects.length}):</span>
                    {featuredProjects.map((fp) => (
                      <button
                        key={fp.id}
                        type="button"
                        onClick={() => setSelectedSpotlightId(fp.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          String(spotlightProject?.id) === String(fp.id)
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                        }`}
                        title={fp.title}
                      >
                        {fp.title.slice(0, 14)}{fp.title.length > 14 ? '...' : ''}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {spotlightProject.title}
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {getShortDescription(spotlightProject)}
              </p>

              {/* In-spotlight impact metrics block */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/5 py-6 mb-8">
                {spotlightProject.metrics && Object.keys(spotlightProject.metrics).length > 0 ? (
                  Object.entries(spotlightProject.metrics).map(([label, val]) => (
                    <div key={label}>
                      <div className="text-2xl font-bold text-white mb-1">{val}</div>
                      <div className="text-sm text-gray-400">{label}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">High</div>
                      <div className="text-sm text-gray-400">Scalability</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">100%</div>
                      <div className="text-sm text-gray-400">Custom Built</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-400 mb-1">Active</div>
                      <div className="text-sm text-gray-400">Production</div>
                    </div>
                  </>
                )}
              </div>

              {/* Action buttons directing to the spotlight details */}
              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  to={`/project/${spotlightProject.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-yellow-400 text-dark rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                >
                  Read Case Study <ArrowRight size={18} />
                </Link>
                {spotlightProject.githubUrl && (
                  <a
                    href={spotlightProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all"
                    aria-label="GitHub Repository Link"
                    title="GitHub Repository"
                  >
                    <Github size={20} />
                  </a>
                )}
                {spotlightProject.link && spotlightProject.link !== '#' && (
                  <a
                    href={spotlightProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                    aria-label="Live Demo Link"
                    title="Live Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Spotlight image background layout */}
            <div className="lg:w-1/2 relative bg-dark min-h-[300px] lg:min-h-full overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10 hidden lg:block pointer-events-none" />
              <img
                src={
                  spotlightProject.imageUrl ||
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                }
                alt={spotlightProject.title}
                className="w-full h-full object-cover origin-left hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <span className="px-3.5 py-1.5 text-xs font-bold bg-amber-500 text-slate-950 rounded-full border border-amber-400 flex items-center gap-1.5 shadow-lg shadow-amber-500/25">
                  <Star size={12} className="fill-slate-950" />
                  Featured
                </span>
                <span className="px-3.5 py-1.5 text-xs font-bold bg-slate-900/80 backdrop-blur-md text-white rounded-full border border-white/10 shadow-lg">
                  {spotlightProject.category}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-12 border-b border-white/5 pb-8"
        >
          {Categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-dark shadow-lg shadow-primary/25"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Dynamic Project Grid (supports pop and layout animation shifts) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group flex flex-col bg-slate-900/50 rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 h-full"
              >
                {/* Visual Cover image frame */}
                <Link
                  to={`/project/${project.id}`}
                  className="relative h-60 overflow-hidden shrink-0 bg-dark block cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80 z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 flex-wrap justify-end">
                    {project.featured && (
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500 text-slate-950 rounded-full border border-amber-400 flex items-center gap-1 shadow-md shadow-amber-500/25">
                        <Star size={11} className="fill-slate-950" />
                        Featured
                      </span>
                    )}
                    <span className="px-3 py-1 text-xs font-bold bg-white/10 backdrop-blur-md text-white rounded-full border border-white/10 shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Visual accent corner elements triggered on hover */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity z-20 rounded-bl-xl ml-4 mb-4" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity z-20 rounded-tr-xl mr-4 mt-4" />
                </Link>

                {/* Card textual details and tags */}
                <div className="p-8 flex flex-col flex-grow">
                  <Link to={`/project/${project.id}`}>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors cursor-pointer inline-block">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                    {getShortDescription(project)}
                  </p>

                  {/* Skill technology label items */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium bg-black/40 text-gray-300 rounded-md border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Deep details links and repository connections */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-primary transition-colors group relative"
                    >
                      Read full case study{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>

                    <div className="flex-1 flex justify-end gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                        aria-label="View Github Repository"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-dark transition-all shadow-lg hover:shadow-primary/30"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Impact Stats Grid Section "By the Numbers" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5 text-center group hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:-translate-y-1 transition-transform">
              <Code size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">1M+</div>
            <div className="text-sm text-gray-400">Lines of Code</div>
          </div>
          <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5 text-center group hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:-translate-y-1 transition-transform">
              <Users size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-sm text-gray-400">Happy Clients</div>
          </div>
          <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5 text-center group hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:-translate-y-1 transition-transform">
              <TrendingUp size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">$5M+</div>
            <div className="text-sm text-gray-400">Client Revenue</div>
          </div>
          <div className="bg-slate-900/50 rounded-3xl p-8 border border-white/5 text-center group hover:bg-white/5 transition-colors">
            <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4 group-hover:-translate-y-1 transition-transform">
              <Download size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">100k+</div>
            <div className="text-sm text-gray-400">NPM Downloads</div>
          </div>
        </motion.div>

        {/* Open Source Tools & Repositories list blocks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-2 text-secondary font-medium tracking-wider text-sm uppercase mb-4">
            <GitPullRequest size={16} />
            <span>Open Source</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            Tools &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              Libraries
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-secondary/30 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <Code size={24} />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-secondary border border-white/10 font-bold">
                    TypeScript
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                React Unified CLI
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                A command-line interface tool to rapidly scaffold React
                applications with advanced architectural patterns and testing
                integrated.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  <Star size={16} className="text-primary" /> 1.2k
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  <GitPullRequest size={16} /> 45
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-primary/30 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-primary border border-white/10 font-bold">
                    Next.js
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Next Auth Templates
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Plug-and-play authentication templates for Next.js supporting
                credentials, OAuth, and magic links with pre-built UI
                components.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  <Star size={16} className="text-primary" /> 845
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                  <GitPullRequest size={16} /> 22
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Global Bottom CTA redirecting leads directly to GitHub search fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-slate-900 rounded-3xl p-12 border border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
            Want to see more of my work?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
            I've contributed to over 30+ open source projects and built numerous
            applications across different domains. Check out my GitHub profile
            for more code snippets and repositories.
          </p>
          <a
            href="https://github.com/alhady-mohamed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-dark font-bold hover:scale-105 transition-transform shadow-xl relative z-10"
          >
            <Github size={20} />
            Explore my GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
