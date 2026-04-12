"use client";


import type { SparePart } from "@/types";

export default function PartForm({ part, actionLabel }: { part?: Partial<SparePart>; actionLabel: string }) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <input name="slug" defaultValue={part?.slug} placeholder="slug" className="rounded-lg border border-slate-200 px-3 py-2" />
      <input name="part_number" defaultValue={part?.part_number} placeholder="part number" className="rounded-lg border border-slate-200 px-3 py-2" />
      <input name="name_fr" defaultValue={part?.name_fr} placeholder="name fr" className="rounded-lg border border-slate-200 px-3 py-2" />
      <input name="price_mad" defaultValue={part?.price_mad} placeholder="price" className="rounded-lg border border-slate-200 px-3 py-2" />
      <button type="submit" className="w-fit rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy">{actionLabel}</button>
    </div>
  );
}
