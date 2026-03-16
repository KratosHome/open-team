'use client';

import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { i18n, Locale } from '@/i18n-config';

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleLocaleChange = (locale: string) => {
    router.push(redirectedPathname(locale));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <span>{lang === 'uk' ? '🇺🇦 UA' : '🇺🇸 EN'}</span>
        <span
          className={`h-2 w-2 rounded-full ${lang === 'uk' ? 'bg-yellow-400' : 'bg-blue-400'}`}
        ></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => handleLocaleChange(locale)}>
            {locale === 'uk' ? 'Українська' : 'English'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
