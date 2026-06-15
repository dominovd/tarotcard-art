import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import BirthCardCalculator from "@/components/BirthCardCalculator";
import { localizedMajor } from "@/lib/deck-localized";
import type { Locale } from "@/lib/i18n/config";
import { indexableAlternateLanguages, indexableCanonical, robotsForIndexableContent } from "@/lib/seo-indexing";
import { LandingBreadcrumbs, LandingFAQ, OtherTools, RelatedSearches } from "@/components/seo/LandingShell";

const PATH = "/birth-tarot-card-generator";
const YEAR = new Date().getFullYear();

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    title: `Birth Tarot Card Generator — Find Your Numerology Card (${YEAR})`,
    description: "Free birth tarot card calculator. Enter your birthday and discover your personal Major Arcana card based on tarot numerology. Full meaning, life lesson and advice included.",
    alternates: { canonical: indexableCanonical(locale, PATH), languages: indexableAlternateLanguages(PATH) },
    robots: robotsForIndexableContent(locale),
  };
}

const FAQ_ITEMS = [
  {
    q: "What is a birth tarot card?",
    a: "Your birth tarot card is the Major Arcana card associated with your date of birth through tarot numerology. It's considered a soul card — the archetype that runs through your lifetime and reflects your core life lesson.",
  },
  {
    q: "How is my birth tarot card calculated?",
    a: "We sum all the digits of your day, month and year of birth, then reduce the result by summing its digits again until it's 22 or less. That number maps directly to a Major Arcana card (0–21). Example: 14/06/1985 → 1+4+0+6+1+9+8+5 = 34 → 3+4 = 7 → The Chariot.",
  },
  {
    q: "What's the difference between a birth card and a life-path number?",
    a: "Both use similar numerology, but the birth card maps to one of the 22 Major Arcana cards and is interpreted through tarot symbolism. A life-path number maps to a single digit (1–9, or 11/22/33) used in numerology readings.",
  },
  {
    q: "Can I have more than one birth card?",
    a: "Some tarot traditions calculate a 'personality card' and a 'soul card' as a pair. The simpler version (used here) gives one Major Arcana card per birthday. If you want the pair, the personality card is the un-reduced number (if it's ≤ 22) and the soul card is the fully reduced one.",
  },
  {
    q: "Does the birth tarot card change?",
    a: "No — your birth card is fixed for your lifetime, calculated from your birth date. What can shift each year is your 'year card', which uses your birth day + month + current year.",
  },
];

const RELATED = [
  "birth tarot card calculator",
  "tarot birth card",
  "personal tarot card from birthday",
  "tarot numerology birth card",
  "soul card tarot",
  "life path tarot card",
  "birthday tarot card meaning",
  "what tarot card am I",
];

export default async function BirthCardPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const major = localizedMajor(locale);

  return (
    <div className="container-narrow py-12 md:py-16">
      <LandingBreadcrumbs here="Birth Tarot Card" />

      <header className="text-center mb-10">
        <div className="kicker mb-3">Tarot numerology</div>
        <h1 className="font-serif text-4xl md:text-5xl text-parchment leading-tight mb-5">
          Birth Tarot Card Generator
        </h1>
        <p className="text-gold-light text-base leading-relaxed italic max-w-2xl mx-auto border-l-2 border-gold/40 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          Your birth tarot card is the Major Arcana archetype that runs through your lifetime —
          calculated from the sum of your birth date reduced to a Major Arcana number (0–21).
        </p>
      </header>

      <BirthCardCalculator majorArcana={major} />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-parchment text-center mb-6">How birth card numerology works</h2>
        <ol className="text-mist space-y-3 leading-relaxed list-decimal pl-5">
          <li>Take your full birth date: day, month, year.</li>
          <li>Add every digit together (e.g. 14/06/1985 → 1+4+0+6+1+9+8+5 = 34).</li>
          <li>If the sum is greater than 22, add its digits again (34 → 3+4 = 7).</li>
          <li>The final number maps to a Major Arcana card (0 = The Fool through 21 = The World).</li>
          <li>The traditional value 22 wraps back to 0 — The Fool.</li>
        </ol>
        <p className="text-mist mt-6 leading-relaxed text-sm">
          Want to know what your card means in love, career, or as daily guidance? After it's revealed,
          tap "Full meaning" to open the dedicated card page.
        </p>
      </section>

      <LandingFAQ items={FAQ_ITEMS} />
      <OtherTools excludeHref={PATH} />
      <RelatedSearches items={RELATED} />
    </div>
  );
}
