import type { Project } from '@/data/projects';

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
