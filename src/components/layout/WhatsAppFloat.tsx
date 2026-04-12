"use client";

﻿"use client";

import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { COMPANY, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import type { Locale } from "@/types";

export default function WhatsAppFloat() {
  const t = useTranslations("whatsapp");
  const locale = useLocale() as Locale;
  const link = `${COMPANY.whatsappUrl}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE[locale])}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={t("tooltip")}
      className="pulse-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl"
    >
      <MessageCircle size={26} />
    </a>
  );
}
