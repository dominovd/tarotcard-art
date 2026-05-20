import type { MetadataRoute } from "next";
import { deck } from "@/lib/deck";

const SITE_URL = "https://tarotcard.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/cards`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const cardRoutes: MetadataRoute.Sitemap = deck.map((c) => ({
    url: `${SITE_URL}/cards/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...cardRoutes];
}
