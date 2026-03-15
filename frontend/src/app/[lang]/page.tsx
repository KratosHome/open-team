import { TeamHubLanding } from '@/components/landing/TeamHubLanding';
import { mockLandingStats } from '@/data/landing-stats';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/lib/get-dictionary';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <main className="px-5 md:px-8">
      <TeamHubLanding dict={dict.landing} stats={mockLandingStats} />
    </main>
  );
}
