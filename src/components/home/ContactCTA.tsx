"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { COMPANY } from "@/lib/constants";
import ContactForm from "@/components/forms/ContactForm";
import type { Locale } from "@/types";
import { Mail, MapPin, Phone, MessageCircle, ShieldCheck } from "lucide-react";

const contactPoints: Array<{ icon: typeof Phone; value: string }> = [
  { icon: Phone, value: COMPANY.phone1 },
  { icon: Phone, value: COMPANY.phone2 },
  { icon: Mail, value: COMPANY.email },
  { icon: MapPin, value: "" },
];

export default function ContactCTA() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;

  return (
    <section className="ui-page py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#061b2e_0%,#0a2e4d_100%)] p-8 text-contrast shadow-[0_24px_60px_rgb(var(--shadow)/0.18)] md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Contact and support</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-contrast md:text-5xl font-manrope">{t("title")}</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-contrast-muted">{t("subtitle")}</p>

            <div className="mt-8 space-y-3">
              {contactPoints.map(({ icon: Icon, value }, idx) => (
                <div key={`${idx}-${value}`} className="flex items-center gap-3 rounded-[1.2rem] bg-[rgb(var(--contrast)/0.08)] px-4 py-3 backdrop-blur">
                  <Icon size={16} className="text-secondary-container" />
                  <span className="text-sm text-contrast">{idx === 3 ? t("addressFull") : value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="ui-btn-accent px-5 py-3 text-sm">
                {t("send")}
              </Link>
              <a href={COMPANY.whatsappUrl} className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--contrast)/0.2)] bg-[rgb(var(--contrast)/0.05)] px-5 py-3 text-sm font-semibold text-contrast backdrop-blur">
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>

            <div className="mt-8 rounded-[1.4rem] bg-[rgb(var(--contrast)/0.08)] p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-secondary-container" />
                <div>
                  <p className="text-sm font-semibold text-contrast">Authorized service center</p>
                  <p className="text-sm text-contrast-muted">Fast replies, clear pricing, and follow-up from the same technical team.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-surface-container-lowest p-5 shadow-[0_20px_50px_rgba(17,28,45,0.08)] md:p-6">
            <ContactForm sourcePage="home" />
          </div>
        </div>
      </div>
    </section>
  );
}
