import React from 'react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { MyLink } from '@/components/ui/my-link';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Locale } from '@/i18n-config';

interface NavbarProps {
  dict: {
    projects: string;
    community: string;
    blog: string;
    rules: string;
    faq: string;
    documentation: string;
    tokenomics: string;
    login: string;
    language: string;
  };
  lang: Locale;
}

export const Navbar = ({ dict, lang }: NavbarProps) => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#171724]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <Link href={`/${lang}`} className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <MyLink href={`/${lang}/projects`} variant="navbar-active">
            {dict.projects}
          </MyLink>
          <MyLink href={`/${lang}/community`} variant="navbar">
            {dict.community}
          </MyLink>
          <MyLink href={`/${lang}/blog`} variant="navbar">
            {dict.blog}
          </MyLink>
          <MyLink href={`/${lang}/rules`} variant="navbar">
            {dict.rules}
          </MyLink>
          <MyLink href={`/${lang}/faq`} variant="navbar">
            {dict.faq}
          </MyLink>
          <MyLink href={`/${lang}/docs`} variant="navbar">
            {dict.documentation}
          </MyLink>
          <MyLink href={`/${lang}/tokenomics`} variant="navbar">
            {dict.tokenomics}
          </MyLink>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} />
          <Button>
            {dict.login} <MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
