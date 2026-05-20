import { deck, type TarotCard, type Suit } from "./deck";
import { cardTranslations } from "./i18n/cards";
import { cardExtras } from "./i18n/cards/extra";
import type { Locale } from "./i18n/config";

export type LocalizedCard = TarotCard;

export function getLocalizedCard(slug: string, locale: Locale): LocalizedCard | undefined {
  const base = deck.find((c) => c.slug === slug);
  if (!base) return undefined;
  if (locale === "en") return base;

  const tr = cardTranslations[locale]?.[slug];
  const extra = cardExtras[locale]?.[slug];

  return {
    ...base,
    name: tr?.name || base.name,
    keywords: tr?.keywords?.length ? tr.keywords : base.keywords,
    upright: tr?.upright || base.upright,
    advice: tr?.advice || base.advice,
    // Extras come from the second translation pass. Empty string when
    // the locale doesn't have them yet — UI hides empty blocks so the
    // page never mixes languages.
    reversed: extra?.reversed ?? tr?.reversed ?? "",
    love: extra?.love ?? tr?.love ?? "",
    career: extra?.career ?? tr?.career ?? "",
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
