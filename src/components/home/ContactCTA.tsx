"use client";

﻿import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { COMPANY } from "@/lib/constants";
import ContactForm from "@/components/forms/ContactForm";
import type { Locale } from "@/types";

export default function ContactCTA() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;

  return (
    <section className="bg-gradient-to-r from-dark-blue to-blue py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="mb-3 text-3xl font-extrabold">{t("title")}</h2>
          <p className="mb-6 text-white/80">{t("subtitle")}</p>
          <div className="space-y-2 text-sm text-white/85">
            <p>{COMPANY.phone1}</p>
            <p>{COMPANY.phone2}</p>
            <p>{COMPANY.email}</p>
            <p>{t("addressFull")}</p>
          </div>
          <div className="mt-6 flex gap-3">
            <Link href={`/${locale}/contact`} className="rounded-full bg-accent px-5 py-2.5 font-bold text-navy">
              {t("send")}
            </Link>
            <a href={COMPANY.whatsappUrl} className="rounded-full border border-white/40 px-5 py-2.5 font-semibold">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 text-dark-blue">
          <ContactForm sourcePage="home" />
        </div>
      </div>
    </section>
  );
}
