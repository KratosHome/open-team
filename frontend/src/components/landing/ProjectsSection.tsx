'use client';

import { useGSAP } from '@gsap/react';
import { Zap } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { ProjectsSectionProps } from '@/types/projects';
import gsap from 'gsap';

import { ProjectCard } from './ProjectCard';

export function ProjectsSection({ dict, projects }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate header
      gsap.to('.section-header', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-header',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Animate cards with stagger
      gsap.to('.project-card-wrapper', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="space-y-8 py-16 md:space-y-10 md:py-24">
      <div className="section-header flex translate-y-10 flex-col gap-4 opacity-0 will-change-[transform,opacity] sm:gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8]">
            <Zap className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {dict.title}
            </h2>

            <p className="mt-1 max-w-[560px] text-sm leading-5 text-slate-400 sm:text-base">
              {dict.description}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-[#3D3D57] bg-[#212133] text-white hover:border-[#4A4A6A] hover:bg-[#2A2A44] sm:w-fit"
        >
          {dict.viewAll}
        </Button>
      </div>

      <div className="projects-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card-wrapper translate-y-10 opacity-0 will-change-[transform,opacity]"
          >
            <ProjectCard project={project} dict={dict} />
          </div>
        ))}
      </div>
    </section>
  );
}
