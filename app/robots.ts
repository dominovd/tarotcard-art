import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://tarotcard.art/sitemap.xml",
    host: "https://tarotcard.art",
  };
}
