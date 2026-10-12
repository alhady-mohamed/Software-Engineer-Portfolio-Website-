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

  const categories = ['All', 'Web App', 'Mobile', 'AI/ML'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
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
      title: proj.title,
      category: proj.category,
      summary: proj.summary || '',
      description: proj.description,
      imageUrl: proj.imageUrl,
      technologies: [...proj.technologies],
      link: proj.link,
      githubUrl: proj.githubUrl,
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
    } else {
      await addProject(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string | number, title: string) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto mashruuca "${title}"?`)) {
      await deleteProject(id);
    }
  };

  const handleToggleFeatured = async (proj: Project) => {
    await updateProject(proj.id, { featured: !proj.featured });
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
          <p className="text-slate-400 text-sm mt-1">
            {t('admin_projects_subtitle')}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>{t('admin_add_project')}</span>
        </button>
      </div>

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
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-md border border-white/10 font-mono">
                    {p.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleFeatured(p)}
                    title={p.featured ? 'Featured Mashruuc' : 'Ka dhig Featured'}
                    className={`p-2 rounded-xl backdrop-blur-md border transition-colors ${
                      p.featured
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-900/70 text-slate-400 hover:text-white border-white/10'
                    }`}
                  >
                    <Star size={14} className={p.featured ? 'fill-slate-950' : ''} />
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
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-primary bg-slate-950 border-slate-700 focus:ring-primary"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white">Ka dhig Featured Project</span>
                    <p className="text-[11px] text-slate-400">
                      Wuxuu si toos ah uga dhex muuqan doonaa bogga hore (Hero / Home showcase)
                    </p>
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
