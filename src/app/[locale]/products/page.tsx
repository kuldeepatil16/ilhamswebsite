import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ProductsCatalog from "@/components/products/ProductsCatalog";
import { buildPageMetadata } from "@/lib/seo";
import { ArrowRight, PackageSearch, ShieldCheck, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.products" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/products" });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("products");

  return (
    <div className="ui-page">
      <section className="ui-hero-shell">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLlmQp9yQTW_dYyFIqyieJLm7vFLflVF74YYm3b5PGQBL-2BssFUhxmRuKNN8t8c6UgyJdHE_5_16lFkDr4j53tp9wrT84owLsc-LvzXCPSptIih7prrYW58nAsGKPWCNcUSQIc6Xm9T1MjkvUAuO7yJO6CKRvzaMUeUUJQr30wyW4bxr4aSi-qkGEms7n4L-WRtZ9MEknkkK1XzIifpXszZ7MUgHssQXJrG_secepLbteYEmI4TNKC2PS-KR4LBtztuMK911Jho6b"
            alt="Product showcase"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 ui-hero-overlay" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="ui-hero-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
              <Sparkles size={14} />
              Product line
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
                Browse catalog
                <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-6 py-3.5 text-sm font-semibold text-contrast backdrop-blur"
              >
                Request guidance
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-secondary-container/15 blur-3xl" />
            <div className="absolute -bottom-10 right-4 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="ui-hero-surface ui-hero-ring rounded-[2rem] p-5">
              <div className="grid gap-4 md:grid-cols-[0.98fr_1.02fr]">
                <div className="ui-hero-chip rounded-[1.6rem] p-5">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[rgb(var(--contrast)/0.12)]">
                    <PackageSearch className="text-accent" size={24} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-contrast-muted">Catalog scope</p>
                  <p className="mt-2 text-2xl font-black leading-tight text-contrast font-manrope">Appliances, comfort systems, and project hardware.</p>
                  <p className="mt-3 text-sm leading-6 text-contrast-muted">
                    Built around the product families already seeded in the repo, with pricing, sourcing, and after-sales support.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="ui-hero-stat rounded-[1.4rem] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Brands</p>
                    <p className="mt-2 text-2xl font-black font-manrope">8 partners</p>
                  </div>
                  <div className="ui-hero-stat rounded-[1.4rem] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Coverage</p>
                    <p className="mt-2 text-2xl font-black font-manrope">Morocco-wide</p>
                  </div>
                  <div className="ui-hero-stat rounded-[1.4rem] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Support</p>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-secondary">
                      <ShieldCheck size={16} />
                      Genuine parts and service continuity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="ui-page py-10">
        <ProductsCatalog />
      </section>
    </div>
  );
}
