"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  return (
    <section className="ui-hero relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)]">
      <div className="hero-grid absolute inset-0" />
      <div className="pointer-events-none absolute -right-24 top-16 text-[220px] font-black text-contrast/5">✶</div>
      <div className="pointer-events-none absolute -left-20 bottom-12 text-[180px] font-black text-contrast/5">✶</div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
        <div className="max-w-3xl">
          <p className="mb-6 inline-block rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-light">
            {t("tagline")}
          </p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-contrast md:text-6xl">
            {t("title1")} <span className="text-accent">{t("title2")}</span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-contrast-muted">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/contact`} className="rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground">
              {t("cta1")}
            </Link>
            <Link href={`/${locale}/services`} className="rounded-full border border-contrast/40 px-6 py-3 font-semibold text-contrast">
              {t("cta2")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
