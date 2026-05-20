import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // English at "/", others at "/{locale}/"
  localeDetection: true,
});

export const config = {
  // Match all routes except internal Next.js paths, static files, OG images, sitemap, robots, icons
  matcher: [
    "/((?!_next|api|favicon|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|xml|txt|json)|opengraph-image|icon|apple-icon|sitemap|robots).*)",
  ],
};
