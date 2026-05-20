import { deck, type TarotCard, type Suit } from "./deck";
import { cardTranslations } from "./i18n/cards";
import type { Locale } from "./i18n/config";

// Localized card — name/keywords/upright/advice always present, but
// reversed/love/career may be empty strings if not translated for this
// locale. The UI hides empty blocks to avoid mixed-language pages.
export type LocalizedCard = TarotCard;

export function getLocalizedCard(slug: string, locale: Locale): LocalizedCard | undefined {
  const base = deck.find((c) => c.slug === slug);
  if (!base) return undefined;
  if (locale === "en") return base;
  const tr = cardTranslations[locale]?.[slug];
  return {
    ...base,
    name: tr?.name || base.name,
    keywords: tr?.keywords?.length ? tr.keywords : base.keywords,
    upright: tr?.upright || base.upright,
    advice: tr?.advice || base.advice,
    // Empty string when not translated — falsy in JSX checks
    reversed: tr?.reversed ?? "",
    love: tr?.love ?? "",
    career: tr?.career ?? "",
  };
}

export function localizedDeck(locale: Locale): LocalizedCard[] {
  return deck.map((c) => getLocalizedCard(c.slug, locale)!);
}

export function localizedMajor(locale: Locale): LocalizedCard[] {
  return localizedDeck(locale).filter((c) => c.arcana === "major").sort((a, b) => a.number - b.number);
}

export function localizedMinorBySuit(locale: Locale, suit: Suit): LocalizedCard[] {
  return localizedDeck(locale).filter((c) => c.suit === suit).sort((a, b) => a.number - b.number);
}
