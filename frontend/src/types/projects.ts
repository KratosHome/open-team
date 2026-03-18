import { Project } from '@/data/projects';
import { Locale } from '@/i18n-config';

export interface ProjectsDictionary {
  title: string;
  description: string;
  viewAll: string;
  seekingRolesTitle: string;
  join: string;
  endsIn: string;
  openRoles: string;
}

export interface ProjectsSectionProps {
  dict: ProjectsDictionary;
  projects: Project[];
}

export interface ProjectCardProps {
  project: Project;
  dict: ProjectsDictionary;
}
