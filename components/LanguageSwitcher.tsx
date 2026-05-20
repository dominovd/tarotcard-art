"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, localeNames, localeFlags, defaultLocale, type Locale } from "@/lib/i18n/config";

function stripLocale(pathname: string, current: Locale): string {
  if (current === defaultLocale) return pathname;
  const prefix = `/${current}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length);
  return pathname;
}

function buildHref(locale: Locale, basePath: string): string {
  if (locale === defaultLocale) return basePath === "" ? "/" : basePath;
  const clean = basePath === "/" ? "" : basePath;
  return `/${locale}${clean}`;
}

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() ?? "/";
  const basePath = stripLocale(pathname, current);
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
              href={buildHref(loc, basePath)}
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
