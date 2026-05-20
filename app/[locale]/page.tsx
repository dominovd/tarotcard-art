import Link from "next/link";
import Image from "next/image";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import CardGenerator from "@/components/CardGenerator";
import FAQ from "@/components/FAQ";
import { localizedDeck, localizedMajor, localizedMinorBySuit } from "@/lib/deck-localized";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { allSuits } from "@/lib/deck";

function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default async function HomePage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const tSuit = await getTranslations({ locale, namespace: "suit" });
  const tSuitEl = await getTranslations({ locale, namespace: "suitElement" });

  const deck = localizedDeck(locale);
  const major = localizedMajor(locale);

  return (
    <>
      <section className="container-narrow pt-16 md:pt-24 pb-12 text-center">
        <div className="kicker mb-5">{t("kicker")}</div>
        <h1 className="font-serif text-5xl md:text-6xl text-parchment leading-tight mb-6">
          {t("h1Part1")} <em className="text-gold font-normal">{t("h1Em")}</em>
          <br />{t("h1Part2")}
        </h1>
        <p className="text-mist max-w-xl mx-auto mb-14 text-lg leading-relaxed">{t("intro")}</p>
        <CardGenerator deck={deck} />
      </section>

      <section className="container-narrow py-20">
        <div className="text-center mb-12">
          <div className="kicker mb-3">{t("ritual")}</div>
          <h2 className="section-title">{t("howItWorks")}</h2>
          <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">{t("howIntro")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((n) => (
            <div key={n} className="text-center px-2">
              <div className="font-serif text-6xl text-gold opacity-60 mb-3">{["I", "II", "III"][n - 1]}</div>
              <h3 className="font-serif text-2xl text-parchment mb-3">{t(`step${n}Title` as any)}</h3>
              <p className="text-mist leading-relaxed text-sm">{t(`step${n}Body` as any)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide py-20">
        <div className="text-center mb-12">
          <div className="kicker mb-3">{t("majorPreviewKicker")}</div>
          <h2 className="section-title">{t("majorPreviewTitle")}</h2>
          <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">{t("majorPreviewIntro")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {major.slice(0, 12).map((c) => (
            <Link key={c.slug} href={lp(locale, `/cards/${c.slug}`)} className="group block rounded-lg overflow-hidden border border-gold/20 hover:border-gold transition-all hover:-translate-y-1">
              <div className="relative aspect-[244/419]">
                <Image src={c.image} alt={c.name} fill sizes="160px" className="object-cover" />
              </div>
              <div className="px-2 py-3 text-center">
                <div className="font-serif text-sm text-parchment group-hover:text-gold-light transition-colors leading-tight">{c.name}</div>
                <div className="text-mist text-[10px] tracking-[0.15em] mt-1">— {c.number} —</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={lp(locale, "/cards")} className="text-gold-light hover:text-gold underline underline-offset-4 decoration-gold/40 text-sm tracking-wider">{t("browseAll")}</Link>
        </div>
      </section>

      <section className="container-narrow py-20">
        <div className="text-center mb-14">
          <div className="kicker mb-3">{t("minorKicker")}</div>
          <h2 className="section-title">{t("minorTitle")}</h2>
          <p className="text-mist max-w-xl mx-auto mt-5 leading-relaxed">{t("minorIntro")}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {allSuits.map((suit) => {
            const cards = localizedMinorBySuit(locale, suit);
            const sample = cards[0];
            return (
              <Link key={suit} href={`${lp(locale, "/cards")}?suit=${suit}`} className="flex gap-5 p-5 rounded-xl border border-gold/20 hover:border-gold transition-all group bg-ink-card/40">
                <div className="relative w-20 shrink-0 aspect-[244/419] rounded overflow-hidden border border-gold/30">
                  <Image src={sample.image} alt={sample.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-parchment group-hover:text-gold-light transition-colors mb-1">{tSuit(suit)}</h3>
                  <p className="text-mist text-xs leading-relaxed">{tSuitEl(suit)}</p>
                  <p className="text-gold/60 text-xs mt-3 tracking-wider">{t("cardsCount")}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container-narrow py-20 text-center">
        <div className="kicker mb-3">{t("aboutKicker")}</div>
        <h2 className="section-title mb-10">{t("aboutTitle")}</h2>
        <p className="font-serif text-2xl italic text-parchment max-w-2xl mx-auto mb-8">{t("aboutQuote")}</p>
        <div className="max-w-2xl mx-auto text-mist leading-loose space-y-4">
          <p>{t("aboutP1")}</p>
          <p>{t("aboutP2")}</p>
        </div>
      </section>

      <section className="container-narrow py-20">
        <div className="text-center mb-12">
          <div className="kicker mb-3">{t("faqKicker")}</div>
          <h2 className="section-title">{t("faqTitle")}</h2>
        </div>
        <FAQ />
      </section>
    </>
  );
}
