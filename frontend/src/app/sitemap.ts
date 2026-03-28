import type { MetadataRoute } from 'next';

import {
  getAbsoluteProjectUrl,
  getLocaleAlternates,
  getSitemapLinks,
  siteLinksConfig,
} from '@/config/project-links';
import { i18n } from '@/i18n-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = getSitemapLinks().map((link) => {
    const alternates = i18n.locales.reduce((acc, locale) => {
      acc[locale] = `${siteLinksConfig.baseUrl}${getLocaleAlternates(link.key)[locale]}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url: getAbsoluteProjectUrl(i18n.defaultLocale, link.key),
      lastModified: new Date(),
      alternates: {
        languages: alternates,
      },
    };
  });

  return routes;
}
