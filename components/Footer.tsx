import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 px-6 md:px-10 py-10 text-center text-mist text-xs mt-16">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-5">
        <Link href="/" className="hover:text-gold-light transition-colors">Card of the day</Link>
        <Link href="/cards" className="hover:text-gold-light transition-colors">All 78 cards</Link>
        <Link href="/cards?arcana=major" className="hover:text-gold-light transition-colors">Major Arcana</Link>
        <Link href="/cards?suit=cups" className="hover:text-gold-light transition-colors">Minor Arcana</Link>
        <Link href="/about" className="hover:text-gold-light transition-colors">About</Link>
      </div>
      <div className="tracking-[0.05em]">© {new Date().getFullYear()} tarotcard.art — Drawn with intention ✦</div>
      <div className="mt-3 text-mist/60 text-[11px]">Rider-Waite-Smith deck imagery is in the public domain.</div>
    </footer>
  );
}
