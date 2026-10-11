import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import {
  FolderGit2,
  GraduationCap,
  Star,
  MessageSquare,
  ArrowRight,
  Mail,
  Palette,
  ExternalLink,
  Plus,
  Sparkles,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const {
    projects,
    timelines,
    testimonials,
    messages,
  } = useSiteData();
  const { t } = useLanguage();

  const unreadMessages = messages.filter((m) => !m.isRead);
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Organized Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-800/40 border border-slate-800/80 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-primary/20 text-primary">
              <Sparkles size={14} />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
              Portfolio Control Center
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {t('admin_welcome_title')}
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {t('admin_welcome_subtitle')}
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/admin/appearance"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all"
          >
            <Palette size={14} className="text-primary" />
            <span>{t('admin_appearance')}</span>
          </Link>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-md shadow-primary/25 transition-all"
          >
            <Plus size={14} />
            <span>{t('admin_new_project')}</span>
          </Link>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Projects */}
        <Link
          to="/admin/projects"
          className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-primary/50 transition-all shadow-md hover:shadow-primary/10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              {t('admin_stats_projects')}
            </span>
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <FolderGit2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{projects.length}</span>
            <span className="text-[11px] text-slate-400">({featuredProjects.length} featured)</span>
          </div>
        </Link>

        {/* Metric 2: Timeline */}
        <Link
          to="/admin/timeline"
          className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-secondary/50 transition-all shadow-md hover:shadow-secondary/10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              {t('admin_stats_timeline')}
            </span>
            <div className="p-2 rounded-xl bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{timelines.length}</span>
            <span className="text-[11px] text-slate-400">items</span>
          </div>
        </Link>

        {/* Metric 3: Reviews */}
        <Link
          to="/admin/testimonials"
          className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all shadow-md hover:shadow-amber-500/10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              {t('admin_stats_reviews')}
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Star size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{testimonials.length}</span>
            <span className="text-[11px] text-emerald-400">
              ({testimonials.filter((t) => t.isApproved).length} approved)
            </span>
          </div>
        </Link>

        {/* Metric 4: Messages */}
        <Link
          to="/admin/messages"
          className="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all shadow-md hover:shadow-indigo-500/10"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">
              {t('admin_stats_messages')}
            </span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
              <MessageSquare size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{messages.length}</span>
            {unreadMessages.length > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                {unreadMessages.length} {t('admin_messages')}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* 2-Column Balanced Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Messages */}
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Mail size={16} className="text-primary" />
              <span>{t('admin_recent_messages')}</span>
            </div>

            <Link
              to="/admin/messages"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              <span>{messages.length} total</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {messages.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center font-mono">
                No inquiries recorded yet.
              </p>
            ) : (
              messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    !msg.isRead
                      ? 'bg-slate-800/80 border-primary/30'
                      : 'bg-slate-950/40 border-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-300 line-clamp-1">{msg.subject}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Featured Projects Showcase */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <FolderGit2 size={16} className="text-primary" />
              <span>{t('admin_active_projects')}</span>
            </div>

            <Link
              to="/admin/projects"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 truncate mr-2">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-800"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200';
                    }}
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">{proj.title}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{proj.category}</span>
                  </div>
                </div>

                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
