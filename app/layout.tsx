import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const SITE_URL = "https://tarotcard.art";
const CONTACT_EMAIL = "info@tarotcard.art";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tarot Card Generator — Draw Your Card of the Day | tarotcard.art",
    template: "%s | tarotcard.art",
  },
  description: "Free online tarot card generator. Draw your card of the day from the full 78-card Rider-Waite deck and receive an instant meaning, love, and career interpretation.",
  keywords: ["tarot card generator", "random tarot card generator", "card of the day", "free tarot", "rider waite tarot", "tarot reading online"],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "tarotcard.art",
    title: "Tarot Card Generator — Draw Your Card of the Day",
    description: "Free online tarot card generator. Draw your card of the day from the full 78-card Rider-Waite deck.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "tarotcard.art" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Card Generator — tarotcard.art",
    description: "Free online tarot card generator. Draw your card of the day.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  verification: {
    google: "HiwD6uy4TZ5mMvr5fH0NW09lD8QgtTt4YrfHO1oUk7E",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "tarotcard.art",
  url: SITE_URL,
  description: "Free online tarot card generator with the full 78-card Rider-Waite deck.",
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
    availableLanguage: ["English"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        />
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
        <div className="star-field" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
