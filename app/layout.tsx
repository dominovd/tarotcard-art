// Root layout — passthrough. The real <html>/<body> live in app/[locale]/layout.tsx
// so we can set `lang={locale}` correctly for each translated page.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
