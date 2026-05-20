import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales, defaultLocale } from "./config";

// next-intl's Link/useRouter handle locale prefixing AND update the
// NEXT_LOCALE cookie on click, which prevents the middleware from
// auto-redirecting back to the previously detected locale.
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
  });
