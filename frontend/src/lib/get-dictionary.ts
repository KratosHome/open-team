import 'server-only';
import type { Locale } from '../i18n-config';

const dictionaries = {
  en: {
    common: () => import('../../dictionaries/en/common.json').then((module) => module.default),
    main: () => import('../../dictionaries/en/main.json').then((module) => module.default),
    admin: () => import('../../dictionaries/en/admin.json').then((module) => module.default),
    users: () => import('../../dictionaries/en/users.json').then((module) => module.default),
    blog: () => import('../../dictionaries/en/blog.json').then((module) => module.default),
  },
  uk: {
    common: () => import('../../dictionaries/uk/common.json').then((module) => module.default),
    main: () => import('../../dictionaries/uk/main.json').then((module) => module.default),
    admin: () => import('../../dictionaries/uk/admin.json').then((module) => module.default),
    users: () => import('../../dictionaries/uk/users.json').then((module) => module.default),
    blog: () => import('../../dictionaries/uk/blog.json').then((module) => module.default),
  },
};

export type DictionaryPart = keyof (typeof dictionaries)['en'];

export const getDictionary = async <T extends DictionaryPart>(
  locale: Locale,
  part: T = 'common' as T
) => {
  const dict = dictionaries[locale] ?? dictionaries.uk;
  return dict[part]() as Promise<Awaited<ReturnType<(typeof dictionaries.en)[T]>>>;
};
