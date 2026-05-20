"use client";

import { useState } from "react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({ current }: { current: Locale }) {
  // next-intl's usePathname returns the path WITHOUT the locale prefix,
  // with the dynamic segments already resolved (e.g. "/cards/the-fool").
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors px-2 py-1 border border-gold/20 rounded-md hover:border-gold/50"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
      >
        <span className="text-base leading-none">{localeFlags[current]}</span>
        <span className="hidden sm:inline">{current.toUpperCase()}</span>
        <span className="text-[10px] opacity-70">▾</span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 max-h-[60vh] overflow-y-auto rounded-lg border border-gold/30 bg-ink-mid/95 backdrop-blur shadow-2xl shadow-black/50 z-50"
          role="listbox"
          onMouseLeave={() => setOpen(false)}
        >
          {locales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              hrefLang={loc}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                loc === current ? "text-gold bg-gold/10" : "text-parchment hover:bg-gold/5 hover:text-gold-light"
              }`}
              onClick={() => setOpen(false)}
            >
              <span className="text-base leading-none">{localeFlags[loc]}</span>
              <span className="flex-1 tracking-wide">{localeNames[loc]}</span>
              <span className="text-[10px] opacity-60 uppercase">{loc}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
