export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  cta: string;
}

export interface AboutData {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description1: string;
  description2: string;
  skills: string[];
}

export type SocialPlatform = 'facebook' | 'linkedin' | 'zalo' | 'youtube' | 'instagram' | 'website';

export interface SocialLink {
  id: number;
  platform: SocialPlatform;
  url: string;
}

export interface ContactData {
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLink[];
}

export interface ContentContextType {
  heroData: HeroData;
  projects: Project[];
  aboutData: AboutData;
  experiences: Experience[];
  services: Service[];
  contactData: ContactData;
  updateHeroData: (data: HeroData) => void;
  updateProject: (project: Project) => void;
  updateProjectsList: (projects: Project[]) => void;
  updateAboutData: (data: AboutData) => void;
  updateExperience: (experience: Experience) => void;
  updateExperienceList: (experiences: Experience[]) => void;
  updateServicesList: (services: Service[]) => void;
  updateContactData: (data: ContactData) => void;
  resetToDefault: () => void;
}