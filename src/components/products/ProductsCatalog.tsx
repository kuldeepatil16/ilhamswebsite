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
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[280px_1fr] lg:px-8">
      <ProductFilter category={category} brand={brand} onCategory={setCategory} onBrand={setBrand} />
      <section>
        <h1 className="ui-text mb-4 text-3xl font-extrabold">{t("title")}</h1>
        {loading ? <p>{t("noProducts")}</p> : null}
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
