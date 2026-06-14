// English-only home-page sections. Heavy content kept on home for SEO depth
// (anchors and inline meaning), but CTAs now route to dedicated landing pages
// so each intent has both inline coverage AND a focused page that can rank
// for its own keyword cluster.

import Link from "next/link";

// ============ 1. Choose your tarot reading ============

const READING_FORMATS = [
  {
    id: "one-card",
    title: "One Card of the Day",
    sub: "Quick daily guidance",
    body: "Pull a single card for a focused answer to today's question. Best for daily check-ins.",
    href: "#generator",
  },
  {
    id: "three-card",
    title: "Three-Card Spread",
    sub: "Past · Present · Future",
    body: "Three positions tell the arc of your situation — what brought you here, where you stand, where you're heading.",
    href: "/three-card-tarot-spread-generator",
  },
  {
    id: "love",
    title: "Love Tarot",
    sub: "Romance & relationships",
    body: "Pull a card with the love and partnership meaning surfaced first.",
    href: "/love-tarot-card-generator",
  },
  {
    id: "yes-or-no",
    title: "Yes or No Tarot",
    sub: "Single-card binary answer",
    body: "For yes/no questions: draw one card and read its orientation. Upright leans yes, reversed leans no.",
    href: "/yes-or-no-tarot-card-generator",
  },
];

export function ChooseReading() {
  return (
    <section id="choose-reading" className="container-narrow py-16">
      <div className="text-center mb-10">
        <div className="kicker mb-3">Pick a format</div>
        <h2 className="section-title">Choose your tarot reading</h2>
        <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">
          One card, three cards, or a yes-or-no answer — pick the format that fits your question.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {READING_FORMATS.map((f) => (
          <Link
            key={f.id}
            href={f.href}
            className="p-5 rounded-xl border border-gold/20 hover:border-gold transition-all bg-ink-card/40 group"
          >
            <h3 className="font-serif text-xl text-parchment group-hover:text-gold-light transition-colors mb-1">
              {f.title}
            </h3>
            <p className="text-gold/60 text-xs tracking-wider mb-3">{f.sub}</p>
            <p className="text-mist text-sm leading-relaxed">{f.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ============ 2. Yes or No Tarot ============

export function YesOrNoBlock() {
  return (
    <section id="yes-or-no" className="container-narrow py-16">
      <div className="text-center mb-8">
        <div className="kicker mb-3">Binary answer</div>
        <h2 className="section-title">Yes or No Tarot Card Generator</h2>
      </div>
      <div className="max-w-2xl mx-auto text-mist leading-relaxed space-y-4 mb-8">
        <p>
          Yes-or-no tarot is the simplest way to use the deck. Hold a binary question, draw a single
          card, and read its orientation: upright cards lean <strong className="text-gold-light font-medium">yes</strong>,
          reversed cards lean <strong className="text-gold-light font-medium">no</strong>, and ambiguous
          cards say <strong className="text-gold-light font-medium">maybe — clarify the question.</strong>
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
        <div className="p-4 rounded-lg border border-green-700/30 bg-green-900/10 text-center">
          <div className="text-green-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Upright +</div>
          <div className="text-parchment text-sm">Positive card</div>
          <div className="font-serif text-gold-light text-xl mt-2">Yes</div>
        </div>
        <div className="p-4 rounded-lg border border-amber-700/30 bg-amber-900/10 text-center">
          <div className="text-amber-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Reversed</div>
          <div className="text-parchment text-sm">Positive card</div>
          <div className="font-serif text-gold-light text-xl mt-2">Maybe</div>
        </div>
        <div className="p-4 rounded-lg border border-red-700/30 bg-red-900/10 text-center">
          <div className="text-red-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Upright</div>
          <div className="text-parchment text-sm">Challenging card</div>
          <div className="font-serif text-gold-light text-xl mt-2">No</div>
        </div>
        <div className="p-4 rounded-lg border border-purple-700/30 bg-purple-900/10 text-center">
          <div className="text-purple-300/80 text-[10px] tracking-[0.2em] uppercase mb-1">Reversed</div>
          <div className="text-parchment text-sm">Challenging card</div>
          <div className="font-serif text-gold-light text-xl mt-2">No, with effort</div>
        </div>
      </div>
      <div className="text-center">
        <Link href="/yes-or-no-tarot-card-generator" className="gold-btn">Open Yes-or-No Tool →</Link>
      </div>
    </section>
  );
}

// ============ 3. Three-Card Spread ============

export function ThreeCardBlock() {
  return (
    <section id="three-card" className="container-narrow py-16">
      <div className="text-center mb-8">
        <div className="kicker mb-3">Three-card spread</div>
        <h2 className="section-title">3-Card Tarot Reading</h2>
      </div>
      <div className="max-w-2xl mx-auto text-mist leading-relaxed mb-10 text-center">
        <p>
          A three-card spread tells a story through positions. Draw three cards in sequence and read
          them as a narrative arc:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
        <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/40 text-center">
          <div className="font-serif text-4xl text-gold/70 mb-2">I</div>
          <div className="kicker mb-2">Past</div>
          <p className="text-mist text-sm leading-relaxed">What shaped this situation — the energy you're carrying in.</p>
        </div>
        <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/40 text-center">
          <div className="font-serif text-4xl text-gold/70 mb-2">II</div>
          <div className="kicker mb-2">Present</div>
          <p className="text-mist text-sm leading-relaxed">Where you stand now — the central theme of this moment.</p>
        </div>
        <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/40 text-center">
          <div className="font-serif text-4xl text-gold/70 mb-2">III</div>
          <div className="kicker mb-2">Future</div>
          <p className="text-mist text-sm leading-relaxed">Where this is heading if you stay the course.</p>
        </div>
      </div>
      <div className="text-center">
        <Link href="/three-card-tarot-spread-generator" className="gold-btn">Open 3-Card Tool →</Link>
      </div>
    </section>
  );
}

// ============ 4. Love Tarot ============

export function LoveBlock() {
  return (
    <section id="love-tarot" className="container-narrow py-16">
      <div className="text-center mb-8">
        <div className="kicker mb-3">Relationships &amp; romance</div>
        <h2 className="section-title">Love Tarot Card Generator</h2>
      </div>
      <div className="max-w-2xl mx-auto text-mist leading-relaxed space-y-4 mb-10 text-center">
        <p>
          Pulling a card for love is one of the oldest uses of tarot. Each card on tarotcard.art comes
          with a dedicated love interpretation — covering both single and partnered contexts, plus the
          reversed reading when it appears.
        </p>
        <p className="font-serif text-parchment text-lg italic">
          Try asking: "What do I need to know about this relationship?" or "What's the next chapter
          for my love life?"
        </p>
      </div>
      <div className="text-center">
        <Link href="/love-tarot-card-generator" className="gold-btn">Open Love Tool →</Link>
      </div>
    </section>
  );
}

// ============ 5. Tarot Card Meanings (with meanings) ============

const MEANING_FIELDS = [
  { label: "Card name & arcana", body: "Position in the deck (Major Arcana 0–21 or one of the four Minor suits)." },
  { label: "Upright meaning", body: "Traditional Rider-Waite-Smith interpretation when the card is drawn upright." },
  { label: "Reversed meaning", body: "What changes when the card appears flipped — the blocked or internal version." },
  { label: "Love interpretation", body: "How the card reads in relationship and romance contexts, single or partnered." },
  { label: "Career interpretation", body: "What it suggests for work, projects, and professional direction." },
  { label: "Daily guidance", body: "A short, actionable advice line you can take into the day." },
];

export function MeaningsBlock() {
  return (
    <section id="with-meanings" className="container-narrow py-16">
      <div className="text-center mb-10">
        <div className="kicker mb-3">What you get after every draw</div>
        <h2 className="section-title">Random Tarot Card Generator with Meanings</h2>
        <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">
          Every card you draw on tarotcard.art comes with a full interpretation — not just an image
          and a name. Here's what's included:
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
        {MEANING_FIELDS.map((f) => (
          <div key={f.label} className="p-5 rounded-xl border border-gold/20 bg-ink-card/30">
            <div className="kicker mb-2">✦ {f.label}</div>
            <p className="text-mist text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/tarot-card-meanings" className="gold-btn">Browse All Meanings →</Link>
      </div>
    </section>
  );
}

// ============ 6. Upright and Reversed ============

export function ReversedBlock() {
  return (
    <section id="reversed" className="container-narrow py-16">
      <div className="text-center mb-8">
        <div className="kicker mb-3">Reversals enabled</div>
        <h2 className="section-title">Upright and Reversed Tarot Cards</h2>
      </div>
      <div className="max-w-2xl mx-auto text-mist leading-relaxed space-y-4 mb-10 text-center">
        <p>
          tarotcard.art shuffles with reversals enabled by default. Around{" "}
          <strong className="text-gold-light font-medium">30% of draws appear reversed</strong> —
          the same rhythm as a hand-shuffled physical reading.
        </p>
        <p>
          A reversed card carries a related but inverted meaning — often the blocked, internal, or
          "not yet" version of the upright theme. Every card page on this site includes both
          interpretations.
        </p>
      </div>
      <div className="text-center">
        <Link href="#generator" className="gold-btn">Draw with reversals</Link>
      </div>
    </section>
  );
}

// ============ 7. Ask a Tarot Question ============

const EXAMPLE_QUESTIONS = [
  "What should I focus on today?",
  "What do I need to know about this relationship?",
  "What is blocking me right now?",
  "What is the next best step?",
  "What energy am I bringing into this situation?",
  "How can I support myself this week?",
];

export function QuestionBlock() {
  return (
    <section id="ask-a-question" className="container-narrow py-16">
      <div className="text-center mb-10">
        <div className="kicker mb-3">Question prompts</div>
        <h2 className="section-title">Ask a Tarot Question</h2>
        <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">
          Tarot works best when you bring it a clear question. If you're not sure what to ask, pick
          one of these and hold it in mind as you draw.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10">
        {EXAMPLE_QUESTIONS.map((q) => (
          <div key={q} className="p-4 rounded-lg border border-gold/20 bg-ink-card/30 text-center">
            <p className="font-serif text-lg text-parchment italic leading-snug">"{q}"</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="#generator" className="gold-btn">Hold the question, draw</Link>
      </div>
    </section>
  );
}

// ============ 8. Explore More Tarot Tools (internal links) ============

const MORE_TOOLS = [
  { name: "Yes or No Tarot", href: "/yes-or-no-tarot-card-generator" },
  { name: "Three-Card Spread", href: "/three-card-tarot-spread-generator" },
  { name: "Love Tarot", href: "/love-tarot-card-generator" },
  { name: "Birth Tarot Card", href: "/birth-tarot-card-generator" },
  { name: "Tarot Card Meanings", href: "/tarot-card-meanings" },
  { name: "All 78 Cards", href: "/cards" },
  { name: "Card of the Day", href: "#generator" },
  { name: "Ask a Question", href: "#ask-a-question" },
];

export function ExploreMoreTools() {
  return (
    <section className="container-narrow py-16">
      <div className="text-center mb-8">
        <div className="kicker mb-3">More tools</div>
        <h2 className="section-title">Explore more tarot tools</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {MORE_TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="px-4 py-3 rounded-lg border border-gold/20 hover:border-gold transition-colors text-center text-parchment hover:text-gold-light text-sm tracking-wide bg-ink-card/30"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
