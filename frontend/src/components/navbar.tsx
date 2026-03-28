'use client';

import type { AuthDialogDictionary } from '@/components/auth/auth-dialog';

import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useState } from 'react';

import { AuthDialog } from '@/components/auth/auth-dialog';
import { LanguageSwitcher } from '@/components/language-switcher';
import { BurgerButton } from '@/components/ui/burger-button';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { MyLink } from '@/components/ui/my-link';
import { getNavigationLinks } from '@/config/navigation';
import { getProjectHref } from '@/config/project-links';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n-config';

interface NavbarDictionary extends AuthDialogDictionary {
  navbar: Record<string, string>;
}

interface NavbarProps {
  dict: NavbarDictionary;
  lang: Locale;
}

export const Navbar = ({ dict, lang }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = getNavigationLinks(lang);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#171724]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-3 py-4 md:px-8">
        <Link
          href={getProjectHref(lang, 'home')}
          className="transition-opacity hover:opacity-90"
          onClick={() => setIsOpen(false)}
        >
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {links.map((link) => (
            <MyLink
              key={link.href}
              href={link.href}
              variant={link.href === `/${lang}/projects` ? 'navbar-active' : 'navbar'}
            >
              {dict.navbar[link.labelKey as keyof typeof dict.navbar]}
            </MyLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSwitcher lang={lang} />
          </div>
          <AuthDialog
            dict={dict}
            trigger={
              <Button>
                {dict.navbar.login} <MoveRight className="h-4 w-4" />
              </Button>
            }
          />
          <BurgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="lg:hidden" />
        </div>
      </div>

      <div
        className={cn(
          'absolute top-full right-0 left-0 border-t border-white/5 bg-[#171724] p-4 transition-all duration-300 ease-in-out lg:hidden',
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <MyLink
              key={link.href}
              href={link.href}
              variant={link.href === `/${lang}/projects` ? 'navbar-active' : 'navbar'}
              onClick={() => setIsOpen(false)}
            >
              {dict.navbar[link.labelKey as keyof typeof dict.navbar]}
            </MyLink>
          ))}
          <div className="mt-4 flex flex-col gap-4 border-t border-white/5 pt-4 sm:hidden">
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </div>
    </nav>
  );
};
