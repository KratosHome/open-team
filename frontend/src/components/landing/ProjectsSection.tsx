'use client';

import { ProjectCard } from './ProjectCard';
import { mockProjects } from '@/data/projects';

export function ProjectsSection() {
  return (
    <section className="py-24 space-y-12">
      <div className="space-y-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Активні Проєкти
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Обирай проєкт до душі, приєднуйся до команди та роби реальний внесок — отримуй токени за кожне виконане завдання.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
