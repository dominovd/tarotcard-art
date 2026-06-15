import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import { localizedMajor, localizedMinorBySuit } from "@/lib/deck-localized";
import { allSuits, suitLabel } from "@/lib/deck";
import { SITE_URL, type Locale } from "@/lib/i18n/config";
import { indexableAlternateLanguages, indexableCanonical, robotsForIndexableContent } from "@/lib/seo-indexing";
import { LandingBreadcrumbs, LandingFAQ, OtherTools, RelatedSearches } from "@/components/seo/LandingShell";

const PATH = "/tarot-card-meanings";
const YEAR = new Date().getFullYear();

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    metadataBase: new URL(SITE_URL),
    title: `Tarot Card Meanings — All 78 Rider-Waite Cards Explained (${YEAR})`,
    description: "Complete tarot card meanings list. All 78 Rider-Waite-Smith cards — 22 Major Arcana plus Wands, Cups, Swords and Pentacles — with upright meaning, keywords and direct links to full interpretations.",
    alternates: { canonical: indexableCanonical(locale, PATH), languages: indexableAlternateLanguages(PATH) },
    robots: robotsForIndexableContent(locale),
  };
}

const FAQ_ITEMS = [
  {
    q: "How many tarot card meanings are there?",
    a: "There are 78 cards in a standard tarot deck — 22 Major Arcana and 56 Minor Arcana. Each has an upright meaning and a reversed meaning, so 156 distinct interpretations in total, plus their love and career nuances.",
  },
  {
    q: "What are the most important tarot cards to learn first?",
    a: "Start with the 22 Major Arcana — they cover the universal life themes (love, change, transformation, choice). Then move to the four Aces and the court cards (Page, Knight, Queen, King), and finally fill in the numbered Minor Arcana.",
  },
  {
    q: "What's the difference between upright and reversed tarot card meanings?",
    a: "An upright card carries its straightforward meaning. A reversed card carries a related but inverted version — often the blocked, internal, or 'not yet' form of the same theme. About 30% of cards appear reversed in a hand-shuffled reading.",
  },
  {
    q: "What does each tarot suit mean?",
    a: "Wands = fire (passion, creation, action). Cups = water (emotion, love, intuition). Swords = air (thought, conflict, truth). Pentacles = earth (body, money, work). Each suit runs Ace through 10 plus four court cards.",
  },
];

const RELATED = [
  "tarot card meanings",
  "all 78 tarot cards",
  "rider waite tarot meanings",
  "tarot card meanings list",
  "tarot meanings upright and reversed",
  "tarot card interpretation",
  "tarot meanings major arcana",
  "tarot meanings minor arcana",
];

export default async function MeaningsHubPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const major = localizedMajor(locale);

  return (
    <div className="container-wide py-12 md:py-16">
      <LandingBreadcrumbs here="Tarot Card Meanings" />

      <header className="text-center mb-12">
        <div className="kicker mb-3">All 78 cards</div>
        <h1 className="font-serif text-4xl md:text-5xl text-parchment leading-tight mb-5">
          Tarot Card Meanings
        </h1>
        <p className="text-gold-light text-base leading-relaxed italic max-w-2xl mx-auto border-l-2 border-gold/40 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          The complete Rider-Waite-Smith deck: 22 Major Arcana and 56 Minor Arcana. Each card with
          keywords, upright meaning, and a direct link to the full interpretation including love,
          career and reversed readings.
        </p>
      </header>

      {/* Major Arcana */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <div className="kicker mb-2">22 cards</div>
          <h2 className="font-serif text-3xl text-parchment">Major Arcana — life's big themes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {major.map((c) => (
            <Link
              key={c.slug}
              href={`/cards/${c.slug}`}
              className="flex gap-4 p-4 rounded-xl border border-gold/20 hover:border-gold transition-all bg-ink-card/30 group"
            >
              <div className="relative w-14 shrink-0 aspect-[244/419] rounded overflow-hidden border border-gold/30">
                <Image src={c.image} alt={c.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <div className="font-serif text-lg text-parchment group-hover:text-gold-light transition-colors truncate">{c.name}</div>
                  <div className="text-mist text-[10px] tracking-[0.15em] shrink-0">— {c.number} —</div>
                </div>
                <p className="text-mist text-xs leading-relaxed line-clamp-2">{c.upright}</p>
                <div className="text-gold/60 text-[10px] mt-1 tracking-wider truncate">{c.keywords.slice(0, 3).join(" · ")}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Minor Arcana — by suit */}
      {allSuits.map((suit) => {
        const cards = localizedMinorBySuit(locale, suit);
        return (
          <section key={suit} className="mb-16">
            <div className="text-center mb-8">
              <div className="kicker mb-2">14 cards</div>
              <h2 className="font-serif text-3xl text-parchment">{suitLabel[suit]}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
              {cards.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cards/${c.slug}`}
                  className="flex gap-4 p-4 rounded-xl border border-gold/20 hover:border-gold transition-all bg-ink-card/30 group"
                >
                  <div className="relative w-14 shrink-0 aspect-[244/419] rounded overflow-hidden border border-gold/30">
                    <Image src={c.image} alt={c.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-lg text-parchment group-hover:text-gold-light transition-colors mb-1 truncate">{c.name}</div>
                    <p className="text-mist text-xs leading-relaxed line-clamp-2">{c.upright}</p>
                    <div className="text-gold/60 text-[10px] mt-1 tracking-wider truncate">{c.keywords.slice(0, 3).join(" · ")}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="container-narrow">
        <LandingFAQ items={FAQ_ITEMS} />
        <OtherTools excludeHref={PATH} />
        <RelatedSearches items={RELATED} />
      </div>
    </div>
  );
}
