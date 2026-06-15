import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { alternateLanguages, localizedUrl, defaultLocale, SITE_URL, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: { canonical: localizedUrl(locale, "/about"), languages: alternateLanguages("/about") },
  };
}

function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default async function AboutPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tCard = await getTranslations({ locale, namespace: "card" });

  return (
    <div className="container-narrow py-16">
      <div className="text-center mb-12">
        <div className="kicker mb-3">{t("kicker")}</div>
        <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6">{t("title")}</h1>
      </div>

      <div className="prose prose-lg max-w-2xl mx-auto text-mist leading-loose space-y-6">
        <p className="font-serif text-2xl italic text-parchment text-center">{t("quote")}</p>
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>

        <h2 className="font-serif text-3xl text-parchment !mt-12 !mb-4">{t("whatYouFind")}</h2>
        <ul className="list-none space-y-2 pl-0">
          <li>{t("li1")}</li>
          <li>{t("li2")}</li>
          <li>{t("li3")}</li>
        </ul>

        <h2 className="font-serif text-3xl text-parchment !mt-12 !mb-4">{t("imageryTitle")}</h2>
        <p>{t("imagery")}</p>
      </div>

      <div className="text-center mt-16">
        <Link href={`${lp(locale, "/")}#generator`} className="gold-btn">{tCard("drawCard")}</Link>
      </div>
    </div>
  );
}
