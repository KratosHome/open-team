import dynamic from 'next/dynamic';
import type { Locale } from '@/i18n-config';
import type { HeroDictionary } from '@/types/hero';
import type { ProjectsDictionary } from '@/types/projects';
import type { TokenSystemDictionary } from '@/types/token-system';

import { HeroSection } from '@/components/landing/hero-section';
import { mockLandingStats } from '@/data/landing-stats';
import { mockProjects } from '@/data/projects';
import { getDictionary } from '@/lib/get-dictionary';

const ProjectsSection = dynamic(
  () => import('@/components/landing/projects-section').then((mod) => mod.ProjectsSection),
  {
    ssr: true,
    loading: () => <div className="min-h-[400px]" />,
  },
);

const TokenSystemSection = dynamic(
  () =>
    import('@/components/landing/token-system-section').then((mod) => mod.TokenSystemSection),
  {
    ssr: true,
    loading: () => <div className="min-h-[400px]" />,
  },
);

interface LangParams {
  lang: string;
}

interface MainMetadata {
  title: string;
  description: string;
  keywords: string;
}

interface MainDictionary {
  hero: HeroDictionary;
  projects: ProjectsDictionary;
  tokenSystem: TokenSystemDictionary;
  metadata: MainMetadata;
}

interface HomePageProps {
  params: Promise<LangParams>;
}

export default async function Home({ params }: HomePageProps) {
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
