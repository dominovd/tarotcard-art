import type { Metadata } from "next";
import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import CardGenerator from "@/components/CardGenerator";
import { localizedDeck } from "@/lib/deck-localized";
import { alternateLanguages, localizedUrl, type Locale } from "@/lib/i18n/config";
import { LandingBreadcrumbs, LandingFAQ, OtherTools, RelatedSearches } from "@/components/seo/LandingShell";

const PATH = "/love-tarot-card-generator";
const YEAR = new Date().getFullYear();

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  return {
    title: `Love Tarot Card Generator — Free Relationship Reading (${YEAR})`,
    description: "Free love tarot card generator. Draw a card and see its love and relationship meaning — for single, partnered, or 'what does this person feel' questions. Full upright + reversed.",
    alternates: { canonical: localizedUrl(locale, PATH), languages: alternateLanguages(PATH) },
  };
}

const FAQ_ITEMS = [
  {
    q: "How do I do a love tarot reading?",
    a: "Hold a clear love question in mind — about a current relationship, a person you're interested in, or your love life in general — then draw a card. The love-specific meaning is shown alongside the standard upright/reversed interpretation.",
  },
  {
    q: "What's the best love tarot question to ask?",
    a: "Open-ended questions work better than yes/no for love. Try: 'What do I need to know about this relationship?', 'What energy am I bringing into love right now?', or 'What's the next chapter for me and [name]?'",
  },
  {
    q: "Which tarot card means strong love?",
    a: "The Lovers, The Empress, the 2 of Cups, the 10 of Cups, the Ace of Cups, and the Knight of Cups all carry strong love-positive meanings. The Sun and The Star also signal warm, healing connection.",
  },
  {
    q: "What tarot card means he/she is thinking of me?",
    a: "There's no single 'they're thinking of me' card, but the Page of Cups, Knight of Cups, 2 of Cups, and The Lovers often appear when someone is holding you in mind. The reversed version of these can mean mixed feelings.",
  },
  {
    q: "Can a love tarot reading predict marriage?",
    a: "Tarot doesn't predict fixed outcomes — it reflects current energy and likely direction. Cards like the 10 of Cups, 4 of Wands, The Hierophant, and The World often signal commitment, but they're a snapshot of the now, not a guarantee.",
  },
];

const RELATED = [
  "love tarot",
  "love tarot reading",
  "random tarot card generator for love",
  "free love tarot",
  "love tarot card meanings",
  "love tarot yes or no",
  "tarot card generator for love",
  "single card love tarot",
];

export default async function LovePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const deck = localizedDeck(locale);

  return (
    <div className="container-narrow py-12 md:py-16">
      <LandingBreadcrumbs here="Love Tarot" />

      <header className="text-center mb-10">
        <div className="kicker mb-3">Romance &amp; relationships</div>
        <h1 className="font-serif text-4xl md:text-5xl text-parchment leading-tight mb-5">
          Love Tarot Card Generator
        </h1>
        <p className="text-gold-light text-base leading-relaxed italic max-w-2xl mx-auto border-l-2 border-gold/40 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
          Pull a card with the love and relationship meaning surfaced first. Works for single life,
          current partnerships, situationships, and "what does this person feel" questions.
        </p>
      </header>

      <CardGenerator deck={deck} />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl text-parchment text-center mb-6">How to ask the cards about love</h2>
        <p className="text-mist mb-5 leading-relaxed">
          The clearer the question, the clearer the answer. Avoid framing love readings as
          interrogations of the other person — focus on what you can act on:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "What do I need to know about this relationship right now?",
            "What energy am I bringing into my love life this season?",
            "What's blocking deeper intimacy between us?",
            "What does my heart actually want here?",
            "What's the next chapter for me in love?",
            "How can I support myself emotionally this week?",
          ].map((q) => (
            <div key={q} className="p-3 rounded-lg border border-gold/20 bg-ink-card/30">
              <p className="font-serif text-parchment italic text-sm">"{q}"</p>
            </div>
          ))}
        </div>
        <p className="text-mist mt-6 leading-relaxed text-sm">
          For broader context — past dynamics, current state, where things are heading — use the{" "}
          <Link href="/three-card-tarot-spread-generator" className="text-gold-light underline underline-offset-2 hover:text-gold">3-card spread</Link>.
          For a quick binary check, try the{" "}
          <Link href="/yes-or-no-tarot-card-generator" className="text-gold-light underline underline-offset-2 hover:text-gold">yes-or-no tool</Link>.
        </p>
      </section>

      <LandingFAQ items={FAQ_ITEMS} />
      <OtherTools excludeHref={PATH} />
      <RelatedSearches items={RELATED} />
    </div>
  );
}
