"use client";

﻿import Link from "next/link";
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

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-dark-blue">{t("title")}</h2>
            <p className="text-slate-600">{t("subtitle")}</p>
          </div>
          <Link href={`/${locale}/products`} className="text-sm font-semibold text-blue">
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="card-hover overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card">
              <img src={item.image_url || "/images/og-image.jpg"} alt={`${t("viewDetails")} ${getLocalizedField(item, "name", locale)}`} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="mb-1 font-bold text-dark-blue">{getLocalizedField(item, "name", locale)}</h3>
                <p className="mb-3 line-clamp-2 text-sm text-slate-600">{getLocalizedField(item, "description", locale)}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-accent">
                    {item.price_mad ? formatPrice(item.price_mad, locale) : t("contactForPrice")}
                  </span>
                  <Link href={`/${locale}/products/${item.slug}`} className="text-sm font-semibold text-blue">
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
