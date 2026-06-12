import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

/**
 * AnimatedRoutes Component
 * Wraps all application screen links with Framer Motion transitions.
 * useLocation pathname keys prevent component recycling, causing safe crossfade animation on nav change.
 */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Landing Home page displaying current overview, stacks, and featured services */}
        <Route path="/" element={<Home />} />
        {/* About profile detailing skills, bio timeline, and proficiency charts */}
        <Route path="/about" element={<About />} />
        {/* Comprehensive filtered lists of all build projects */}
        <Route path="/projects" element={<Projects />} />
        {/* Dynamic deep dive project case detail pages */}
        <Route path="/project/:id" element={<ProjectDetail />} />
        {/* Lead contact query form with structured inquiry capture */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

/**
 * Main App Entry Component
 * Bootstraps standard reactive router systems, consistent header and footer zones,
 * global styling classes, and selection colors.
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary selection:text-white flex flex-col">
        {/* Sticky Header Nav system with reactive mobile menu drawer */}
        <Navbar />
        
        {/* Standard viewport layout area scaling responsive screen files */}
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        
        {/* Terminal footer zone with legal details and social connection links */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;