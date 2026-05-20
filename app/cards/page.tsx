import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allSuits, majorArcana, minorBySuit, suitElement, suitLabel } from "@/lib/deck";

export const metadata: Metadata = {
  title: "All 78 Tarot Cards — Meanings & Interpretations",
  description: "Browse all 78 cards of the Rider-Waite-Smith tarot deck: 22 Major Arcana and 56 Minor Arcana across Wands, Cups, Swords, and Pentacles. Each card with full meanings.",
  alternates: { canonical: "https://tarotcard.art/cards" },
};

export default function CardsIndexPage() {
  const major = majorArcana();

  return (
    <div className="container-wide py-12 md:py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="kicker mb-3">The full deck</div>
        <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6">All 78 tarot cards</h1>
        <p className="text-mist max-w-2xl mx-auto text-lg leading-relaxed">
          Browse every card in the Rider-Waite-Smith deck. Click any card for its full meaning, reversed interpretation, and notes on love, career, and daily guidance.
        </p>
      </div>

      {/* Major Arcana */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <div className="kicker mb-3">22 cards</div>
          <h2 className="section-title">Major Arcana</h2>
          <p className="text-mist max-w-xl mx-auto mt-4 leading-relaxed">
            The great archetypes — the soul's journey from The Fool (0) to The World (XXI).
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {major.map((c) => (
            <CardTile key={c.slug} card={c} />
          ))}
        </div>
      </section>

      {/* Minor Arcana by suit */}
      {allSuits.map((suit) => {
        const cards = minorBySuit(suit);
        return (
          <section key={suit} className="mb-20">
            <div className="text-center mb-10">
              <div className="kicker mb-3">14 cards</div>
              <h2 className="section-title">{suitLabel[suit]}</h2>
              <p className="text-mist max-w-xl mx-auto mt-4 leading-relaxed">{suitElement[suit]}</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4">
              {cards.map((c) => (
                <CardTile key={c.slug} card={c} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CardTile({ card }: { card: { slug: string; name: string; image: string; number: number; arcana: string } }) {
  return (
    <Link
      href={`/cards/${card.slug}`}
      className="group block rounded-lg overflow-hidden border border-gold/20 hover:border-gold transition-all hover:-translate-y-1"
    >
      <div className="relative aspect-[244/419]">
        <Image src={card.image} alt={card.name} fill sizes="(max-width: 768px) 33vw, 160px" className="object-cover" />
      </div>
      <div className="px-2 py-2 text-center">
        <div className="font-serif text-xs md:text-sm text-parchment group-hover:text-gold-light transition-colors leading-tight">
          {card.name}
        </div>
      </div>
    </Link>
  );
}
