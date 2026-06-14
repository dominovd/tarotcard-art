import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { localizedMajor, localizedMinorBySuit } from "@/lib/deck-localized";
import { allSuits } from "@/lib/deck";
import { alternateLanguages, localizedUrl, defaultLocale, type Locale } from "@/lib/i18n/config";
import { cardsHubTitleEn, cardsHubDescriptionEn } from "@/lib/seo-en";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.cards" });
  const title = locale === "en" ? cardsHubTitleEn() : t("title");
  const description = locale === "en" ? cardsHubDescriptionEn() : t("description");
  return {
    title,
    description,
    alternates: { canonical: localizedUrl(locale, "/cards"), languages: alternateLanguages("/cards") },
  };
}

function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default async function CardsIndexPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cardsIndex" });
  const tSuit = await getTranslations({ locale, namespace: "suit" });
  const tSuitEl = await getTranslations({ locale, namespace: "suitElement" });
  const major = localizedMajor(locale);

  return (
    <div className="container-wide py-12 md:py-16">
      <div className="text-center mb-16">
        <div className="kicker mb-3">{t("kicker")}</div>
        <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6">{t("title")}</h1>
        <p className="text-mist max-w-2xl mx-auto text-lg leading-relaxed">{t("intro")}</p>
      </div>

      <section className="mb-20">
        <div className="text-center mb-10">
          <div className="kicker mb-3">{t("majorKicker")}</div>
          <h2 className="section-title">{t("majorTitle")}</h2>
          <p className="text-mist max-w-xl mx-auto mt-4 leading-relaxed">{t("majorIntro")}</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {major.map((c) => <CardTile key={c.slug} card={c} locale={locale} />)}
        </div>
      </section>

      {allSuits.map((suit) => {
        const cards = localizedMinorBySuit(locale, suit);
        return (
          <section key={suit} className="mb-20">
            <div className="text-center mb-10">
              <div className="kicker mb-3">{t("suitKicker")}</div>
              <h2 className="section-title">{tSuit(suit)}</h2>
              <p className="text-mist max-w-xl mx-auto mt-4 leading-relaxed">{tSuitEl(suit)}</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4">
              {cards.map((c) => <CardTile key={c.slug} card={c} locale={locale} />)}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CardTile({ card, locale }: { card: { slug: string; name: string; image: string }; locale: Locale }) {
  return (
    <Link href={lp(locale, `/cards/${card.slug}`)} className="group block rounded-lg overflow-hidden border border-gold/20 hover:border-gold transition-all hover:-translate-y-1">
      <div className="relative aspect-[244/419]">
        <Image src={card.image} alt={card.name} fill sizes="(max-width: 768px) 33vw, 160px" className="object-cover" />
      </div>
      <div className="px-2 py-2 text-center">
        <div className="font-serif text-xs md:text-sm text-parchment group-hover:text-gold-light transition-colors leading-tight">{card.name}</div>
      </div>
    </Link>
  );
}
