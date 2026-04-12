"use client";


import { useTranslations } from "next-intl";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

export default function PartSearch({
  search,
  brand,
  category,
  onSearch,
  onBrand,
  onCategory,
  brands,
}: {
  search: string;
  brand: string;
  category: string;
  onSearch: (value: string) => void;
  onBrand: (value: string) => void;
  onCategory: (value: string) => void;
  brands: string[];
}) {
  const t = useTranslations("parts");

  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={t("search")}
        className="rounded-lg border border-slate-200 px-3 py-2"
      />
      <select value={brand} onChange={(e) => onBrand(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2">
        <option value="">{t("allBrands")}</option>
        {brands.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select value={category} onChange={(e) => onCategory(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2">
        <option value="">{t("allCategories")}</option>
        {PRODUCT_CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {t(`products.categories.${item}` as never)}
          </option>
        ))}
      </select>
    </div>
  );
}
