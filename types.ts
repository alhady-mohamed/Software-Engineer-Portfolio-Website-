/**
 * Custom Type Definitions for the Portfolio Application
 * These interfaces enforce strict type safety across the website's data layers,
 * including navigation items, technology projects, skills data, and professional experiences.
 */

// Represents a portfolio project detailing work, attributes, and source code links
export interface Project {
  id: number;          // Unique identifier for the project route (/project/:id)
  title: string;       // Display name of the project
  description: string; // Brief summary of what the project does
  technologies: string[]; // List of technologies, languages, and frameworks used
  category: string;    // Classification (e.g., 'Web App', 'Mobile', 'AI/ML')
  imageUrl: string;    // Image URL representing the cover or card illustration
  link: string;        // Active production URL for viewing the project live
  githubUrl: string;   // Link to the public GitHub repository
}

// Represents radar or progress graph coordinate metrics for skill proficiencies
export interface SkillData {
  subject: string;     // The category or name of the developer skill (e.g., 'Frontend')
  A: number;           // Proficiency level rating (typically graded 0-100)
  fullMark: number;    // Absolute ceiling maximum value (typically 100)
}

// Represents structure of navigation links used in the header Navbar and Footer
export interface NavItem {
  label: string;       // The human-readable text shown on the action link
  href: string;        // The routed relative path destination
}

// Represents professional employment or contractual career achievements
export interface Experience {
  id: number;          // Unique identifier for ordering
  role: string;        // Professional title (e.g., 'Senior Frontend Engineer')
  company: string;     // Name of the employer organization
  period: string;      // Timeline duration of tenure (e.g., '2021 - Present')
  description: string; // Highlighted achievements, deliverables, and team responsibilities
}