import Link from 'next/link';

import { getProjectHref } from '@/config/project-links';
import type { Locale } from '@/i18n-config';

interface TokenomicsPageContent {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  backLabel: string;
}

interface LangParams {
  lang: string;
}

interface TokenomicsPageProps {
  params: Promise<LangParams>;
}

const tokenomicsContent = {
  en: {
    eyebrow: 'Tokenomics',
    title: 'Token Burn Details',
    description:
      'This page is reserved for the detailed burn model. It will explain how revenue is allocated, when tokens are bought back and burned, and how the mechanism supports the OpenTeam economy.',
    points: [
      'The burn pool is funded from the share of project revenue defined by the tokenomics model.',
      'The detailed formula, timing, and settlement logic will be published here.',
      'Examples of project-level distributions and burn scenarios will be added in the next iteration.',
    ],
    backLabel: 'Back to home',
  },
  uk: {
    eyebrow: 'Токеноміка',
    title: 'Деталі спалювання токенів',
    description:
      'Ця сторінка зарезервована для детального опису моделі спалювання. Тут буде пояснено, як розподіляється частина доходу, коли саме відбувається викуп і спалювання токенів та як цей механізм підтримує економіку OpenTeam.',
    points: [
      'Пул для спалювання формується з частки доходу проєкту, визначеної токеномічною моделлю.',
      'Детальна формула, строки та логіка нарахувань будуть опубліковані тут.',
      'На наступному етапі тут з’являться приклади розподілу доходу проєкту та сценарії спалювання.',
    ],
    backLabel: 'Повернутися на головну',
  },
} as const satisfies Record<Locale, TokenomicsPageContent>;

export default async function TokenomicsPage({
  params,
}: TokenomicsPageProps) {
  const { lang } = await params;
  const locale = lang as Locale;
  const content = tokenomicsContent[locale];

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8">
      <div className="max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-emerald-300/80">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          {content.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">{content.description}</p>

        <div className="mt-8 grid gap-3">
          {content.points.map((point) => (
            <div
              key={point}
              className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-4 text-slate-400"
            >
              {point}
            </div>
          ))}
        </div>

        <Link
          href={getProjectHref(locale, 'home')}
          className="mt-8 inline-flex text-sm font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-emerald-300"
        >
          {content.backLabel}
        </Link>
      </div>
    </section>
  );
}
