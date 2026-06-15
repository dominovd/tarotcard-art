import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { locales, type Locale, SITE_URL, alternateLanguages, localizedUrl, hreflangCode } from "@/lib/i18n/config";

const CONTACT_EMAIL = "info@tarotcard.art";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | tarotcard.art`,
    },
    description: t("description"),
    keywords: t("keywords").split("|"),
    openGraph: {
      type: "website",
      url: localizedUrl(locale, "/"),
      siteName: "tarotcard.art",
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: hreflangCode[locale].replace("-", "_"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "tarotcard.art" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: localizedUrl(locale, "/"),
      languages: alternateLanguages("/"),
    },
    robots: { index: true, follow: true },
    verification: {
      google: "HiwD6uy4TZ5mMvr5fH0NW09lD8QgtTt4YrfHO1oUk7E",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages();

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "tarotcard.art",
    url: SITE_URL,
    inLanguage: hreflangCode[locale],
    description: (messages as any)?.meta?.home?.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/cards?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "tarotcard.art",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon`,
    email: CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "Customer Support",
      availableLanguage: locales.map((l) => hreflangCode[l]),
    },
  };

  return (
    <html lang={hreflangCode[locale]}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="star-field" aria-hidden="true" />
          <Header locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
