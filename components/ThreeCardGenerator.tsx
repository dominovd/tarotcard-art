"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TarotCard } from "@/lib/deck";

function secureRandom(max: number): number {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

interface Slot { card: TarotCard | null; reversed: boolean; flipped: boolean }
const EMPTY: Slot = { card: null, reversed: false, flipped: false };

const POSITIONS = [
  { label: "Past", body: "What shaped this — the energy you carry in." },
  { label: "Present", body: "Where you stand now — the central theme." },
  { label: "Future", body: "Where this is heading on the current course." },
];

export default function ThreeCardGenerator({ deck }: { deck: TarotCard[] }) {
  const [slots, setSlots] = useState<Slot[]>([EMPTY, EMPTY, EMPTY]);
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    // reset
    setSlots([EMPTY, EMPTY, EMPTY]);

    // Draw three unique cards
    const picks: number[] = [];
    while (picks.length < 3) {
      const i = secureRandom(deck.length);
      if (!picks.includes(i)) picks.push(i);
    }
    const drawn: Slot[] = picks.map((idx) => ({
      card: deck[idx],
      reversed: secureRandom(100) < 30,
      flipped: false,
    }));

    // Reveal sequentially
    drawn.forEach((slot, i) => {
      setTimeout(() => {
        setSlots((prev) => {
          const next = [...prev];
          next[i] = { ...slot, flipped: true };
          return next;
        });
        if (i === drawn.length - 1) setTimeout(() => setAnimating(false), 800);
      }, 400 * (i + 1));
    });
  }, [animating, deck]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-3xl">
        {POSITIONS.map((pos, i) => {
          const slot = slots[i];
          return (
            <div key={pos.label} className="flex flex-col items-center">
              <div className="kicker mb-3">{pos.label}</div>
              <div className="card-stage w-full aspect-[244/419]">
                <div className={`relative w-full h-full card-3d ${slot.flipped ? "flipped" : ""}`}>
                  {/* Back */}
                  <div className="card-face absolute inset-0 rounded-2xl border-2 border-gold overflow-hidden shadow-2xl shadow-purple-mystic/30 flex items-center justify-center bg-gradient-to-br from-purple-mystic via-ink-card to-ink-mid">
                    <div className="w-[70%] h-[70%] border border-gold rounded-full flex items-center justify-center relative">
                      <div className="absolute inset-[8%] border border-gold-dim rounded-full" />
                      <div className="absolute inset-[22%] border border-gold-dim rounded-full" />
                      <div className="font-serif text-4xl text-gold relative z-10">✦</div>
                    </div>
                  </div>
                  {/* Front */}
                  {slot.card && (
                    <div className="card-face card-face-back absolute inset-0 rounded-2xl border-2 border-gold overflow-hidden shadow-2xl shadow-gold/20 bg-gradient-to-b from-ink-card to-ink-mid">
                      <div className={`relative w-full h-full ${slot.reversed ? "rotate-180" : ""}`}>
                        <Image src={slot.card.image} alt={slot.card.name} fill sizes="200px" className="object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-mist text-[11px] text-center mt-2 leading-relaxed">{pos.body}</p>
            </div>
          );
        })}
      </div>

      <button type="button" onClick={draw} disabled={animating} className="gold-btn">
        {slots[0].card ? "Draw new spread" : "Draw your 3 cards"}
      </button>

      {slots.every((s) => s.flipped) && (
        <div className="w-full max-w-3xl space-y-5 animate-fade-in">
          {slots.map((slot, i) => slot.card && (
            <div key={i} className="p-5 rounded-xl border border-gold/30 bg-ink-card/40">
              <div className="kicker mb-2">{POSITIONS[i].label}{slot.reversed && " · Reversed"}</div>
              <h3 className="font-serif text-2xl text-gold mb-2">{slot.card.name}</h3>
              <p className="text-parchment text-sm leading-relaxed mb-3">
                {slot.reversed && slot.card.reversed ? slot.card.reversed : slot.card.upright}
              </p>
              <Link
                href={`/cards/${slot.card.slug}`}
                className="text-gold-light hover:text-gold text-xs underline underline-offset-2"
              >
                Full meaning →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
