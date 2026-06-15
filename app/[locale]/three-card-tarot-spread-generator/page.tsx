import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import ThreeCardGenerator from "@/components/ThreeCardGenerator";
import { localizedDeck } from "@/lib/deck-localized";
import type { Locale } from "@/lib/i18n/config";
import { indexableAlternateLanguages, indexableCanonical, robotsForIndexableContent } from "@/lib/seo-indexing";
import { LandingBreadcrumbs, LandingFAQ, OtherTools, RelatedSearches } from "@/components/seo/LandingShell";

const PATH = "/three-card-tarot-spread-generator";
const YEAR = new Date().getFullYear();

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    title: `3-Card Tarot Spread Generator — Past, Present, Future (${YEAR})`,
    description: "Free 3-card tarot spread generator. Draw three Rider-Waite cards for Past, Present and Future — full upright & reversed meanings included, no signup.",
    alternates: { canonical: indexableCanonical(locale, PATH), languages: indexableAlternateLanguages(PATH) },
    robots: robotsForIndexableContent(locale),
  };
}

const FAQ_ITEMS = [
  {
    q: "What is a 3-card tarot spread?",
    a: "A 3-card spread is one of the most common tarot layouts. Three cards are drawn in sequence and read by position — most commonly Past · Present · Future, but also Situation · Action · Outcome, or Mind · Body · Spirit.",
  },
  {
    q: "How do you read a 3-card tarot spread?",
    a: "Read each card in the context of its position. Card 1 (Past) is what brought you here, card 2 (Present) is the current dynamic, card 3 (Future) is where the situation is heading if nothing changes. Then read the three together as one story.",
  },
  {
    q: "Can I do a 3-card spread for love or career?",
    a: "Yes — the layout is question-agnostic. Hold the love or career question in mind before you draw. For love specifically, the love meaning of each card is shown on the card detail page.",
  },
  {
    q: "Are the 3 cards always different?",
    a: "Yes. The generator draws three unique cards without replacement, just like a physical shuffle. About 30% of cards appear reversed.",
  },
  {
    q: "What does a reversed card in a 3-card spread mean?",
    a: "A reversed card carries a blocked, internal or 'not yet' version of the upright meaning. In a 3-card spread it often signals an obstacle in that position — past trauma, present resistance, or a future shift that requires inner work.",
  },
];

const RELATED = [
  "3 card tarot generator",
  "3 card tarot spread generator",
  "three card tarot reading",
  "past present future tarot",
  "3 card tarot reading free",
  "tarot 3 cards online",
  "random 3 card tarot spread",
  "tarot card spread generator",
];

export default async function ThreeCardPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const deck = localizedDeck(locale);

  return (
    <div className="container-narrow py-12 md:py-16">
      <LandingBreadcrumbs here="3-Card Tarot Spread" />

      <header className="text-center mb-10">
        <div className="kicker mb-3">Three-card spread</div>
        <h1 className="font-serif text-4xl md:text-5xl text-parchment leading-tight mb-5">
          3-Card Tarot Spread Generator
        </h1>
        <p className="text-gold-light text-base leading-relaxed italic max-w-2xl mx-auto border-l-2 border-gold/40 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          A three-card spread reads as a narrative arc: Past tells you what shaped the situation,
          Present names where you stand, Future shows where this is heading on the current path.
        </p>
      </header>

      <ThreeCardGenerator deck={deck} />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-parchment text-center mb-6">Other 3-card layouts</h2>
        <p className="text-mist mb-6 leading-relaxed">
          Past · Present · Future is the most common framing, but the same three cards can be read
          through different position meanings depending on your question:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gold/20 bg-ink-card/30">
            <div className="kicker mb-2">Situation</div>
            <div className="font-serif text-parchment mb-2">Action · Outcome</div>
            <p className="text-mist text-xs leading-relaxed">For decisions — what's happening, what to do, what follows.</p>
          </div>
          <div className="p-4 rounded-xl border border-gold/20 bg-ink-card/30">
            <div className="kicker mb-2">Mind</div>
            <div className="font-serif text-parchment mb-2">Body · Spirit</div>
            <p className="text-mist text-xs leading-relaxed">For self-reflection — alignment across the three levels.</p>
          </div>
          <div className="p-4 rounded-xl border border-gold/20 bg-ink-card/30">
            <div className="kicker mb-2">You</div>
            <div className="font-serif text-parchment mb-2">Them · Dynamic</div>
            <p className="text-mist text-xs leading-relaxed">For relationships — your energy, theirs, and what's between you.</p>
          </div>
        </div>
      </section>

      <LandingFAQ items={FAQ_ITEMS} />
      <OtherTools excludeHref={PATH} />
      <RelatedSearches items={RELATED} />
    </div>
  );
}
