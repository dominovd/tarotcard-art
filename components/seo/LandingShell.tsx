// Shared shell for landing pages: breadcrumbs, related-searches block,
// internal-link footer with cross-links to sibling tools.

import Link from "next/link";

const SIBLINGS = [
  { name: "Yes or No Tarot", href: "/yes-or-no-tarot-card-generator" },
  { name: "3-Card Spread", href: "/three-card-tarot-spread-generator" },
  { name: "Love Tarot", href: "/love-tarot-card-generator" },
  { name: "Birth Tarot Card", href: "/birth-tarot-card-generator" },
  { name: "Tarot Card Meanings", href: "/tarot-card-meanings" },
];

export function LandingBreadcrumbs({ here }: { here: string }) {
  return (
    <nav className="text-mist text-xs mb-8 flex gap-2 items-center tracking-wider">
      <Link href="/" className="hover:text-gold-light">Home</Link>
      <span>›</span>
      <span className="text-parchment">{here}</span>
    </nav>
  );
}

export function RelatedSearches({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="border-t border-gold/20 pt-10 mt-16">
      <div className="kicker mb-4 text-center">Related searches</div>
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        {items.map((kw) => (
          <span
            key={kw}
            className="text-mist text-xs px-3 py-1.5 rounded-full border border-gold/15 bg-ink-card/30"
          >
            {kw}
          </span>
        ))}
      </div>
    </section>
  );
}

export function OtherTools({ excludeHref }: { excludeHref: string }) {
  const others = SIBLINGS.filter((s) => s.href !== excludeHref);
  return (
    <section className="mt-16">
      <div className="text-center mb-6">
        <div className="kicker mb-2">More tarot tools</div>
        <h2 className="font-serif text-3xl text-parchment">Other readings</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {others.map((tool) => (
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

export function LandingFAQ({ items }: { items: { q: string; a: string }[] }) {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="mt-16">
        <div className="text-center mb-8">
          <div className="kicker mb-2">Questions</div>
          <h2 className="font-serif text-3xl text-parchment">Frequently asked</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {items.map((item) => (
            <details key={item.q} className="border-b border-gold/20 py-5 group">
              <summary className="font-serif text-lg md:text-xl text-parchment cursor-pointer list-none flex justify-between items-center gap-4">
                {item.q}
                <span className="text-gold text-2xl transition-transform group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="text-mist mt-3 leading-relaxed text-sm md:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
