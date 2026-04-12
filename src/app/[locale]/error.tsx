"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("error");

  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 className="ui-text mb-4 text-3xl font-bold">{t("title")}</h2>
      <div className="flex justify-center gap-3">
        <button onClick={() => reset()} className="ui-btn-primary px-5 py-2.5">
          {t("retry")}
        </button>
        <Link href="/fr" className="ui-btn-accent px-5 py-2.5">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
