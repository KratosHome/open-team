import React from 'react';
import {
  Lightbulb,
  MoveRight,
  Rocket,
  Search,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const StatCard = ({
  value,
  sublabel,
}: {
  value: string;
  sublabel: string;
}) => (
  <div className="glass flex flex-col gap-1 rounded-2xl px-8 py-6 min-w-[130px]">
    <span className="text-4xl font-bold">{value}</span>
    <span className="text-sm text-white/40">{sublabel}</span>
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
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) => (
  <div
    className="glass group relative flex flex-col items-start gap-4 rounded-[32px] border-t-2 p-8 transition-all duration-300 hover:bg-white/5"
    style={{ borderTopColor: color }}
  >
    <div 
      className="inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-bold"
      style={{ backgroundColor: `${color}15`, color }}
    >
      {number}
    </div>
    
    <div className="flex flex-col items-start gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl">
        <Icon className="h-10 w-10" style={{ color }} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/40">{description}</p>
      </div>
    </div>
  </div>
);

export const TeamHubLanding = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[1440px] overflow-hidden px-4 pt-24 pb-20 md:px-20">
      <main className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-[#1e2230]/50 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-sm border border-white/5">
            <div className="flex items-center gap-1.5">
               <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>4 активних проєктів</span>
            </div>
            <span className="text-white/20">•</span>
            <span>5 учасників</span>
          </div>

          <h1 className="font-sans text-6xl leading-[1] font-bold tracking-tight md:text-8xl">
            Твоя ідея —<br />
            <span className="text-gradient-cyan">команда, задачі,</span><br />
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">токени.</span>
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-white/40">
            Платформа де ідеї стають продуктами. <br />
            Збирай команду, виконуй задачі — отримуй токени.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="h-16 px-8 rounded-2xl bg-[#00e99f] hover:bg-[#00e99f]/90 text-black text-lg font-bold flex items-center gap-2 group transition-all hover:scale-[1.02]">
              Створити проєкт <MoveRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="h-16 px-8 rounded-2xl bg-[#6d48ff] hover:bg-[#6d48ff]/90 text-white text-lg font-bold flex items-center gap-2 group transition-all hover:scale-[1.02]">
              Обрати проєкт <MoveRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <StatCard value="4" sublabel="Проєктів" />
            <StatCard value="5" sublabel="Учасників" />
            <StatCard value="89%" sublabel="Успішність" />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex flex-col gap-6 pt-4">
          <div className="flex justify-start md:justify-end">
            <div className="text-[#00ffa2] text-[10px] font-bold tracking-[0.2em] uppercase bg-[#00ffa2]/10 px-3 py-1 rounded-md">
              Як це працює
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 relative">
            <StepCard
              number="01"
              icon={Lightbulb}
              title="Запропонуй ідею"
              description="Опиши проєкт, встанови бюджет токенів і відкрий набір у команду."
              color="#00e1ff"
            />
            
            <div className="hidden md:flex absolute top-1/4 left-[calc(50%-12px)] z-10 text-white/20">
              <MoveRight className="h-6 w-6" />
            </div>

            <StepCard
              number="02"
              icon={Search}
              title="Або обери проєкт"
              description="Знайди цікавий проєкт, подай заявку і отримай задачі одразу."
              color="#8146ff"
            />

            <StepCard
              number="03"
              icon={Zap}
              title="Виконуй задачі"
              description="Таск-менеджер всередині. Закрив задачу — токени на рахунку."
              color="#00ff62"
            />

            <div className="hidden md:flex absolute bottom-1/4 left-[calc(50%-12px)] z-10 text-white/20">
              <MoveRight className="h-6 w-6" />
            </div>

            <StepCard
              number="04"
              icon={Rocket}
              title="Запускай продукт"
              description="20% від прибутку успішного проєкту підтримує екосистему токена."
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
