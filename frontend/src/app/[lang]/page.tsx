import { HeroSection } from '@/components/landing/HeroSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { mockLandingStats } from '@/data/landing-stats';
import { mockProjects } from '@/data/projects';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale, 'main');

  return (
    <main className="mx-auto max-w-[1440px] px-5 md:px-8">
      <HeroSection dict={dict.hero} stats={mockLandingStats} />
      <ProjectsSection dict={dict.projects} projects={mockProjects} />
    </main>
  );
}
