import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Code2, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6 w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Alex.dev
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 pr-4">
              Building high-performance web applications with a focus on exceptional user experiences, robust architecture, and clean code. Located in San Francisco, CA.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                <Github size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#0A66C2] hover:bg-white/10 hover:border-white/20 transition-all group">
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-[#1DA1F2] hover:bg-white/10 hover:border-white/20 transition-all group">
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" /> About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" /> Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Web Development</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">UI/UX Design</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Performance Audits</li>
              <li className="text-gray-400 text-sm hover:text-white transition-colors cursor-pointer">Consulting</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to my newsletter for the latest articles, tutorials, and insights.
            </p>
            <form className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full pl-10 pr-12 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white text-sm transition-all"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2 bg-primary text-white rounded-lg hover:bg-indigo-500 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Alex. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;