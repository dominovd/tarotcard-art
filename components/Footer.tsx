import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default function Footer() {
  const locale = useLocale() as Locale;
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-gold/20 px-6 md:px-10 py-10 text-center text-mist text-xs mt-16">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-5">
        <Link href={lp(locale, "/")} className="hover:text-gold-light transition-colors">{t("cardOfTheDay")}</Link>
        <Link href={lp(locale, "/cards")} className="hover:text-gold-light transition-colors">{t("allCards")}</Link>
        <Link href={lp(locale, "/about")} className="hover:text-gold-light transition-colors">{t("about")}</Link>
        <Link href={lp(locale, "/contacts")} className="hover:text-gold-light transition-colors">{t("contacts")}</Link>
      </div>
      <div className="tracking-[0.05em]">© {new Date().getFullYear()} tarotcard.art — {t("tagline")} ✦</div>
      <div className="mt-3 text-mist/60 text-[11px]">{t("publicDomain")}</div>
    </footer>
  );
}
