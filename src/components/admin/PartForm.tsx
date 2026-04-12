"use client";


import type { SparePart } from "@/types";

export default function PartForm({ part, actionLabel }: { part?: Partial<SparePart>; actionLabel: string }) {
  return (
    <div className="ui-surface grid gap-3 rounded-xl p-4">
      <input name="slug" defaultValue={part?.slug} placeholder="slug" className="ui-input" />
      <input name="part_number" defaultValue={part?.part_number} placeholder="part number" className="ui-input" />
      <input name="name_fr" defaultValue={part?.name_fr} placeholder="name fr" className="ui-input" />
      <input name="price_mad" defaultValue={part?.price_mad} placeholder="price" className="ui-input" />
      <button type="submit" className="ui-btn-accent w-fit px-4 py-2 text-sm">{actionLabel}</button>
    </div>
  );
}
