"use client";


import { useTranslations } from "next-intl";
import type { Product } from "@/types";

export default function ProductForm({ product, actionLabel }: { product?: Partial<Product>; actionLabel: string }) {
  const t = useTranslations("admin.form");

  return (
    <div className="ui-surface grid gap-4 rounded-2xl border border-border/80 p-5 shadow-card">
      {product?.id ? <input type="hidden" name="id" value={product.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("slug")}</span>
          <input name="slug" defaultValue={product?.slug} placeholder={t("slug")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("brand")}</span>
          <input name="brand" defaultValue={product?.brand} placeholder={t("brand")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("category")}</span>
          <input name="category" defaultValue={product?.category} placeholder={t("category")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("priceMad")}</span>
          <input name="price_mad" defaultValue={product?.price_mad} placeholder={t("priceMad")} className="ui-input" />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-foreground">
        <span>{t("nameFr")}</span>
        <input name="name_fr" defaultValue={product?.name_fr} placeholder={t("nameFr")} className="ui-input" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-foreground">
        <span>{t("descriptionFr")}</span>
        <textarea name="description_fr" defaultValue={product?.description_fr} placeholder={t("descriptionFr")} rows={5} className="ui-input" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("imageUrl")}</span>
          <input name="image_url" defaultValue={product?.image_url} placeholder={t("imageUrl")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground md:col-span-2">
          <span>{t("galleryUrls")}</span>
          <textarea name="gallery_urls" defaultValue={product?.gallery_urls?.join("\n")} placeholder={t("galleryUrls")} rows={3} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("metaTitleFr")}</span>
          <input name="meta_title_fr" defaultValue={product?.meta_title_fr} placeholder={t("metaTitleFr")} className="ui-input" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("metaDescriptionFr")}</span>
          <input name="meta_description_fr" defaultValue={product?.meta_description_fr} placeholder={t("metaDescriptionFr")} className="ui-input" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{t("sortOrder")}</span>
          <input name="sort_order" defaultValue={product?.sort_order ?? 0} placeholder={t("sortOrder")} className="ui-input" />
        </label>
        <label className="flex items-center gap-2 rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground">
          <input type="checkbox" name="is_active" defaultChecked={product?.is_active ?? true} />
          {t("active")}
        </label>
        <label className="flex items-center gap-2 rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground">
          <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? false} />
          {t("featured")}
        </label>
      </div>
      <button type="submit" className="ui-btn-accent w-fit px-5 py-3 text-sm font-semibold">
        {actionLabel}
      </button>
    </div>
  );
}
