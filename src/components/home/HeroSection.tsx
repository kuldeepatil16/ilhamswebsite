"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Snowflake, SunMedium, Wind } from "lucide-react";
import type { Locale } from "@/types";

const serviceChips = [
  { icon: Snowflake, key: "categories.climatisation" },
  { icon: Wind, key: "categories.refrigeration" },
  { icon: SunMedium, key: "categories.solar" },
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const tp = useTranslations("products");
  const locale = useLocale() as Locale;

  return (
    <section className="ui-hero-shell">
      <div className="absolute inset-0 ui-hero-overlay opacity-60" />
      <div className="absolute inset-0 ui-hero-grid" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
            <ShieldCheck size={14} />
            {t("tagline")}
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-contrast md:text-6xl xl:text-7xl font-manrope">
            {t("title1")}
            <span className="block bg-gradient-to-r from-secondary-container via-contrast to-accent-light bg-clip-text text-transparent">
              {t("title2")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-[0_12px_28px_rgb(var(--shadow)/0.12)] transition hover:translate-y-[-1px] hover:bg-accent-light"
            >
              {t("cta1")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur transition hover:bg-[rgb(var(--contrast)/0.1)]"
            >
              {t("cta2")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {serviceChips.map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
              >
                <Icon size={14} className="text-secondary-container" />
                {tp(key as never)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-secondary-container/15 blur-3xl" />
          <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="ui-hero-surface ui-hero-ring relative rounded-[2rem] p-5">
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="ui-hero-surface rounded-[1.6rem] p-5">
                <img src="/favicon.svg" alt="Vereen Electro Froid" className="h-16 w-16" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">
                  Comfort, performance, reliability
                </p>
                <p className="mt-2 text-2xl font-black leading-tight text-contrast font-manrope">
                  HVAC, refrigeration, solar, and parts support.
                </p>
                <p className="mt-3 text-sm leading-6 text-contrast-muted">
                  Built for Moroccan homes, shops, and industrial spaces that need reliable climate systems and real after-sales support.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="ui-hero-stat rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Response</p>
                  <p className="mt-2 text-2xl font-black text-foreground font-manrope">24h</p>
                  <p className="mt-1 text-sm text-muted-foreground">Fast quotation and intervention follow-up.</p>
                </div>
                <div className="ui-hero-stat rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Coverage</p>
                  <p className="mt-2 text-2xl font-black text-foreground font-manrope">Al Hoceima + Morocco</p>
                  <p className="mt-1 text-sm text-muted-foreground">Local service with national project support.</p>
                </div>
                <div className="ui-hero-stat rounded-[1.4rem] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Partners</p>
                  <p className="mt-2 text-2xl font-black text-foreground font-manrope">8 brands</p>
                  <p className="mt-1 text-sm text-muted-foreground">Authorized distributor and service center network.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                "Authorized sourcing",
                "Original spare parts",
                "Preventive maintenance",
              ].map((item) => (
                <div key={item} className="ui-hero-chip rounded-2xl px-4 py-3 text-xs font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
