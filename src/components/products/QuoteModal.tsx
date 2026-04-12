"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuoteItem } from "@/types";

export default function QuoteModal({ open, onClose, item }: { open: boolean; onClose: () => void; item: QuoteItem | null }) {
  const t = useTranslations("quote");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!open || !item) return null;

  async function submit(formData: FormData) {
    setLoading(true);
    setResult(null);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      company_name: formData.get("company_name"),
      message: formData.get("message"),
      items: [item],
    };

    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    setResult(res.ok ? t("successMessage") : t("errorMessage"));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-4 text-lg font-bold text-dark-blue">{t("title")}</h3>
        <form action={submit} className="space-y-3">
          <input name="name" required placeholder={t("name")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <input name="phone" required placeholder={t("phone")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <input name="email" placeholder={t("email")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <textarea name="message" placeholder={t("message")} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy">
              {loading ? t("submitting") : t("submit")}
            </button>
            <button type="button" onClick={onClose} className="rounded-full border border-slate-300 px-4 py-2 text-sm">
              {tc("close")}
            </button>
          </div>
        </form>
        {result ? <p className="mt-3 text-sm text-slate-600">{result}</p> : null}
      </div>
    </div>
  );
}
