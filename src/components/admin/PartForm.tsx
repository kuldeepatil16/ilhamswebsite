"use client";


import { useTranslations } from "next-intl";
import type { SparePart } from "@/types";

export default function PartForm({ part, actionLabel }: { part?: Partial<SparePart>; actionLabel: string }) {
  const t = useTranslations("admin.form");

  return (
    <div className="ui-surface grid gap-4 rounded-2xl border border-border/80 p-5 shadow-card">
      {part?.id ? <input type="hidden" name="id" value={part.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("slug")}</span>
          <input name="slug" defaultValue={part?.slug} placeholder={t("slug")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("partNumber")}</span>
          <input name="part_number" defaultValue={part?.part_number} placeholder={t("partNumber")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("priceMad")}</span>
          <input name="price_mad" defaultValue={part?.price_mad} placeholder={t("priceMad")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("sortOrder")}</span>
          <input name="sort_order" defaultValue={part?.sort_order ?? 0} placeholder={t("sortOrder")} className="ui-input" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-foreground">
        <span>{t("nameFr")}</span>
        <input name="name_fr" defaultValue={part?.name_fr} placeholder={t("nameFr")} className="ui-input" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-foreground">
        <span>{t("descriptionFr")}</span>
        <textarea name="description_fr" defaultValue={part?.description_fr} placeholder={t("descriptionFr")} rows={5} className="ui-input" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("compatibleBrands")}</span>
          <input name="compatible_brands" defaultValue={part?.compatible_brands?.join(", ")} placeholder={t("compatibleBrands")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("compatibleCategories")}</span>
          <input name="compatible_categories" defaultValue={part?.compatible_categories?.join(", ")} placeholder={t("compatibleCategories")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("imageUrl")}</span>
          <input name="image_url" defaultValue={part?.image_url} placeholder={t("imageUrl")} className="ui-input" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex items-center gap-2 rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground">
          <input type="checkbox" name="in_stock" defaultChecked={part?.in_stock ?? true} />
          {t("inStock")}
        </label>
        <label className="flex items-center gap-2 rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground">
          <input type="checkbox" name="is_active" defaultChecked={part?.is_active ?? true} />
          {t("active")}
        </label>
      </div>
      <button type="submit" className="ui-btn-accent w-fit px-5 py-3 text-sm font-semibold">
        {actionLabel}
      </button>
    </div>
  );
}
