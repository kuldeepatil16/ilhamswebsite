"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ShieldCheck, Snowflake, Sparkles, SunMedium, Wind } from "lucide-react";
import type { Locale } from "@/types";
import { getSeedImageUrl } from "@/lib/visuals";

const serviceChips = [
  { icon: Snowflake, key: "categories.climatisation" },
  { icon: Wind, key: "categories.refrigeration" },
  { icon: SunMedium, key: "categories.solar" },
];

export default function HeroSection() {
  const t = useTranslations("hero");
  const tp = useTranslations("products");
  const locale = useLocale() as Locale;
  const heroMain = getSeedImageUrl("samsung-ac", 1600, 1100);
  const heroSecondary = getSeedImageUrl("ariston-solar", 1200, 900);
  const heroTertiary = getSeedImageUrl("whirlpool-fridge", 1200, 900);

  return (
    <section className="ui-hero-shell overflow-hidden">
      <div className="absolute inset-0 ui-hero-overlay opacity-70" />
      <div className="absolute inset-0 ui-hero-grid" />
      <div className="absolute -left-10 top-20 h-56 w-56 rounded-full bg-secondary-container/10 blur-3xl animate-drift" />
      <div className="absolute -right-8 top-12 h-64 w-64 rounded-full bg-accent/15 blur-3xl animate-float-slow" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_0.98fr] lg:items-center lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
            <ShieldCheck size={14} />
            {t("tagline")}
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[0.94] tracking-tight text-contrast md:text-6xl xl:text-7xl font-manrope">
            {t("title1")}
            <span className="block text-contrast-muted">
              {t("title2")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-card transition hover:-translate-y-0.5 hover:bg-accent-light"
            >
              {t("cta1")}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.06)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur transition hover:bg-[rgb(var(--contrast)/0.12)]"
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
          <div className="absolute -left-8 top-12 h-28 w-28 rounded-full bg-secondary-container/15 blur-3xl animate-float" />
          <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl animate-drift" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[160px]">
            <article className="group relative overflow-hidden rounded-[2rem] border border-[rgb(var(--contrast)/0.12)] bg-[rgb(var(--contrast)/0.04)] shadow-card lg:col-span-7 lg:row-span-2">
              <img
                src={heroMain}
                alt="HVAC and refrigeration service overview"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]">
                  <Sparkles size={12} className="text-secondary-container" />
                  Vereen Electro Froid
                </div>
                <p className="mt-3 max-w-md text-sm leading-6 text-contrast-muted">
                  Comfort, performance, reliability for homes, shops, and industrial sites across Morocco.
                </p>
              </div>
            </article>

            <div className="grid gap-4 lg:col-span-5">
              <article className="group relative overflow-hidden rounded-[1.6rem] border border-[rgb(var(--contrast)/0.12)] bg-[rgb(var(--contrast)/0.04)] shadow-card animate-float-slow">
                <img
                  src={heroSecondary}
                  alt="Original parts and brand support"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/16 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">Authorized sourcing</p>
                  <p className="mt-1 text-lg font-black leading-tight text-contrast font-manrope">Original spare parts</p>
                </div>
              </article>

              <article className="group relative overflow-hidden rounded-[1.6rem] border border-[rgb(var(--contrast)/0.12)] bg-[rgb(var(--contrast)/0.04)] shadow-card">
                <img
                  src={heroTertiary}
                  alt="24 hour service response"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">Response</p>
                  <p className="mt-1 text-lg font-black leading-tight text-contrast font-manrope">24h quotation follow-up</p>
                </div>
              </article>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["24h", "Fast quotation and intervention follow-up."],
              ["Al Hoceima + Morocco", "Local service with national project support."],
              ["8 brands", "Authorized distributor and service center network."],
            ].map(([value, label], index) => (
              <div
                key={value}
                className="ui-hero-surface rounded-[1.35rem] p-4 shadow-card"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {index === 0 ? "Response" : index === 1 ? "Coverage" : "Partners"}
                </p>
                <p className="mt-2 text-2xl font-black leading-tight text-foreground font-manrope">{value}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
