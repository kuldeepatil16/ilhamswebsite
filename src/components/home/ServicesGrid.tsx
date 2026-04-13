"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Building2, ShieldCheck, Snowflake, SunMedium, Timer, Wrench, Wind } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Locale } from "@/types";
import type { Product, SparePart } from "@/types";
import { getLocalizedField } from "@/lib/utils";
import { getPartImageUrl, getProductImageUrl } from "@/lib/visuals";

const iconMap = [Snowflake, Wind, SunMedium, Wrench, Building2, ShieldCheck];

export default function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredParts, setFeaturedParts] = useState<SparePart[]>([]);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("products").select("*").eq("is_active", true).order("sort_order").limit(12),
      supabase.from("spare_parts").select("*").eq("is_active", true).order("sort_order").limit(6),
    ]).then(([productsResult, partsResult]) => {
      setFeaturedProducts((productsResult.data as Product[]) || []);
      setFeaturedParts((partsResult.data as SparePart[]) || []);
    });
  }, []);

  const items = t.raw("items") as Array<{ title: string; desc: string; includes: string[] }>;
  const refrigerationProduct = featuredProducts.find((product) => product.category === "refrigeration") || featuredProducts[0];
  const airProduct =
    featuredProducts.find((product) => product.brand === "Samsung" && product.category === "climatisation") ||
    featuredProducts.find((product) => product.category === "climatisation") ||
    featuredProducts[1];
  const solarProduct = featuredProducts.find((product) => product.category === "solar") || featuredProducts[2];
  const sparePart = featuredParts[0];
  const hvacProduct =
    featuredProducts.find((product) => product.brand === "Carrier" || product.brand === "Daikin") ||
    featuredProducts.find((product) => product.category === "climatisation" && product.brand !== airProduct?.brand) ||
    featuredProducts[3];
  const applianceProduct =
    featuredProducts.find((product) => product.brand === "Bosch" && product.category === "dishwasher") ||
    featuredProducts.find((product) => product.category === "washing_machine") ||
    featuredProducts[4];

  const serviceVisuals = [
    {
      label: getLocalizedField(refrigerationProduct || {}, "name", locale),
      image: refrigerationProduct ? getProductImageUrl(refrigerationProduct, "service-0") : "/images/og-image.jpg",
      brand: refrigerationProduct?.brand,
    },
    {
      label: getLocalizedField(airProduct || {}, "name", locale),
      image: airProduct ? getProductImageUrl(airProduct, "service-1") : "/images/og-image.jpg",
      brand: airProduct?.brand,
    },
    {
      label: getLocalizedField(solarProduct || {}, "name", locale),
      image: solarProduct ? getProductImageUrl(solarProduct, "service-2") : "/images/og-image.jpg",
      brand: solarProduct?.brand,
    },
    {
      label: sparePart ? getLocalizedField(sparePart, "name", locale) : "",
      image: sparePart ? getPartImageUrl(sparePart, "service-3") : "/images/og-image.jpg",
      brand: sparePart?.compatible_brands[0],
    },
    {
      label: getLocalizedField(hvacProduct || {}, "name", locale),
      image: hvacProduct ? getProductImageUrl(hvacProduct, "service-4") : "/images/og-image.jpg",
      brand: hvacProduct?.brand,
    },
    {
      label: getLocalizedField(applianceProduct || {}, "name", locale),
      image: applianceProduct ? getProductImageUrl(applianceProduct, "service-5") : "/images/og-image.jpg",
      brand: applianceProduct?.brand,
    },
  ];

  const spans = [
    "xl:col-span-3 xl:row-span-2",
    "xl:col-span-3",
    "xl:col-span-2",
    "xl:col-span-2",
    "xl:col-span-2",
    "xl:col-span-6",
  ];

  return (
    <section className="ui-page py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Service architecture</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-5xl font-manrope">{t("title")}</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="rounded-full border border-border/70 bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-card">
            Operational systems since 2014
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6 xl:auto-rows-[220px]">
          {items.map((item, index) => {
            const Icon = iconMap[index];
            const visual = serviceVisuals[index];
            const productImage = visual?.image || "/images/og-image.jpg";
            const visualLabel = visual?.label?.trim() || null;
            return (
              <article
                key={index}
                className={`group overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-lowest shadow-card transition duration-300 hover:-translate-y-1 ${spans[index] || "xl:col-span-2"}`}
              >
                <div className={`relative overflow-hidden bg-surface-container ${index === 0 ? "h-full" : index === 5 ? "aspect-[16/7]" : "aspect-[16/10]"}`}>
                  <img
                    src={productImage}
                    alt={visualLabel || item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur">
                    <Icon size={14} className="text-accent" />
                    {item.title}
                  </div>
                  {visualLabel ? (
                    <div className="absolute bottom-4 left-4 rounded-full bg-foreground/90 px-3 py-1 text-[11px] font-semibold text-background shadow-sm backdrop-blur">
                      {visualLabel}
                    </div>
                  ) : null}
                  {visual?.brand ? (
                    <div className="absolute right-4 top-4 rounded-full bg-foreground/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-background shadow-sm backdrop-blur">
                      {visual.brand}
                    </div>
                  ) : null}
                </div>

                <div className={`space-y-5 p-6 ${index === 0 || index === 5 ? "md:p-7" : ""}`}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {visual?.brand || "Selected from the catalog"}
                    </p>
                    <h3 className="mt-2 text-xl font-black tracking-tight text-foreground font-manrope">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.includes.slice(0, 2).map((include) => (
                      <span key={include} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                        {include}
                      </span>
                    ))}
                  </div>
                  {visualLabel ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Example: {visualLabel}</p> : null}
                  <Link href={`/${locale}/services`} className="ui-link inline-flex items-center gap-2 text-sm font-semibold">
                    {t("learnMore")}
                    <Timer size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
