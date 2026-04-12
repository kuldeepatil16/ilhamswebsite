"use client";


import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SparePart } from "@/types";

export default function PartQuoteForm({ part, onClose }: { part: SparePart | null; onClose: () => void }) {
  const t = useTranslations("parts.quoteForm");
  const [message, setMessage] = useState<string | null>(null);

  if (!part) return null;
  const selectedPart = part;

  async function onSubmit(formData: FormData) {
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      items: [{ part_id: selectedPart.id, name: selectedPart.name_fr, quantity: Number(formData.get("quantity") || 1) }],
    };

    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(res.ok ? "OK" : "Error");
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-3 text-lg font-bold">{t("title")}</h3>
        <form action={onSubmit} className="space-y-3">
          <input name="name" required placeholder={t("name")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <input name="phone" required placeholder={t("phone")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <input name="email" placeholder={t("email")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <input type="number" name="quantity" min={1} defaultValue={1} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <textarea name="message" placeholder={t("message")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <button className="rounded-full bg-accent px-4 py-2 font-bold text-navy">{t("submit")}</button>
        </form>
        {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
      </div>
    </div>
  );
}
