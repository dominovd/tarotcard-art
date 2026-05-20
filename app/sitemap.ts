import type { MetadataRoute } from "next";
import { deck } from "@/lib/deck";
import { locales, hreflangCode, localizedUrl, defaultLocale, SITE_URL } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // For each route, generate one sitemap entry per locale with alternate hreflang links
  const buildEntry = (path: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) => {
    const alternates: Record<string, string> = {};
    for (const loc of locales) {
      alternates[hreflangCode[loc]] = localizedUrl(loc, path);
    }
    alternates["x-default"] = localizedUrl(defaultLocale, path);
    return locales.map((loc) => ({
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

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, cf, pri } of staticPaths) {
    entries.push(...buildEntry(path, cf, pri));
  }
  for (const c of deck) {
    entries.push(...buildEntry(`/cards/${c.slug}`, "monthly", 0.7));
  }
  return entries;
}
