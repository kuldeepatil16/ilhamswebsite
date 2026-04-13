"use client";

import { useTranslations } from "next-intl";

export default function BlogEditor({ content = "" }: { content?: string }) {
  const t = useTranslations("admin.form");

  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      <span>{t("contentFr")}</span>
      <textarea name="content_fr" defaultValue={content} rows={12} className="ui-input min-h-40" />
    </label>
  );
}
