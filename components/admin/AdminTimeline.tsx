import React, { useState } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { TimelineItem } from '../../types';
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
} from 'lucide-react';

export const AdminTimeline: React.FC = () => {
  const { timelines, addTimeline, updateTimeline, deleteTimeline } = useSiteData();

  const [filterType, setFilterType] = useState<'all' | 'education' | 'experience'>('all');
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

  const filteredItems = timelines.filter((t) => {
    if (filterType === 'all') return true;
    return t.type === filterType;
  });

  const handleOpenAdd = (type: 'education' | 'experience' = 'education') => {
    setEditingItem(null);
    setFormData({
      type,
      title: type === 'education' ? 'B.S. in Software Engineering' : 'Software Engineer',
      institution: type === 'education' ? 'University of Technology' : 'Tech Company',
      period: type === 'education' ? '2022 - 2026' : '2022 - Present',
      description: 'Focus on Data Structures, Algorithms, Software Engineering, and Modern Web Applications.',
      skills: ['Software Architecture', 'Web Development'],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.institution.trim()) return;

    if (editingItem) {
      await updateTimeline(editingItem.id, formData);
    } else {
      await addTimeline(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto "${title}"?`)) {
      await deleteTimeline(id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <GraduationCap className="text-secondary" size={26} />
            <span>Taariikhda & Waxbarashada (Timeline CMS)</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Maamul darajooyinka jaamacadda (Degree) iyo waayo-aragnimada shaqo ee ka muuqata bogga About.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleOpenAdd('education')}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-secondary/15 hover:bg-secondary/25 text-secondary border border-secondary/30 text-xs font-semibold transition-all"
          >
            <Plus size={15} />
            <span>+ Ku Dar Waxbarasho</span>
          </button>
          <button
            onClick={() => handleOpenAdd('experience')}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/25 transition-all"
          >
            <Plus size={15} />
            <span>+ Ku Dar Shaqo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
            filterType === 'all'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Dhammaan ({timelines.length})
        </button>
        <button
          onClick={() => setFilterType('education')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            filterType === 'education'
              ? 'bg-secondary/20 text-secondary border border-secondary/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <GraduationCap size={14} />
          <span>Waxbarashada ({timelines.filter((t) => t.type === 'education').length})</span>
        </button>
        <button
          onClick={() => setFilterType('experience')}
          className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            filterType === 'experience'
              ? 'bg-primary/20 text-primary border border-primary/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Briefcase size={14} />
          <span>Waayo-aragnimada Shaqo ({timelines.filter((t) => t.type === 'experience').length})</span>
        </button>
      </div>

      {/* Timeline Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3.5 rounded-2xl shrink-0 border ${
                  item.type === 'education'
                    ? 'bg-secondary/10 text-secondary border-secondary/20'
                    : 'bg-primary/10 text-primary border-primary/20'
                }`}
              >
                {item.type === 'education' ? <GraduationCap size={22} /> : <Briefcase size={22} />}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                      item.type === 'education'
                        ? 'bg-secondary/15 text-secondary border-secondary/30'
                        : 'bg-primary/15 text-primary border-primary/30'
                    }`}
                  >
                    {item.type === 'education' ? 'Academic Degree' : 'Employment'}
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
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => handleOpenEdit(item)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Edit2 size={13} />
                <span>Wax ka beddel</span>
              </button>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Tirtir"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {formData.type === 'education' ? (
                  <GraduationCap className="text-secondary" size={20} />
                ) : (
                  <Briefcase className="text-primary" size={20} />
                )}
                <span>
                  {editingItem ? 'Wax ka beddel Xogta' : 'Ku Dar Xog Cusub'}
                </span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Nooca (Section Type)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'education' })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 ${
                      formData.type === 'education'
                        ? 'bg-secondary/20 border-secondary text-secondary'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <GraduationCap size={16} />
                    <span>Waxbarasho (Education)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'experience' })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-center gap-2 ${
                      formData.type === 'experience'
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase size={16} />
                    <span>Shaqo (Experience)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Cinwaanka (Title / Degree) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Tusaale: B.S. in Software Engineering"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Hay'adda / Jaamacadda (Institution) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Tusaale: University of Technology"
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
                    placeholder="Tusaale: 2022 - 2026"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Faahfaahin (Description) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Focus on Data Structures, Algorithms, Software Engineering..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              {/* Skills tags */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Xirfadaha / Mawduucyada Muhiimka ah (Tags)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Ku dar tag (e.g. Algorithms) kadib riix Enter"
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3.5 py-2 bg-slate-800 text-white rounded-xl text-xs font-medium"
                  >
                    + Ku dar
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-400"
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
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Ka noqo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all"
                >
                  {editingItem ? 'Keydi Wax-ka-beddelka' : 'Keydi Xogta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
