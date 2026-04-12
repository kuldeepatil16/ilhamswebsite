"use client";


import type { Product } from "@/types";

export default function ProductForm({ product, actionLabel }: { product?: Partial<Product>; actionLabel: string }) {
  return (
    <div className="ui-surface grid gap-3 rounded-xl p-4">
      <input name="slug" defaultValue={product?.slug} placeholder="slug" className="ui-input" />
      <input name="brand" defaultValue={product?.brand} placeholder="brand" className="ui-input" />
      <input name="name_fr" defaultValue={product?.name_fr} placeholder="name fr" className="ui-input" />
      <input name="price_mad" defaultValue={product?.price_mad} placeholder="price" className="ui-input" />
      <button type="submit" className="ui-btn-accent w-fit px-4 py-2 text-sm">{actionLabel}</button>
    </div>
  );
}
