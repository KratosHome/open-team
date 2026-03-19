import { MetadataRoute } from 'next';
import { i18n } from '@/i18n-config';
import { getSitemapPaths } from '@/config/project-links';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openteam.hub'; // Replace with actual domain if known

  const routes = getSitemapPaths().map((route) => {
    const alternates = i18n.locales.reduce((acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${route}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url: `${baseUrl}/${i18n.defaultLocale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: alternates,
      },
    };
  });

  return routes;
}
