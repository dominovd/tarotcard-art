import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: t(`q${i}` as any),
    a: t(`a${i}` as any),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-3xl mx-auto">
        {items.map((item) => (
          <details key={item.q} className="border-b border-gold/20 py-6 group">
            <summary className="font-serif text-xl md:text-2xl text-parchment cursor-pointer list-none flex justify-between items-center gap-4">
              {item.q}
              <span className="text-gold text-2xl transition-transform group-open:rotate-45 shrink-0">+</span>
            </summary>
            <p className="text-mist mt-4 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
