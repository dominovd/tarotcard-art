// English-only SEO helpers: titles, descriptions, FAQ generation, related keywords.
// Applied only when locale === "en" so other locales keep their cleaner templates.

import type { TarotCard } from "./deck";
import { suitLabel } from "./deck";

const YEAR = new Date().getFullYear();

// ============ TITLE / META ============

export function cardTitleEn(card: TarotCard): string {
  // exact-match keyword + variant + freshness, FancyTexty-style.
  // Keep ≤ 60 chars for SERP. "The Fool — Meaning, Love, Career & Advice (2026)"
  return `${card.name} — Meaning, Love, Career & Advice (${YEAR})`;
}

export function cardDescriptionEn(card: TarotCard): string {
  // Programmatic description that pulls real content from the card so the
  // SERP snippet shows the actual meaning, not a generic template.
  const arc = card.arcana === "major"
    ? `Major Arcana ${card.number}`
    : `${suitLabel[card.suit!]} ${rankLabel(card.number)} (Minor Arcana)`;
  const upright = card.upright.replace(/\s+/g, " ").trim();
  const headlineKeywords = card.keywords.slice(0, 3).join(", ");
  // Target ~155 chars
  const desc = `${card.name} tarot card meaning (${arc}): ${headlineKeywords}. ${upright}`;
  return clamp(desc, 158);
}

export function homeDescriptionEn(): string {
  return "Free tarot card generator — draw your card of the day from the full 78-card Rider-Waite deck. Random tarot with reversals, upright & reversed meanings, love, career and yes-or-no readings. No signup, no paywall.";
}

export function cardsHubTitleEn(): string {
  return `All 78 Tarot Cards — Meanings, Reversals & Symbolism (${YEAR})`;
}

export function cardsHubDescriptionEn(): string {
  return "Complete list of all 78 tarot cards from the Rider-Waite-Smith deck. 22 Major Arcana plus 56 Minor Arcana (Wands, Cups, Swords, Pentacles) with upright, reversed, love and career meanings for each card.";
}

// ============ DIRECT ANSWER ============

export function directAnswerEn(card: TarotCard): string {
  // 1-sentence "featured snippet bait" right under H1.
  const arc = card.arcana === "major" ? `Major Arcana card ${card.number}` : `card in the suit of ${suitLabel[card.suit!]}`;
  const kw = card.keywords.slice(0, 3).join(", ");
  return `${card.name} is the ${arc} of the Rider-Waite-Smith tarot deck, representing ${kw}.`;
}

// ============ FAQ ============

export interface FaqPair { q: string; a: string }

export function cardFaqEn(card: TarotCard): FaqPair[] {
  const out: FaqPair[] = [
    {
      q: `What does the ${card.name} tarot card mean?`,
      a: card.upright,
    },
  ];
  if (card.love) {
    out.push({
      q: `What does ${card.name} mean in love?`,
      a: card.love,
    });
  }
  if (card.career) {
    out.push({
      q: `What does ${card.name} mean for career?`,
      a: card.career,
    });
  }
  if (card.reversed) {
    out.push({
      q: `What does ${card.name} reversed mean?`,
      a: card.reversed,
    });
  }
  return out;
}

// ============ RELATED KEYWORDS (semantic expansion) ============

export function cardRelatedKeywordsEn(card: TarotCard): string[] {
  // Built from real broad-match patterns ("X meaning", "X reversed", "X love",
  // "X upright meaning", "X yes or no") observed in keyword research data.
  const n = card.name.toLowerCase();
  const list = [
    `${n} meaning`,
    `${n} tarot card`,
    `${n} tarot meaning`,
    `${n} upright`,
    `${n} reversed`,
    card.love ? `${n} in love` : null,
    card.career ? `${n} career` : null,
    `${n} yes or no`,
    card.arcana === "major"
      ? `${card.number} ${n}`
      : `${suitLabel[card.suit!].toLowerCase()} ${rankLabel(card.number).toLowerCase()}`,
  ].filter(Boolean) as string[];
  return list;
}

// "Related searches" for the home page — top broad-match variants from real
// US keyword data (Sept 2026 snapshot). Drives semantic relevance for the
// primary "tarot card generator" cluster without spamming the H1 paragraph.
export const homeRelatedSearchesEn: string[] = [
  "random tarot card generator",
  "tarot card generator yes or no",
  "3 card tarot generator",
  "daily tarot card generator",
  "tarot card of the day generator",
  "tarot card generator with meanings",
  "free tarot card generator online",
  "tarot card generator with reversals",
  "tarot card reading generator",
  "tarot card interpretation generator",
  "random tarot card for love",
  "pick a tarot card",
];

// ============ NAVIGATION (prev / next in cluster) ============

export interface ClusterNav {
  prev?: { slug: string; name: string };
  next?: { slug: string; name: string };
  hubLabel: string;
  hubHref: string;
}

export function getClusterNav(
  card: TarotCard,
  siblings: TarotCard[],
  hubBase: string
): ClusterNav {
  const idx = siblings.findIndex((c) => c.slug === card.slug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;
  const hubLabel = card.arcana === "major" ? "Major Arcana" : `${suitLabel[card.suit!]} suit`;
  return {
    prev: prev ? { slug: prev.slug, name: prev.name } : undefined,
    next: next ? { slug: next.slug, name: next.name } : undefined,
    hubLabel,
    hubHref: hubBase,
  };
}

// ============ HELPERS ============

function clamp(s: string, n: number): string {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).replace(/[\s,;:.]+\S*$/, "") + "…";
}

function rankLabel(n: number): string {
  const ranks = ["", "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"];
  return ranks[n] ?? String(n);
}
