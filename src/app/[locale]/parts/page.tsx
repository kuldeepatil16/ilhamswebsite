import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import PartsCatalog from "@/components/parts/PartsCatalog";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, Cog, ShieldCheck, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.parts" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/parts" });
}

export default async function PartsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("parts");

  return (
    <div className="ui-page">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,rgb(var(--hero-start))_0%,rgb(var(--hero-mid))_46%,rgb(var(--hero-end))_100%)] text-contrast">
        <div className="absolute inset-0 opacity-55">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC1z3cBoblrAIZwaic6C1kMXGVpb140qWPz9xzNkfZRz7dchqWFj3uBzsL4qaGgvunzHLzrt54wK5KLWBQ-6hf12GoRcH5lqqhYz6AO0-JdwLYkTuVDxH5bzfwwtDsZhv5fhD-FePDknmXIw2wLkQjF_MP_YHhMjVOmOMENqimf1ulRWbnPlj0ZKy3ZyyIccokoDCWHrE-3UEUe5VEre0QseqP1bXmoh7XYjjg5S1D_QBVD9bxzLX3tJaMQigbdCUob9iBmD_Zg7pi"
            alt="Spare parts and warehouse support"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,27,46,0.92)_0%,rgba(10,46,77,0.72)_50%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-[rgb(var(--contrast)/0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-contrast-muted backdrop-blur">
              <Sparkles size={14} />
              Spare parts
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.94] tracking-tight md:text-7xl xl:text-8xl font-manrope">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-contrast-muted md:text-lg">{t("subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#catalog"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent-light"
              >
                Browse parts
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur"
              >
                Request a quote
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-12 h-28 w-28 rounded-full bg-secondary-container/15 blur-3xl" />
            <div className="absolute -bottom-10 right-2 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="rounded-[2rem] border border-[rgb(var(--contrast)/0.1)] bg-[rgb(var(--contrast)/0.08)] p-5 shadow-[0_24px_56px_rgb(var(--shadow)/0.22)] backdrop-blur-xl">
              <div className="grid gap-4 md:grid-cols-[0.98fr_1.02fr]">
                <div className="rounded-[1.6rem] bg-[rgb(var(--contrast)/0.08)] p-5">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[rgb(var(--contrast)/0.1)]">
                    <Cog className="text-secondary-container" size={24} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">Compatibility</p>
                  <p className="mt-2 text-2xl font-black leading-tight text-contrast font-manrope">Genuine components mapped to appliance families.</p>
                  <p className="mt-3 text-sm leading-6 text-contrast-muted">
                    Search by brand or category and request parts directly from the support team.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Stock</p>
                    <p className="mt-2 text-2xl font-black font-manrope">Live</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Brands</p>
                    <p className="mt-2 text-2xl font-black font-manrope">8 partners</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-surface-container-lowest/95 p-4 text-foreground">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Support</p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-secondary">
                      <ShieldCheck size={16} />
                      Compatibility checked before dispatch
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="ui-page py-10">
        <PartsCatalog />
      </section>
    </div>
  );
}
