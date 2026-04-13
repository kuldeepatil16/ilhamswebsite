"use client";

import { useTranslations } from "next-intl";
import type { Locale, SparePart } from "@/types";
import { getLocalizedField, formatPrice } from "@/lib/utils";
import { getPartImageUrl } from "@/lib/visuals";

export default function PartCard({ part, locale, onQuote }: { part: SparePart; locale: Locale; onQuote: (part: SparePart) => void }) {
  const t = useTranslations("parts");

  return (
    <article className="group ui-surface card-hover overflow-hidden rounded-[1.5rem] border border-border/80 shadow-card transition duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={getPartImageUrl(part, "card")}
          alt={getLocalizedField(part, "name", locale)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur">
          Spare part
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">{getLocalizedField(part, "name", locale)}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">{part.part_number}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${part.in_stock ? "bg-accent/12 text-accent" : "bg-muted text-muted-foreground"}`}>
            {part.in_stock ? t("inStock") : t("outOfStock")}
          </span>
        </div>
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{getLocalizedField(part, "description", locale)}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {part.compatible_brands.slice(0, 3).map((brand) => (
            <span key={brand} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground">
              {brand}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-accent">{part.price_mad ? formatPrice(part.price_mad, locale) : "MAD"}</span>
          <button className="ui-btn-primary px-3 py-1.5 text-xs" onClick={() => onQuote(part)}>
            {t("requestQuote")}
          </button>
        </div>
      </div>
    </article>
  );
}
