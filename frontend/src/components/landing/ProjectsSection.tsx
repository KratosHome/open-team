import { Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ProjectsSectionProps } from '@/types/projects';

import { ProjectCard } from './ProjectCard';

export function ProjectsSection({ dict, projects }: ProjectsSectionProps) {
  return (
    <section className="space-y-8 py-16 md:space-y-10 md:py-24">
      <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-start md:justify-between">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} dict={dict} />
        ))}
      </div>
    </section>
  );
}
