import { HeroSection } from '@/components/landing/HeroSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { TokenSystemSection } from '@/components/landing/TokenSystemSection';
import { mockLandingStats } from '@/data/landing-stats';
import { mockProjects } from '@/data/projects';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';
import { HeroDictionary } from '@/types/hero';
import { ProjectsDictionary } from '@/types/projects';
import { TokenSystemDictionary } from '@/types/token-system';

interface MainDictionary {
  hero: HeroDictionary;
  projects: ProjectsDictionary;
  tokenSystem: TokenSystemDictionary;
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = (await getDictionary(locale, 'main')) as unknown as MainDictionary;

  return (
    <main className="mx-auto max-w-[1440px] px-5 md:px-8">
      <HeroSection dict={dict.hero} stats={mockLandingStats} />
      <ProjectsSection dict={dict.projects} projects={mockProjects} />
      <TokenSystemSection dict={dict.tokenSystem} lang={locale} />
    </main>
  );
}
