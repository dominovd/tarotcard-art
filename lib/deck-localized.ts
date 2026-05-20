import { deck, type TarotCard, type Suit } from "./deck";
import { cardTranslations } from "./i18n/cards";
import type { Locale } from "./i18n/config";

// Returns a card with locale-specific name/keywords/upright/advice
// (falls back to English for any missing fields and for reversed/love/career)
export function getLocalizedCard(slug: string, locale: Locale): TarotCard | undefined {
  const base = deck.find((c) => c.slug === slug);
  if (!base) return undefined;
  if (locale === "en") return base;
  const tr = cardTranslations[locale]?.[slug];
  if (!tr) return base;
  return {
    ...base,
    name: tr.name || base.name,
    keywords: tr.keywords?.length ? tr.keywords : base.keywords,
    upright: tr.upright || base.upright,
    advice: tr.advice || base.advice,
    // reversed, love, career fall back to English for now
  };
}

export function localizedDeck(locale: Locale): TarotCard[] {
  return deck.map((c) => getLocalizedCard(c.slug, locale)!);
}

export function localizedMajor(locale: Locale): TarotCard[] {
  return localizedDeck(locale).filter((c) => c.arcana === "major").sort((a, b) => a.number - b.number);
}

export function localizedMinorBySuit(locale: Locale, suit: Suit): TarotCard[] {
  return localizedDeck(locale).filter((c) => c.suit === suit).sort((a, b) => a.number - b.number);
}
