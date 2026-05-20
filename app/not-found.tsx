import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-narrow py-32 text-center">
      <div className="kicker mb-4">404</div>
      <h1 className="font-serif text-5xl text-parchment mb-6">The card is not in this deck</h1>
      <p className="text-mist mb-10 max-w-md mx-auto">
        That page could not be found. Perhaps the right card is waiting for you on the home page.
      </p>
      <Link href="/" className="gold-btn">Draw a card</Link>
    </div>
  );
}
