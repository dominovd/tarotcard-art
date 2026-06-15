import type { Metadata } from "next";
import { SITE_URL } from "@/lib/i18n/config";

// Root layout — passthrough. The real <html>/<body> live in app/[locale]/layout.tsx
// so we can set `lang={locale}` correctly for each translated page.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
