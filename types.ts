export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  imageUrl: string;
  link: string;
  githubUrl: string;
}

export interface SkillData {
  subject: string;
  A: number; // Proficiency level 0-100
  fullMark: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}