import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://tarotcard.art";
const CONTACT_EMAIL = "info@tarotcard.art";

export const metadata: Metadata = {
  title: "Contact tarotcard.art",
  description: "Get in touch with tarotcard.art. Questions, feedback, partnership inquiries — write to us at info@tarotcard.art.",
  alternates: { canonical: `${SITE_URL}/contacts` },
};

export default function ContactsPage() {
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact tarotcard.art",
    url: `${SITE_URL}/contacts`,
    description: "Contact page for tarotcard.art",
    mainEntity: {
      "@type": "Organization",
      name: "tarotcard.art",
      url: SITE_URL,
      email: CONTACT_EMAIL,
      contactPoint: {
        "@type": "ContactPoint",
        email: CONTACT_EMAIL,
        contactType: "Customer Support",
        availableLanguage: ["English"],
      },
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contacts", item: `${SITE_URL}/contacts` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <div className="container-narrow py-16">
        {/* Breadcrumbs */}
        <nav className="text-mist text-xs mb-8 flex gap-2 items-center tracking-wider">
          <Link href="/" className="hover:text-gold-light">Home</Link>
          <span>›</span>
          <span className="text-parchment">Contacts</span>
        </nav>

        <div className="text-center mb-14">
          <div className="kicker mb-3">Get in touch</div>
          <h1 className="font-serif text-5xl md:text-6xl text-parchment mb-6">Contacts</h1>
          <p className="text-mist max-w-xl mx-auto text-lg leading-relaxed">
            Questions about the cards, feedback on the site, partnership inquiries — we read every message.
          </p>
        </div>

        {/* Email card */}
        <div className="max-w-xl mx-auto p-8 md:p-10 rounded-2xl border border-gold/30 bg-ink-card/40 text-center">
          <div className="kicker mb-4">Write to us</div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-serif text-3xl md:text-4xl text-gold hover:text-gold-light transition-colors break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-mist mt-6 leading-relaxed text-sm">
            We respond to most messages within 1–2 business days. For faster help with the generator itself, try the{" "}
            <Link href="/about" className="text-gold-light underline underline-offset-2 hover:text-gold">about page</Link>
            {" "}or the FAQ on the home page.
          </p>
        </div>

        {/* What you can write about */}
        <section className="max-w-2xl mx-auto mt-16">
          <h2 className="font-serif text-3xl text-parchment text-center mb-8">What you can write about</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/30">
              <div className="kicker mb-2">Feedback</div>
              <p className="text-mist text-sm leading-relaxed">A card meaning that landed for you, a typo, a suggestion — all welcome.</p>
            </div>
            <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/30">
              <div className="kicker mb-2">Questions</div>
              <p className="text-mist text-sm leading-relaxed">About the cards, the deck, or how the site works.</p>
            </div>
            <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/30">
              <div className="kicker mb-2">Partnership</div>
              <p className="text-mist text-sm leading-relaxed">Collaborations, guest content, licensing inquiries.</p>
            </div>
            <div className="p-5 rounded-xl border border-gold/20 bg-ink-card/30">
              <div className="kicker mb-2">Press &amp; media</div>
              <p className="text-mist text-sm leading-relaxed">Interview requests, feature inquiries, or media kits.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/#generator" className="gold-btn">Draw a card</Link>
        </div>
      </div>
    </>
  );
}
