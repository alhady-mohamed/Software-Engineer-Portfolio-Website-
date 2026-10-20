import React, { useState, useMemo } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { TimelineItem, CertificationItem } from '../../types';
import { INITIAL_SETTINGS } from '../../src/data/initialData';
import {
  GraduationCap,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  X,
  Calendar,
  Building,
  CheckCircle2,
  Award,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Code2,
  Search,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const AdminTimeline: React.FC = () => {
  const { timelines, addTimeline, updateTimeline, deleteTimeline, settings, updateSettings } = useSiteData();
  const { t, language } = useLanguage();

  const isSomali = language === 'so';

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'education' | 'experience' | 'certifications'>('all');

  // Timeline (Education / Experience) Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimelineItem | null>(null);
  const [formData, setFormData] = useState({
    type: 'education' as 'education' | 'experience',
    title: '',
    institution: '',
    period: '',
    description: '',
    skills: [] as string[],
  });
  const [skillInput, setSkillInput] = useState('');

  // Certifications Modal State
  const rawCertifications: CertificationItem[] = useMemo(() => {
    const list =
      settings.about?.certifications && settings.about.certifications.length > 0
        ? settings.about.certifications
        : (INITIAL_SETTINGS.about?.certifications || []);

    // Deduplicate by ID and Title to avoid any duplicate records
    const seen = new Set<string>();
    return list.filter((item) => {
      const key = `${item.id}-${item.title.trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [settings.about?.certifications]);

  // Deduplicated timelines to avoid repeating items
  const deduplicatedTimelines = useMemo(() => {
    const seen = new Set<string>();
    return timelines.filter((item) => {
      const key = `${item.id}-${item.type}-${item.title.trim().toLowerCase()}-${item.institution.trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [timelines]);

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [certFormData, setCertFormData] = useState<Omit<CertificationItem, 'id'>>({
    title: '',
    issuer: '',
    dateOrValidity: '',
    badgeText: 'La Xaqiijiyay',
    verificationUrl: '',
    iconType: 'award',
  });

  // Counts for summary metrics
  const educationCount = deduplicatedTimelines.filter((t) => t.type === 'education').length;
  const experienceCount = deduplicatedTimelines.filter((t) => t.type === 'experience').length;
  const certCount = rawCertifications.length;
  const totalCount = educationCount + experienceCount + certCount;

  // Filtered lists based on search query
  const query = searchQuery.trim().toLowerCase();

  const filteredTimelines = useMemo(() => {
    return deduplicatedTimelines.filter((item) => {
      if (filterType !== 'all' && item.type !== filterType) return false;
      if (!query) return true;
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchInst = item.institution.toLowerCase().includes(query);
      const matchDesc = item.description?.toLowerCase().includes(query);
      const matchSkills = item.skills?.some((s) => s.toLowerCase().includes(query));
      return matchTitle || matchInst || matchDesc || matchSkills;
    });
  }, [deduplicatedTimelines, filterType, query]);

  const filteredCertifications = useMemo(() => {
    if (filterType !== 'all' && filterType !== 'certifications') return [];
    return rawCertifications.filter((cert) => {
      if (!query) return true;
      const matchTitle = cert.title.toLowerCase().includes(query);
      const matchIssuer = cert.issuer.toLowerCase().includes(query);
      const matchBadge = cert.badgeText?.toLowerCase().includes(query);
      return matchTitle || matchIssuer || matchBadge;
    });
  }, [rawCertifications, filterType, query]);

  // Handlers for Timeline (Education & Experience)
  const handleOpenAdd = (type: 'education' | 'experience' = 'education') => {
    setEditingItem(null);
    setFormData({
      type,
      title: type === 'education' ? 'B.S. in Software Engineering' : 'Senior Full Stack Engineer',
      institution: type === 'education' ? 'Jaamacadda Barashada Farsamada' : 'Shirkadda Tiknoolajiyadda',
      period: type === 'education' ? '2022 - 2026' : '2022 - Hadda',
      description:
        type === 'education'
          ? 'Barashada dhismaha barnaamijyada casriga ah, qaab-dhismeedka xogta (Data Structures) iyo amniga hababka daruuriga ah.'
          : 'Hoggaaminta koox horumariyeyaal ah, dhisidda nidaamyo degdeg ah oo la qabsan kara kororka macaamiisha.',
      skills:
        type === 'education'
          ? ['Software Architecture', 'Algorithms', 'Cloud Systems']
          : ['React', 'TypeScript', 'Node.js', 'System Architecture'],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TimelineItem) => {
    setEditingItem(item);
    setFormData({
      type: item.type,
      title: item.title,
      institution: item.institution,
      period: item.period,
      description: item.description,
      skills: item.skills ? [...item.skills] : [],
    });
    setIsModalOpen(true);
  };

  const handleSubmitTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.institution.trim()) return;

    if (editingItem) {
      await updateTimeline(editingItem.id, formData);
    } else {
      await addTimeline(formData);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTimeline = async (id: string, title: string) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto diiwaankan: "${title}"?`)) {
      await deleteTimeline(id);
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (!formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  // Handlers for Certifications
  const handleOpenAddCert = (preset?: Partial<CertificationItem>) => {
    setEditingCert(null);
    setCertFormData({
      title: preset?.title || '',
      issuer: preset?.issuer || '',
      dateOrValidity: preset?.dateOrValidity || 'Ansax ah 2026',
      badgeText: preset?.badgeText || 'La Xaqiijiyay',
      verificationUrl: preset?.verificationUrl || '',
      iconType: preset?.iconType || 'award',
    });
    setIsCertModalOpen(true);
  };

  const handleOpenEditCert = (cert: CertificationItem) => {
    setEditingCert(cert);
    setCertFormData({
      title: cert.title,
      issuer: cert.issuer,
      dateOrValidity: cert.dateOrValidity,
      badgeText: cert.badgeText || 'La Xaqiijiyay',
      verificationUrl: cert.verificationUrl || '',
      iconType: cert.iconType || 'award',
    });
    setIsCertModalOpen(true);
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certFormData.title.trim()) return;

    let updatedList: CertificationItem[];
    if (editingCert) {
      updatedList = rawCertifications.map((c) =>
        c.id === editingCert.id ? { ...certFormData, id: editingCert.id } : c
      );
    } else {
      const newCert: CertificationItem = {
        ...certFormData,
        id: `cert-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      };
      updatedList = [...rawCertifications, newCert];
    }

    await updateSettings({
      about: {
        ...(settings.about || {}),
        certifications: updatedList,
      },
    });

    setIsCertModalOpen(false);
    setEditingCert(null);
  };

  const handleDeleteCert = async (id: string, title: string) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto shahaadadan: "${title}"?`)) {
      const updatedList = rawCertifications.filter((c) => c.id !== id);
      await updateSettings({
        about: {
          ...(settings.about || {}),
          certifications: updatedList,
        },
      });
    }
  };

  // Helper to open modal based on current active tab
  const handlePrimaryAddAction = () => {
    if (filterType === 'experience') {
      handleOpenAdd('experience');
    } else if (filterType === 'certifications') {
      handleOpenAddCert();
    } else {
      handleOpenAdd('education');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-secondary/15 text-secondary border border-secondary/30">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {t('admin_timeline_title', 'Taariikhda Shaqada & Waxbarashada')}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                {t(
                  'admin_timeline_subtitle',
                  'Maamul shahaadooyinka heer jaamacadeed, waayo-aragnimada shaqada, iyo aqoonsiyada la xaqiijiyay ee ka muuqanaya boggaaga.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Add Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleOpenAdd('education')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/30 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <GraduationCap size={15} />
            <span>+ {t('admin_add_education', 'Ku Dar Waxbarasho')}</span>
          </button>

          <button
            onClick={() => handleOpenAdd('experience')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-slate-950 font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            <Briefcase size={15} />
            <span>+ {t('admin_add_experience', 'Ku Dar Shaqo')}</span>
          </button>

          <button
            onClick={() => handleOpenAddCert()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Award size={15} />
            <span>+ {t('admin_add_certification', 'Ku Dar Shahaado')}</span>
          </button>
        </div>
      </div>

      {/* 2. Organized Metric Cards Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* All Records Metric */}
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'all'
              ? 'bg-slate-800/90 border-slate-600 shadow-md ring-1 ring-slate-500'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">
              {t('admin_timeline_total_records', 'Wadarta Guud')}
            </span>
            <Layers size={16} className="text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{totalCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Dhammaan diiwaannada ku jira nidaamka</p>
        </button>

        {/* Education Metric */}
        <button
          type="button"
          onClick={() => setFilterType('education')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'education'
              ? 'bg-secondary/15 border-secondary/60 shadow-md ring-1 ring-secondary/40'
              : 'bg-slate-900/60 border-slate-800 hover:border-secondary/30 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-secondary font-medium">
              {t('admin_timeline_academic_degrees', 'Shahaadooyinka Jaamacadda')}
            </span>
            <GraduationCap size={16} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{educationCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Shahaadooyinka heer sare</p>
        </button>

        {/* Experience Metric */}
        <button
          type="button"
          onClick={() => setFilterType('experience')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'experience'
              ? 'bg-primary/15 border-primary/60 shadow-md ring-1 ring-primary/40'
              : 'bg-slate-900/60 border-slate-800 hover:border-primary/30 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary font-medium">
              {t('admin_timeline_work_roles', 'Boosaska Shaqo')}
            </span>
            <Briefcase size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{experienceCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Waayo-aragnimooyin shaqo</p>
        </button>

        {/* Certifications Metric */}
        <button
          type="button"
          onClick={() => setFilterType('certifications')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            filterType === 'certifications'
              ? 'bg-amber-500/15 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
              : 'bg-slate-900/60 border-slate-800 hover:border-amber-500/30 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-amber-300 font-medium">
              {t('admin_timeline_verified_creds', 'Aqoonsiyo La Xaqiijiyay')}
            </span>
            <Award size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{certCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Shahaadooyin & koobab rasmi ah</p>
        </button>
      </div>

      {/* 3. Search & Interactive Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t(
              'admin_timeline_search_ph',
              'Raadi shaqo, jaamacad, shirkad, shahaado ama xirfad...'
            )}
            className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterType === 'all'
                ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {t('admin_timeline_tab_all', 'Dhammaan')} ({totalCount})
          </button>

          <button
            onClick={() => setFilterType('education')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterType === 'education'
                ? 'bg-secondary/20 text-secondary border border-secondary/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <GraduationCap size={13} />
            <span>{t('admin_timeline_tab_education', 'Waxbarashada')}</span> ({educationCount})
          </button>

          <button
            onClick={() => setFilterType('experience')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterType === 'experience'
                ? 'bg-primary/20 text-primary border border-primary/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Briefcase size={13} />
            <span>{t('admin_timeline_tab_experience', 'Waayo-aragnimo')}</span> ({experienceCount})
          </button>

          <button
            onClick={() => setFilterType('certifications')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              filterType === 'certifications'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Award size={13} />
            <span>{t('admin_timeline_tab_certifications', 'Shahaadooyinka')}</span> ({certCount})
          </button>
        </div>
      </div>

      {/* 4. Timeline Records Listing */}
      <div className="space-y-4">
        {/* Render Education & Experience Cards */}
        {filteredTimelines.length > 0 && (
          <div className="space-y-3">
            {filterType === 'all' && (
              <div className="flex items-center justify-between pt-2 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Briefcase size={14} className="text-primary" />
                  <span>Taariikhda Waxbarashada & Shaqada ({filteredTimelines.length})</span>
                </span>
              </div>
            )}

            {filteredTimelines.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl shrink-0 border ${
                      item.type === 'education'
                        ? 'bg-secondary/10 text-secondary border-secondary/20'
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}
                  >
                    {item.type === 'education' ? <GraduationCap size={22} /> : <Briefcase size={22} />}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                          item.type === 'education'
                            ? 'bg-secondary/15 text-secondary border-secondary/30'
                            : 'bg-primary/15 text-primary border-primary/30'
                        }`}
                      >
                        {item.type === 'education'
                          ? isSomali
                            ? 'Shahaado Jaamacadeed'
                            : 'Academic Degree'
                          : isSomali
                          ? 'Waayo-aragnimo Shaqo'
                          : 'Employment'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                        <Building size={14} className="text-slate-400" />
                        <span>{item.institution}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-slate-400">
                        <Calendar size={14} />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 max-w-2xl leading-relaxed pt-1">
                      {item.description}
                    </p>

                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/80">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 size={13} />
                    <span>Wax ka beddel</span>
                  </button>
                  <button
                    onClick={() => handleDeleteTimeline(item.id, item.title)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Tirtir diiwaankan"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render Certifications Cards */}
        {filteredCertifications.length > 0 && (
          <div className="space-y-3 pt-2">
            {filterType === 'all' && (
              <div className="flex items-center justify-between pt-4 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Award size={14} className="text-amber-400" />
                  <span>Shahaadooyinka & Aqoonsiyada La Xaqiijiyay ({filteredCertifications.length})</span>
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex items-start justify-between gap-4 group shadow-lg"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                      {cert.iconType === 'shield' ? (
                        <ShieldCheck size={20} />
                      ) : cert.iconType === 'sparkles' ? (
                        <Sparkles size={20} />
                      ) : cert.iconType === 'code' ? (
                        <Code2 size={20} />
                      ) : (
                        <Award size={20} />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {cert.title}
                        </h4>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                          {cert.badgeText || 'La Xaqiijiyay'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{cert.issuer}</p>
                      <p className="text-[11px] font-mono text-slate-400">{cert.dateOrValidity}</p>

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] text-primary hover:underline pt-1.5 font-medium"
                        >
                          <ExternalLink size={12} />
                          <span>{t('admin_timeline_verify_link', 'Xaqiiji Shahaadada (Verify)')}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenEditCert(cert)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Wax ka beddel shahaadadan"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteCert(cert.id, cert.title)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="Tirtir shahaadadan"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredTimelines.length === 0 && filteredCertifications.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800">
            <GraduationCap size={40} className="mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              {t('admin_timeline_empty_records', 'Wax xog ah lagama helin')}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              Wax natiijo ah kuma jiraan qaybta aad dooratay ama qoraalka aad raadisay. Guji badhanka hoose si aad xog ugu darto.
            </p>
            <button
              onClick={handlePrimaryAddAction}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-slate-950 font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Plus size={15} />
              <span>Ku Dar Diiwaan Cusub</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Add / Edit Timeline Modal (Education / Experience) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
                {formData.type === 'education' ? (
                  <div className="p-2 rounded-xl bg-secondary/15 text-secondary">
                    <GraduationCap size={18} />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-primary/15 text-primary">
                    <Briefcase size={18} />
                  </div>
                )}
                <span>
                  {editingItem
                    ? 'Wax ka beddel Xogta'
                    : formData.type === 'education'
                    ? 'Ku Dar Waxbarasho Cusub'
                    : 'Ku Dar Shaqo Cusub'}
                </span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitTimeline} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Nooca Diiwaanka (Section Type)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'education' })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.type === 'education'
                        ? 'bg-secondary/20 border-secondary text-secondary shadow-sm'
                        : 'border-slate-800 text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    <GraduationCap size={16} />
                    <span>Waxbarasho (Education)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'experience' })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.type === 'experience'
                        ? 'bg-primary/20 border-primary text-primary shadow-sm'
                        : 'border-slate-800 text-slate-400 hover:text-white bg-slate-950'
                    }`}
                  >
                    <Briefcase size={16} />
                    <span>Shaqo (Experience)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Cinwaanka (Degree / Job Title) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={
                    formData.type === 'education'
                      ? 'Tusaale: B.S. in Software Engineering'
                      : 'Tusaale: Senior Full Stack Engineer'
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    {formData.type === 'education' ? "Jaamacadda / Machadka *" : "Shirkadda / Ururka *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder={
                      formData.type === 'education'
                        ? 'Tusaale: University of Technology'
                        : 'Tusaale: Tech Solutions Inc.'
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Muddada (Period / Years) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Tusaale: 2022 - 2026 ama 2021 - Present"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Faahfaahin Qoran (Description) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sharraxaad kooban oo ku saabsan mas'uuliyadaha ama mowduucyada muhiimka ah..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Skills Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Xirfadaha & Aqoonta (Skill Tags)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Ku dar xirfad (e.g. React, Next.js) kadibna riix Enter"
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium cursor-pointer"
                  >
                    + Ku dar
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[30px]">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-400 cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Ka noqo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-slate-950 shadow-lg shadow-primary/25 transition-all cursor-pointer"
                >
                  {editingItem ? 'Keydi Isbeddelka' : 'Keydi Diiwaanka'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Add / Edit Certification & Verification Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  <Award size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {editingCert ? 'Wax ka beddel Shahaadada' : 'Ku Dar Shahaado / Verification Cusub'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Geli macluumaadka shahaadada iyo xiriirka xaqiijinta (Verification URL)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick 1-Click Presets */}
            {!editingCert && (
              <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl">
                <p className="text-[11px] font-semibold text-slate-400 mb-2">
                  Tusaalooyin Diyaar ah (1-Click Quick Presets):
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setCertFormData({
                        title: 'AWS Certified Solutions Architect',
                        issuer: 'Amazon Web Services • Cloud Infrastructure',
                        dateOrValidity: 'Ansax ah 2027',
                        badgeText: 'Active AWS',
                        verificationUrl: 'https://aws.amazon.com/verification',
                        iconType: 'award',
                      })
                    }
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/25 transition-all cursor-pointer"
                  >
                    + AWS Architect
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCertFormData({
                        title: 'Meta Frontend Developer Professional',
                        issuer: 'Meta / Coursera • React & TypeScript',
                        dateOrValidity: 'La Soo Saaray 2024',
                        badgeText: 'La Xaqiijiyay',
                        verificationUrl: 'https://coursera.org/verify',
                        iconType: 'code',
                      })
                    }
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/25 transition-all cursor-pointer"
                  >
                    + Meta Frontend
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCertFormData({
                        title: 'Google Cloud Professional Architect',
                        issuer: 'Google Cloud Platform (GCP)',
                        dateOrValidity: 'Ansax ah 2027',
                        badgeText: 'GCP Certified',
                        verificationUrl: 'https://cloud.google.com/certification',
                        iconType: 'shield',
                      })
                    }
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 transition-all cursor-pointer"
                  >
                    + Google Cloud
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCertFormData({
                        title: '1st Place Winner - Best Innovation',
                        issuer: 'Global TechHackathon • Real-Time Web Platform',
                        dateOrValidity: 'Koobka 1-aad',
                        badgeText: 'Guulayste',
                        verificationUrl: '',
                        iconType: 'sparkles',
                      })
                    }
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/25 transition-all cursor-pointer"
                  >
                    + Hackathon Winner
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveCert} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Magaca Shahaadada (Certificate Title) *
                </label>
                <input
                  type="text"
                  required
                  value={certFormData.title}
                  onChange={(e) => setCertFormData({ ...certFormData, title: e.target.value })}
                  placeholder="Tusaale: AWS Certified Solutions Architect"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Hay'adda Bixisay (Issuing Organization) *
                </label>
                <input
                  type="text"
                  required
                  value={certFormData.issuer}
                  onChange={(e) => setCertFormData({ ...certFormData, issuer: e.target.value })}
                  placeholder="Tusaale: Amazon Web Services • Cloud Infrastructure"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Muddada / Xilliga Ansaxnimada
                  </label>
                  <input
                    type="text"
                    value={certFormData.dateOrValidity}
                    onChange={(e) => setCertFormData({ ...certFormData, dateOrValidity: e.target.value })}
                    placeholder="Tusaale: Ansax ah 2026 ama 2024"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Qoraalka Calaamadda (Badge Text)
                  </label>
                  <input
                    type="text"
                    value={certFormData.badgeText}
                    onChange={(e) => setCertFormData({ ...certFormData, badgeText: e.target.value })}
                    placeholder="Tusaale: La Xaqiijiyay, Winner, AWS Certified"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Link-ga Xaqiijinta Rasmiga ah (Verification URL)
                </label>
                <input
                  type="url"
                  value={certFormData.verificationUrl}
                  onChange={(e) => setCertFormData({ ...certFormData, verificationUrl: e.target.value })}
                  placeholder="https://aws.amazon.com/verification ama link-ga credly"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Nooca Astaanta (Icon Style)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'award', label: 'Shahaado (Award)', icon: Award },
                    { id: 'shield', label: 'Amni (Shield)', icon: ShieldCheck },
                    { id: 'code', label: 'Koodh (Code)', icon: Code2 },
                    { id: 'sparkles', label: 'Koob (Sparkles)', icon: Sparkles },
                  ].map((ic) => {
                    const IconComp = ic.icon;
                    return (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setCertFormData({ ...certFormData, iconType: ic.id as any })}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs transition-all cursor-pointer ${
                          certFormData.iconType === ic.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'border-slate-800 text-slate-400 hover:text-white bg-slate-950'
                        }`}
                      >
                        <IconComp size={16} />
                        <span className="text-[10px]">{ic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Ka noqo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
                >
                  {editingCert ? 'Keydi Shahaadada' : 'Ku Dar Shahaadada'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
