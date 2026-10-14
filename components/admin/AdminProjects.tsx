import React, { useState } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { Project } from '../../types';
import {
  FolderGit2,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Star,
  X,
  Image as ImageIcon,
  Check,
  Tag,
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const AdminProjects: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useSiteData();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web App',
    summary: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    githubUrl: 'https://github.com/alhady-mohamed',
    featured: false,
  });

  const [newTagInput, setNewTagInput] = useState('');
  const [featuredFeedback, setFeaturedFeedback] = useState<string | null>(null);

  const categories = ['All', 'Featured ⭐', 'Web App', 'Mobile', 'AI/ML', 'SaaS Platform', 'API / Backend'];

  const filteredProjects = projects.filter((p) => {
    const title = p.title || '';
    const desc = p.description || '';
    const techs = Array.isArray(p.technologies) ? p.technologies : [];

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      techs.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Featured ⭐'
        ? Boolean(p.featured)
        : (p.category || '').toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Web App',
      summary: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      link: '#',
      githubUrl: 'https://github.com/alhady-mohamed',
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || '',
      category: proj.category || 'Web App',
      summary: proj.summary || '',
      description: proj.description || '',
      imageUrl: proj.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      technologies: Array.isArray(proj.technologies) ? [...proj.technologies] : ['React', 'TypeScript'],
      link: proj.link || '#',
      githubUrl: proj.githubUrl || '',
      featured: Boolean(proj.featured),
    });
    setIsModalOpen(true);
  };

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (!newTagInput.trim()) return;
    if (!formData.technologies.includes(newTagInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTagInput.trim()],
      });
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingProject) {
      await updateProject(editingProject.id, formData);
      setFeaturedFeedback(`Mashruuca "${formData.title}" si guul leh ayaa loo cusboonaysiiyay!`);
    } else {
      await addProject(formData);
      setFeaturedFeedback(`Mashruuc cusub "${formData.title}" si guul leh ayaa loo daray!`);
    }

    setTimeout(() => setFeaturedFeedback(null), 3500);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string | number, title: string) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto mashruuca "${title}"?`)) {
      await deleteProject(id);
      setFeaturedFeedback(`Mashruuca "${title}" waa la tirtiray.`);
      setTimeout(() => setFeaturedFeedback(null), 3000);
    }
  };

  const handleToggleFeatured = async (proj: Project) => {
    const nextFeatured = !proj.featured;
    await updateProject(proj.id, { featured: nextFeatured });
    setFeaturedFeedback(
      nextFeatured
        ? `⭐ "${proj.title}" waxaa laga dhigay Featured Project! Wuxuu hadda ka dhex muuqanayaa Spotlight-ka.`
        : `"${proj.title}" waxaa laga saaray Featured-ka.`
    );
    setTimeout(() => {
      setFeaturedFeedback(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <FolderGit2 className="text-primary" size={26} />
            <span>{t('admin_projects_title')}</span>
          </h1>
          <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
            <p className="text-slate-400 text-sm">
              {t('admin_projects_subtitle')}
            </p>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span>{projects.filter((p) => p.featured).length} Featured</span>
            </span>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} />
          <span>{t('admin_add_project')}</span>
        </button>
      </div>

      {/* Featured Toast Alert */}
      {featuredFeedback && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between shadow-lg shadow-amber-500/5 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Star size={16} className="fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-medium">{featuredFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeaturedFeedback(null)}
            className="p-1 text-amber-300 hover:text-white rounded-lg hover:bg-amber-500/20 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('admin_search_projects_ph')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-primary transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {cat === 'All' ? t('projects_all') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid Display */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <FolderGit2 className="mx-auto text-slate-600" size={40} />
          <p className="text-sm font-medium text-slate-400">Wax mashruuc ah lama helin.</p>
          <button
            onClick={handleOpenAddModal}
            className="text-xs text-primary hover:underline font-mono"
          >
            + Ku dar mashruucii kuugu horreeyay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden flex flex-col transition-all shadow-xl group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-md border border-white/10 font-mono">
                    {p.category}
                  </span>
                  {p.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 flex items-center gap-1">
                      <Star size={10} className="fill-slate-950" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFeatured(p);
                    }}
                    title={p.featured ? 'Featured Mashruuc (Guji si aad uga saarto)' : 'Ka dhig Featured Project'}
                    className={`p-2 rounded-xl backdrop-blur-md border transition-all duration-200 cursor-pointer ${
                      p.featured
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 scale-105 hover:bg-amber-400'
                        : 'bg-slate-900/80 text-slate-400 hover:text-amber-300 hover:border-amber-500/40 border-white/10'
                    }`}
                  >
                    <Star size={14} className={p.featured ? 'fill-slate-950' : 'hover:fill-amber-400/20'} />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Bottom */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub Repo"
                        className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {p.link && p.link !== '#' && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Site"
                        className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      title="Wax ka beddel"
                      className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1 font-medium"
                    >
                      <Edit2 size={13} />
                      <span>Beddel</span>
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      title="Tirtir"
                      className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FolderGit2 className="text-primary" size={20} />
                <span>{editingProject ? 'Wax ka beddel Mashruuca' : 'Ku Dar Mashruuc Cusub'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Magaca Mashruuca (Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Tusaale: Somali Real Estate Hub"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Nooca (Category) *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile">Mobile App</option>
                    <option value="AI/ML">AI / Machine Learning</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value="API / Backend">API / Backend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Sharraxaad Dhammaystiran (Description) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Sharrax ujeeddada mashruuca, dhibaatooyinka uu xalliyo, iyo natiijooyinkiisa..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-1">
                <ImageUploader
                  label="Sawirka Mashruuca (Project Image Upload / URL) *"
                  value={formData.imageUrl}
                  onChange={(newUrl) => setFormData({ ...formData, imageUrl: newUrl })}
                  placeholder="https://... ama dooro sawirka mashruuca"
                  helperText="Soo upload garee sawirka mashruuca ama screenshot-ka app-ka (JPG, PNG, WEBP). Waxaad sidoo kale isticmaali kartaa link toos ah."
                  bucketName="portfolio-media"
                  folderPath="projects"
                  recommendedSize="Cabirka lagu talinayo: 1200x800px (16:10 ama 16:9)"
                />
              </div>

              {/* Technologies Tags */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Teknoolojiyada (Tech Stack)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Geli tech (e.g. Next.js) kadib riix Enter"
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-750 text-white rounded-xl text-xs font-medium"
                  >
                    + Ku dar
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Live Demo Link
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://example.com ama #"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    GitHub Repo Link
                  </label>
                  <input
                    type="text"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/user/project"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Featured toggle */}
              <div className="pt-2">
                <label
                  className={`relative flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none group ${
                    formData.featured
                      ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-slate-950/80 border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-3.5 pr-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                        formData.featured
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-amber-400 group-hover:border-slate-700'
                      }`}
                    >
                      <Star
                        size={20}
                        className={formData.featured ? 'fill-slate-950' : 'group-hover:fill-amber-400/20'}
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-bold transition-colors ${formData.featured ? 'text-amber-300' : 'text-white'}`}>
                          Ka dhig Featured Project (Spotlight & Showcase)
                        </span>
                        {formData.featured ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Active Featured
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-500 font-mono">
                            Standard
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {formData.featured
                          ? 'Mashruucan wuxuu si toos ah uga muuqan doonaa Spotlight Showcase-ka weyn ee bogga Projects iyo qaybta Selected Work ee Home-ka.'
                          : 'Guji toggle-kan si aad mashruucan uga dhigto Featured Project si toos ah uga muuqda Spotlight-ka.'}
                      </p>
                    </div>
                  </div>

                  {/* Custom Animated iOS-style Toggle Switch */}
                  <div className="relative shrink-0 flex items-center pl-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6.5 rounded-full transition-colors duration-300 p-0.5 flex items-center ${
                        formData.featured
                          ? 'bg-amber-500 shadow-md shadow-amber-500/30'
                          : 'bg-slate-800 border border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5.5 h-5.5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                          formData.featured ? 'translate-x-5.5 bg-slate-950 text-amber-500' : 'translate-x-0 bg-slate-400'
                        }`}
                      >
                        {formData.featured && <Check size={11} className="stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Ka noqo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all"
                >
                  {editingProject ? 'Keydi Wax-ka-beddelka' : 'Keydi Mashruuca'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
