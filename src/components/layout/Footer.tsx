"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Globe, MessageCircle, Phone, Mail, MapPin, Printer } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import type { Locale } from "@/types";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  const quickLinks = [
    ["", t("nav.home")],
    ["/services", t("nav.services")],
    ["/products", t("nav.products")],
    ["/parts", t("nav.parts")],
    ["/about", t("nav.about")],
    ["/blog", t("nav.blog")],
    ["/contact", t("nav.contact")],
  ] as const;

  return (
    <footer className="border-t border-border bg-surface-soft text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 lg:px-8">
        <div>
          <img src="/images/logo.svg" alt={t("accessibility.logoAlt")} className="mb-4 h-10 w-auto" />
          <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">{t("footer.quickLinks")}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            {quickLinks.map(([path, label]) => (
              <Link key={path} href={`/${locale}${path}`} className="block hover:text-foreground">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">{t("footer.contact")}</h3>
          <p className="flex items-center gap-2"><Phone size={14} /> {COMPANY.phone1}</p>
          <p className="flex items-center gap-2"><Phone size={14} /> {COMPANY.phone2}</p>
          <p className="flex items-center gap-2"><Printer size={14} /> {COMPANY.fax}</p>
          <p className="flex items-center gap-2"><Mail size={14} /> {COMPANY.email}</p>
          <p className="flex items-start gap-2"><MapPin size={14} className="mt-1" /> {COMPANY.addressFull}</p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">{t("footer.followUs")}</h3>
          <div className="flex gap-3">
            <a href={COMPANY.whatsappUrl} className="bg-whatsapp rounded-full p-2 text-contrast" aria-label={t("accessibility.whatsappContact")}>
              <MessageCircle size={16} />
            </a>
            <a href={COMPANY.instagramUrl} className="rounded-full bg-muted p-2 text-foreground" aria-label="Instagram">
              <Globe size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        Â© {new Date().getFullYear()} {COMPANY.name}. {t("footer.rights")}
      </div>
    </footer>
  );
}
