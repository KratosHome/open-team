import { MetadataRoute } from 'next';
import { siteLinksConfig } from '@/config/project-links';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: siteLinksConfig.robots.allow,
      disallow: siteLinksConfig.robots.disallow,
    },
    sitemap: `${siteLinksConfig.baseUrl}/sitemap.xml`,
  };
}
