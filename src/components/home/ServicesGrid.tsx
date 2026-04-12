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
    <section className="ui-page py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="ui-text text-3xl font-extrabold md:text-4xl">{t("title")}</h2>
          <p className="ui-muted mt-2">{t("subtitle")}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => {
            const Icon = icons[index];
            return (
              <article key={index} className="ui-surface card-hover rounded-xl p-6 shadow-card">
                <Icon className="mb-4 text-blue" />
                <h3 className="ui-text mb-2 text-lg font-bold">{t(`items.${index}.title`)}</h3>
                <p className="ui-muted mb-4 text-sm">{t(`items.${index}.desc`)}</p>
                <Link href={`/${locale}/services`} className="ui-link text-sm font-semibold">
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
