import React from 'react';
import { motion } from 'framer-motion';

// Component Prop interface definitions for standard page section wrapper wrapper
interface SectionWrapperProps {
  children: React.ReactNode; // Interior DOM children items to wrap
  id: string;                 // Dom anchor link identifier for navigation scrolls
  className?: string;        // Optional styling layer overrides (e.g. background gradients)
}

/**
 * SectionWrapper Component
 * Provides standard modular layout wrappers, gutter pads, and scroll trigger entrances.
 * Integrates Framer Motion viewport intersection checks to yield consistent slide up fades.
 */
const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className = '' }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-4 md:px-8 relative overflow-hidden ${className}`}>
      {/* Framer motion wrapper coordinating layout margins and entrance fades */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} // Triggers once visual boundary targets are met
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;