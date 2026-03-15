import { Coins, Lightbulb, MoveRight, Rocket, Zap } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import { HeroSectionProps } from '@/types/hero';
import { StatCard } from './StatCard';
import { StepCard } from './StepCard';

export const HeroSection = ({ dict, stats }: HeroSectionProps) => {
  return (
    <div className="pt-24 pb-20">
      <main className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-2xl border border-white/5 bg-[#1e2230]/50 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              <span>{dict.activeProjects.replace('{count}', stats.activeProjects.toString())}</span>
            </div>
            <span className="text-white/20">•</span>
            <span>{dict.participants.replace('{count}', stats.participants.toString())}</span>
          </div>

          <h1 className="font-sans text-6xl leading-[1] font-bold tracking-tight md:text-8xl">
            {dict.heroTitle}
            <br />
            <span className="text-gradient-cyan">{dict.heroSubtitle1}</span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              {dict.heroSubtitle2}
            </span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-white/40">{dict.heroDescription}</p>

          <div className="flex flex-wrap gap-4">
            <Button className="group flex h-16 items-center gap-2 rounded-2xl bg-[#00e99f] px-8 text-lg font-bold text-black transition-all hover:scale-[1.02] hover:bg-[#00e99f]/90">
              {dict.createProject}{' '}
              <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button className="group flex h-16 items-center gap-2 rounded-2xl bg-[#6d48ff] px-8 text-lg font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#6d48ff]/90">
              {dict.selectProject}{' '}
              <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <StatCard value={stats.activeProjects.toString()} sublabel={dict.stats.projects} />
            <StatCard value={stats.participants.toString()} sublabel={dict.stats.participants} />
            <StatCard value={`${stats.successRate}%`} sublabel={dict.stats.completed} />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex flex-col gap-6 pt-4">
          <div className="flex justify-start md:justify-end">
            <h2 className="rounded-md bg-[#00ffa2]/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#00ffa2] uppercase">
              {dict.howItWorks}
            </h2>
          </div>

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
            <StepCard
              number="01"
              icon={Lightbulb}
              title={dict.steps.step1Title}
              description={dict.steps.step1Description}
              color="#00e1ff"
            />

            <div className="absolute top-1/4 left-[calc(50%-12px)] z-10 hidden text-white/20 md:flex">
              <MoveRight className="h-6 w-6" />
            </div>

            <StepCard
              number="02"
              icon={Rocket}
              title={dict.steps.step2Title}
              description={dict.steps.step2Description}
              color="#8146ff"
            />

            <StepCard
              number="03"
              icon={Zap}
              title={dict.steps.step3Title}
              description={dict.steps.step3Description}
              color="#00ff62"
            />

            <div className="absolute bottom-1/4 left-[calc(50%-12px)] z-10 hidden text-white/20 md:flex">
              <MoveRight className="h-6 w-6" />
            </div>

            <StepCard
              number="04"
              icon={Coins}
              title={dict.steps.step4Title}
              description={dict.steps.step4Description}
              color="#ffbc00"
            />
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
        </div>
      </main>
    </div>
  );
};
