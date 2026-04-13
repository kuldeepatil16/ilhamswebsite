"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Building2, ShieldCheck, Snowflake, SunMedium, Timer, Wrench, Wind } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Locale } from "@/types";
import type { Product } from "@/types";
import { getLocalizedField } from "@/lib/utils";

const iconMap = [Snowflake, Wind, SunMedium, Wrench, Building2, ShieldCheck];

export default function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .limit(6)
      .then(({ data }) => setFeaturedProducts((data as Product[]) || []));
  }, []);

  const items = t.raw("items") as Array<{ title: string; desc: string; includes: string[] }>;

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

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[index];
            const product = featuredProducts.length ? featuredProducts[index % featuredProducts.length] : undefined;
            const productName = product ? getLocalizedField(product, "name", locale) : null;
            const productImage = product?.image_url || "/images/og-image.jpg";
            return (
              <article
                key={index}
                className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-surface-container-lowest shadow-card transition duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img
                    src={productImage}
                    alt={productName || item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur">
                    <Icon size={14} className="text-accent" />
                    {item.title}
                  </div>
                  {productName ? (
                    <div className="absolute bottom-4 left-4 rounded-full bg-foreground/90 px-3 py-1 text-[11px] font-semibold text-background shadow-sm backdrop-blur">
                      {productName}
                    </div>
                  ) : null}
                </div>

                <div className="space-y-5 p-6">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-foreground font-manrope">{item.title}</h3>
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
