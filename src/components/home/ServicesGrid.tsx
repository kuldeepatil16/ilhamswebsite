"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Building2, ShieldCheck, Snowflake, SunMedium, Timer, Wrench, Wind } from "lucide-react";
import type { Locale } from "@/types";

const iconMap = [Snowflake, Wind, SunMedium, Wrench, Building2, ShieldCheck];
const spans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-8",
] as const;

export default function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section className="ui-page py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Service architecture</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-5xl font-manrope">{t("title")}</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="rounded-full bg-surface-container-lowest px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-card">
            Technical excellence since 2014
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {Array.from({ length: 6 }).map((_, index) => {
            const Icon = iconMap[index];
            const isFeature = index === 0;
            return (
              <article
                key={index}
                className={`${spans[index]} group overflow-hidden rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-[0_20px_50px_rgba(17,28,45,0.08)] transition duration-300 hover:-translate-y-1`}
              >
                <div className={`flex h-full flex-col ${isFeature ? "justify-between" : "justify-between"} gap-8`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted text-foreground">
                      <Icon size={28} className="text-accent" />
                    </div>
                    {index === 5 ? (
                      <span className="rounded-full bg-secondary-container/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                        <Timer size={11} className="inline-block" /> Fast response
                      </span>
                    ) : null}
                  </div>

                  <div className="max-w-xl">
                    <h3 className={`${isFeature ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"} font-black tracking-tight text-foreground font-manrope`}>
                      {t(`items.${index}.title`)}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                      {t(`items.${index}.desc`)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                      {index === 0 ? (
                        <>
                          <span className="rounded-full bg-muted px-3 py-1">Industrial</span>
                          <span className="rounded-full bg-muted px-3 py-1">Residential</span>
                          <span className="rounded-full bg-muted px-3 py-1">Commercial</span>
                        </>
                      ) : (
                        <span className="rounded-full bg-muted px-3 py-1">{t(`items.${index}.includes.0`)}</span>
                      )}
                    </div>
                    <Link href={`/${locale}/services`} className="ui-link text-sm font-semibold">
                      {t("learnMore")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
