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
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#061b2e_0%,#0a2e4d_48%,#144268_100%)] text-contrast">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(118,252,165,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(242,138,31,0.2),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,auto,52px_52px,52px_52px] opacity-80" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted backdrop-blur">
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
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-black/10 transition hover:translate-y-[-1px] hover:bg-accent-light"
            >
              {t("cta1")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur transition hover:bg-white/10"
            >
              {t("cta2")}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {serviceChips.map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 rounded-full bg-white/8 px-4 py-2 text-xs font-semibold text-contrast-muted backdrop-blur"
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
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-[0_24px_56px_rgba(0,0,0,0.2)] backdrop-blur-xl">
            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[1.6rem] bg-white/10 p-5">
                <img src="/favicon.svg" alt="Vereen Electro Froid" className="h-16 w-16" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">
                  The Thermal Architect
                </p>
                <p className="mt-2 text-2xl font-black leading-tight text-contrast font-manrope">
                  Precision cooling, heating, and service.
                </p>
                <p className="mt-3 text-sm leading-6 text-contrast-muted">
                  Built for Moroccan homes, shops, and industrial spaces that need reliable climate systems and real after-sales support.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Response</p>
                  <p className="mt-2 text-2xl font-black text-foreground font-manrope">24h</p>
                  <p className="mt-1 text-sm text-muted-foreground">Fast quotation and intervention follow-up.</p>
                </div>
                <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Coverage</p>
                  <p className="mt-2 text-2xl font-black text-foreground font-manrope">Al Hoceima + Morocco</p>
                  <p className="mt-1 text-sm text-muted-foreground">Local service with national project support.</p>
                </div>
                <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
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
                <div key={item} className="rounded-2xl bg-white/10 px-4 py-3 text-xs font-semibold text-contrast-muted backdrop-blur">
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
