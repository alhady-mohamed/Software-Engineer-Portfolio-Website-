/**
 * Global Constants Collection
 * This file serves as the single source of truth for structural UI and portfolio data,
 * feeding information directly to navigation menus, experience timelines, skill charts, and showcase grids.
 */

import { Project, SkillData, NavItem, Experience } from './types';

// Structural list of links featured in primary site navigation and footer menus
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
  { label: 'Forms', href: '/forms' },
];

// Normalized proficiency levels plotted on radial charts to visualize core developer domains
export const SKILLS_DATA: SkillData[] = [
  { subject: 'Software Development', A: 95, fullMark: 100 },
  { subject: 'Branding & Visual Identity', A: 95, fullMark: 100 },
  { subject: 'Video Production', A: 90, fullMark: 100 },
  { subject: 'Social Media Marketing', A: 85, fullMark: 100 },
  { subject: 'UI/UX Design', A: 90, fullMark: 100 },
  { subject: 'Digital Strategy', A: 80, fullMark: 100 },
];

/**
 * Curated Portfolio Projects Data
 * Captures core details, technical stacks, assets, and deep case-study route keys (id).
 */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization and inventory management.",
    technologies: ["React", "TypeScript", "Tailwind", "Recharts"],
    category: "Web App",
    imageUrl: "https://picsum.photos/id/1/800/600",
    link: "#",
    githubUrl: "https://github.com/alhady-mohamed"
  },
  {
    id: 2,
    title: "Social Media App",
    description: "A fully responsive social platform allowing users to share posts, like, comment, and connect in real-time.",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "Socket.io"],
    category: "Web App",
    imageUrl: "https://picsum.photos/id/20/800/600",
    link: "#",
    githubUrl: "https://github.com/alhady-mohamed"
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "An interactive tool leveraging generative AI models to create stunning visuals from text prompts.",
    technologies: ["Python", "React", "FastAPI", "TensorFlow"],
    category: "AI/ML",
    imageUrl: "https://picsum.photos/id/26/800/600",
    link: "#",
    githubUrl: "https://github.com/alhady-mohamed"
  },
  {
    id: 4,
    title: "Finance Tracker",
    description: "Personal finance management application with budget planning, expense tracking, and savings goals.",
    technologies: ["Vue.js", "Firebase", "Chart.js"],
    category: "Web App",
    imageUrl: "https://picsum.photos/id/48/800/600",
    link: "#",
    githubUrl: "https://github.com/alhady-mohamed"
  },
  {
    id: 5,
    title: "Health & Wellness",
    description: "A mobile-first web app for tracking workouts, nutrition, and meditation sessions.",
    technologies: ["React Native", "Redux", "Node.js"],
    category: "Mobile",
    imageUrl: "https://picsum.photos/id/60/800/600",
    link: "#",
    githubUrl: "https://github.com/alhady-mohamed"
  },
  {
    id: 6,
    title: "Portfolio V1",
    description: "My previous portfolio site showcasing my early web development journey and smaller experiments.",
    technologies: ["HTML", "SCSS", "JavaScript"],
    category: "Web App",
    imageUrl: "https://picsum.photos/id/119/800/600",
    link: "#",
    githubUrl: "https://github.com/alhady-mohamed"
  }
];

/**
 * Career Experience Logs
 * Ordered chronologically for rendering in timeline interfaces.
 */
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description: "Leading a team of 5 developers to build scalable web applications using React and TypeScript. Improved site performance by 40%."
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Creative Agency",
    period: "2019 - 2021",
    description: "Developed and maintained client websites using the MERN stack. Collaborated with designers to implement pixel-perfect UIs."
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "StartUp Hub",
    period: "2018 - 2019",
    description: "Assisted in the development of the company's main product. Wrote unit tests and fixed bugs to ensure software stability."
  }
];