import { HeroSection } from '@/components/landing/HeroSection';
import { mockLandingStats } from '@/data/landing-stats';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale, 'main');

  return (
    <main className="px-5 md:px-8">
      <HeroSection dict={dict.hero} stats={mockLandingStats} />
    </main>
  );
}
