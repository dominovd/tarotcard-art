import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { alternateLanguages, localizedUrl, defaultLocale, SITE_URL, type Locale } from "@/lib/i18n/config";

const CONTACT_EMAIL = "info@tarotcard.art";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.contacts" });
  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: { canonical: localizedUrl(locale, "/contacts"), languages: alternateLanguages("/contacts") },
  };
}

function lp(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export default async function ContactsPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contacts" });
  const tCard = await getTranslations({ locale, namespace: "card" });

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("title"),
    url: localizedUrl(locale, "/contacts"),
    mainEntity: {
      "@type": "Organization",
      name: "tarotcard.art",
      url: localizedUrl(locale, "/"),
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "Customer Support",
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }} />

      <div className="container-narrow py-16">
        <nav className="text-mist text-xs mb-8 flex gap-2 items-center tracking-wider">
          <Link href={lp(locale, "/")} className="hover:text-gold-light">Home</Link>
          <span>›</span>
          <span className="text-parchment">{t("title")}</span>
        </nav>

        <div className="text-center mb-14">
          <div className="kicker mb-3">{t("kicker")}</div>
          <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6">{t("title")}</h1>
          <p className="text-mist max-w-xl mx-auto text-lg leading-relaxed">{t("intro")}</p>
        </div>

        <div className="max-w-xl mx-auto p-8 md:p-10 rounded-2xl border border-gold/30 bg-ink-card/40 text-center">
          <div className="kicker mb-4">{t("writeToUs")}</div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-serif text-3xl md:text-4xl text-gold hover:text-gold-light transition-colors break-all">
            {CONTACT_EMAIL}
          </a>
          <p className="text-mist mt-6 leading-relaxed text-sm">{t("responseTime")}</p>
        </div>

        <section className="max-w-2xl mx-auto mt-16">
          <h2 className="font-serif text-3xl text-parchment text-center mb-8">{t("whatYouCanWrite")}</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {(["feedback", "questions", "partnership", "press"] as const).map((k) => (
              <div key={k} className="p-5 rounded-xl border border-gold/20 bg-ink-card/30">
                <div className="kicker mb-2">{t(`${k}Title` as any)}</div>
                <p className="text-mist text-sm leading-relaxed">{t(`${k}Body` as any)}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-16">
          <Link href={`${lp(locale, "/")}#generator`} className="gold-btn">{tCard("drawCard")}</Link>
        </div>
      </div>
    </>
  );
}
