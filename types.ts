/**
 * Custom Type Definitions for the Portfolio Application
 * These interfaces enforce strict type safety across the website's data layers,
 * including navigation items, technology projects, skills data, professional experiences,
 * testimonials, incoming contact inquiries, and CMS settings.
 */

// Represents a portfolio project detailing work, attributes, and source code links
export interface Project {
  id: number | string;   // Unique identifier for the project route (/project/:id)
  title: string;         // Display name of the project
  description: string;   // Brief summary or comprehensive description
  summary?: string;      // Optional short summary for cards
  technologies: string[]; // List of technologies, languages, and frameworks used
  category: string;      // Classification (e.g., 'Web App', 'Mobile', 'AI/ML')
  imageUrl: string;      // Image URL representing the cover or card illustration
  galleryUrls?: string[]; // Optional additional screenshot gallery URLs
  link: string;          // Active production URL for viewing the project live
  githubUrl: string;     // Link to the public GitHub repository
  featured?: boolean;    // Flag to highlight in hero or home showcase
  metrics?: Record<string, string>; // Key impact metrics e.g. { "Speed": "+40%", "Users": "10k+" }
  displayOrder?: number;
  createdAt?: string;
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
  id: number | string; // Unique identifier for ordering
  role: string;        // Professional title (e.g., 'Senior Frontend Engineer')
  company: string;     // Name of the employer organization
  period: string;      // Timeline duration of tenure (e.g., '2021 - Present')
  description: string; // Highlighted achievements, deliverables, and team responsibilities
}

// Represents unified education & experience timeline items managed via CMS
export interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  title: string;        // e.g. "B.S. in Software Engineering" or "Senior Frontend Engineer"
  institution: string;  // e.g. "University of Technology" or "Tech Solutions Inc."
  period: string;       // e.g. "2022 - 2026" or "2021 - Present"
  description: string;  // Details, focus areas or accomplishments
  skills?: string[];    // Associated tags/skills
  displayOrder?: number;
  createdAt?: string;
}

// Represents client reviews and recommendations
export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatarUrl?: string;
  rating: number;       // 1 to 5 stars
  content: string;
  isApproved: boolean;  // Visibility toggle
  createdAt?: string;
}

// Represents visitor inquiries captured from the Contact form
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  replied?: boolean;
  createdAt: string;
}

// Hero section content configuration
export interface HeroSettings {
  badgeText: string;
  isBadgeVisible: boolean;
  titleLine1: string;
  titleLine2: string;
  bio: string;
  imageUrl: string;
  imageAlt: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  verticalBadgeText: string;
  featuredTech: string[];
  isTransparentImage?: boolean;
  imageFit?: 'contain' | 'cover';
  showOverlay?: boolean;
  showWidgets?: boolean;
  aspectRatio?: 'auto' | '1:1' | '4:5';
  autoScale?: boolean;
  qrCodeLink?: string;
  qrCodeTitle?: string;
  qrCodeSubtitle?: string;
  showQrCodeWidget?: boolean;
}

// Brand Identity & Logo configuration
export interface BrandingSettings {
  siteName: string;
  logoType: 'text' | 'image' | 'full';
  logoText: string;
  logoImageUrl?: string;
  logoOrientation?: 'auto' | 'landscape' | 'square' | 'vertical';
  showSiteName?: boolean;
  logoHeight?: number;
  tagline: string;
  footerBio: string;
  copyrightName: string;
  faviconUrl?: string; // Website Icon / Favicon for browser tab & bookmarks
  siteIconUrl?: string; // Optional alias for website icon image
}

// Visual Theme & Color configuration
export interface ThemeSettings {
  bgPalette: 'emerald' | 'slate' | 'obsidian' | 'midnight' | 'custom';
  primaryColor: string;
  secondaryColor: string;
  customBgHex?: string;
  customCardHex?: string;
}

// Marquee Animated Banner & Brand Partner Logo configuration
export interface MarqueeLogoItem {
  id: string;
  name: string;
  logoUrl?: string; // Uploaded image URL (SVG/PNG/WEBP/JPG)
  iconName?: string; // Fallback icon name (e.g. 'react', 'zap', 'code', 'layout', 'server', 'palette')
  displayMode?: 'both' | 'logo-only' | 'text-only';
  websiteUrl?: string;
  category?: string;
  isActive: boolean;
}

export interface MarqueeSectionSettings {
  isEnabled: boolean;
  speed: number; // In seconds (e.g. 20, 30, 45)
  pauseOnHover: boolean;
  monochromeFilter: boolean;
  sectionTitle?: string;
  items: MarqueeLogoItem[];
}

// Configuration parameters for Portfolio CMS & Firebase
export interface SiteSettings {
  siteTitle: string;
  adminEmail: string;
  whatsappNumber: string;
  firebaseProjectId?: string;
  lastSyncedAt?: string;
  updatedAt?: string;

  // Visual modules:
  hero: HeroSettings;
  branding: BrandingSettings;
  theme: ThemeSettings;
  marquee?: MarqueeSectionSettings;
}