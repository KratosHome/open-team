'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Locale, i18n } from '@/i18n-config';

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
      <DropdownMenuTrigger
        render={<Button variant="outline" className="flex items-center gap-2" />}
      >
        <span>{lang === 'uk' ? '🇺🇦 UA' : '🇺🇸 EN'}</span>
        <span className={`h-2 w-2 rounded-full ${lang === 'uk' ? 'bg-yellow-400' : 'bg-blue-400'}`}></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-[#171724] border-white/10 text-white">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
          >
            {locale === 'uk' ? 'Українська' : 'English'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
