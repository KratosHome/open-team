import type { Metadata, Viewport } from 'next';

import { Geist_Mono, Inter } from 'next/font/google';
import { ReactNode } from 'react';

import '../globals.css';

import type { Locale } from '@/i18n-config';

import { Navbar } from '@/components/navbar';
import { i18n } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale, 'main');

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    manifest: '/manifest.json',
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        uk: '/uk',
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: 'website',
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
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale, 'common');

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} ${geistMono.variable} relative bg-slate-950 antialiased`}
      >
        <header>
          <Navbar dict={dict} lang={locale} />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
