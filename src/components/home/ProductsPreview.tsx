"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";
import type { Locale, Product } from "@/types";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import { getProductImageUrl } from "@/lib/visuals";

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
      .limit(8)
      .then(({ data }) => setItems((data as Product[]) || []));
  }, []);

  const editorial = useMemo(() => {
    const byCategory = new Map<string, Product>();

    for (const product of items) {
      if (!byCategory.has(product.category)) byCategory.set(product.category, product);
    }

    const ordered = [
      byCategory.get("refrigeration"),
      byCategory.get("climatisation"),
      byCategory.get("solar"),
      byCategory.get("washing_machine"),
      byCategory.get("dishwasher"),
      ...items,
    ].filter((product): product is Product => Boolean(product));

    return ordered.filter((product, index, list) => list.findIndex((candidate) => candidate.id === product.id) === index).slice(0, 5);
  }, [items]);

  if (!editorial.length) return null;

  const lead = editorial[0];
  const story = editorial[1];
  const stack = editorial.slice(2, 5);

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
          <article className="group relative overflow-hidden rounded-[2rem] border border-border/80 bg-surface-container-lowest shadow-card">
            <img
              src={getProductImageUrl(lead, "lead")}
              alt={getLocalizedField(lead, "name", locale)}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/40 to-transparent" />
            <div className="relative flex min-h-[520px] flex-col justify-end p-6 md:p-8">
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
                  {lead.brand}
                </span>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold text-accent">
                  {t(`categories.${lead.category}` as never)}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured product</p>
              <h3 className="mt-3 max-w-xl text-3xl font-black tracking-tight text-foreground md:text-5xl font-manrope">
                {getLocalizedField(lead, "name", locale)}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                {getLocalizedField(lead, "description", locale)}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-2xl font-black text-foreground">
                  {lead.price_mad ? formatPrice(lead.price_mad, locale) : t("contactForPrice")}
                </span>
                <Link href={`/${locale}/products/${lead.slug}`} className="ui-btn-accent px-5 py-3 text-sm">
                  {t("viewDetails")}
                </Link>
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2">
            {story ? (
              <article className="group overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface-container-lowest shadow-card sm:col-span-2">
                <div className="grid md:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative min-h-[240px] bg-muted">
                    <img
                      src={getProductImageUrl(story, "story")}
                      alt={getLocalizedField(story, "name", locale)}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/20 to-transparent md:bg-gradient-to-t" />
                  </div>
                  <div className="flex flex-col justify-between p-5 md:p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{story.brand}</p>
                      <h3 className="mt-2 text-2xl font-black tracking-tight text-foreground font-manrope">
                        {getLocalizedField(story, "name", locale)}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {getLocalizedField(story, "description", locale)}
                      </p>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-accent">
                        {story.price_mad ? formatPrice(story.price_mad, locale) : t("contactForPrice")}
                      </span>
                      <Link href={`/${locale}/products/${story.slug}`} className="ui-link text-sm font-semibold">
                        {t("viewDetails")}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ) : null}

            {stack.map((product) => (
              <article key={product.id} className="group overflow-hidden rounded-[1.5rem] border border-border/80 bg-surface-container-lowest shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={getProductImageUrl(product, "stack")}
                    alt={getLocalizedField(product, "name", locale)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
                    {product.brand}
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      {t(`categories.${product.category}` as never)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground">{getLocalizedField(product, "name", locale)}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                      {getLocalizedField(product, "description", locale)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-accent">
                      {product.price_mad ? formatPrice(product.price_mad, locale) : t("contactForPrice")}
                    </span>
                    <Link href={`/${locale}/products/${product.slug}`} className="ui-link text-sm font-semibold">
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
