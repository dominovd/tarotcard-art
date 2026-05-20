import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About tarotcard.art",
  description: "About tarotcard.art — a free, ad-light tarot card generator using the public-domain Rider-Waite-Smith deck.",
  alternates: { canonical: "https://tarotcard.art/about" },
};

export default function AboutPage() {
  return (
    <div className="container-narrow py-16">
      <div className="text-center mb-12">
        <div className="kicker mb-3">About</div>
        <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6">A quiet space for reflection</h1>
      </div>

      <div className="prose prose-lg max-w-2xl mx-auto text-mist leading-loose space-y-6">
        <p className="font-serif text-2xl italic text-parchment text-center">
          "The cards do not predict the future. They reveal what you already know."
        </p>

        <p>
          tarotcard.art is a free, ad-light tarot card generator built around the full 78-card{" "}
          <strong className="text-gold-light font-medium">Rider-Waite-Smith</strong> deck — the
          most studied and most trusted tarot tradition in the world, first published in 1909 and
          now in the public domain.
        </p>

        <p>
          Every draw uses your browser's cryptographically-secure random number generator (Web
          Crypto API), so the shuffle is genuinely unpredictable. Roughly thirty percent of cards
          appear reversed, mirroring the rhythm of a hand-shuffled physical reading.
        </p>

        <p>
          We do not collect personal data, ask for accounts, or run intrusive ads. The cards are
          here to be drawn, freely, by anyone — newcomer or experienced reader.
        </p>

        <h2 className="font-serif text-3xl text-parchment !mt-12 !mb-4">What you will find here</h2>
        <ul className="list-none space-y-2 pl-0">
          <li>✦ A card-of-the-day generator on the <Link href="/" className="text-gold-light hover:text-gold underline underline-offset-2">home page</Link></li>
          <li>✦ Full meanings, reversed interpretations, and love and career notes for{" "}
            <Link href="/cards" className="text-gold-light hover:text-gold underline underline-offset-2">every card in the deck</Link></li>
          <li>✦ Both Major Arcana (22 archetypal cards) and Minor Arcana (56 cards across four suits)</li>
        </ul>

        <h2 className="font-serif text-3xl text-parchment !mt-12 !mb-4">A note on the imagery</h2>
        <p>
          The Rider-Waite-Smith deck was illustrated by Pamela Colman Smith and conceived by
          A. E. Waite in 1909. Both creators have been deceased for over seventy years, and the
          deck has entered the worldwide public domain. The card imagery on this site is reproduced
          freely under that status.
        </p>
      </div>

      <div className="text-center mt-16">
        <Link href="/#generator" className="gold-btn">Draw a card</Link>
      </div>
    </div>
  );
}
