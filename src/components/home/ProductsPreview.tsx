"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Locale, Product } from "@/types";
import { formatPrice, getLocalizedField } from "@/lib/utils";

export default function ProductsPreview() {
  const t = useTranslations("products");
  const locale = useLocale() as Locale;
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("sort_order")
      .limit(6)
      .then(({ data }) => setItems((data as Product[]) || []));
  }, []);

  const featured = items[0];
  const rest = items.slice(1, 4);

  if (!featured) return null;

  return (
    <section className="ui-page py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Curated equipment</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-5xl font-manrope">{t("title")}</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link href={`/${locale}/products`} className="ui-link text-sm font-semibold">
            {t("viewAll")}
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="group overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_20px_50px_rgb(var(--shadow)/0.08)]">
            <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[320px] bg-surface-container-low">
                <img
                  src={featured.image_url || "/images/og-image.jpg"}
                  alt={getLocalizedField(featured, "name", locale)}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm backdrop-blur">
                  {featured.brand}
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured product</p>
                  <h3 className="mt-3 text-2xl font-black tracking-tight text-foreground font-manrope">
                    {getLocalizedField(featured, "name", locale)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {getLocalizedField(featured, "description", locale)}
                  </p>
                </div>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <span className="text-2xl font-black text-accent font-manrope">
                    {featured.price_mad ? formatPrice(featured.price_mad, locale) : t("contactForPrice")}
                  </span>
                  <Link href={`/${locale}/products/${featured.slug}`} className="ui-btn-primary px-5 py-3 text-sm">
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5">
            {rest.map((item) => (
              <article
                key={item.id}
                className="group grid gap-4 rounded-[1.6rem] bg-surface-container-lowest p-4 shadow-[0_20px_40px_rgb(var(--shadow)/0.06)] md:grid-cols-[110px_1fr]"
              >
                <img
                  src={item.image_url || "/images/og-image.jpg"}
                  alt={getLocalizedField(item, "name", locale)}
                  className="h-28 w-full rounded-[1.1rem] object-cover md:h-full"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{item.brand}</p>
                    <h3 className="mt-2 text-lg font-bold text-foreground">{getLocalizedField(item, "name", locale)}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {getLocalizedField(item, "description", locale)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-bold text-accent">
                      {item.price_mad ? formatPrice(item.price_mad, locale) : t("contactForPrice")}
                    </span>
                    <Link href={`/${locale}/products/${item.slug}`} className="ui-link text-sm font-semibold">
                      {t("viewDetails")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
