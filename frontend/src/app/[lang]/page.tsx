import { TeamHubLanding } from '@/components/landing/TeamHubLanding';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <main>
      <TeamHubLanding dict={dict.landing} />
    </main>
  );
}
