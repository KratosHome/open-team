import type { Metadata } from 'next';

import { Geist_Mono, Inter } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

import { Navbar } from '@/components/navbar';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'TeamHub — Твоя ідея, наша команда',
  description:
    'Платформа, де ідеї стають продуктами. Збирай команду, виконуй задачі та отримуй токени.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${inter.className} ${geistMono.variable} relative mx-auto max-w-[1440px] bg-slate-950 px-15 antialiased`}
      >
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
