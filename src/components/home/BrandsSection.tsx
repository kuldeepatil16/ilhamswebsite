"use client";

import { useTranslations } from "next-intl";
import { BRANDS } from "@/lib/constants";

export default function BrandsSection() {
  const t = useTranslations("brands");

  return (
    <section className="ui-hero py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-contrast">{t("title")}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-contrast-muted">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {BRANDS.map((brand) => (
            <span key={brand} className="rounded-full border border-contrast/20 bg-contrast/5 px-4 py-2 text-sm font-semibold text-contrast">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
