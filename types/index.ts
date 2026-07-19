export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // lucide-react icon name
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  images?: ProjectImage[];
  hasLiveScreenshots: boolean;
  metric?: {
    value: string;
    label: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  verifyUrl?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  metric: string;
}
