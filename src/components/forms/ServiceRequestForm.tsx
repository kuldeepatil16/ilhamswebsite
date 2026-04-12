"use client";


import { useState } from "react";
import { useTranslations } from "next-intl";
import { SERVICE_TYPES } from "@/lib/constants";

export default function ServiceRequestForm() {
  const t = useTranslations("serviceRequest");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const payload = Object.fromEntries(formData.entries());
    const res = await fetch("/api/service-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage(t("successMessage"));
      (document.getElementById("service-request-form") as HTMLFormElement | null)?.reset();
    } else {
      setMessage(t("errorMessage"));
    }

    setLoading(false);
  }

  return (
    <form id="service-request-form" action={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder={t("name")} className="rounded-xl border border-slate-200 px-3 py-2" />
        <input name="phone" required placeholder={t("phone")} className="rounded-xl border border-slate-200 px-3 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" placeholder={t("email")} className="rounded-xl border border-slate-200 px-3 py-2" />
        <input name="city" placeholder={t("city")} className="rounded-xl border border-slate-200 px-3 py-2" />
      </div>
      <select name="service_type" required className="w-full rounded-xl border border-slate-200 px-3 py-2">
        <option value="">{t("serviceType")}</option>
        {SERVICE_TYPES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <textarea name="problem_description" rows={3} placeholder={t("problemDesc")} className="w-full rounded-xl border border-slate-200 px-3 py-2" />
      <button className="rounded-full bg-accent px-5 py-2.5 font-bold text-navy" disabled={loading}>
        {loading ? t("submitting") : t("submit")}
      </button>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
    </form>
  );
}
