# tarotcard.art

A free online tarot card generator with the full 78-card Rider-Waite-Smith deck. Built with Next.js 14 (App Router), Tailwind CSS, and TypeScript. Optimised for SEO and ready to deploy to Vercel.

## What's inside

- **Home page** with an interactive card-of-the-day generator (3D flip animation, cryptographically-secure random, ~30% reversed cards).
- **78 dynamic card detail pages** — `/cards/[slug]` — each statically generated with full meaning, reversed meaning, love, career, advice, and related cards.
- **Card index** at `/cards` grouping Major Arcana and the four Minor Arcana suits.
- **About page** at `/about`.
- **SEO**: sitemap.xml, robots.txt, per-page metadata, JSON-LD (WebSite + BreadcrumbList + Article + FAQPage), dynamic OG image at `/opengraph-image`.
- **Card deck imagery**: classic Rider-Waite-Smith deck (public domain, 1909, illustrated by Pamela Colman Smith). 78 JPGs in `public/cards/`.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Production build

```bash
npm run build
npm start
```

The build statically generates 86 routes: home, /cards, /about, /404, plus 78 card pages, plus sitemap/robots/og-image routes.

## Deploy to Vercel — step by step

### 1. Push to GitHub

From this project folder on your machine:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

Then create a new (empty, no README) repo on github.com, copy the remote URL, and:

```bash
git remote add origin git@github.com:<your-username>/tarotcard-art.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to https://vercel.com/new
2. Click "Import Project" and pick the `tarotcard-art` repo
3. Vercel auto-detects Next.js — no settings to change
4. Click **Deploy**

You'll get a `*.vercel.app` URL within ~60 seconds.

### 3. Connect tarotcard.art domain

1. In the Vercel project → **Settings** → **Domains** → add `tarotcard.art` and `www.tarotcard.art`
2. Vercel shows the DNS records you need
3. Go to your domain registrar's DNS panel and add:
   - `A` record on the root: `76.76.21.21`
   - `CNAME` on `www`: `cname.vercel-dns.com`
   (Or follow Vercel's exact instructions — they update from time to time.)
4. Wait 5–60 min for DNS propagation. Vercel will issue an SSL cert automatically.

### 4. Post-launch checklist

- [ ] Verify https://tarotcard.art loads and the generator works
- [ ] Open https://tarotcard.art/sitemap.xml — should list 81 URLs
- [ ] Submit sitemap in Google Search Console: https://search.google.com/search-console
- [ ] Submit sitemap in Bing Webmaster Tools
- [ ] Re-submit listings to AI directories (tap4.ai, woy.ai, etc. — the ones from your old backlink profile)
- [ ] Add a `disavow.txt` for the molavian/french PBN domains in GSC

## Project structure

```
app/
  layout.tsx           # Root layout + metadata + JSON-LD WebSite schema
  page.tsx             # Home (with generator)
  globals.css          # Tailwind + global styles (starfield, gold theme)
  about/page.tsx
  cards/
    page.tsx           # Index of all 78 cards
    [slug]/page.tsx    # Dynamic card detail (SSG)
  sitemap.ts           # Auto-generated sitemap.xml
  robots.ts            # Auto-generated robots.txt
  opengraph-image.tsx  # Dynamic OG image (edge runtime)
  not-found.tsx
components/
  Header.tsx
  Footer.tsx
  CardGenerator.tsx    # Client component: card flip + interpretation
  FAQ.tsx              # FAQ with FAQPage schema
lib/
  deck.ts              # All 78 cards: meanings, love, career, advice
public/
  cards/               # 78 Rider-Waite-Smith card images (JPG)
```

## Adding / editing card meanings

All card data lives in `lib/deck.ts`. Each card is a `TarotCard`:

```ts
{
  slug: "the-fool",
  name: "The Fool",
  number: 0,
  arcana: "major",
  image: "/cards/the-fool.jpg",
  keywords: ["new beginnings", "innocence", "spontaneity", "free spirit"],
  upright: "...",
  reversed: "...",
  love: "...",
  career: "...",
  advice: "...",
}
```

To extend a meaning (e.g. add more SEO copy, a longer "history" section), just add fields to the type and the `/cards/[slug]/page.tsx` component.

## SEO notes

- **Target keyword**: "tarot card generator" (9.9K vol, KD 37) — landed on the home page H1.
- **Secondary**: "random tarot card generator" (5.4K) — covered by the same page (same intent).
- **Long-tail**: 78 card pages target queries like "the fool meaning", "ace of cups love", etc. Each has unique meta and content.
- **JSON-LD**: WebSite (global), FAQPage (home), BreadcrumbList + Article (card pages).
- **Sitemap**: auto-includes all 81 routes.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| Language | TypeScript |
| Deployment | Vercel |
| Images | next/image (auto WebP/AVIF) |
| Fonts | Cormorant Garamond + Inter (Google Fonts) |

## License & credits

- Site code: feel free to adapt — no warranty.
- **Rider-Waite-Smith deck imagery**: public domain. Originally illustrated by Pamela Colman Smith and conceived by A. E. Waite, published 1909 by William Rider & Son. Imagery is in the worldwide public domain (both creators deceased > 70 years).
- Card meanings: written from scratch for this project.
