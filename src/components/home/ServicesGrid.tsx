"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Snowflake, Sun, Wind, Wrench, Building2, Shield } from "lucide-react";
import type { Locale } from "@/types";

const icons = [Snowflake, Wind, Sun, Wrench, Building2, Shield];

export default function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-dark-blue md:text-4xl">{t("title")}</h2>
          <p className="mt-2 text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => {
            const Icon = icons[index];
            return (
              <article key={index} className="card-hover rounded-xl border border-slate-100 bg-white p-6 shadow-card">
                <Icon className="mb-4 text-blue" />
                <h3 className="mb-2 text-lg font-bold text-dark-blue">{t(`items.${index}.title`)}</h3>
                <p className="mb-4 text-sm text-slate-600">{t(`items.${index}.desc`)}</p>
                <Link href={`/${locale}/services`} className="text-sm font-semibold text-blue">
                  {t("learnMore")}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
