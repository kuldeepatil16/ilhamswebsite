"use client";

import { useTranslations } from "next-intl";
import type { Locale, SparePart } from "@/types";
import { getLocalizedField, formatPrice } from "@/lib/utils";

export default function PartCard({ part, locale, onQuote }: { part: SparePart; locale: Locale; onQuote: (part: SparePart) => void }) {
  const t = useTranslations("parts");

  return (
    <article className="ui-surface card-hover rounded-xl p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="ui-text font-bold">{getLocalizedField(part, "name", locale)}</h3>
        <span className="ui-soft text-xs">{part.part_number}</span>
      </div>
      <p className="ui-muted mb-2 text-sm">{getLocalizedField(part, "description", locale)}</p>
      <p className="ui-soft mb-3 text-xs">{part.compatible_brands.join(", ")}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-accent">{part.price_mad ? formatPrice(part.price_mad, locale) : "MAD"}</span>
        <button className="ui-btn-primary px-3 py-1.5 text-xs" onClick={() => onQuote(part)}>
          {t("requestQuote")}
        </button>
      </div>
    </article>
  );
}
