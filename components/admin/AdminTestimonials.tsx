import React, { useState } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { TestimonialItem } from '../../types';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  X,
  MessageSquareQuote,
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useSiteData();
  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: 'CEO / Founder',
    company: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    content: '',
    isApproved: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      clientName: '',
      clientRole: 'CEO / Founder',
      company: '',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      rating: 5,
      content: '',
      isApproved: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName,
      clientRole: item.clientRole,
      company: item.company,
      avatarUrl: item.avatarUrl || '',
      rating: item.rating,
      content: item.content,
      isApproved: item.isApproved,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.content.trim()) return;

    if (editingItem) {
      await updateTestimonial(editingItem.id, formData);
    } else {
      await addTestimonial(formData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto marag-furka uu bixiyay "${name}"?`)) {
      await deleteTestimonial(id);
    }
  };

  const handleToggleApproved = async (item: TestimonialItem) => {
    await updateTestimonial(item.id, { isApproved: !item.isApproved });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Star className="text-amber-400 fill-amber-400" size={24} />
            <span>{t('admin_testimonials_title')}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {t('admin_testimonials_subtitle')}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>{t('admin_add_testimonial')}</span>
        </button>
      </div>

      {/* Grid */}
      {testimonials.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <MessageSquareQuote className="mx-auto text-slate-600" size={40} />
          <p className="text-sm font-medium text-slate-400">Weli wax marag-fur ah lama gelin.</p>
          <button
            onClick={handleOpenAdd}
            className="text-xs text-amber-400 hover:underline font-mono"
          >
            + Ku dar marag-furkii ugu horreeyay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                item.isApproved
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="space-y-3">
                {/* Header: Stars & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={idx < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleToggleApproved(item)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                      item.isApproved
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.isApproved ? (
                      <>
                        <Eye size={12} />
                        <span>Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} />
                        <span>Hidden</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Content Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {/* Author & Footer Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.avatarUrl ? (
                    <img
                      src={item.avatarUrl}
                      alt={item.clientName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">
                      {item.clientName.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-white">{item.clientName}</h4>
                    <p className="text-[11px] text-slate-400">
                      {item.clientRole} {item.company ? `• ${item.company}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Wax ka beddel"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.clientName)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Tirtir"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="text-amber-400 fill-amber-400" size={20} />
                <span>{editingItem ? 'Wax ka beddel Marag-furka' : 'Ku Dar Marag-fur Cusub'}</span>
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
                  Magaca Macmiilka (Client Name) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Tusaale: Ahmed Nur"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Jagada (Role / Title) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="Tusaale: CEO & Founder"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                    Shirkadda (Company)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Tusaale: Somali Tech Inc."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-1">
                <ImageUploader
                  label="Sawirka Macmiilka (Client Avatar Upload / URL)"
                  value={formData.avatarUrl}
                  onChange={(newUrl) => setFormData({ ...formData, avatarUrl: newUrl })}
                  placeholder="https://... ama dooro sawirka macmiilka"
                  helperText="Soo upload garee sawirka macmiilka (JPG, PNG, WEBP) ama geli link toos ah."
                  bucketName="portfolio-media"
                  folderPath="testimonials"
                  recommendedSize="Cabirka: 200x200px (1:1 square)"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Qiimeynta (Rating Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: starVal })}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        size={22}
                        className={
                          starVal <= formData.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-700'
                        }
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-400 ml-2">
                    {formData.rating} Xiddigood (Stars)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Qoraalka Marag-furka (Review Content) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Qor ra'yiga macmiilku ka dhiibtay shaqada..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isApproved}
                    onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white">Ka dhig mid muuqda (Approved & Visible)</span>
                    <p className="text-[11px] text-slate-400">
                      Wuxuu si toos ah uga muuqan doonaa bogga hore ee websaytka
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
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
                >
                  {editingItem ? 'Keydi Wax-ka-beddelka' : 'Keydi Marag-furka'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
