import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

// Context Providers
import { SiteDataProvider } from './src/context/SiteDataContext';
import { AdminAuthProvider, useAdminAuth } from './src/context/AdminAuthContext';
import { LanguageProvider } from './src/context/LanguageContext';

// Admin CMS Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminRouteGuard } from './components/admin/AdminRouteGuard';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminTimeline } from './components/admin/AdminTimeline';
import { AdminTestimonials } from './components/admin/AdminTestimonials';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminAppearance } from './components/admin/AdminAppearance';
import { AdminSecurityRoles } from './components/admin/AdminSecurityRoles';

import { recordPageView } from './src/lib/analytics';

/**
 * AnimatedRoutes Component
 * Handles routing for both the public portfolio screens and the secure Admin CMS portal.
 */
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/wp-')) {
      recordPageView();
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname.startsWith('/admin') ? 'admin-zone' : location.pathname}>
        <Routes location={location}>
        {/* Public Portfolio Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Authentication Route & WordPress-Style URL Direct Access */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/wp-admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/wp-login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/login" element={<Navigate to="/admin/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/admin/login" replace />} />

        {/* Secure Admin CMS Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <AdminRouteGuard>
              <AdminLayout />
            </AdminRouteGuard>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="appearance" element={<AdminAppearance />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="timeline" element={<AdminTimeline />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="users-roles" element={<AdminSecurityRoles />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      </div>
    </AnimatePresence>
  );
};

/**
 * Main Layout Shell
 * Hides public navigation and footer when viewing the admin CMS dashboard or login portal.
 */
const AppShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const isAdminRoute =
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/wp-admin') ||
    location.pathname.startsWith('/wp-login');

  // Discreet keyboard shortcut (Alt + A or Ctrl + Shift + A) to enter admin dashboard from anywhere on the site
  // Enforces mandatory re-authentication by calling logout and routing directly to /admin/login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        try {
          logout();
        } catch {}
        navigate('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, logout]);

  if (isAdminRoute) {
    return (
      <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-primary selection:text-white flex flex-col">
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
};

/**
 * Main App Entry Component
 * Bootstraps providers, router, and styling layers.
 */
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SiteDataProvider>
        <AdminAuthProvider>
          <Router>
            <AppShell />
          </Router>
        </AdminAuthProvider>
      </SiteDataProvider>
    </LanguageProvider>
  );
};

export default App;