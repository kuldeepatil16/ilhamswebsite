"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Locale, Product } from "@/types";
import { formatPrice, getLocalizedField } from "@/lib/utils";
import { getProductImageUrl } from "@/lib/visuals";

export default function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = useTranslations("products");
  const category = t(`categories.${product.category}` as never);

  return (
    <article className="group ui-surface card-hover overflow-hidden rounded-[1.5rem] border border-border/80 shadow-card transition duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={getProductImageUrl(product, "catalog")}
          alt={getLocalizedField(product, "name", locale)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/85 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
            {product.brand}
          </span>
          <span className="rounded-full bg-accent/12 px-3 py-1 text-[11px] font-semibold text-accent">
            {category}
          </span>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-base font-bold text-foreground">{getLocalizedField(product, "name", locale)}</h3>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
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
  );
}
