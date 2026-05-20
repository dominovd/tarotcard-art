import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // English at "/", others at "/{locale}/"
  // Disabled: with auto-detection enabled, the NEXT_LOCALE cookie set on
  // first visit "sticks", and any later visit to "/" gets redirected back
  // to the previously chosen locale. That broke the language switcher
  // (clicking EN → middleware sees cookie=ru → 308 back to /ru). With this
  // off, "/" always serves the default locale (English) and other locales
  // must be requested explicitly via "/{locale}/...".
  localeDetection: false,
});

export const config = {
  matcher: [
    "/((?!_next|api|favicon|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|xml|txt|json)|opengraph-image|icon|apple-icon|sitemap|robots).*)",
  ],
};
