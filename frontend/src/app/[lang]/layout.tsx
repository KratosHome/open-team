import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { Geist_Mono, Inter } from 'next/font/google';

import '../globals.css';

import type { Locale } from '@/i18n-config';

import dynamic from 'next/dynamic';

import { Navbar } from '@/components/navbar';
import {
  getAbsoluteProjectUrl,
  getLocaleAlternates,
  siteLinksConfig,
} from '@/config/project-links';
import { i18n } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { GSAPProvider } from '@/providers/gsap-provider';
import { ReactQueryProvider } from '@/providers/react-query-provider';

const Footer = dynamic(() => import('@/components/footer').then((mod) => mod.Footer), {
  ssr: true,
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'optional',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'optional',
});

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

interface LangParams {
  lang: string;
}

interface GenerateMetadataProps {
  params: Promise<LangParams>;
}

interface RootLayoutProps extends GenerateMetadataProps {
  children: ReactNode;
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale, 'main');

  return {
    metadataBase: new URL(siteLinksConfig.baseUrl),
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    manifest: siteLinksConfig.manifestPath,
    icons: {
      icon: siteLinksConfig.icons.favicon,
      apple: siteLinksConfig.icons.appleTouch,
    },
    alternates: {
      canonical: getAbsoluteProjectUrl(locale, 'home'),
      languages: getLocaleAlternates('home'),
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: 'website',
      url: getAbsoluteProjectUrl(locale, 'home'),
      locale: locale === 'uk' ? 'uk_UA' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale, 'common');
  const mainDict = await getDictionary(locale, 'main');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TeamHub',
    url: siteLinksConfig.baseUrl,
    logo: `${siteLinksConfig.baseUrl}${siteLinksConfig.icons.favicon}`,
    description: mainDict.metadata.description,
    sameAs: [
      'https://x.com/teamhub',
      'https://linkedin.com/company/teamhub',
      'https://t.me/teamhub',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'TeamHub',
    url: siteLinksConfig.baseUrl,
    description: mainDict.metadata.description,
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} ${geistMono.variable} relative bg-slate-950 antialiased`}
      >
        <ReactQueryProvider>
          <GSAPProvider>
            <header>
              <Navbar dict={dict} lang={locale} />
            </header>
            <main>{children}</main>
            <footer>
              <Footer dict={dict} lang={locale} />
            </footer>
          </GSAPProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
