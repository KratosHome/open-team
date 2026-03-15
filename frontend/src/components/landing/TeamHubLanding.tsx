"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight, LayoutGrid, Radio, FileText, Settings, HelpCircle, FileBox, Coins, Users, Zap, Search, Rocket, Lightbulb } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center bg-[#1a1c20] border border-white/10 rounded-lg">
          <span className="text-xl font-bold bg-gradient-to-br from-brand-green to-brand-purple bg-clip-text text-transparent">T</span>
        </div>
        <span className="text-xl font-bold tracking-tight">TeamHub</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <Link href="#" className="text-white border-b-2 border-brand-green pb-1 mt-1 transition-colors">Проєкти</Link>
        <Link href="#" className="hover:text-white transition-colors">Ком'юніті</Link>
        <Link href="#" className="hover:text-white transition-colors">Блог</Link>
        <Link href="#" className="hover:text-white transition-colors">Правила</Link>
        <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
        <Link href="#" className="hover:text-white transition-colors">Документація</Link>
        <Link href="#" className="hover:text-white transition-colors">Токеноміка</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm">
          <span>🇺🇦 UA</span>
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
        </div>
        <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white rounded-xl px-6 py-5 flex items-center gap-2">
          Вхід <MoveRight className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
};

const StatCard = ({ label, value, sublabel }: { label: string; value: string; sublabel: string }) => (
  <div className="glass p-6 rounded-2xl flex flex-col gap-1 min-w-[140px]">
    <span className="text-3xl font-bold">{value}</span>
    <span className="text-xs text-white/40 uppercase tracking-wider">{sublabel}</span>
  </div>
);

const StepCard = ({ number, icon: Icon, title, description, color }: { number: string; icon: any; title: string; description: string; color: string }) => (
  <div className={`glass p-8 rounded-3xl border-t-2 relative overflow-hidden group hover:bg-white/10 transition-all duration-300`} style={{ borderTopColor: color }}>
    <div className="absolute top-4 left-4 text-xs font-mono text-white/20">{number}</div>
    <div className="mb-6 mt-2">
      <Icon className="w-10 h-10" style={{ color }} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-sm text-white/40 leading-relaxed">{description}</p>
    <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] blur-3xl -mr-16 -mt-16 rounded-full group-hover:opacity-[0.08] transition-opacity" style={{ color }} />
  </div>
);

export const TeamHubLanding = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-20 max-w-[1440px] mx-auto overflow-hidden">
      <Navbar />
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div className="flex flex-col gap-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs text-white/60 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
            4 активних проєктів • 5 учасників
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold font-sans tracking-tight leading-[1.1]">
            Твоя ідея — 
            <span className="block text-gradient-green">команда, задачі,</span>
            <span className="block text-gradient-purple underline decoration-brand-purple/30 underline-offset-8">токени.</span>
          </h1>
          
          <p className="text-lg text-white/40 max-w-lg leading-relaxed">
            Платформа де ідеї стають продуктами. <br />
            Збирай команду, виконуй задачі — отримуй токени.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="bg-brand-green hover:bg-brand-green/90 text-brand-dark font-bold px-8 py-7 rounded-2xl flex items-center gap-2 group text-lg transition-transform hover:scale-105 active:scale-95">
              Створити проєкт <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="bg-brand-purple/20 border border-brand-purple/30 hover:bg-brand-purple/30 text-white font-bold px-8 py-7 rounded-2xl flex items-center gap-2 group text-lg transition-transform hover:scale-105 active:scale-95">
              Обрати проєкт <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="flex gap-4 mt-8 flex-wrap">
            <StatCard value="4" label="Проєкти" sublabel="Проєктів" />
            <StatCard value="5" label="Учасники" sublabel="Учасників" />
            <StatCard value="89%" label="Успішність" sublabel="Успішність" />
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <div className="absolute -top-10 right-0 text-[10px] font-bold text-brand-green tracking-widest uppercase mb-4">Як це працює</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
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
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2 z-0"></div>
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/5 -translate-x-1/2 z-0"></div>
          </div>
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-purple/10 blur-[120px] rounded-full -z-10" />
        </div>
      </main>
    </div>
  );
};
