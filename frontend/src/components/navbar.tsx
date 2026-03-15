import React from 'react';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { MyLink } from '@/components/ui/my-link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#171724]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <MyLink href="#" variant="navbar-active">
            Проєкти
          </MyLink>
          <MyLink href="#" variant="navbar">
            Ком'юніті
          </MyLink>
          <MyLink href="#" variant="navbar">
            Блог
          </MyLink>
          <MyLink href="#" variant="navbar">
            Правила
          </MyLink>
          <MyLink href="#" variant="navbar">
            FAQ
          </MyLink>
          <MyLink href="#" variant="navbar">
            Документація
          </MyLink>
          <MyLink href="#" variant="navbar">
            Токеноміка
          </MyLink>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline">
            <span>🇺🇦 UA</span>
            <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
          </Button>
          <Button>
            Вхід <MoveRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
