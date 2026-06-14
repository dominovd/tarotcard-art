"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { TarotCard } from "@/lib/deck";

// Numerology: sum digits of DD + MM + YYYY, reduce until ≤ 22.
// Result maps to Major Arcana number 0–21 (22 → The Fool / 0).
function calculateBirthCardNumber(day: number, month: number, year: number): number {
  const digits = `${day}${month}${year}`.split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 22) {
    sum = String(sum).split("").map(Number).reduce((a, b) => a + b, 0);
  }
  // 22 traditionally maps to The Fool (0)
  return sum === 22 ? 0 : sum;
}

export default function BirthCardCalculator({ majorArcana }: { majorArcana: TarotCard[] }) {
  const today = new Date();
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [result, setResult] = useState<TarotCard | null>(null);
  const [error, setError] = useState<string>("");

  const compute = () => {
    setError("");
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (!d || !m || !y) return setError("Please enter day, month, and year.");
    if (d < 1 || d > 31) return setError("Day must be between 1 and 31.");
    if (m < 1 || m > 12) return setError("Month must be between 1 and 12.");
    if (y < 1900 || y > today.getFullYear()) return setError(`Year must be between 1900 and ${today.getFullYear()}.`);
    const num = calculateBirthCardNumber(d, m, y);
    const card = majorArcana.find((c) => c.number === num);
    if (card) setResult(card);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full max-w-md p-6 rounded-2xl border border-gold/30 bg-ink-card/40">
        <div className="kicker mb-4 text-center">Your birthday</div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-mist text-xs mb-1 block tracking-wider">Day</label>
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
              className="w-full px-3 py-2 rounded-md bg-ink-deep border border-gold/30 text-parchment focus:border-gold outline-none text-center text-lg"
            />
          </div>
          <div>
            <label className="text-mist text-xs mb-1 block tracking-wider">Month</label>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              className="w-full px-3 py-2 rounded-md bg-ink-deep border border-gold/30 text-parchment focus:border-gold outline-none text-center text-lg"
            />
          </div>
          <div>
            <label className="text-mist text-xs mb-1 block tracking-wider">Year</label>
            <input
              type="number"
              min="1900"
              max={today.getFullYear()}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
              className="w-full px-3 py-2 rounded-md bg-ink-deep border border-gold/30 text-parchment focus:border-gold outline-none text-center text-lg"
            />
          </div>
        </div>
        <button onClick={compute} className="gold-btn w-full">Reveal my birth card</button>
        {error && <p className="text-red-300 text-sm mt-3 text-center">{error}</p>}
      </div>

      {result && (
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="grid sm:grid-cols-[240px_1fr] gap-6 items-start">
            <div className="mx-auto sm:mx-0 relative w-[200px] sm:w-[240px] aspect-[244/419] rounded-2xl overflow-hidden border-2 border-gold shadow-2xl shadow-gold/10">
              <Image src={result.image} alt={result.name} fill sizes="240px" className="object-cover" />
            </div>
            <div>
              <div className="kicker mb-2">Your birth card · Major Arcana {result.number}</div>
              <h2 className="font-serif text-4xl text-gold mb-3">{result.name}</h2>
              <p className="text-parchment leading-relaxed mb-4">{result.upright}</p>
              <p className="text-mist text-sm italic mb-4">✦ {result.advice}</p>
              <Link
                href={`/cards/${result.slug}`}
                className="inline-block text-gold-light hover:text-gold underline underline-offset-4 decoration-gold/40 text-sm tracking-wider"
              >
                Read full meaning →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
