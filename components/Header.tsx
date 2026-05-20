import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

function localizedPath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const lp = (p: string) => localizedPath(locale, p);

  return (
    <header className="border-b border-gold/20 px-4 sm:px-6 md:px-10 py-5 flex items-center justify-between relative z-10 gap-3">
      <Link href={lp("/")} className="font-serif text-2xl text-gold tracking-wider shrink-0">
        tarotcard<span className="text-parchment font-normal">.art</span>
      </Link>
      <nav className="hidden sm:block">
        <ul className="flex gap-4 md:gap-7 items-center">
          <li><Link href={`${lp("/")}#generator`} className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">{t("generator")}</Link></li>
          <li><Link href={lp("/cards")} className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">{t("cards")}</Link></li>
          <li><Link href={lp("/about")} className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">{t("about")}</Link></li>
          <li><Link href={lp("/contacts")} className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">{t("contacts")}</Link></li>
        </ul>
      </nav>
      <LanguageSwitcher current={locale} />
    </header>
  );
}
