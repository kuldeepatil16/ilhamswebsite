"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale, Product } from "@/types";
import { formatPrice, getLocalizedField } from "@/lib/utils";

export default function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = useTranslations("products");

  return (
    <article className="card-hover overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card">
      <img
        src={product.image_url || "/images/og-image.jpg"}
        alt={getLocalizedField(product, "name", locale)}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-dark-blue">{getLocalizedField(product, "name", locale)}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{getLocalizedField(product, "description", locale)}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-accent">{product.price_mad ? formatPrice(product.price_mad, locale) : t("contactForPrice")}</span>
          <Link href={`/${locale}/products/${product.slug}`} className="text-sm font-semibold text-blue">
            {t("viewDetails")}
          </Link>
        </div>
      </div>
    </article>
  );
}
