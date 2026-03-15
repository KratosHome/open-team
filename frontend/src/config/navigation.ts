import { Locale } from '@/i18n-config';

export interface NavLink {
  href: string;
  labelKey: string;
  variant?: 'navbar' | 'navbar-active';
}

export const getNavigationLinks = (lang: Locale): NavLink[] => [
  { href: `/${lang}/projects`, labelKey: 'projects' },
  { href: `/${lang}/community`, labelKey: 'community' },
  { href: `/${lang}/blog`, labelKey: 'blog' },
  { href: `/${lang}/rules`, labelKey: 'rules' },
  { href: `/${lang}/faq`, labelKey: 'faq' },
  { href: `/${lang}/docs`, labelKey: 'documentation' },
  { href: `/${lang}/tokenomics`, labelKey: 'tokenomics' },
];
