import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HERO_DATA as DEFAULT_HERO, 
  PROJECTS as DEFAULT_PROJECTS, 
  ABOUT_DATA as DEFAULT_ABOUT,
  EXPERIENCE as DEFAULT_EXPERIENCE,
  CONTACT_DATA as DEFAULT_CONTACT,
  SERVICES as DEFAULT_SERVICES
} from '../constants';
import { ContentContextType, HeroData, Project, AboutData, Experience, ContactData, Service } from '../types';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or fall back to constants
  const [heroData, setHeroData] = useState<HeroData>(() => {
    const saved = localStorage.getItem('heroData');
    return saved ? JSON.parse(saved) : DEFAULT_HERO;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [aboutData, setAboutData] = useState<AboutData>(() => {
    const saved = localStorage.getItem('aboutData');
    return saved ? JSON.parse(saved) : DEFAULT_ABOUT;
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('experiences');
    return saved ? JSON.parse(saved) : DEFAULT_EXPERIENCE;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : DEFAULT_SERVICES;
  });

  const [contactData, setContactData] = useState<ContactData>(() => {
    const saved = localStorage.getItem('contactData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if the saved data uses the old structure (has linkedin/facebook keys instead of socialLinks)
      if (!parsed.socialLinks && (parsed.linkedin || parsed.facebook)) {
         return DEFAULT_CONTACT; // Reset to default new structure if old data is found to prevent crash
      }
      return parsed;
    }
    return DEFAULT_CONTACT;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('heroData', JSON.stringify(heroData));
  }, [heroData]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('aboutData', JSON.stringify(aboutData));
  }, [aboutData]);

  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('contactData', JSON.stringify(contactData));
  }, [contactData]);

  // Update functions
  const updateHeroData = (data: HeroData) => {
    setHeroData(data);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === updatedProject.id ? updatedProject : p)
    );
  };

  const updateProjectsList = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
  };

  const updateAboutData = (data: AboutData) => {
    setAboutData(data);
  };

  const updateExperience = (updatedExperience: Experience) => {
    setExperiences(prev => 
      prev.map(e => e.id === updatedExperience.id ? updatedExperience : e)
    );
  };

  const updateExperienceList = (updatedExperiences: Experience[]) => {
    setExperiences(updatedExperiences);
  };

  const updateServicesList = (updatedServices: Service[]) => {
    setServices(updatedServices);
  };

  const updateContactData = (data: ContactData) => {
    setContactData(data);
  };

  const resetToDefault = () => {
    setHeroData(DEFAULT_HERO);
    setProjects(DEFAULT_PROJECTS);
    setAboutData(DEFAULT_ABOUT);
    setExperiences(DEFAULT_EXPERIENCE);
    setServices(DEFAULT_SERVICES);
    setContactData(DEFAULT_CONTACT);
    localStorage.removeItem('heroData');
    localStorage.removeItem('projects');
    localStorage.removeItem('aboutData');
    localStorage.removeItem('experiences');
    localStorage.removeItem('services');
    localStorage.removeItem('contactData');
  };

  return (
    <ContentContext.Provider value={{ 
      heroData, 
      projects, 
      aboutData, 
      experiences,
      services,
      contactData,
      updateHeroData, 
      updateProject, 
      updateProjectsList,
      updateAboutData,
      updateExperience,
      updateExperienceList,
      updateServicesList,
      updateContactData,
      resetToDefault 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};