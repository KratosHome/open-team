import 'server-only';
import type { Locale } from '../i18n-config';

interface DictionaryLoaders {
  common: () => Promise<typeof import('../../dictionaries/en/common.json')>;
  main: () => Promise<typeof import('../../dictionaries/en/main.json')>;
  admin: () => Promise<typeof import('../../dictionaries/en/admin.json')>;
  users: () => Promise<typeof import('../../dictionaries/en/users.json')>;
  blog: () => Promise<typeof import('../../dictionaries/en/blog.json')>;
}

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
} satisfies Record<Locale, DictionaryLoaders>;

export const getDictionary = async <T extends keyof DictionaryLoaders>(
  locale: Locale,
  part: T = 'common' as T,
) => {
  const dict = dictionaries[locale] ?? dictionaries.uk;
  return dict[part]() as Promise<Awaited<ReturnType<DictionaryLoaders[T]>>>;
};
