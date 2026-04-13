"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import QuoteModal from "@/components/products/QuoteModal";
import type { Locale, Product, QuoteItem, SparePart } from "@/types";
import { formatPrice, getLocalizedField, getWhatsAppLink } from "@/lib/utils";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  compatibleParts: SparePart[];
}

function buildHighlights(product: Product, locale: Locale) {
  const categoryLabel = product.category ? product.category.replace(/_/g, " ") : "product";
  return [
    `Official ${product.brand} distribution`,
    `Designed for ${categoryLabel}`,
    `Installation and after-sales support in Morocco`,
    product.price_mad ? `Starting from ${formatPrice(product.price_mad, locale)}` : "Price on request",
  ];
}

export default function ProductDetailView({ product, relatedProducts, compatibleParts }: ProductDetailViewProps) {
  const t = useTranslations("products");
  const tp = useTranslations("parts");
  const locale = useLocale() as Locale;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const gallery = useMemo(
    () => [product.image_url, ...(product.gallery_urls ?? [])].filter((url): url is string => Boolean(url)),
    [product.gallery_urls, product.image_url]
  );

  const highlights = useMemo(() => buildHighlights(product, locale), [locale, product]);

  const quoteItem: QuoteItem = useMemo(
    () => ({ product_id: product.id, name: getLocalizedField(product, "name", locale), quantity: 1 }),
    [locale, product]
  );

  return (
    <div className="ui-page mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="ui-surface overflow-hidden rounded-[2rem] border border-border/80 shadow-card">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
            <img
              src={gallery[activeImage] || "/images/og-image.jpg"}
              alt={getLocalizedField(product, "name", locale)}
              className="h-full w-full object-cover"
            />
          </div>
          {gallery.length > 1 ? (
            <div className="flex gap-3 overflow-x-auto border-t border-border/80 p-4">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={`h-20 w-20 flex-none overflow-hidden rounded-xl border transition ${
                    index === activeImage ? "border-accent ring-2 ring-accent/30" : "border-border"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </section>

        <aside className="ui-surface rounded-[2rem] border border-border/80 p-6 shadow-card">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">{product.brand}</span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
              {t(`categories.${product.category}` as never)}
            </span>
            {product.is_featured ? <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">Featured</span> : null}
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground">{getLocalizedField(product, "name", locale)}</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{getLocalizedField(product, "description", locale)}</p>

          <div className="mt-6 rounded-2xl border border-border/80 bg-surface-soft p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Price</p>
                <p className="mt-2 text-3xl font-black text-foreground">
                  {product.price_mad ? formatPrice(product.price_mad, locale) : t("contactForPrice")}
                </p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Al Hoceima</p>
                <p>Morocco wide delivery and installation</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="ui-btn-accent px-5 py-3 text-sm" onClick={() => setQuoteOpen(true)}>
              {t("requestQuote")}
            </button>
            <a
              href={getWhatsAppLink("212663572130", `Bonjour, je veux un devis pour ${getLocalizedField(product, "name", locale)}`)}
              className="ui-btn-outline px-5 py-3 text-sm"
            >
              WhatsApp
            </a>
            <Link href={`/${locale}/contact`} className="ui-btn-outline px-5 py-3 text-sm">
              {t("viewAll")}
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-muted/40 p-4 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="ui-surface rounded-[2rem] border border-border/80 p-6 shadow-card">
          <h2 className="text-xl font-bold text-foreground">Technical overview</h2>
          <dl className="mt-4 space-y-4">
            {[
              ["Brand", product.brand],
              ["Category", t(`categories.${product.category}` as never)],
              ["Reference", product.slug],
              ["Availability", product.is_active ? "Active catalog item" : "Archived"],
              ["Support", "Installation, maintenance, and spare parts"],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-start justify-between gap-6 border-b border-border/70 pb-3 last:border-0 last:pb-0">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-sm font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="ui-surface rounded-[2rem] border border-border/80 p-6 shadow-card">
          <h2 className="text-xl font-bold text-foreground">What you get with Vereen Electro Froid</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Authorized brand sourcing",
              "On-site installation and commissioning",
              "Warranty-backed service support",
              "Original spare parts on request",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-surface-soft p-4 text-sm text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-foreground">{t("relatedProducts")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">More catalog options with the same brand or category.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((item) => (
            <article key={item.id} className="ui-surface overflow-hidden rounded-[1.75rem] border border-border/80 shadow-card">
              <img src={item.image_url || "/images/og-image.jpg"} alt={getLocalizedField(item, "name", locale)} className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{item.brand}</p>
                <h3 className="mt-2 text-lg font-bold text-foreground">{getLocalizedField(item, "name", locale)}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{getLocalizedField(item, "description", locale)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-accent">{item.price_mad ? formatPrice(item.price_mad, locale) : t("contactForPrice")}</span>
                  <Link href={`/${locale}/products/${item.slug}`} className="ui-link text-sm font-semibold">
                    {t("viewDetails")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-foreground">Compatible spare parts</h2>
          <p className="mt-1 text-sm text-muted-foreground">Related repair components already available in our parts catalog.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {compatibleParts.map((part) => (
            <article key={part.id} className="ui-surface rounded-[1.5rem] border border-border/80 p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{part.part_number || "Part"}</p>
              <h3 className="mt-2 text-lg font-bold text-foreground">{getLocalizedField(part, "name", locale)}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{getLocalizedField(part, "description", locale)}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-foreground">{part.compatible_brands.join(", ")}</span>
                <Link href={`/${locale}/parts`} className="ui-link text-sm font-semibold">
                  {tp("requestQuote")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteModal open={quoteOpen} item={quoteItem} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
