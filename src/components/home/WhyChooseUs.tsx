"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Timer, Wallet, Settings2, Waves } from "lucide-react";

const icons = [Zap, Timer, ShieldCheck, Wallet];
const proofPoints = [
  "Installation and commissioning",
  "Preventive maintenance plans",
  "Original spare parts sourcing",
  "Transparent quotes and follow-up",
];

export default function WhyChooseUs() {
  const t = useTranslations("why");

  return (
    <section className="ui-page py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#061b2e_0%,#0a2e4d_100%)] p-8 text-contrast shadow-[0_24px_60px_rgba(17,28,45,0.18)] md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Why Vereen Electro Froid</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-contrast md:text-5xl font-manrope">{t("title")}</h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-contrast-muted">{t("subtitle")}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "10+", label: "Years" },
              { value: "2000+", label: "Clients" },
              { value: "8", label: "Brands" },
              { value: "24h", label: "Response" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.4rem] bg-white/8 p-4 backdrop-blur">
                <div className="text-3xl font-black text-secondary-container font-manrope">{item.value}</div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-contrast-muted">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-white/8 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-contrast-muted">Operating principle</p>
            <p className="mt-3 text-lg leading-8 text-contrast">
              We do not sell generic service promises. We design stable thermal environments, source the right equipment, and keep the support chain simple.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => {
            const Icon = icons[idx];
            return (
              <article
                key={idx}
                className="rounded-[1.5rem] bg-surface-container-lowest p-6 shadow-[0_18px_40px_rgba(17,28,45,0.06)]"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted">
                    <Icon className="text-accent" />
                  </div>
                  <span className="rounded-full bg-secondary-container/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                    <Settings2 size={11} className="inline-block" /> Ready
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{t(`items.${idx}.title`)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(`items.${idx}.desc`)}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <Waves size={14} className="text-accent" />
                  {proofPoints[idx]}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
