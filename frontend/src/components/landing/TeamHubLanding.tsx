'use client';

import Link from 'next/link';
import {
  Coins,
  FileBox,
  FileText,
  HelpCircle,
  LayoutGrid,
  Lightbulb,
  MoveRight,
  Radio,
  Rocket,
  Search,
  Settings,
  Users,
  Zap,
} from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

const StatCard = ({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) => (
  <div className="glass flex min-w-[140px] flex-col gap-1 rounded-2xl p-6">
    <span className="text-3xl font-bold">{value}</span>
    <span className="text-xs tracking-wider text-white/40 uppercase">{sublabel}</span>
  </div>
);

const StepCard = ({
  number,
  icon: Icon,
  title,
  description,
  color,
}: {
  number: string;
  icon: any;
  title: string;
  description: string;
  color: string;
}) => (
  <div
    className={`glass group relative overflow-hidden rounded-3xl border-t-2 p-8 transition-all duration-300 hover:bg-white/10`}
    style={{ borderTopColor: color }}
  >
    <div className="absolute top-4 left-4 font-mono text-xs text-white/20">{number}</div>
    <div className="mt-2 mb-6">
      <Icon className="h-10 w-10" style={{ color }} />
    </div>
    <h3 className="mb-3 text-xl font-bold">{title}</h3>
    <p className="text-sm leading-relaxed text-white/40">{description}</p>
    <div
      className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-current opacity-[0.03] blur-3xl transition-opacity group-hover:opacity-[0.08]"
      style={{ color }}
    />
  </div>
);

export const TeamHubLanding = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[1440px] overflow-hidden px-4 pt-24 pb-20 md:px-20">
      <main className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-10">
          <div className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs text-white/60">
            <span className="bg-brand-green h-1.5 w-1.5 animate-pulse rounded-full"></span>4
            активних проєктів • 5 учасників
          </div>

          <h1 className="font-sans text-6xl leading-[1.1] font-bold tracking-tight md:text-7xl">
            Твоя ідея —<span className="text-gradient-green block">команда, задачі,</span>
            <span className="text-gradient-purple decoration-brand-purple/30 block underline underline-offset-8">
              токени.
            </span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-white/40">
            Платформа де ідеї стають продуктами. <br />
            Збирай команду, виконуй задачі — отримуй токени.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-brand-dark group flex items-center gap-2 rounded-2xl px-8 py-7 text-lg font-bold transition-transform hover:scale-105 active:scale-95">
              Створити проєкт{' '}
              <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button className="bg-brand-purple/20 border-brand-purple/30 hover:bg-brand-purple/30 group flex items-center gap-2 rounded-2xl border px-8 py-7 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95">
              Обрати проєкт{' '}
              <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <StatCard value="4" label="Проєкти" sublabel="Проєктів" />
            <StatCard value="5" label="Учасники" sublabel="Учасників" />
            <StatCard value="89%" label="Успішність" sublabel="Успішність" />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <div className="text-brand-green absolute -top-10 right-0 mb-4 text-[10px] font-bold tracking-widest uppercase">
            Як це працює
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            <StepCard
              number="01"
              icon={Lightbulb}
              title="Запропонуй ідею"
              description="Опиши проєкт, встанови бюджет токенів і відкрий набір у команду."
              color="#5eead4"
            />
            <StepCard
              number="02"
              icon={Search}
              title="Або обери проєкт"
              description="Знайди цікавий проєкт, подай заявку і отримай задачі одразу."
              color="#a855f7"
            />
            <StepCard
              number="03"
              icon={Zap}
              title="Виконуй задачі"
              description="Таск-менеджер всередині. Закрив задачу — токени на рахунку."
              color="#fbbf24"
            />
            <StepCard
              number="04"
              icon={Rocket}
              title="Запускай продукт"
              description="20% від прибутку успішного проєкту підтримує екосистему токена."
              color="#ef4444"
            />

            {/* Connecting arrows effect (subtle) */}
            <div className="absolute top-1/2 right-0 left-0 z-0 hidden h-px -translate-y-1/2 bg-white/5 md:block"></div>
            <div className="absolute top-0 bottom-0 left-1/2 z-0 hidden w-px -translate-x-1/2 bg-white/5 md:block"></div>
          </div>

          {/* Background Glow */}
          <div className="bg-brand-purple/10 absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
        </div>
      </main>
    </div>
  );
};
