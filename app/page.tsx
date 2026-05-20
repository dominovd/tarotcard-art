import Link from "next/link";
import Image from "next/image";
import CardGenerator from "@/components/CardGenerator";
import FAQ from "@/components/FAQ";
import { majorArcana, allSuits, suitLabel, suitElement, minorBySuit } from "@/lib/deck";

export default function HomePage() {
  const major = majorArcana();

  return (
    <>
      {/* HERO + GENERATOR */}
      <section className="container-narrow pt-16 md:pt-24 pb-12 text-center">
        <div className="kicker mb-5">✦ Free tarot card generator ✦</div>
        <h1 className="font-serif text-5xl md:text-6xl text-parchment leading-tight mb-6">
          Draw your <em className="text-gold font-normal">card of the day</em>
          <br />and reveal the message
        </h1>
        <p className="text-mist max-w-xl mx-auto mb-14 text-lg leading-relaxed">
          One card. One moment of stillness. An instant interpretation drawn from the full 78-card Rider-Waite-Smith deck — to guide your day, your decision, your next step.
        </p>
        <CardGenerator />
      </section>

      {/* HOW IT WORKS */}
      <section className="container-narrow py-20">
        <div className="text-center mb-12">
          <div className="kicker mb-3">The ritual</div>
          <h2 className="section-title">How it works</h2>
          <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">
            Three breaths. Three steps. A timeless practice made accessible online — no account, no payment, just you and the cards.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { n: "I", t: "Focus your mind", d: "Take a slow breath. Hold a question in your thoughts — about love, work, a choice, or simply the day ahead." },
            { n: "II", t: "Draw the card", d: "Click the card to shuffle the full 78-card deck and reveal the one that speaks to you in this moment." },
            { n: "III", t: "Read the message", d: "Receive an instant interpretation — name, meaning, love and career notes, and a piece of guidance for your day." },
          ].map((s) => (
            <div key={s.n} className="text-center px-2">
              <div className="font-serif text-6xl text-gold opacity-60 mb-3">{s.n}</div>
              <h3 className="font-serif text-2xl text-parchment mb-3">{s.t}</h3>
              <p className="text-mist leading-relaxed text-sm">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAJOR ARCANA PREVIEW */}
      <section className="container-wide py-20">
        <div className="text-center mb-12">
          <div className="kicker mb-3">22 Major Arcana</div>
          <h2 className="section-title">The great archetypes</h2>
          <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">
            From The Fool to The World — the cards that map the soul's journey through life's most universal themes.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {major.slice(0, 12).map((c) => (
            <Link
              key={c.slug}
              href={`/cards/${c.slug}`}
              className="group block rounded-lg overflow-hidden border border-gold/20 hover:border-gold transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[244/419]">
                <Image src={c.image} alt={c.name} fill sizes="160px" className="object-cover" />
              </div>
              <div className="px-2 py-3 text-center">
                <div className="font-serif text-sm text-parchment group-hover:text-gold-light transition-colors leading-tight">{c.name}</div>
                <div className="text-mist text-[10px] tracking-[0.15em] mt-1">— {c.number} —</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/cards" className="text-gold-light hover:text-gold underline underline-offset-4 decoration-gold/40 text-sm tracking-wider">
            Browse all 78 cards →
          </Link>
        </div>
      </section>

      {/* MINOR ARCANA — SUITS */}
      <section className="container-narrow py-20">
        <div className="text-center mb-14">
          <div className="kicker mb-3">56 Minor Arcana</div>
          <h2 className="section-title">Four suits, four elements</h2>
          <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">
            The Minor Arcana speaks to the everyday — relationships, decisions, work, and the texture of daily life.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {allSuits.map((suit) => {
            const cards = minorBySuit(suit);
            const sample = cards[0];
            return (
              <Link
                key={suit}
                href={`/cards?suit=${suit}`}
                className="flex gap-5 p-5 rounded-xl border border-gold/20 hover:border-gold transition-all group bg-ink-card/40"
              >
                <div className="relative w-20 shrink-0 aspect-[244/419] rounded overflow-hidden border border-gold/30">
                  <Image src={sample.image} alt={sample.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-parchment group-hover:text-gold-light transition-colors mb-1">
                    {suitLabel[suit]}
                  </h3>
                  <p className="text-mist text-xs leading-relaxed">{suitElement[suit]}</p>
                  <p className="text-gold/60 text-xs mt-3 tracking-wider">14 cards →</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section className="container-narrow py-20 text-center">
        <div className="kicker mb-3">tarotcard.art</div>
        <h2 className="section-title mb-10">A modern doorway to an ancient practice</h2>
        <p className="font-serif text-2xl italic text-parchment max-w-2xl mx-auto mb-8">
          "The cards do not predict the future. They reveal what you already know."
        </p>
        <div className="max-w-2xl mx-auto text-mist leading-loose space-y-4">
          <p>Our tarot card generator uses the complete 78-card Rider-Waite-Smith deck — the most studied and trusted tarot tradition in the world. Each draw is randomized using the browser's cryptographically-secure random number generator, so no two readings repeat the same way.</p>
          <p>Whether you are a curious newcomer drawing your first card or an experienced reader looking for a quick daily pull, tarotcard.art is built to be beautiful, free, and ad-light — a quiet space for reflection.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-narrow py-20">
        <div className="text-center mb-12">
          <div className="kicker mb-3">Questions</div>
          <h2 className="section-title">Frequently asked</h2>
        </div>
        <FAQ />
      </section>
    </>
  );
}
