import type { MetadataRoute } from "next";
import { deck } from "@/lib/deck";
import { locales, hreflangCode, localizedUrl, defaultLocale, SITE_URL, type Locale } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const buildEntry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number,
    publishedLocales: readonly Locale[] = locales,
  ) => {
    const alternates: Record<string, string> = {};
    for (const loc of publishedLocales) {
      alternates[hreflangCode[loc]] = localizedUrl(loc, path);
    }
    alternates["x-default"] = localizedUrl(defaultLocale, path);
    return publishedLocales.map((loc) => ({
      url: localizedUrl(loc, path),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: alternates },
    }));
  };

  const staticPaths: { path: string; cf: MetadataRoute.Sitemap[number]["changeFrequency"]; pri: number }[] = [
    { path: "/", cf: "daily", pri: 1.0 },
    { path: "/cards", cf: "monthly", pri: 0.9 },
    { path: "/about", cf: "yearly", pri: 0.5 },
    { path: "/contacts", cf: "yearly", pri: 0.4 },
  ];
  const englishOnlyPaths: { path: string; cf: MetadataRoute.Sitemap[number]["changeFrequency"]; pri: number }[] = [
    { path: "/yes-or-no-tarot-card-generator", cf: "monthly", pri: 0.9 },
    { path: "/three-card-tarot-spread-generator", cf: "monthly", pri: 0.9 },
    { path: "/love-tarot-card-generator", cf: "monthly", pri: 0.9 },
    { path: "/birth-tarot-card-generator", cf: "monthly", pri: 0.85 },
    { path: "/tarot-card-meanings", cf: "monthly", pri: 0.9 },
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, cf, pri } of staticPaths) {
    entries.push(...buildEntry(path, cf, pri));
  }
  for (const { path, cf, pri } of englishOnlyPaths) {
    entries.push(...buildEntry(path, cf, pri, [defaultLocale]));
  }
  for (const c of deck) {
    entries.push(...buildEntry(`/cards/${c.slug}`, "monthly", 0.7, [defaultLocale]));
  }
  return entries;
}
