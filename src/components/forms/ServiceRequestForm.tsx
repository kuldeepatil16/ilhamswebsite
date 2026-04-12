"use client";


import { useState } from "react";
import { useTranslations } from "next-intl";
import { SERVICE_TYPES } from "@/lib/constants";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

export default function ServiceRequestForm() {
  const t = useTranslations("serviceRequest");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const payload = Object.fromEntries(formData.entries());
    const res = await fetch(API_ENDPOINTS.serviceRequest, {
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
    <form id="service-request-form" action={onSubmit} className="ui-surface space-y-4 rounded-xl p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder={t("name")} className="ui-input" />
        <input name="phone" required placeholder={t("phone")} className="ui-input" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" placeholder={t("email")} className="ui-input" />
        <input name="city" placeholder={t("city")} className="ui-input" />
      </div>
      <select name="service_type" required className="ui-input">
        <option value="">{t("serviceType")}</option>
        {SERVICE_TYPES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <textarea name="problem_description" rows={3} placeholder={t("problemDesc")} className="ui-input" />
      <button className="ui-btn-accent px-5 py-2.5" disabled={loading}>
        {loading ? t("submitting") : t("submit")}
      </button>
      {message ? <p className="ui-muted text-sm">{message}</p> : null}
    </form>
  );
}
