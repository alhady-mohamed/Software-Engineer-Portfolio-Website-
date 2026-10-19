import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Send,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Smartphone,
  Palette,
  Video,
  Layers,
  ArrowRight,
  ExternalLink,
  DollarSign,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  FileText,
} from 'lucide-react';
import { useSiteData } from '../src/context/SiteDataContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  { id: 'web', label: 'Web Application', icon: Code2, desc: 'SaaS, Portals, Dashboards & APIs' },
  { id: 'mobile', label: 'Mobile App', icon: Smartphone, desc: 'iOS & Android responsive apps' },
  { id: 'uiux', label: 'UI/UX & Branding', icon: Palette, desc: 'Design systems, logos & prototypes' },
  { id: 'video', label: 'Video Production', icon: Video, desc: 'Cinematic commercials & motion VFX' },
  { id: 'custom', label: 'Custom Architecture', icon: Layers, desc: 'Integrations, DevOps & optimizations' },
];

const BUDGET_RANGES = [
  { id: 'starter', label: '< $1,000', sub: 'Starter / MVP' },
  { id: 'standard', label: '$1,000 - $3,000', sub: 'Production Ready' },
  { id: 'advanced', label: '$3,000 - $7,000', sub: 'Scale & Growth' },
  { id: 'enterprise', label: '$7,000+', sub: 'Enterprise / Custom' },
  { id: 'flexible', label: 'Flexible', sub: 'Open to advice' },
];

const TIMELINES = [
  { id: 'urgent', label: '⚡ Urgent (< 2 weeks)' },
  { id: 'month', label: '📅 ~1 Month' },
  { id: 'quarter', label: '🚀 2 - 3 Months' },
  { id: 'flexible', label: '⏳ Flexible' },
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { settings, addMessage } = useSiteData();

  const [selectedType, setSelectedType] = useState('web');
  const [selectedBudget, setSelectedBudget] = useState('$1,000 - $3,000');
  const [selectedTimeline, setSelectedTimeline] = useState('📅 ~1 Month');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Compute WhatsApp target phone number
  const rawPhone = settings?.whatsappNumber || '+252634944558';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');

  const constructWhatsAppMessage = () => {
    const selectedService = PROJECT_TYPES.find((p) => p.id === selectedType)?.label || selectedType;
    return encodeURIComponent(
      `*New Project Quote Request*\n\n` +
      `*Client:* ${name || 'Prospective Partner'}\n` +
      `*Email:* ${email || 'Not specified'}\n` +
      `*Phone/WhatsApp:* ${phone || 'Not specified'}\n` +
      (company ? `*Company:* ${company}\n` : '') +
      `*Service:* ${selectedService}\n` +
      `*Budget Range:* ${selectedBudget}\n` +
      `*Timeline:* ${selectedTimeline}\n\n` +
      `*Project Overview:*\n${details || 'I would like to discuss a project scope and get an official estimate.'}`
    );
  };

  const handleWhatsAppDirect = () => {
    const text = constructWhatsAppMessage();
    const url = `https://wa.me/${cleanPhone}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const selectedService = PROJECT_TYPES.find((p) => p.id === selectedType)?.label || selectedType;

    const fullMessage =
      `[PROJECT QUOTE REQUEST]\n` +
      `Service: ${selectedService}\n` +
      `Budget: ${selectedBudget}\n` +
      `Timeline: ${selectedTimeline}\n` +
      (company ? `Company: ${company}\n` : '') +
      (phone ? `Phone / WhatsApp: ${phone}\n` : '') +
      `\nDetails:\n${details || 'No additional notes provided.'}`;

    try {
      await addMessage({
        name: name.trim(),
        email: email.trim(),
        subject: `Quote Request: ${selectedService} (${selectedBudget})`,
        message: fullMessage,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Quote submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[999998] transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-3xl my-auto rounded-3xl bg-slate-900 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] z-[999999] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Top Glowing Gradient Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-amber-400 to-yellow-300" />

            {/* Modal Header */}
            <div className="p-6 sm:p-8 pb-4 border-b border-white/5 flex items-start justify-between gap-4 shrink-0 bg-slate-950/40">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold uppercase tracking-wider mb-2.5">
                  <Sparkles size={13} className="text-primary" />
                  <span>Project Consultation & Instant Estimate</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Get a Project Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Share your project vision, target timeline, and budget. Receive a detailed technical roadmap and transparent estimate within 24 hours.
                </p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 border border-white/5"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-7 custom-scrollbar">
              {isSubmitted ? (
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center mx-auto shadow-xl shadow-primary/20">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-white">Quote Request Received!</h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-semibold">{name}</span>. Your project inquiry has been logged. I will review your requirements and reach out via email within 24 hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-300 font-mono">
                    <div><span className="text-slate-400">Service:</span> {PROJECT_TYPES.find((p) => p.id === selectedType)?.label}</div>
                    <div><span className="text-slate-400">Budget:</span> {selectedBudget}</div>
                    <div><span className="text-slate-400">Timeline:</span> {selectedTimeline}</div>
                    <div><span className="text-slate-400">Email:</span> {email}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <MessageSquare size={16} /> Open in WhatsApp for Instant Reply
                    </button>
                    <button
                      onClick={handleResetAndClose}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">1</span>
                      What service or architecture do you need?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {PROJECT_TYPES.map((pt) => {
                        const Icon = pt.icon;
                        const isSelected = selectedType === pt.id;
                        return (
                          <button
                            key={pt.id}
                            type="button"
                            onClick={() => setSelectedType(pt.id)}
                            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-primary/10 border-primary/60 text-white shadow-md shadow-primary/10'
                                : 'bg-slate-950/50 border-white/5 hover:border-white/15 text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                  isSelected ? 'bg-primary text-slate-950 font-bold' : 'bg-white/5 text-primary'
                                }`}
                              >
                                <Icon size={16} />
                              </div>
                              {isSelected && <span className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-bold leading-tight">{pt.label}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{pt.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget & Timeline Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Budget */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</span>
                        Estimated Budget Range
                      </label>
                      <div className="space-y-1.5">
                        {BUDGET_RANGES.map((b) => {
                          const isSelected = selectedBudget === b.label;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setSelectedBudget(b.label)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-primary/15 border-primary/50 text-white font-semibold'
                                  : 'bg-slate-950/40 border-white/5 hover:bg-slate-950/70 text-slate-300'
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <DollarSign size={14} className={isSelected ? 'text-primary' : 'text-slate-400'} />
                                {b.label}
                              </span>
                              <span className="text-[11px] text-slate-400">{b.sub}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">3</span>
                        Target Timeline
                      </label>
                      <div className="space-y-1.5">
                        {TIMELINES.map((tl) => {
                          const isSelected = selectedTimeline === tl.label;
                          return (
                            <button
                              key={tl.id}
                              type="button"
                              onClick={() => setSelectedTimeline(tl.label)}
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-primary/15 border-primary/50 text-white font-semibold'
                                  : 'bg-slate-950/40 border-white/5 hover:bg-slate-950/70 text-slate-300'
                              }`}
                            >
                              <span>{tl.label}</span>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Professional Guarantee Pill Box */}
                      <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <ShieldCheck size={14} className="text-primary" />
                          <span>Direct Collaboration Guarantees</span>
                        </div>
                        <ul className="text-[11px] text-slate-400 space-y-1">
                          <li>• 100% intellectual property & code ownership</li>
                          <li>• Strict NDA & client confidentiality</li>
                          <li>• Guaranteed 24-hour scoping turnaround</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info & Project Details */}
                  <div className="pt-2 border-t border-white/5 space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">4</span>
                      Your Contact & Project Details
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Your Name <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John Doe"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          WhatsApp / Phone (Optional)
                        </label>
                        <div className="relative">
                          <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Company / Brand (Optional)
                        </label>
                        <div className="relative">
                          <Building size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Inc."
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Project Overview & Key Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Briefly describe what you are looking to build, desired features, inspirations, or any existing tech stack..."
                        className="w-full p-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submission and Instant Actions */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <MessageSquare size={16} /> Send via WhatsApp Directly
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-primary via-amber-400 to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send size={15} /> Request Official Quote <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
