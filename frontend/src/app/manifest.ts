import { MetadataRoute } from 'next';
import { getProjectHref, siteLinksConfig } from '@/config/project-links';
import { i18n } from '@/i18n-config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TeamHub',
    short_name: 'TeamHub',
    description: 'A platform where ideas become products. Build a team, complete tasks, and earn tokens.',
    start_url: getProjectHref(i18n.defaultLocale, 'home'),
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: siteLinksConfig.icons.favicon,
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
