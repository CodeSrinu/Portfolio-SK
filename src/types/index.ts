// Portfolio Data Types

export interface ProfileData {
    name: string;
    nickname: string;
    roles: string[];
    quote: string;
    profileImage: string;
}

export interface AboutData {
    bio: string;
    image: string;
}

export interface Skill {
    name: string;
    level: number;
}

export interface SkillCategory {
    id: string;
    name: string;
    icon: string;
    skills: Skill[];
}

export interface TimelineItem {
    id: string;
    date: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
}

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    technologies: string[];
    githubUrl: string;
    demoUrl: string;
}

export interface ContactInfo {
    email: string;
    phone?: string;
    github: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    tags: string[];
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CollaborationData {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    icon: string;
    visible: boolean;
}

export interface CustomSection {
    id: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
    icon: string;
    visible: boolean;
    order: number;
}

export interface PortfolioData {
    profile: ProfileData;
    about: AboutData;
    skills: SkillCategory[];
    timeline: TimelineItem[];
    projects: Project[];
    contact: ContactInfo;
    collaboration: CollaborationData;
    customSections: CustomSection[];
}
