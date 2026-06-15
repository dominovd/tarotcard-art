import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { deck } from "@/lib/deck";
import { getLocalizedCard, localizedMajor, localizedMinorBySuit } from "@/lib/deck-localized";
import { localizedUrl, defaultLocale, locales, hreflangCode, SITE_URL, type Locale } from "@/lib/i18n/config";
import { indexableAlternateLanguages, indexableCanonical, robotsForIndexableContent } from "@/lib/seo-indexing";
import {
  cardTitleEn,
  cardDescriptionEn,
  directAnswerEn,
  cardFaqEn,
  cardRelatedKeywordsEn,
  getClusterNav,
} from "@/lib/seo-en";

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
  const title = locale === "en" ? cardTitleEn(card) : card.name;
  const description = locale === "en"
    ? cardDescriptionEn(card)
    : `${card.name} — ${card.upright.slice(0, 140)}…`;
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: indexableCanonical(locale, `/cards/${slug}`),
      languages: indexableAlternateLanguages(`/cards/${slug}`),
    },
    robots: robotsForIndexableContent(locale),
    openGraph: {
      title,
      description,
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

  // Cluster siblings for prev/next nav
  const siblings = card.arcana === "major"
    ? localizedMajor(locale)
    : localizedMinorBySuit(locale, card.suit!);
  const hubBase = card.arcana === "major"
    ? `${lp(locale, "/cards")}#major`
    : `${lp(locale, "/cards")}?suit=${card.suit}`;
  const nav = getClusterNav(card, siblings, hubBase);

  // Related cards (other 6 from the same cluster) for the visual grid
  const related = siblings.filter((c) => c.slug !== card.slug).slice(0, 6);

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

  // English-only SEO additions
  const isEn = locale === "en";
  const faqItems = isEn ? cardFaqEn(card) : [];
  const relatedKeywords = isEn ? cardRelatedKeywordsEn(card) : [];
  const directAnswer = isEn ? directAnswerEn(card) : null;

  const faqJsonLd = isEn && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cardJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <article className="container-narrow py-12 md:py-16">
        <nav className="text-mist text-xs mb-8 flex gap-2 items-center tracking-wider">
          <Link href={lp(locale, "/")} className="hover:text-gold-light">Home</Link>
          <span>›</span>
          <Link href={lp(locale, "/cards")} className="hover:text-gold-light">Cards</Link>
          <span>›</span>
          <span className="text-parchment">{card.name}</span>
        </nav>

        <div className="grid md:grid-cols-[300px_1fr] gap-10 md:gap-14 mb-12">
          <div className="mx-auto md:mx-0">
            <div className="relative w-[260px] sm:w-[300px] aspect-[244/419] rounded-2xl overflow-hidden border-2 border-gold shadow-2xl shadow-gold/10">
              <Image src={card.image} alt={card.name} fill sizes="300px" className="object-cover" priority />
            </div>
          </div>
          <div>
            <div className="kicker mb-3">
              {card.arcana === "major" ? `${tHome("majorArcanaLabel")} · ${card.number}` : tSuit(card.suit!)}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-4 leading-tight">{card.name}</h1>
            {/* Direct-answer block — featured snippet bait (EN only) */}
            {directAnswer && (
              <p className="text-gold-light text-base leading-relaxed mb-5 italic border-l-2 border-gold/40 pl-4">
                {directAnswer}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-6">
              {card.keywords.map((k) => (
                <span key={k} className="px-3 py-1 rounded-full text-xs tracking-wider border border-gold/30 text-gold-light bg-ink-card/50">{k}</span>
              ))}
            </div>
            <p className="text-parchment text-lg leading-relaxed">{card.upright}</p>
          </div>
        </div>

        {/* Prev / Next nav — sequential cluster navigation */}
        {(nav.prev || nav.next) && (
          <div className="grid grid-cols-2 gap-4 mb-12">
            {nav.prev ? (
              <Link
                href={lp(locale, `/cards/${nav.prev.slug}`)}
                className="block p-4 rounded-xl border border-gold/20 hover:border-gold transition-colors group"
              >
                <div className="text-mist text-[10px] tracking-[0.2em] uppercase mb-1">← Previous in {nav.hubLabel}</div>
                <div className="font-serif text-lg text-parchment group-hover:text-gold-light">{nav.prev.name}</div>
              </Link>
            ) : <div />}
            {nav.next ? (
              <Link
                href={lp(locale, `/cards/${nav.next.slug}`)}
                className="block p-4 rounded-xl border border-gold/20 hover:border-gold transition-colors group text-right"
              >
                <div className="text-mist text-[10px] tracking-[0.2em] uppercase mb-1">Next in {nav.hubLabel} →</div>
                <div className="font-serif text-lg text-parchment group-hover:text-gold-light">{nav.next.name}</div>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Optional meaning blocks — reversed/love/career when translated */}
        {(card.reversed || card.love || card.career) && (
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {card.reversed && <Block title={t("reversedMeaning")} body={card.reversed} />}
            {card.love && <Block title={t("love")} body={card.love} />}
            {card.career && <Block title={t("career")} body={card.career} />}
          </div>
        )}

        {/* Today's guidance — advice */}
        <div className="text-center py-10 px-6 border border-gold/30 rounded-2xl bg-ink-card/40 mb-16">
          <div className="kicker mb-4">{t("todaysGuidance")}</div>
          <p className="font-serif text-2xl md:text-3xl text-gold italic leading-snug max-w-2xl mx-auto">✦ {card.advice}</p>
        </div>

        {/* FAQ section — EN only, FAQPage schema attached above */}
        {faqItems.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-3xl text-parchment text-center mb-2">Frequently asked about {card.name}</h2>
            <p className="text-mist text-center text-sm mb-8">Common questions readers ask about this card</p>
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item) => (
                <details key={item.q} className="border-b border-gold/20 py-5 group">
                  <summary className="font-serif text-lg md:text-xl text-parchment cursor-pointer list-none flex justify-between items-center gap-4">
                    {item.q}
                    <span className="text-gold text-2xl transition-transform group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <p className="text-mist mt-3 leading-relaxed text-sm md:text-base">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Draw-a-card CTA */}
        <div className="text-center mb-16">
          <Link href={`${lp(locale, "/")}#generator`} className="gold-btn">{t("drawCard")}</Link>
        </div>

        {/* Related cards grid */}
        <div className="mb-16">
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

        {/* Related searches — semantic expansion (EN only) */}
        {relatedKeywords.length > 0 && (
          <section className="border-t border-gold/20 pt-10">
            <div className="kicker mb-4 text-center">Related searches</div>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {relatedKeywords.map((kw) => (
                <span
                  key={kw}
                  className="text-mist text-xs px-3 py-1.5 rounded-full border border-gold/15 bg-ink-card/30"
                >
                  {kw}
                </span>
              ))}
            </div>
          </section>
        )}
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
