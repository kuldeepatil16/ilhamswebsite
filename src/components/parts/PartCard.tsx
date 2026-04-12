"use client";

import { useTranslations } from "next-intl";
import type { Locale, SparePart } from "@/types";
import { getLocalizedField, formatPrice } from "@/lib/utils";

export default function PartCard({ part, locale, onQuote }: { part: SparePart; locale: Locale; onQuote: (part: SparePart) => void }) {
  const t = useTranslations("parts");

  return (
    <article className="card-hover rounded-xl border border-slate-100 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-bold text-dark-blue">{getLocalizedField(part, "name", locale)}</h3>
        <span className="text-xs text-slate-500">{part.part_number}</span>
      </div>
      <p className="mb-2 text-sm text-slate-600">{getLocalizedField(part, "description", locale)}</p>
      <p className="mb-3 text-xs text-slate-500">{part.compatible_brands.join(", ")}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-accent">{part.price_mad ? formatPrice(part.price_mad, locale) : "MAD"}</span>
        <button className="rounded-full bg-blue px-3 py-1.5 text-xs font-semibold text-white" onClick={() => onQuote(part)}>
          {t("requestQuote")}
        </button>
      </div>
    </article>
  );
}
