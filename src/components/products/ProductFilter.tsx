"use client";


import { useTranslations } from "next-intl";
import { BRANDS, PRODUCT_CATEGORIES } from "@/lib/constants";

export default function ProductFilter({
  category,
  brand,
  onCategory,
  onBrand,
}: {
  category: string;
  brand: string;
  onCategory: (value: string) => void;
  onBrand: (value: string) => void;
}) {
  const t = useTranslations("products");

  return (
    <aside className="ui-surface space-y-4 rounded-xl p-4">
      <div>
        <p className="ui-text mb-2 text-sm font-semibold">{t("filterByCategory")}</p>
        <select value={category} onChange={(e) => onCategory(e.target.value)} className="ui-input">
          <option value="">{t("allCategories")}</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {t(`categories.${cat}`)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="ui-text mb-2 text-sm font-semibold">{t("filterByBrand")}</p>
        <select value={brand} onChange={(e) => onBrand(e.target.value)} className="ui-input">
          <option value="">{t("allBrands")}</option>
          {BRANDS.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
