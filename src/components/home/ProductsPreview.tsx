"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Locale, Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";

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

  const featured = items.slice(0, 4);

  if (!featured.length) return null;

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

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
