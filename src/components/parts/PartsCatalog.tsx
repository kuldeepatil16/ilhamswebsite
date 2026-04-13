"use client";


import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import PartCard from "@/components/parts/PartCard";
import PartSearch from "@/components/parts/PartSearch";
import PartQuoteForm from "@/components/parts/PartQuoteForm";
import { useParts } from "@/hooks/useParts";
import type { Locale, SparePart } from "@/types";

export default function PartsCatalog() {
  const { data } = useParts();
  const locale = useLocale() as Locale;
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
      <div className="ui-surface rounded-xl p-5">
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
