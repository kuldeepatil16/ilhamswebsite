"use client";


import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import PartCard from "@/components/parts/PartCard";
import PartSearch from "@/components/parts/PartSearch";
import PartQuoteForm from "@/components/parts/PartQuoteForm";
import { useParts } from "@/hooks/useParts";
import type { Locale, SparePart } from "@/types";

export default function PartsCatalog() {
  const { data } = useParts();
  const locale = useLocale() as Locale;
  const t = useTranslations("parts");
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<SparePart | null>(null);

  const brands = useMemo(() => Array.from(new Set(data.flatMap((part) => part.compatible_brands))).sort(), [data]);

  const filtered = useMemo(
    () =>
      data.filter((part) => {
        const text = `${part.name_fr} ${part.part_number || ""}`.toLowerCase();
        const matchesSearch = !search || text.includes(search.toLowerCase());
        const matchesBrand = !brand || part.compatible_brands.includes(brand);
        const matchesCategory =
          !category || part.compatible_categories.includes(category as never);
        return matchesSearch && matchesBrand && matchesCategory;
      }),
    [data, search, brand, category]
  );

  return (
    <div className="ui-page mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="ui-surface overflow-hidden rounded-[2rem] border border-border/80 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Parts catalog</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="ui-surface rounded-[2rem] border border-border/80 p-5 shadow-card">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Parts</p>
              <p className="mt-1 font-bold text-foreground">{filtered.length}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Brands</p>
              <p className="mt-1 font-bold text-foreground">{brands.length}</p>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border/70 bg-surface-soft p-4 text-sm text-muted-foreground">
            Genuine components, quoted on request, with compatibility filtering by appliance family.
          </div>
        </div>
      </section>
      <div className="mt-6 ui-surface rounded-[1.5rem] border border-border/80 p-5 shadow-card">
        <PartSearch
          search={search}
          brand={brand}
          category={category}
          onSearch={setSearch}
          onBrand={setBrand}
          onCategory={setCategory}
          brands={brands}
        />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((part) => (
          <PartCard key={part.id} part={part} locale={locale} onQuote={setSelected} />
        ))}
      </div>
      <PartQuoteForm part={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
