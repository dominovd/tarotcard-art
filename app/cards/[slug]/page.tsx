import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deck, getCard, majorArcana, minorBySuit, suitLabel } from "@/lib/deck";

const SITE_URL = "https://tarotcard.art";

export async function generateStaticParams() {
  return deck.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const card = getCard(params.slug);
  if (!card) return {};
  const title = `${card.name} — Meaning, Love, Career & Advice`;
  const desc = `${card.name} tarot card meaning. ${card.upright.slice(0, 140)}…`;
  return {
    title,
    description: desc,
    alternates: { canonical: `${SITE_URL}/cards/${card.slug}` },
    openGraph: {
      title: `${card.name} — tarotcard.art`,
      description: desc,
      images: [{ url: card.image, width: 244, height: 419, alt: card.name }],
    },
  };
}

export default function CardPage({ params }: { params: { slug: string } }) {
  const card = getCard(params.slug);
  if (!card) notFound();

  // Related cards: same arcana/suit, plus prev/next in number
  let related = card.arcana === "major"
    ? majorArcana().filter((c) => c.slug !== card.slug)
    : minorBySuit(card.suit!).filter((c) => c.slug !== card.slug);
  related = related.slice(0, 6);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cards", item: `${SITE_URL}/cards` },
      { "@type": "ListItem", position: 3, name: card.name, item: `${SITE_URL}/cards/${card.slug}` },
    ],
  };

  const cardJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${card.name} — Tarot Card Meaning`,
    description: card.upright,
    image: `${SITE_URL}${card.image}`,
    author: { "@type": "Organization", name: "tarotcard.art" },
    publisher: { "@type": "Organization", name: "tarotcard.art" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cardJsonLd) }}
      />

      <article className="container-narrow py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav className="text-mist text-xs mb-8 flex gap-2 items-center tracking-wider">
          <Link href="/" className="hover:text-gold-light">Home</Link>
          <span>›</span>
          <Link href="/cards" className="hover:text-gold-light">Cards</Link>
          <span>›</span>
          <span className="text-parchment">{card.name}</span>
        </nav>

        {/* Hero */}
        <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-14 mb-16">
          <div className="mx-auto md:mx-0">
            <div className="relative w-[260px] sm:w-[300px] aspect-[244/419] rounded-2xl overflow-hidden border-2 border-gold shadow-2xl shadow-gold/10">
              <Image src={card.image} alt={card.name} fill sizes="300px" className="object-cover" priority />
            </div>
          </div>
          <div>
            <div className="kicker mb-3">
              {card.arcana === "major" ? `Major Arcana · ${card.number}` : `${suitLabel[card.suit!]} · Minor Arcana`}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6 leading-tight">{card.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {card.keywords.map((k) => (
                <span key={k} className="px-3 py-1 rounded-full text-xs tracking-wider border border-gold/30 text-gold-light bg-ink-card/50">
                  {k}
                </span>
              ))}
            </div>
            <p className="text-parchment text-lg leading-relaxed">{card.upright}</p>
          </div>
        </div>

        {/* Meanings grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Block title="Upright meaning" body={card.upright} />
          <Block title="Reversed meaning" body={card.reversed} />
          <Block title="Love" body={card.love} />
          <Block title="Career" body={card.career} />
        </div>

        {/* Advice */}
        <div className="text-center py-10 px-6 border border-gold/30 rounded-2xl bg-ink-card/40 mb-16">
          <div className="kicker mb-4">Today's guidance</div>
          <p className="font-serif text-2xl md:text-3xl text-gold italic leading-snug max-w-2xl mx-auto">
            ✦ {card.advice}
          </p>
        </div>

        {/* CTA back to generator */}
        <div className="text-center mb-20">
          <Link href="/#generator" className="gold-btn">
            Draw a card
          </Link>
        </div>

        {/* Related cards */}
        <div>
          <h2 className="font-serif text-3xl text-parchment text-center mb-2">
            More from {card.arcana === "major" ? "the Major Arcana" : `the ${suitLabel[card.suit!]}`}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/cards/${c.slug}`}
                className="group block rounded-lg overflow-hidden border border-gold/20 hover:border-gold transition-all"
              >
                <div className="relative aspect-[244/419]">
                  <Image src={c.image} alt={c.name} fill sizes="120px" className="object-cover" />
                </div>
                <div className="px-2 py-2 text-center">
                  <div className="font-serif text-xs text-parchment group-hover:text-gold-light leading-tight">{c.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 rounded-xl border border-gold/20 bg-ink-card/30">
      <div className="kicker mb-3">{title}</div>
      <p className="text-parchment leading-relaxed">{body}</p>
    </div>
  );
}
