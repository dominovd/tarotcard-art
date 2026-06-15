import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import CardGenerator from "@/components/CardGenerator";
import { localizedDeck } from "@/lib/deck-localized";
import type { Locale } from "@/lib/i18n/config";
import { indexableAlternateLanguages, indexableCanonical, robotsForIndexableContent } from "@/lib/seo-indexing";
import { LandingBreadcrumbs, LandingFAQ, OtherTools, RelatedSearches } from "@/components/seo/LandingShell";

const PATH = "/yes-or-no-tarot-card-generator";
const YEAR = new Date().getFullYear();

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    title: `Yes or No Tarot Card Generator — Free Online Reading (${YEAR})`,
    description: "Free yes-or-no tarot card generator. Draw a single card and get a binary answer based on upright/reversed orientation. No signup. Full meaning included.",
    alternates: { canonical: indexableCanonical(locale, PATH), languages: indexableAlternateLanguages(PATH) },
    robots: robotsForIndexableContent(locale),
  };
}

const FAQ_ITEMS = [
  {
    q: "How does a yes-or-no tarot reading work?",
    a: "You hold a binary question in mind, then draw one card. Upright cards lean yes, reversed cards lean no, and ambiguous cards (like The Moon or 2 of Swords) say maybe — clarify the question and try again.",
  },
  {
    q: "Can I trust a one-card yes-or-no reading?",
    a: "For simple questions, yes — single-card draws are a traditional tarot technique. For high-stakes life decisions, draw a 3-card spread instead to see context and timing.",
  },
  {
    q: "What if I keep getting a 'maybe' answer?",
    a: "That usually means the question itself isn't clear-cut. Reframe it: instead of 'will it happen?' try 'what energy is around this?' or break it into smaller binary questions.",
  },
  {
    q: "Is the yes-or-no tarot generator random?",
    a: "Yes — every draw uses the browser's cryptographically-secure random number generator. Each of the 78 Rider-Waite-Smith cards has equal probability, with ~30% appearing reversed.",
  },
  {
    q: "Should I ask the same yes-or-no question twice?",
    a: "No. Repeating the same question within a short window muddies the message. Let the first answer settle, act on it, and draw again only if the situation changes.",
  },
];

const RELATED = [
  "yes or no tarot",
  "random tarot card generator yes or no",
  "free yes or no tarot",
  "1 card yes no tarot",
  "tarot card yes or no online",
  "single card tarot yes or no",
  "yes no tarot reading free",
  "love tarot yes or no",
];

export default async function YesOrNoPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const deck = localizedDeck(locale);

  return (
    <div className="container-narrow py-12 md:py-16">
      <LandingBreadcrumbs here="Yes or No Tarot" />

      <header className="text-center mb-10">
        <div className="kicker mb-3">Binary answer</div>
        <h1 className="font-serif text-4xl md:text-5xl text-parchment leading-tight mb-5">
          Yes or No Tarot Card Generator
        </h1>
        <p className="text-gold-light text-base leading-relaxed italic max-w-2xl mx-auto border-l-2 border-gold/40 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          A yes-or-no tarot reading uses a single card to answer a binary question. Hold the question
          in mind, draw, and read the card by its orientation — upright leans yes, reversed leans no.
        </p>
      </header>

      <CardGenerator deck={deck} />

      <section className="mt-16">
        <h2 className="font-serif text-3xl text-parchment text-center mb-8">How to read your answer</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          <div className="p-4 rounded-lg border border-green-700/30 bg-green-900/10 text-center">
            <div className="text-green-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Upright +</div>
            <div className="text-parchment text-sm">Positive card</div>
            <div className="font-serif text-gold-light text-xl mt-2">Yes</div>
            <p className="text-mist text-xs mt-2 leading-relaxed">Sun · Star · World · Lovers · Ace of Cups</p>
          </div>
          <div className="p-4 rounded-lg border border-amber-700/30 bg-amber-900/10 text-center">
            <div className="text-amber-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Reversed</div>
            <div className="text-parchment text-sm">Positive card</div>
            <div className="font-serif text-gold-light text-xl mt-2">Maybe</div>
            <p className="text-mist text-xs mt-2 leading-relaxed">Yes, but blocked — clarify the question</p>
          </div>
          <div className="p-4 rounded-lg border border-red-700/30 bg-red-900/10 text-center">
            <div className="text-red-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Upright</div>
            <div className="text-parchment text-sm">Challenging card</div>
            <div className="font-serif text-gold-light text-xl mt-2">No</div>
            <p className="text-mist text-xs mt-2 leading-relaxed">Tower · Devil · Death · 3 / 10 of Swords</p>
          </div>
          <div className="p-4 rounded-lg border border-purple-700/30 bg-purple-900/10 text-center">
            <div className="text-purple-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Reversed</div>
            <div className="text-parchment text-sm">Challenging card</div>
            <div className="font-serif text-gold-light text-xl mt-2">No, with effort</div>
            <p className="text-mist text-xs mt-2 leading-relaxed">Outcome is possible but requires work</p>
          </div>
        </div>
        <p className="text-mist text-sm text-center max-w-2xl mx-auto leading-relaxed">
          Some cards (The Moon, 2 of Swords, 7 of Cups, The Hanged Man) are inherently ambiguous —
          treat them as "the answer isn't clear yet" and try a different framing.
        </p>
      </section>

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-parchment text-center mb-6">When to use yes-or-no tarot</h2>
        <ul className="text-mist space-y-3 leading-relaxed">
          <li>✦ Daily binary decisions: "Should I send this message today?"</li>
          <li>✦ Confirming a gut feeling: "Is this opportunity worth pursuing?"</li>
          <li>✦ Checking the timing: "Is now the right moment?"</li>
          <li>✦ Quick guidance when you don't have time for a full spread</li>
        </ul>
        <p className="text-mist mt-6 leading-relaxed text-sm">
          For complex questions about love, career, or long-term direction, a <Link href="/three-card-tarot-spread-generator" className="text-gold-light underline underline-offset-2 hover:text-gold">3-card spread</Link>{" "}
          gives you more context — past, present, and likely outcome.
        </p>
      </section>

      <LandingFAQ items={FAQ_ITEMS} />
      <OtherTools excludeHref={PATH} />
      <RelatedSearches items={RELATED} />
    </div>
  );
}
