import type { Locale } from '@/i18n-config';

export type ProjectLinkKey =
  | 'home'
  | 'projects'
  | 'community'
  | 'blog'
  | 'rules'
  | 'faq'
  | 'documentation'
  | 'tokenomics'
  | 'about'
  | 'contact'
  | 'reportBug'
  | 'partnership'
  | 'pressKit'
  | 'privacy'
  | 'terms';

export type FooterSectionKey = 'platform' | 'company' | 'support';
export type SocialLinkKey = 'x' | 'linkedin' | 'telegram';

export const siteLinksConfig = {
  baseUrl: 'https://openteam.hub',
  manifestPath: '/manifest.json',
  icons: {
    favicon: '/favicon.ico',
    appleTouch: '/apple-touch-icon.png',
  },
  robots: {
    allow: '/',
    disallow: '/api/',
  },
} as const;

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
  {
    key: 'about',
    path: '/about',
    title: 'About',
    description: 'About OpenTeam and the product mission.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'contact',
    path: '/contact',
    title: 'Contact',
    description: 'Contact and support entry point.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'reportBug',
    path: '/report-bug',
    title: 'Report a Bug',
    description: 'Bug reporting page for product issues.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'partnership',
    path: '/partnership',
    title: 'Partnership',
    description: 'Partnership and business collaboration page.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'pressKit',
    path: '/press-kit',
    title: 'Press Kit',
    description: 'Brand assets and press materials.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'privacy',
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Privacy policy for the platform.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
  {
    key: 'terms',
    path: '/terms',
    title: 'Terms of Use',
    description: 'Terms and conditions for using the platform.',
    inNavigation: false,
    implemented: false,
    inSitemap: false,
  },
];

export const footerSections: Array<{
  titleKey: FooterSectionKey;
  linkKeys: ProjectLinkKey[];
}> = [
  {
    titleKey: 'platform',
    linkKeys: ['projects', 'community', 'tokenomics', 'documentation'],
  },
  {
    titleKey: 'company',
    linkKeys: ['blog', 'rules', 'faq', 'about'],
  },
  {
    titleKey: 'support',
    linkKeys: ['contact', 'reportBug', 'partnership', 'pressKit'],
  },
];

export const footerLegalLinkKeys: ProjectLinkKey[] = ['privacy', 'terms'];

export const socialLinks: Array<{
  key: SocialLinkKey;
  href: string;
  label: string;
}> = [
  {
    key: 'x',
    href: '#',
    label: 'X',
  },
  {
    key: 'linkedin',
    href: '#',
    label: 'LinkedIn',
  },
  {
    key: 'telegram',
    href: '#',
    label: 'Telegram',
  },
];

const projectLinkMap = Object.fromEntries(
  projectLinks.map((link) => [link.key, link]),
) as Record<ProjectLinkKey, ProjectLinkInfo>;

export const getProjectLink = (key: ProjectLinkKey) => projectLinkMap[key];

export const getProjectHref = (lang: Locale, key: ProjectLinkKey) =>
  `/${lang}${projectLinkMap[key].path}`;

export const getAbsoluteProjectUrl = (lang: Locale, key: ProjectLinkKey) =>
  `${siteLinksConfig.baseUrl}${getProjectHref(lang, key)}`;

export const getLocaleAlternates = (key: ProjectLinkKey) =>
  ({
    en: getProjectHref('en', key),
    uk: getProjectHref('uk', key),
  }) satisfies Record<Locale, string>;

export const getSitemapPaths = () =>
  projectLinks.filter((link) => link.implemented && link.inSitemap).map((link) => link.path);

export const getSitemapLinks = () =>
  projectLinks.filter((link) => link.implemented && link.inSitemap);
