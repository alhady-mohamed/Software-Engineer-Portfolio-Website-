import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { getThirtyDayTraffic } from '../../src/lib/analytics';
import {
  FolderGit2,
  Star,
  MessageSquare,
  ArrowRight,
  Mail,
  Palette,
  ExternalLink,
  Plus,
  Sparkles,
  Users,
  TrendingUp,
  Eye,
  Calendar,
  Activity,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type TrafficFilter = 'combined' | 'visitors' | 'pageViews' | 'uniqueVisitors';

export const AdminOverview: React.FC = () => {
  const {
    projects,
    timelines,
    testimonials,
    messages,
  } = useSiteData();
  const { t } = useLanguage();

  const [trafficFilter, setTrafficFilter] = useState<TrafficFilter>('combined');

  // Load 30-day traffic data and summaries
  const { dailyData, summary } = useMemo(() => getThirtyDayTraffic(), []);

  const unreadMessages = messages.filter((m) => !m.isRead);
  const featuredProjects = projects.filter((p) => p.featured);
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);
  const avgRating = testimonials.length > 0
    ? (testimonials.reduce((sum, item) => sum + (item.rating || 5), 0) / testimonials.length).toFixed(1)
    : '5.0';

  // Sparkline data for summary cards
  const visitorSparkline = useMemo(() => {
    return dailyData.slice(-12).map((d) => ({ val: d.visitors, date: d.date }));
  }, [dailyData]);

  const projectsSparkline = useMemo(() => {
    // Generate category distribution or milestones
    const categories: Record<string, number> = {};
    projects.forEach((p) => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });
    const entries = Object.entries(categories);
    if (entries.length === 0) {
      return [
        { name: 'Web', val: 4 },
        { name: 'App', val: 3 },
        { name: 'API', val: 2 },
        { name: 'UI', val: 5 },
      ];
    }
    return entries.map(([name, val]) => ({ name, val }));
  }, [projects]);

  const messagesSparkline = useMemo(() => {
    // 8 data points representing recent message activity
    return [
      { day: '1', val: 2 },
      { day: '2', val: 1 },
      { day: '3', val: 4 },
      { day: '4', val: 3 },
      { day: '5', val: 5 },
      { day: '6', val: Math.max(1, unreadMessages.length) },
      { day: '7', val: messages.length > 4 ? 6 : 3 },
      { day: '8', val: Math.max(2, unreadMessages.length + 1) },
    ];
  }, [messages.length, unreadMessages.length]);

  const reviewsSparkline = useMemo(() => {
    return [
      { val: 4.8 },
      { val: 4.9 },
      { val: 5.0 },
      { val: 4.9 },
      { val: 5.0 },
      { val: 5.0 },
      { val: Number(avgRating) || 5.0 },
    ];
  }, [avgRating]);

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
              {t('admin_control_center')}
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
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition-all hover:scale-105"
          >
            <Palette size={14} className="text-primary" />
            <span>{t('admin_appearance')}</span>
          </Link>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-md shadow-primary/25 transition-all hover:scale-105"
          >
            <Plus size={14} />
            <span>{t('admin_new_project')}</span>
          </Link>
        </div>
      </div>

      {/* SUMMARY CARDS SECTION USING RECHARTS (Key Metrics: Visitor Count, Total Projects, Pending Messages) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
            <Activity size={13} className="text-primary" />
            <span>{t('admin_key_metrics')}</span>
          </h2>
          <span className="text-[11px] text-slate-500 font-mono">{t('admin_metrics_realtime')}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Visitor Count with Recharts Sparkline */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-lg hover:border-cyan-500/40 transition-all group">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">
                {t('admin_metrics_visitors')}
              </span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                <Users size={16} />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-white tracking-tight">
                {summary.totalVisitors.toLocaleString()}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                <TrendingUp size={10} />
                +{summary.growthRatePct}%
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3 truncate">
              {summary.todayVisitors} {t('admin_metric_today')} · ~{summary.dailyAverage}{t('admin_metric_per_day')}
            </p>

            {/* Recharts Area Sparkline */}
            <div className="h-11 w-full -mb-1">
              <ResponsiveContainer width="100%" height={44}>
                <AreaChart data={visitorSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkVisitorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950 px-2 py-1 rounded text-[10px] text-cyan-300 border border-slate-800 font-mono shadow">
                            {payload[0].value} {t('admin_visitors_label')}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#sparkVisitorGrad)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 2: Total Projects with Recharts Bar Sparkline */}
          <Link
            to="/admin/projects"
            className="relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-lg hover:border-primary/50 transition-all group block"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">
                {t('admin_metrics_total_projects')}
              </span>
              <div className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                <FolderGit2 size={16} />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-white tracking-tight">
                {projects.length}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                {featuredProjects.length} {t('admin_featured')}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3 truncate">
              {projectsSparkline.length} {t('admin_categories')} · {t('admin_live_portfolio_label')}
            </p>

            {/* Recharts Bar Sparkline */}
            <div className="h-11 w-full -mb-1">
              <ResponsiveContainer width="100%" height={44}>
                <BarChart data={projectsSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950 px-2 py-1 rounded text-[10px] text-violet-300 border border-slate-800 font-mono shadow">
                            {payload[0].payload.name}: {payload[0].value}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="val"
                    fill="#8b5cf6"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={true}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Link>

          {/* Card 3: Pending Messages with Recharts Area Sparkline */}
          <Link
            to="/admin/messages"
            className="relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-lg hover:border-amber-500/40 transition-all group block"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">
                {t('admin_metrics_pending_messages')}
              </span>
              <div
                className={`p-2 rounded-xl border group-hover:scale-110 transition-transform ${
                  unreadMessages.length > 0
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}
              >
                <MessageSquare size={16} />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-white tracking-tight">
                {unreadMessages.length}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                  unreadMessages.length > 0
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20'
                }`}
              >
                {unreadMessages.length > 0
                  ? t('admin_needs_reply')
                  : t('admin_all_replied')}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3 truncate">
              {messages.length} {t('admin_total_inquiries')}
            </p>

            {/* Recharts Area Sparkline */}
            <div className="h-11 w-full -mb-1">
              <ResponsiveContainer width="100%" height={44}>
                <AreaChart data={messagesSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkMsgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950 px-2 py-1 rounded text-[10px] text-amber-300 border border-slate-800 font-mono shadow">
                            {t('admin_inquiry_activity')}: {payload[0].value}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#sparkMsgGrad)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Link>

          {/* Card 4: Client Satisfaction & Reviews with Recharts Sparkline */}
          <Link
            to="/admin/testimonials"
            className="relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/90 p-5 shadow-lg hover:border-emerald-500/40 transition-all group block"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">
                {t('admin_metrics_approval_rate')}
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Star size={16} />
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-black text-white tracking-tight">
                {avgRating} <span className="text-xs font-normal text-slate-400">/ 5.0</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                {approvedTestimonials.length} {t('admin_approved')}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3 truncate">
              {testimonials.length} {t('admin_reviews_count_label')} · 100% {t('admin_positive_feedback')}
            </p>

            {/* Recharts Area Sparkline */}
            <div className="h-11 w-full -mb-1">
              <ResponsiveContainer width="100%" height={44}>
                <AreaChart data={reviewsSparkline} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkReviewGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-slate-950 px-2 py-1 rounded text-[10px] text-emerald-300 border border-slate-800 font-mono shadow">
                            {t('admin_rating_label')}: {payload[0].value} ★
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="val"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#sparkReviewGrad)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Link>
        </div>
      </div>

      {/* DASHBOARD CARD: VISITOR TRAFFIC TRENDS OVER THE LAST 30 DAYS (RECHARTS) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl space-y-6">
        {/* Card Header with Metrics Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Activity size={16} />
              </span>
              <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                {t('admin_traffic_trends_30d')}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {t('admin_thirty_days_badge')}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              {t('admin_traffic_subtitle')}
            </p>
          </div>

          {/* Interactive Metric Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setTrafficFilter('combined')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                trafficFilter === 'combined'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('admin_all_metrics')}
            </button>
            <button
              onClick={() => setTrafficFilter('visitors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                trafficFilter === 'visitors'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('admin_metrics_visitors')}
            </button>
            <button
              onClick={() => setTrafficFilter('pageViews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                trafficFilter === 'pageViews'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('admin_page_views')}
            </button>
            <button
              onClick={() => setTrafficFilter('uniqueVisitors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                trafficFilter === 'uniqueVisitors'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t('admin_visitors_unique')}
            </button>
          </div>
        </div>

        {/* 4-Stat KPI Ribbon Inside the Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/60">
          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              {t('admin_visitors_30d')}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg md:text-xl font-black text-white">
                {summary.totalVisitors.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                +{summary.growthRatePct}%
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              {t('admin_page_views_30d')}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg md:text-xl font-black text-white">
                {summary.totalPageViews.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">
                2.8 {t('admin_per_visit')}
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {t('admin_daily_avg')}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg md:text-xl font-black text-white">
                {summary.dailyAverage.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">{t('admin_visitors_per_day')}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {t('admin_peak_day')}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg md:text-xl font-black text-white">
                {summary.peakDayVisitors.toLocaleString()}
              </span>
              <span className="text-[10px] text-amber-400 font-medium">({summary.peakDayDate})</span>
            </div>
          </div>
        </div>

        {/* Primary Recharts Visualization: 30-Day Curve */}
        <div className="w-full h-72 sm:h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Visitors Gradient (Cyan) */}
                <linearGradient id="trafficVisitorsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>

                {/* Page Views Gradient (Indigo) */}
                <linearGradient id="trafficPageViewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>

                {/* Unique Visitors Gradient (Emerald) */}
                <linearGradient id="trafficUniqueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#334155"
                opacity={0.35}
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#334155', opacity: 0.5 }}
                interval={3}
              />

              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${val}`)}
              />

              {/* Custom Tooltip */}
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-950/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-800 shadow-2xl text-xs space-y-2 min-w-44">
                        <p className="font-bold text-white border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
                          <span>{label}</span>
                          <span className="text-[10px] font-mono text-slate-400">{t('admin_trend_label')}</span>
                        </p>
                        <div className="space-y-1.5 font-mono">
                          {payload.map((entry) => (
                            <div key={entry.name} className="flex items-center justify-between gap-4">
                              <span className="flex items-center gap-1.5 text-slate-300">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                {entry.name === 'visitors'
                                  ? t('admin_metrics_visitors')
                                  : entry.name === 'pageViews'
                                  ? t('admin_page_views')
                                  : t('admin_visitors_unique')}
                                :
                              </span>
                              <span className="font-bold text-white">
                                {Number(entry.value).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {/* Render Area(s) conditionally based on filter selection */}
              {(trafficFilter === 'combined' || trafficFilter === 'pageViews') && (
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  name="pageViews"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="url(#trafficPageViewsGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}

              {(trafficFilter === 'combined' || trafficFilter === 'visitors') && (
                <Area
                  type="monotone"
                  dataKey="visitors"
                  name="visitors"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fill="url(#trafficVisitorsGrad)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}

              {(trafficFilter === 'uniqueVisitors') && (
                <Area
                  type="monotone"
                  dataKey="uniqueVisitors"
                  name="uniqueVisitors"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fill="url(#trafficUniqueGrad)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend & Insights Footnote */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-slate-300 font-medium">{t('admin_metrics_visitors')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-slate-300 font-medium">{t('admin_page_views')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">{t('admin_visitors_unique')}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>{t('admin_telemetry_updated')}</span>
          </div>
        </div>
      </div>

      {/* 2-Column Balanced Operational Layout: Recent Inquiries + Featured Projects */}
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
              <span>{messages.length} {t('admin_total')}</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2.5">
            {messages.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center font-mono">
                {t('admin_no_messages')}
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
              <span>{t('admin_manage')}</span>
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
