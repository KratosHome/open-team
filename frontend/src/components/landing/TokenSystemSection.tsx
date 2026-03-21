'use client';

import { Laptop, Zap, CircleDollarSign, Link2 } from 'lucide-react';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { getProjectHref } from '@/config/project-links';
import type { Locale } from '@/i18n-config';
import type { TokenSystemDictionary } from '@/types/token-system';

import { StepCard } from './StepCard';

interface TokenSystemSectionProps {
  dict: TokenSystemDictionary;
  lang: Locale;
}

export const TokenSystemSection = ({ dict, lang }: TokenSystemSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate header
      gsap.to('.token-header', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.token-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Animate step cards with stagger
      gsap.to('.step-card-wrapper', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.steps-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-purple-600/5 blur-[120px]" />

      <div className="flex flex-col gap-12">
        <div className="token-header translate-y-8 opacity-0 will-change-[transform,opacity] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">
              <Link2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              {dict.title}
            </h2>
          </div>
          <p className="max-w-2xl text-lg text-slate-400">
            {dict.subtitle}
          </p>
        </div>

        <div className="steps-grid grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="step-card-wrapper translate-y-10 opacity-0 will-change-[transform,opacity]">
            <StepCard
              number="01"
              icon={Laptop}
              title={dict.step1.title}
              description={dict.step1.description}
              color="#3b82f6" // blue-500
            />
          </div>
          <div className="step-card-wrapper translate-y-10 opacity-0 will-change-[transform,opacity]">
            <StepCard
              number="02"
              icon={Zap}
              title={dict.step2.title}
              description={dict.step2.description}
              color="#a855f7" // purple-500
            />
          </div>
          <div className="step-card-wrapper translate-y-10 opacity-0 will-change-[transform,opacity]">
            <StepCard
              number="03"
              icon={CircleDollarSign}
              title={dict.step3.title}
              description={dict.step3.description}
              color="#10b981" // emerald-500
              linkHref={dict.step3.linkLabel ? getProjectHref(lang, 'tokenomics') : undefined}
              linkLabel={dict.step3.linkLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
