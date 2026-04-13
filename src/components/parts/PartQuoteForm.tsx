"use client";


import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SparePart } from "@/types";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

export default function PartQuoteForm({ part, onClose }: { part: SparePart | null; onClose: () => void }) {
  const t = useTranslations("parts.quoteForm");
  const tq = useTranslations("quote");
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

    const res = await fetch(API_ENDPOINTS.quote, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setMessage(res.ok ? tq("successMessage") : tq("errorMessage"));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-overlay/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="ui-surface w-full max-w-md rounded-xl p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-3 text-lg font-bold">{t("title")}</h3>
        <form action={onSubmit} className="space-y-3">
          <input name="name" required placeholder={t("name")} className="ui-input" />
          <input name="phone" required placeholder={t("phone")} className="ui-input" />
          <input name="email" placeholder={t("email")} className="ui-input" />
          <input type="number" name="quantity" min={1} defaultValue={1} className="ui-input" />
          <textarea name="message" placeholder={t("message")} className="ui-input" />
          <button className="ui-btn-accent px-4 py-2">{t("submit")}</button>
        </form>
        {message ? <p className="ui-muted mt-2 text-sm">{message}</p> : null}
      </div>
    </div>
  );
}
