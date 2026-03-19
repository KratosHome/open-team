import type { Locale } from '@/i18n-config';
import { getProjectHref, projectLinks } from '@/config/project-links';

export interface NavLink {
  href: string;
  labelKey: string;
  variant?: 'navbar' | 'navbar-active';
}

export const getNavigationLinks = (lang: Locale): NavLink[] =>
  projectLinks
    .filter((link) => link.inNavigation && link.labelKey)
    .map((link) => ({
      href: getProjectHref(lang, link.key),
      labelKey: link.labelKey!,
    }));
