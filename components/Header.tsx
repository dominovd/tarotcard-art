import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gold/20 px-6 md:px-10 py-5 flex items-center justify-between relative z-10">
      <Link href="/" className="font-serif text-2xl text-gold tracking-wider">
        tarotcard<span className="text-parchment font-normal">.art</span>
      </Link>
      <nav>
        <ul className="flex gap-5 md:gap-9 items-center">
          <li><Link href="/#generator" className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">Generator</Link></li>
          <li><Link href="/cards" className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">Cards</Link></li>
          <li><Link href="/about" className="text-mist hover:text-gold-light text-xs md:text-sm uppercase tracking-[0.15em] transition-colors">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
