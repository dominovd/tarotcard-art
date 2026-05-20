const items = [
  {
    q: "Is this tarot card generator really random?",
    a: "Yes. We use the browser's cryptographically-secure random number generator (Web Crypto API) to shuffle the full 78-card Rider-Waite-Smith deck on every draw. Each card has an equal chance of being pulled — and roughly 30% appear reversed, just as in a hand-shuffled physical reading.",
  },
  {
    q: "How often should I draw a card?",
    a: "Most readers recommend one card-of-the-day pull in the morning. Drawing the same question repeatedly within a short time tends to muddy the message — let one card settle before drawing again.",
  },
  {
    q: "What is the difference between Major and Minor Arcana?",
    a: "The Major Arcana (22 cards) represent life's big themes — love, fate, transformation. The Minor Arcana (56 cards across Wands, Cups, Swords, and Pentacles) speak to everyday situations and feelings. Our generator pulls from all 78 cards, so any card may appear.",
  },
  {
    q: "Why does my card appear upside-down sometimes?",
    a: "That is a reversed card — a traditional part of tarot reading. A reversed card carries a related but inverted meaning, often pointing to a blocked, internal, or unresolved version of the upright theme. Each card on tarotcard.art comes with both upright and reversed interpretations.",
  },
  {
    q: "Do I need to know anything about tarot to use this?",
    a: "No prior knowledge needed. Every card you draw comes with its name, keywords, traditional meaning, love and career interpretation, and a short piece of guidance — no symbolism decoding required.",
  },
  {
    q: "Is tarotcard.art free?",
    a: "Yes — fully free, no account needed, no paywall. The full 78-card deck and every interpretation is open to read.",
  },
];

export default function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        {items.map((item) => (
          <details key={item.q} className="border-b border-gold/20 py-6 group">
            <summary className="font-serif text-xl md:text-2xl text-parchment cursor-pointer list-none flex justify-between items-center gap-4">
              {item.q}
              <span className="text-gold text-2xl transition-transform group-open:rotate-45 shrink-0">+</span>
            </summary>
            <p className="text-mist mt-4 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
