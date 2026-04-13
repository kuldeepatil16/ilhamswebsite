import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Timer, Wind, Waves, SunMedium, Building2 } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { getHeroVisualUrl } from "@/lib/visuals";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/services" });
}

const iconMap = [Wind, Waves, SunMedium, Building2];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("services");
  const items = t.raw("items") as Array<{ title: string; desc: string; fullDesc: string; includes: string[] }>;

  return (
    <div className="ui-page">
      <section className="ui-hero-shell">
        <div className="absolute inset-0 opacity-60">
          <img
            src={getHeroVisualUrl("Service architecture", "Installation, maintenance and repair", "services-hero")}
            alt="Service hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 ui-hero-overlay" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              <Sparkles size={14} />
              Complete service portfolio
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-tight md:text-7xl xl:text-8xl font-manrope">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                Request this service
                <ArrowRight size={16} />
              </Link>
              <Link href={`/${locale}/promotions`} className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur">
                Seasonal offers
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-32 w-32 rounded-full bg-secondary-container/15 blur-3xl" />
            <div className="ui-hero-surface ui-hero-ring rounded-[2rem] p-5">
              <div className="grid gap-4 md:grid-cols-[0.94fr_1.06fr]">
                <div className="ui-hero-chip rounded-[1.6rem] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Priority support</p>
                  <h2 className="mt-3 text-2xl font-black text-contrast font-manrope">Installation, maintenance, repair, and sourcing.</h2>
                  <p className="mt-3 text-sm leading-6 text-contrast-muted">
                    Complete support for HVAC, refrigeration, solar, and appliances under one team.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Response</p>
                    <p className="mt-2 text-2xl font-black font-manrope">24h</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Coverage</p>
                    <p className="mt-2 text-2xl font-black font-manrope">Al Hoceima + Morocco</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {["Priority scheduling", "Original parts", "Warranty follow-up"].map((item) => (
                  <span key={item} className="ui-hero-chip rounded-2xl px-4 py-3 text-xs font-semibold">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Service orbit</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground md:text-5xl font-manrope">{t("subtitle")}</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground">
              Four operating lanes cover installation, maintenance, diagnostics, and system design.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {items.map((item, index) => {
              const Icon = iconMap[index] ?? ShieldCheck;
              return (
                <article key={item.title} className={index === 0 ? "xl:col-span-2 xl:row-span-2 rounded-[2rem] bg-surface-container-lowest p-7 shadow-card" : "rounded-[1.6rem] bg-surface-container-lowest p-6 shadow-card"}>
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                      <Icon className="text-accent" size={24} />
                    </div>
                    <span className="rounded-full bg-secondary-container/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Ready</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.fullDesc}</p>
                  {index === 0 ? <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Installation and commissioning</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ui-page py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="ui-hero-shell ui-hero-ring rounded-[2rem] p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Support route</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl font-manrope">Need a system review, a quote, or a seasonal check?</h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-contrast-muted">
                  Send the project details and our team will respond with the right route, timeline, and parts plan.
                </p>
              </div>
              <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent-light">
                Start the conversation
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
