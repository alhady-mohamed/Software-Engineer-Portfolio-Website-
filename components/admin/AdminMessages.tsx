import React, { useState } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { useLanguage } from '../../src/context/LanguageContext';
import { ContactMessage } from '../../types';
import {
  MessageSquare,
  Mail,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  X,
  User,
  Calendar,
  Reply,
} from 'lucide-react';

export const AdminMessages: React.FC = () => {
  const { messages, markMessageRead, deleteMessage } = useSiteData();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterState === 'all'
        ? true
        : filterState === 'unread'
        ? !m.isRead
        : m.isRead;

    return matchesSearch && matchesFilter;
  });

  const handleOpenDetail = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      await markMessageRead(msg.id, true);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete message from "${name}"?`)) {
      await deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleToggleRead = async (msg: ContactMessage, e: React.MouseEvent) => {
    e.stopPropagation();
    await markMessageRead(msg.id, !msg.isRead);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <MessageSquare className="text-indigo-400" size={26} />
            <span>{t('admin_messages_title')}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {t('admin_messages_subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            {t('admin_total')}: <strong>{messages.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400">
            {t('admin_unread')}: <strong>{messages.filter((m) => !m.isRead).length}</strong>
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('admin_search_messages_ph')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterState('all')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              filterState === 'all'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {t('projects_all')} ({messages.length})
          </button>
          <button
            onClick={() => setFilterState('unread')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              filterState === 'unread'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {t('admin_unread')} ({messages.filter((m) => !m.isRead).length})
          </button>
          <button
            onClick={() => setFilterState('read')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              filterState === 'read'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {t('admin_read')} ({messages.filter((m) => m.isRead).length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <Mail className="mx-auto text-slate-600" size={40} />
          <p className="text-sm font-medium text-slate-400">Wax farriimo ah laguma helin shaandheyntan.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenDetail(msg)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                !msg.isRead
                  ? 'bg-slate-900/95 border-indigo-500/30 hover:border-indigo-400 shadow-md'
                  : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div
                  className={`p-3 rounded-xl shrink-0 ${
                    !msg.isRead
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Mail size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white truncate">{msg.name}</span>
                    <span className="text-xs text-slate-400 font-mono">({msg.email})</span>
                    {!msg.isRead ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Cusub
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        La akhriyey
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-slate-200 truncate">{msg.subject || 'Mawduuc la aan'}</p>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Right Side Info & Actions */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs text-slate-500 font-mono">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>

                <button
                  onClick={(e) => handleToggleRead(msg, e)}
                  title={msg.isRead ? 'U calaamadee mid cusub' : 'U calaamadee in la akhriyey'}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {msg.isRead ? <Clock size={16} /> : <CheckCircle size={16} className="text-indigo-400" />}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg.id, msg.name);
                  }}
                  title="Tirtir farriinta"
                  className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Faahfaahinta Farriinta</h2>
                  <span className="text-xs text-slate-400 font-mono">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">
                    Soo Dire
                  </span>
                  <span className="text-white font-medium">{selectedMessage.name}</span>
                </div>

                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">
                    Email-ka
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-indigo-400 hover:underline font-mono"
                  >
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-slate-900">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold block mb-0.5">
                    Mawduuca (Subject)
                  </span>
                  <span className="text-white font-medium">{selectedMessage.subject || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase text-slate-400 block mb-2">
                  Qoraalka Farriinta (Message)
                </span>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                className="px-3.5 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                <span>Tirtir</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Xir
                </button>

                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || 'Consultation Inquiry'
                  )}`}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
                >
                  <Reply size={15} />
                  <span>U jawaab (Reply Email)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
