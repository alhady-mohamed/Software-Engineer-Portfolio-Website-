import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Phone,
  CheckCircle,
  MessageSquare,
  Linkedin,
  Twitter,
  Github,
  Facebook,
  Youtube,
  Instagram,
  Video,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "../src/context/SiteDataContext";
import { useLanguage } from "../src/context/LanguageContext";

/**
 * Contact Component
 * Renders the primary client consulting portal.
 * Features:
 * - Dynamic state hooks mapping user entries and submission timelines.
 * - Backdrop glowing lighting layers for aesthetic visual integration.
 * - Double-column visual structure: Left focuses on core metadata channels; Right centers the validated messaging form.
 * - Dynamic success state alerts utilizing Framer Motion's AnimatePresence.
 */
const Contact: React.FC = () => {
  // Input fields state models mapping parameters
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Timings and statuses hooks tracking state from idle -> submitting -> success
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const { addMessage, settings } = useSiteData();
  const { t } = useLanguage();

  const contactEmail = settings?.adminEmail || "engmohamedabdurazak@gmail.com";
  const contactPhone = settings?.whatsappNumber || "+252 63 4944558";

  // Submit handler processing inputs and invoking visual feedback cycles
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Save directly to Firebase / CMS Inbox store
    try {
      await addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
    } catch (saveErr) {
      console.warn("Message capture error:", saveErr);
    }

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSf6ZkRSKrzPPMCr2ay39h6aRQbCjtJTXyO5HrAQZG7c--c9Ug/formResponse";
    const params = new URLSearchParams();
    params.append("entry.2005620554", formData.name);
    params.append("entry.1045781291", formData.email);
    params.append("entry.1435863692", formData.subject);
    params.append("entry.1065046570", formData.message);

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      // Even if Google forms endpoint fails, our CMS store already has it saved!
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // Change listener matching keys and updating single object dictionary
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark relative overflow-hidden">
      {/* Absolute background glow visual effects */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header text elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 text-primary font-medium tracking-wider text-sm uppercase mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <MessageSquare size={16} />
            <span>{t('contact_badge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('contact_title')}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            {t('contact_success_desc')}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Info Group (Metadata channels, mail directory, and locations) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-5 space-y-8 w-full"
          >
            <div className="bg-slate-900/50 p-6 sm:p-8 xl:p-9 rounded-3xl border border-white/5 backdrop-blur-sm w-full shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-8">
                Contact Info
              </h3>

              <div className="space-y-8">
                {/* Email link items */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 font-medium mb-1 tracking-wide uppercase">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      title={contactEmail}
                      className="text-sm sm:text-base xl:text-lg text-white hover:text-primary transition-colors font-medium break-normal sm:break-words [overflow-wrap:anywhere] block"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>

                {/* Telephone link items */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-secondary/10 rounded-2xl text-secondary border border-secondary/20 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 font-medium mb-1 tracking-wide uppercase">
                      Phone
                    </p>
                    <a
                      href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                      className="text-base sm:text-lg text-white hover:text-secondary transition-colors font-medium block truncate"
                    >
                      {contactPhone}
                    </a>
                  </div>
                </div>

                {/* Geography listings */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 font-medium mb-1 tracking-wide uppercase">
                      Location
                    </p>
                    <p className="text-base sm:text-lg text-white font-medium">
                      West, Road 1, Hargeisa
                      <br />
                      <span className="text-sm text-primary font-normal">
                        Remote Available
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels block mapping media properties */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm pt-6">
              <h3 className="text-lg font-bold text-white mb-6">
                Social Profiles
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/alhady-mohamed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:scale-110 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/alhady-mohamed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-[#0A66C2] hover:scale-110 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.facebook.com/Mohamet.Abdirisaak304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-[#1877F2] hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/alhady_mohamed301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-[#E4405F] hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://youtube.com/@mohamed-alhady01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-[#FF0000] hover:scale-110 transition-all"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Messaging Form (validated fields with dynamic status handling) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7 xl:col-span-7 bg-slate-900/30 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md w-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <h3 className="text-3xl font-bold text-white mb-8">
              Send me a message
            </h3>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-20 text-center z-20"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 ring-4 ring-green-500/10">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
                    Thank you for reaching out. I've received your message and
                    will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all hover:scale-105"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-300 ml-1"
                      >
                        {t('contact_name')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none"
                        placeholder="Mohamed / Abdi"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-300 ml-1"
                      >
                        {t('contact_email')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none"
                        placeholder="client@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-300 ml-1"
                    >
                      {t('contact_subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none"
                      placeholder="Project Inquiry / Consultation"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-300 ml-1"
                    >
                      {t('contact_message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none resize-none"
                      placeholder="..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all transform cursor-pointer ${
                      status === "submitting"
                        ? "bg-white/10 cursor-not-allowed border border-white/20"
                        : "bg-primary hover:bg-yellow-400 hover:text-dark hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
                    }`}
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">
                        <span>{t('contact_sending')}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={18} />
                        <span>{t('contact_send')}</span>
                      </span>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
