"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export default function NotFound() {
  const locale = useLocale() as Locale;
  const t = useTranslations("notFound");
  const home = locale === defaultLocale ? "/" : `/${locale}`;
  return (
    <div className="container-narrow py-32 text-center">
      <div className="kicker mb-4">{t("kicker")}</div>
      <h1 className="font-serif text-5xl text-parchment mb-6">{t("title")}</h1>
      <p className="text-mist mb-10 max-w-md mx-auto">{t("intro")}</p>
      <Link href={home} className="gold-btn">{t("back")}</Link>
    </div>
  );
}
