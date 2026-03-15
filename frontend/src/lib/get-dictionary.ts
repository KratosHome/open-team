import 'server-only';
import type { Locale } from '../i18n-config';

const dictionaries = {
  en: {
    common: () => import('../../dictionaries/en/common.json').then((module) => module.default),
    main: () => import('../../dictionaries/en/main.json').then((module) => module.default),
  },
  uk: {
    common: () => import('../../dictionaries/uk/common.json').then((module) => module.default),
    main: () => import('../../dictionaries/uk/main.json').then((module) => module.default),
  },
};

export const getDictionary = async <T extends keyof (typeof dictionaries)['en']>(
  locale: Locale,
  part: T = 'common' as T
) => {
  const dict = dictionaries[locale] ?? dictionaries.uk;
  return dict[part]() as Promise<Awaited<ReturnType<(typeof dictionaries.en)[T]>>>;
};
