import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone, CheckCircle, MessageSquare, Linkedin, Twitter, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  // Timings and statuses hooks tracking state from idle -> submitting -> success
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Submit handler processing inputs and invoking visual feedback cycles
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate real server delay to present smooth transition spinners
    setTimeout(() => {
      setStatus('success');
      // Reset input content values
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto reset success message state back to idle after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  // Change listener matching keys and updating single object dictionary
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <span>Contact</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">project together</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            I'm currently available for freelance work and full-time opportunities. Drop me a line and let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Contact Info Group (Metadata channels, mail directory, and locations) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>
              
              <div className="space-y-8">
                {/* Email link items */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1 tracking-wide uppercase">Email</p>
                    <a href="mailto:hello@example.com" className="text-lg text-white hover:text-primary transition-colors font-medium">hello@example.com</a>
                  </div>
                </div>

                {/* Telephone link items */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-secondary/10 rounded-2xl text-secondary border border-secondary/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1 tracking-wide uppercase">Phone</p>
                    <a href="tel:+1234567890" className="text-lg text-white hover:text-secondary transition-colors font-medium">+1 (555) 000-0000</a>
                  </div>
                </div>

                {/* Geography listings */}
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-1 tracking-wide uppercase">Location</p>
                    <p className="text-lg text-white">San Francisco, CA<br /><span className="text-sm text-gray-400">Remote Available</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social channels block mapping media properties */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm pt-6">
              <h3 className="text-lg font-bold text-white mb-6">Social Profiles</h3>
              <div className="flex items-center gap-4">
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white hover:scale-110 transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-[#0A66C2] hover:scale-110 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-[#1DA1F2] hover:scale-110 transition-all">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Messaging Form (validated fields with dynamic status handling) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-8 bg-slate-900/30 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-3xl font-bold text-white mb-8">Send me a message</h3>
            
            <AnimatePresence mode="wait">
               {status === 'success' ? (
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
                     <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                     <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
                       Thank you for reaching out. I've received your message and will get back to you within 24 hours.
                     </p>
                     <button 
                       onClick={() => setStatus('idle')}
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
                        <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-300 ml-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none"
                        placeholder="What's this regarding?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-600 transition-all outline-none resize-none"
                        placeholder="Tell me about your project, timeline, and goals..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-white transition-all transform ${
                        status === 'submitting' 
                          ? 'bg-white/10 cursor-not-allowed border border-white/20' 
                          : 'bg-primary hover:bg-yellow-400 hover:text-dark hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1'
                      }`}
                    >
                      {status === 'submitting' ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message <Send size={20} />
                        </>
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