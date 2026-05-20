export const locales = ["en", "es", "pt", "fr", "it", "de", "ru", "pl", "tr", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
  ru: "Русский",
  pl: "Polski",
  tr: "Türkçe",
  ja: "日本語",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  pt: "🇧🇷",
  fr: "🇫🇷",
  it: "🇮🇹",
  de: "🇩🇪",
  ru: "🇷🇺",
  pl: "🇵🇱",
  tr: "🇹🇷",
  ja: "🇯🇵",
};

// Maps to the BCP 47 hreflang code Google expects
export const hreflangCode: Record<Locale, string> = {
  en: "en",
  es: "es",
  pt: "pt-BR",
  fr: "fr",
  it: "it",
  de: "de",
  ru: "ru",
  pl: "pl",
  tr: "tr",
  ja: "ja",
};

export const SITE_URL = "https://tarotcard.art";

// Helper: build URL for a given locale + path
export function localizedUrl(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === defaultLocale
    ? `${SITE_URL}${clean === "/" ? "" : clean}`
    : `${SITE_URL}/${locale}${clean === "/" ? "" : clean}`;
}

// Build languages map for metadata.alternates.languages
export function alternateLanguages(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const loc of locales) {
    map[hreflangCode[loc]] = localizedUrl(loc, path);
  }
  map["x-default"] = localizedUrl(defaultLocale, path);
  return map;
}
