"use client";

﻿"use client";

import type { Product } from "@/types";

export default function ProductForm({ product, actionLabel }: { product?: Partial<Product>; actionLabel: string }) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <input name="slug" defaultValue={product?.slug} placeholder="slug" className="rounded-lg border border-slate-200 px-3 py-2" />
      <input name="brand" defaultValue={product?.brand} placeholder="brand" className="rounded-lg border border-slate-200 px-3 py-2" />
      <input name="name_fr" defaultValue={product?.name_fr} placeholder="name fr" className="rounded-lg border border-slate-200 px-3 py-2" />
      <input name="price_mad" defaultValue={product?.price_mad} placeholder="price" className="rounded-lg border border-slate-200 px-3 py-2" />
      <button type="submit" className="w-fit rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy">{actionLabel}</button>
    </div>
  );
}
