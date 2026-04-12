"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Timer, Wallet } from "lucide-react";

const icons = [Zap, Timer, ShieldCheck, Wallet];

export default function WhyChooseUs() {
  const t = useTranslations("why");

  return (
    <section className="ui-page py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="ui-text mb-2 text-center text-3xl font-extrabold">{t("title")}</h2>
        <p className="ui-muted mb-10 text-center">{t("subtitle")}</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => {
            const Icon = icons[idx];
            return (
              <article key={idx} className="ui-surface card-hover rounded-xl p-6 text-center shadow-card">
                <Icon className="mx-auto mb-3 text-blue" />
                <h3 className="ui-text mb-2 font-bold">{t(`items.${idx}.title`)}</h3>
                <p className="ui-muted text-sm">{t(`items.${idx}.desc`)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
