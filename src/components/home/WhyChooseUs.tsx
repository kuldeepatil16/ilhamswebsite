"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Timer, Wallet } from "lucide-react";

const icons = [Zap, Timer, ShieldCheck, Wallet];

export default function WhyChooseUs() {
  const t = useTranslations("why");

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-2 text-center text-3xl font-extrabold text-dark-blue">{t("title")}</h2>
        <p className="mb-10 text-center text-slate-600">{t("subtitle")}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => {
            const Icon = icons[idx];
            return (
              <article key={idx} className="card-hover rounded-xl border border-slate-100 bg-white p-6 text-center shadow-card">
                <Icon className="mx-auto mb-3 text-blue" />
                <h3 className="mb-2 font-bold text-dark-blue">{t(`items.${idx}.title`)}</h3>
                <p className="text-sm text-slate-600">{t(`items.${idx}.desc`)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
