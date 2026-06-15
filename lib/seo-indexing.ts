import type { Metadata } from "next";
import { defaultLocale, hreflangCode, localizedUrl, type Locale } from "./i18n/config";

const INDEXABLE_CONTENT_LOCALES: Locale[] = [defaultLocale];

export function isIndexableContentLocale(locale: Locale): boolean {
  return INDEXABLE_CONTENT_LOCALES.includes(locale);
}

export function indexableCanonical(locale: Locale, path: string): string {
  return localizedUrl(isIndexableContentLocale(locale) ? locale : defaultLocale, path);
}

export function indexableAlternateLanguages(path: string): Record<string, string> {
  return {
    [hreflangCode[defaultLocale]]: localizedUrl(defaultLocale, path),
    "x-default": localizedUrl(defaultLocale, path),
  };
}

export function robotsForIndexableContent(locale: Locale): Metadata["robots"] {
  return isIndexableContentLocale(locale)
    ? { index: true, follow: true }
    : { index: false, follow: true };
}
