import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { deck } from "@/lib/deck";
import { getLocalizedCard, localizedMajor, localizedMinorBySuit } from "@/lib/deck-localized";
import { alternateLanguages, localizedUrl, defaultLocale, locales, hreflangCode, SITE_URL, type Locale } from "@/lib/i18n/config";

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of locales) {
    for (const c of deck) {
      params.push({ locale, slug: c.slug });
    }
  }
  return params;
}

function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const card = getLocalizedCard(slug, locale);
  if (!card) return {};
  const desc = `${card.name} — ${card.upright.slice(0, 140)}…`;
  return {
    title: card.name,
    description: desc,
    alternates: {
      canonical: localizedUrl(locale, `/cards/${slug}`),
      languages: alternateLanguages(`/cards/${slug}`),
    },
    openGraph: {
      title: card.name,
      description: desc,
      images: [{ url: card.image, width: 244, height: 419, alt: card.name }],
    },
  };
}

export default async function CardPage({ params: { locale, slug } }: { params: { locale: Locale; slug: string } }) {
  unstable_setRequestLocale(locale);
  const card = getLocalizedCard(slug, locale);
  if (!card) notFound();
  const t = await getTranslations({ locale, namespace: "card" });
  const tSuit = await getTranslations({ locale, namespace: "suit" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  let related = card.arcana === "major"
    ? localizedMajor(locale).filter((c) => c.slug !== card.slug)
    : localizedMinorBySuit(locale, card.suit!).filter((c) => c.slug !== card.slug);
  related = related.slice(0, 6);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localizedUrl(locale, "/") },
      { "@type": "ListItem", position: 2, name: "Cards", item: localizedUrl(locale, "/cards") },
      { "@type": "ListItem", position: 3, name: card.name, item: localizedUrl(locale, `/cards/${slug}`) },
    ],
  };

  const cardJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: card.name,
    description: card.upright,
    image: `${SITE_URL}${card.image}`,
    inLanguage: hreflangCode[locale],
    author: { "@type": "Organization", name: "tarotcard.art" },
    publisher: { "@type": "Organization", name: "tarotcard.art" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cardJsonLd) }} />

      <article className="container-narrow py-12 md:py-16">
        <nav className="text-mist text-xs mb-8 flex gap-2 items-center tracking-wider">
          <Link href={lp(locale, "/")} className="hover:text-gold-light">Home</Link>
          <span>›</span>
          <Link href={lp(locale, "/cards")} className="hover:text-gold-light">Cards</Link>
          <span>›</span>
          <span className="text-parchment">{card.name}</span>
        </nav>

        <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-14 mb-16">
          <div className="mx-auto md:mx-0">
            <div className="relative w-[260px] sm:w-[300px] aspect-[244/419] rounded-2xl overflow-hidden border-2 border-gold shadow-2xl shadow-gold/10">
              <Image src={card.image} alt={card.name} fill sizes="300px" className="object-cover" priority />
            </div>
          </div>
          <div>
            <div className="kicker mb-3">
              {card.arcana === "major" ? `${tHome("majorArcanaLabel")} · ${card.number}` : tSuit(card.suit!)}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6 leading-tight">{card.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {card.keywords.map((k) => (
                <span key={k} className="px-3 py-1 rounded-full text-xs tracking-wider border border-gold/30 text-gold-light bg-ink-card/50">{k}</span>
              ))}
            </div>
            <p className="text-parchment text-lg leading-relaxed">{card.upright}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Block title={t("uprightMeaning")} body={card.upright} />
          <Block title={t("reversedMeaning")} body={card.reversed} />
          <Block title={t("love")} body={card.love} />
          <Block title={t("career")} body={card.career} />
        </div>

        <div className="text-center py-10 px-6 border border-gold/30 rounded-2xl bg-ink-card/40 mb-16">
          <div className="kicker mb-4">{t("todaysGuidance")}</div>
          <p className="font-serif text-2xl md:text-3xl text-gold italic leading-snug max-w-2xl mx-auto">✦ {card.advice}</p>
        </div>

        <div className="text-center mb-20">
          <Link href={`${lp(locale, "/")}#generator`} className="gold-btn">{t("drawCard")}</Link>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-parchment text-center mb-2">
            {card.arcana === "major" ? t("moreFromMajor") : t("moreFromSuit", { suit: tSuit(card.suit!) })}
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-8">
            {related.map((c) => (
              <Link key={c.slug} href={lp(locale, `/cards/${c.slug}`)} className="group block rounded-lg overflow-hidden border border-gold/20 hover:border-gold transition-all">
                <div className="relative aspect-[244/419]">
                  <Image src={c.image} alt={c.name} fill sizes="120px" className="object-cover" />
                </div>
                <div className="px-2 py-2 text-center">
                  <div className="font-serif text-xs text-parchment group-hover:text-gold-light leading-tight">{c.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 rounded-xl border border-gold/20 bg-ink-card/30">
      <div className="kicker mb-3">{title}</div>
      <p className="text-parchment leading-relaxed">{body}</p>
    </div>
  );
}
