"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import type { TarotCard } from "@/lib/deck";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

function secureRandom(max: number): number {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function localizedPath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default function CardGenerator({ deck }: { deck: TarotCard[] }) {
  const t = useTranslations("home");
  const tc = useTranslations("card");
  const locale = useLocale() as Locale;
  const [card, setCard] = useState<TarotCard | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    const reveal = () => {
      const picked = deck[secureRandom(deck.length)];
      const isReversed = secureRandom(100) < 30;
      setCard(picked);
      setReversed(isReversed);
      requestAnimationFrame(() => {
        setFlipped(true);
        setTimeout(() => setAnimating(false), 800);
      });
    };
    if (flipped) {
      setFlipped(false);
      setTimeout(reveal, 600);
    } else {
      reveal();
    }
  }, [animating, flipped, deck]);

  return (
    <div id="generator" className="flex flex-col items-center gap-10">
      <div className="card-stage w-[280px] h-[480px]">
        <div
          className={`relative w-full h-full card-3d cursor-pointer ${flipped ? "flipped" : ""}`}
          onClick={draw}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && draw()}
          aria-label={card ? card.name : t("drawButton")}
        >
          <div className="card-face absolute inset-0 rounded-2xl border-2 border-gold overflow-hidden shadow-2xl shadow-purple-mystic/30 flex items-center justify-center bg-gradient-to-br from-purple-mystic via-ink-card to-ink-mid">
            <div className="w-[70%] h-[70%] border border-gold rounded-full flex items-center justify-center relative">
              <div className="absolute inset-[8%] border border-gold-dim rounded-full" />
              <div className="absolute inset-[22%] border border-gold-dim rounded-full" />
              <div className="font-serif text-6xl text-gold relative z-10">✦</div>
            </div>
          </div>
          {card && (
            <div className="card-face card-face-back absolute inset-0 rounded-2xl border-2 border-gold overflow-hidden shadow-2xl shadow-gold/20 bg-gradient-to-b from-ink-card to-ink-mid">
              <div className={`relative w-full h-full ${reversed ? "rotate-180" : ""}`}>
                <Image src={card.image} alt={card.name} fill sizes="280px" className="object-cover" priority />
              </div>
            </div>
          )}
        </div>
      </div>

      <button type="button" onClick={draw} disabled={animating} className="gold-btn">
        {card ? t("drawAgain") : t("drawButton")}
      </button>

      {card && flipped && (
        <div className="max-w-2xl text-center animate-fade-in space-y-4">
          <div className="kicker">
            {card.arcana === "major" ? t("majorArcanaLabel") : `${card.suit}`}
            {reversed && ` · ${t("reversed")}`}
          </div>
          <h3 className="font-serif text-4xl text-gold">{card.name}</h3>
          <p className="text-parchment leading-relaxed">{card.upright}</p>
          <p className="text-mist italic">✦ {card.advice}</p>
          <Link
            href={localizedPath(locale, `/cards/${card.slug}`)}
            className="inline-block text-gold-light hover:text-gold underline underline-offset-4 decoration-gold/40 text-sm tracking-wider"
          >
            {t("readFullMeaning")}
          </Link>
        </div>
      )}
    </div>
  );
}
