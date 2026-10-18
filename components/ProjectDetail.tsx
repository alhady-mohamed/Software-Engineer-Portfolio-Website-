import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PROJECTS } from "../constants";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  LayoutGrid,
  Calendar,
  Tag,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import ProjectComments from "./ProjectComments";

/**
 * ProjectDetail Component
 * Generates the deep case study document view for individual portfolio items.
 * Renders:
 * - Back controls.
 * - Dynamic metadata details (category, category icon, year of launch).
 * - Big cover image representation.
 * - Detailed descriptions detailing challenges and target resolutions.
 * - Digital metrics scoreboard of achievements.
 * - Sidebar of applied technologies, plus matching suggestions.
 */
import { useSiteData } from "../src/context/SiteDataContext";

const ProjectDetail: React.FC = () => {
  // Extracts the project identifier directly from route path variable context
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects: dynamicProjects } = useSiteData();

  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : PROJECTS;

  // Searches dynamic context first, then constants
  const project = allProjects.find((p) => String(p.id) === String(id));

  useEffect(() => {
    // Scroll coordinates back to top index on route transition events
    window.scrollTo(0, 0);
  }, [id]);

  // Fallback screen if requested ID pointer doesn't reference any configured records
  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-dark text-white">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <button
          onClick={() => navigate("/projects")}
          className="text-primary hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back to Projects
        </button>
      </div>
    );
  }

  // Related work matching filter algorithm scoring similar category entries (excluding current item)
  const relatedProjects = PROJECTS.filter(
    (p) => p.category === project.category && p.id !== project.id,
  ).slice(0, 2);

  // Alternative recent item suggestions algorithm matching records outside related criteria
  const recentProjects = PROJECTS.filter(
    (p) => p.id !== project.id && !relatedProjects.find((rp) => rp.id === p.id),
  ).slice(0, 3);

  const formatInline = (str: string): string => {
    let out = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    out = out.replace(
      /\[(.*?)\]\((https?:\/\/.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-white font-medium">$1</a>'
    );
    out = out.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold italic text-white">$1</strong>');
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    out = out.replace(/\*(.*?)\*/g, '<em class="italic text-gray-200">$1</em>');
    out = out.replace(/~~(.*?)~~/g, '<del class="line-through text-gray-500">$1</del>');
    out = out.replace(
      /`(.*?)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 font-mono text-primary text-sm">$1</code>'
    );
    out = out.replace(
      /==(.*?)==/g,
      '<mark class="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded font-medium">$1</mark>'
    );
    return out;
  };

  const renderRichDescription = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    let activeAlign: 'center' | 'right' | 'justify' | 'left' | null = null;
    let activeIndent = false;

    return (
      <div className="space-y-4 text-gray-300 leading-relaxed text-base sm:text-lg">
        {lines.map((rawLine, idx) => {
          let line = rawLine;

          if (line.includes('<div align="center">')) {
            activeAlign = 'center';
            line = line.replace(/<div align="center">/g, '');
          } else if (line.includes('<div align="right">')) {
            activeAlign = 'right';
            line = line.replace(/<div align="right">/g, '');
          } else if (line.includes('<div align="justify">')) {
            activeAlign = 'justify';
            line = line.replace(/<div align="justify">/g, '');
          } else if (line.includes('<div align="left">')) {
            activeAlign = 'left';
            line = line.replace(/<div align="left">/g, '');
          }

          if (line.includes('margin-left')) {
            activeIndent = true;
            line = line.replace(/<div style="margin-left:\s*\d+px">/g, '');
          }

          let closedBlock = false;
          if (line.includes('</div>')) {
            closedBlock = true;
            line = line.replace(/<\/div>/g, '');
          }

          const alignClass =
            activeAlign === 'center'
              ? 'text-center'
              : activeAlign === 'right'
              ? 'text-right'
              : activeAlign === 'justify'
              ? 'text-justify'
              : activeAlign === 'left'
              ? 'text-left'
              : '';

          const indentClass = activeIndent
            ? 'pl-6 border-l-2 border-primary/40 my-2 bg-white/[0.01] rounded-r'
            : '';

          if (closedBlock) {
            activeAlign = null;
            activeIndent = false;
          }

          if (!line.trim() && !closedBlock) {
            return <div key={idx} className="h-2" />;
          }

          if (line.trim() === '---' || line.trim() === '***') {
            return <hr key={idx} className="border-white/10 my-6" />;
          }

          if (line.startsWith('# ')) {
            return (
              <h1 key={idx} className={`text-2xl sm:text-3xl font-extrabold text-white pt-4 pb-2 border-b border-primary/20 tracking-tight ${alignClass} ${indentClass}`}>
                {line.replace('# ', '')}
              </h1>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h2 key={idx} className={`text-xl sm:text-2xl font-bold text-white pt-3 pb-1 tracking-tight text-primary ${alignClass} ${indentClass}`}>
                {line.replace('## ', '')}
              </h2>
            );
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className={`text-lg sm:text-xl font-bold text-amber-400 pt-2 tracking-tight ${alignClass} ${indentClass}`}>
                {line.replace('### ', '')}
              </h3>
            );
          }
          if (line.startsWith('> ')) {
            return (
              <blockquote key={idx} className={`border-l-4 border-primary pl-4 py-2 italic text-gray-200 bg-white/5 rounded-r-2xl my-3 ${alignClass} ${indentClass}`}>
                {line.replace('> ', '')}
              </blockquote>
            );
          }
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const content = line.trim().replace(/^[-*]\s+/, '');
            return (
              <div key={idx} className={`flex items-start gap-2.5 pl-2 ${alignClass} ${indentClass}`}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
              </div>
            );
          }
          const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className={`flex items-start gap-2.5 pl-2 ${alignClass} ${indentClass}`}>
                <span className="font-mono text-primary font-bold text-sm shrink-0 mt-0.5">
                  {numMatch[1]}.
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(numMatch[2]) }} />
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return (
            <p key={idx} className={`${alignClass} ${indentClass}`} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
          );
        })}
      </div>
    );
  };

  const getCleanSummary = (summaryText?: string, descText?: string, cat?: string) => {
    if (summaryText && summaryText.trim()) {
      return summaryText
        .replace(/<[^>]*>/g, '')
        .replace(/^[#*>-]+\s*/gm, '')
        .replace(/[*_~`]/g, '')
        .trim();
    }
    if (descText && descText.trim()) {
      const plain = descText
        .replace(/<[^>]*>/g, '')
        .replace(/^[#*>-]+\s*/gm, '')
        .replace(/[*_~`]/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/\n+/g, ' ')
        .trim();
      const firstPeriod = plain.indexOf('.');
      if (firstPeriod > 20 && firstPeriod < 220) {
        return plain.slice(0, firstPeriod + 1);
      }
      return plain.length > 180 ? `${plain.slice(0, 180)}...` : plain;
    }
    return `A modern solution in the ${cat || 'technology'} domain, engineered for high performance, intuitive user experience, and robust architecture.`;
  };

  const cleanSummary = getCleanSummary(project.summary, project.description, project.category);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark">
      {/* Structural navigation and visual layout header cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-medium mb-6 group cursor-pointer"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back to Projects
        </button>

        {/* 1. XAGA SARE: Magaca Mashruuca (Project Title & Meta & Actions) + Box kooban oo faah-faahin ah */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between mb-8">
          {/* Main Title labels and subheadlines details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary font-mono">
                {project.category}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1.5 font-medium">
                <Calendar size={14} className="text-primary/70" /> 2024
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
              {project.title}
            </h1>

            {/* Faah-faahin kooban oo cinwaanka hoos taal (Professional Lead Overview) */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              {cleanSummary}
            </p>
          </motion.div>

          {/* Repository interactions and Live Demo redirection button panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 font-bold text-sm sm:text-base cursor-pointer"
              >
                <Github size={18} /> Repository
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary hover:bg-yellow-400 text-dark border border-primary/20 transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2 font-bold text-sm sm:text-base cursor-pointer"
              >
                <ExternalLink size={18} /> View Live
              </a>
            )}
          </motion.div>
        </div>

        {/* 2. SAWIRKA PROJECT-KA: Directly after title & brief summary box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl mb-12 aspect-[16/9] sm:aspect-[21/9] max-h-[500px] relative group"
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* 3. DEEDNA DESCRIPTION: Full Structured Case Study underneath the image + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Columns-8: Detailed Description Document areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            {/* Case Study Section Header */}
            <div className="mb-8 pb-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-6 rounded-full bg-gradient-to-b from-primary to-amber-400 shrink-0" />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Comprehensive Case Study
                </h2>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                Technical Architecture & Overview
              </span>
            </div>

            {/* Case Study Written Document elements */}
            <div className="prose prose-invert prose-lg max-w-none mb-12">
              {project.description ? (
                <div>
                  {renderRichDescription(project.description)}
                </div>
              ) : (
                <div className="text-gray-400 italic">
                  No additional case study documentation provided for this project.
                </div>
              )}
            </div>

            {/* Numerical Scoreboards presenting objective indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5 my-12">
              <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                  Lighthouse Score
                </div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-secondary mb-1">
                  &lt; 1s
                </div>
                <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                  Load Time
                </div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                  Uptime
                </div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-2xl border border-white/5">
                <div className="text-2xl font-bold text-white mb-1">
                  5 Stars
                </div>
                <div className="text-xs text-gray-500 uppercase font-medium tracking-wide">
                  User Rating
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <ProjectComments projectId={project.id} />
          </motion.div>

          {/* Columns-4: Sidebar options matching stacks and recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full lg:w-1/3 space-y-8"
          >
            {/* Tech Stack listings box */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Tag size={18} className="text-primary" /> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-gray-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggest Related category selections list */}
            {relatedProjects.length > 0 && (
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                  <LayoutGrid size={18} className="text-secondary" /> Related
                  Work
                </h4>
                <div className="space-y-4">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.id}
                      to={`/project/${rp.id}`}
                      className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                        <img
                          src={rp.imageUrl}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-white font-bold text-sm group-hover:text-primary transition-colors">
                          {rp.title}
                        </h5>
                        <p className="text-gray-500 text-xs line-clamp-1 mt-1">
                          {rp.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Suggest general alternative items list */}
            {recentProjects.length > 0 && (
              <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5">
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                  <ChevronRight size={18} className="text-white" /> Other
                  Projects
                </h4>
                <div className="space-y-4">
                  {recentProjects.map((rp) => (
                    <Link
                      key={rp.id}
                      to={`/project/${rp.id}`}
                      className="group flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black shrink-0">
                        <img
                          src={rp.imageUrl}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h5 className="text-white font-bold text-sm group-hover:text-secondary transition-colors">
                          {rp.title}
                        </h5>
                        <p className="text-gray-500 text-xs line-clamp-1 mt-1">
                          {rp.description}
                        </p>
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
