"use client";


import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import QuoteModal from "@/components/products/QuoteModal";
import { useProducts } from "@/hooks/useProducts";
import type { Locale, QuoteItem } from "@/types";

export default function ProductsCatalog() {
  const { data, loading } = useProducts();
  const t = useTranslations("products");
  const locale = useLocale() as Locale;
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [quoteItem, setQuoteItem] = useState<QuoteItem | null>(null);

  const filtered = useMemo(
    () =>
      data.filter(
        (item) =>
          (!category || item.category === category) &&
          (!brand || item.brand.toUpperCase() === brand.toUpperCase())
      ),
    [data, category, brand]
  );

  return (
    <div className="ui-page mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="ui-surface overflow-hidden rounded-[2rem] border border-border/80 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Catalog</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("subtitle")}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Products</p>
              <p className="mt-1 font-bold text-foreground">{filtered.length}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Brands</p>
              <p className="mt-1 font-bold text-foreground">{new Set(data.map((item) => item.brand)).size}</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-border/70 bg-surface-soft p-4 text-sm text-muted-foreground">
            Installation, maintenance, spare parts and product sourcing in one place.
          </div>
        </div>
        <ProductFilter category={category} brand={brand} onCategory={setCategory} onBrand={setBrand} />
      </section>
      <section className="mt-8 space-y-4">
        {loading ? <p className="ui-muted">{t("noProducts")}</p> : null}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} locale={locale} />
              <button
                className="ui-btn-accent mt-2 px-4 py-2 text-xs"
                onClick={() => setQuoteItem({ product_id: product.id, name: product.name_fr, quantity: 1 })}
              >
                {t("requestQuote")}
              </button>
            </div>
          ))}
        </div>
      </section>
      <QuoteModal open={Boolean(quoteItem)} item={quoteItem} onClose={() => setQuoteItem(null)} />
    </div>
  );
}
