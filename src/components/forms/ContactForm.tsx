"use client";


import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/types";
import { SERVICE_TYPES } from "@/lib/constants";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().or(z.literal("")).optional(),
  service_type: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ sourcePage = "contact" }: { sourcePage?: string }) {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    const res = await fetch(API_ENDPOINTS.contact, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, source_page: sourcePage, locale }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }

    reset();
    setStatus("ok");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {status === "ok" ? <p className="ui-alert-success text-sm">{t("successMessage")}</p> : null}
      {status === "error" ? <p className="ui-alert-error text-sm">{t("errorMessage")}</p> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="ui-text mb-1 block text-sm font-medium">{t("name")}</label>
          <input {...register("name")} className="ui-input" />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{t("validation.nameRequired")}</p> : null}
        </div>
        <div>
          <label className="ui-text mb-1 block text-sm font-medium">{t("phone")}</label>
          <input {...register("phone")} className="ui-input" />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{t("validation.phoneRequired")}</p> : null}
        </div>
      </div>

      <div>
        <label className="ui-text mb-1 block text-sm font-medium">{t("email")}</label>
        <input type="email" {...register("email")} className="ui-input" />
      </div>

      <div>
        <label className="ui-text mb-1 block text-sm font-medium">{t("service")}</label>
        <select {...register("service_type")} className="ui-input">
          <option value="">-</option>
          {SERVICE_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="ui-text mb-1 block text-sm font-medium">{t("message")}</label>
        <textarea {...register("message")} rows={4} className="ui-input" />
      </div>

      <button disabled={status === "loading"} className="ui-btn-accent px-5 py-2.5" type="submit">
        {status === "loading" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
