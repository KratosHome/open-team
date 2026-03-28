export type Locale = 'en' | 'uk';

export interface I18nConfig {
  defaultLocale: Locale;
  locales: readonly Locale[];
}

export const i18n = {
  defaultLocale: 'uk',
  locales: ['en', 'uk'],
} as const satisfies I18nConfig;
