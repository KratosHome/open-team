'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Send, Twitter, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/ui/logo';
import {
  footerLegalLinkKeys,
  footerSections,
  getProjectHref,
  socialLinks,
  type FooterSectionKey,
} from '@/config/project-links';
import type { Locale } from '@/i18n-config';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  dict: {
    footer: {
      description: string;
      platform: string;
      projects: string;
      community: string;
      tokenomics: string;
      documentation: string;
      company: string;
      blog: string;
      rules: string;
      faq: string;
      about: string;
      support: string;
      contact: string;
      reportBug: string;
      partnership: string;
      pressKit: string;
      stayInTouch: string;
      subscribeDescription: string;
      emailPlaceholder: string;
      subscribe: string;
      copyright: string;
      privacyPolicy: string;
      termsOfUse: string;
    };
  };
  lang: Locale;
}

export const Footer: React.FC<FooterProps> = ({ dict, lang }) => {
  const footerDict = dict.footer;
  const containerRef = useRef<HTMLElement>(null);

  const sectionTitles: Record<FooterSectionKey, string> = {
    platform: footerDict.platform,
    company: footerDict.company,
    support: footerDict.support,
  };
  const linkLabels: Record<string, string> = {
    projects: footerDict.projects,
    community: footerDict.community,
    tokenomics: footerDict.tokenomics,
    documentation: footerDict.documentation,
    blog: footerDict.blog,
    rules: footerDict.rules,
    faq: footerDict.faq,
    about: footerDict.about,
    contact: footerDict.contact,
    reportBug: footerDict.reportBug,
    partnership: footerDict.partnership,
    pressKit: footerDict.pressKit,
    privacy: footerDict.privacyPolicy,
    terms: footerDict.termsOfUse,
  };

  const socialIcons = {
    x: <Twitter className="h-4 w-4" />,
    linkedin: <Linkedin className="h-4 w-4" />,
    telegram: <Send className="h-4 w-4" />,
  };

  useGSAP(
    () => {
      // Animate footer columns
      gsap.to('.footer-col', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });

      // Animate bottom bar
      gsap.to('.footer-bottom', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-bottom',
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <footer ref={containerRef} className="w-full border-t border-white/5 bg-[#020617] pt-16 pb-8 text-gray-400">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo and Description */}
          <div className="footer-col translate-y-5 opacity-0 will-change-[transform,opacity] lg:col-span-4">
            <Logo size="md" className="mb-6" />
            <p className="mb-8 max-w-xs text-sm leading-relaxed">
              {footerDict.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.key}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.label}</span>
                  {socialIcons[social.key as keyof typeof socialIcons]}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-col translate-y-5 opacity-0 will-change-[transform,opacity] grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerSections.map((column) => (
              <div key={column.titleKey}>
                <h3 className="mb-6 text-sm font-semibold text-white">
                  {sectionTitles[column.titleKey]}
                </h3>
                <ul className="space-y-4">
                  {column.linkKeys.map((linkKey) => (
                    <li key={linkKey}>
                      <Link
                        href={getProjectHref(lang, linkKey)}
                        className="text-sm transition-colors hover:text-white"
                      >
                        {linkLabels[linkKey]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Subscription Section */}
          <div className="footer-col translate-y-5 opacity-0 will-change-[transform,opacity] lg:col-span-3">
            <h3 className="mb-6 text-sm font-semibold text-white">
              {footerDict.stayInTouch}
            </h3>
            <p className="mb-6 text-sm leading-relaxed">
              {footerDict.subscribeDescription}
            </p>
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder={footerDict.emailPlaceholder}
                className="h-11 border-white/10 bg-white/5 text-sm ring-offset-[#020617] focus-visible:ring-[#57b9ff]"
                aria-label={footerDict.emailPlaceholder}
              />
              <Button 
                variant="success" 
                className="h-11 w-full justify-between px-4 font-semibold"
                aria-label={footerDict.subscribe}
              >
                {footerDict.subscribe}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom translate-y-3 opacity-0 will-change-[transform,opacity] mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 lg:flex-row lg:gap-0">
          <p className="text-xs">
            {footerDict.copyright}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            {footerLegalLinkKeys.map((linkKey) => (
              <Link
                key={linkKey}
                href={getProjectHref(lang, linkKey)}
                className="transition-colors hover:text-white"
              >
                {linkLabels[linkKey]}
              </Link>
            ))}
            <span className="hidden h-1 w-1 rounded-full bg-white/10 lg:block" />
            <div className="flex items-center gap-2 rounded-full bg-[#00e99f]/10 px-3 py-1 text-[#00e99f]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00e99f] animate-pulse" />
              <span className="font-semibold tracking-wide">$SECO token</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
