import { LandingStats } from '@/data/landing-stats';

export interface HeroDictionary {
  activeProjects: string;
  participants: string;
  heroTitle: string;
  heroSubtitle1: string;
  heroSubtitle2: string;
  heroDescription: string;
  createProject: string;
  selectProject: string;
  stats: {
    projects: string;
    participants: string;
    completed: string;
  };
  howItWorks: string;
  steps: {
    step1Title: string;
    step1Description: string;
    step2Title: string;
    step2Description: string;
    step3Title: string;
    step3Description: string;
    step4Title: string;
    step4Description: string;
  };
}

export interface HeroSectionProps {
  dict: HeroDictionary;
  stats: LandingStats;
}
