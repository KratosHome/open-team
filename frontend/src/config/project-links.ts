import type { Locale } from '@/i18n-config';

export type ProjectLinkKey =
  | 'home'
  | 'projects'
  | 'community'
  | 'blog'
  | 'rules'
  | 'faq'
  | 'documentation'
  | 'tokenomics';

export interface ProjectLinkInfo {
  key: ProjectLinkKey;
  labelKey?: string;
  path: '' | `/${string}`;
  title: string;
  description: string;
  inNavigation: boolean;
  implemented: boolean;
  inSitemap: boolean;
}

export const projectLinks: ProjectLinkInfo[] = [
  {
    key: 'home',
    path: '',
    title: 'Home',
    description: 'The main landing page of OpenTeam.',
    inNavigation: false,
    implemented: true,
    inSitemap: true,
  },
  {
    key: 'projects',
    labelKey: 'projects',
    path: '/projects',
    title: 'Projects',
    description: 'Project directory and open team opportunities.',
    inNavigation: true,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'community',
    labelKey: 'community',
    path: '/community',
    title: 'Community',
    description: 'Community hub, updates, and participant activity.',
    inNavigation: true,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'blog',
    labelKey: 'blog',
    path: '/blog',
    title: 'Blog',
    description: 'Editorial content, releases, and product updates.',
    inNavigation: true,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'rules',
    labelKey: 'rules',
    path: '/rules',
    title: 'Rules',
    description: 'Platform rules and participation principles.',
    inNavigation: true,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'faq',
    labelKey: 'faq',
    path: '/faq',
    title: 'FAQ',
    description: 'Answers to common product and tokenomics questions.',
    inNavigation: true,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'documentation',
    labelKey: 'documentation',
    path: '/docs',
    title: 'Documentation',
    description: 'Reference documentation for the platform.',
    inNavigation: true,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'tokenomics',
    labelKey: 'tokenomics',
    path: '/tokenomics',
    title: 'Tokenomics',
    description: 'Details about token allocation, burn mechanics, and the ecosystem model.',
    inNavigation: true,
    implemented: true,
    inSitemap: true,
  },
];

const projectLinkMap = Object.fromEntries(
  projectLinks.map((link) => [link.key, link]),
) as Record<ProjectLinkKey, ProjectLinkInfo>;

export const getProjectHref = (lang: Locale, key: ProjectLinkKey) =>
  `/${lang}${projectLinkMap[key].path}`;

export const getSitemapPaths = () =>
  projectLinks.filter((link) => link.implemented && link.inSitemap).map((link) => link.path);
