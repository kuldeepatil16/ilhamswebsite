import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="ui-page mx-auto max-w-3xl px-4 py-24 text-center">
      <div className="ui-surface rounded-xl p-8">
        <h1 className="ui-text mb-3 text-4xl font-extrabold">{t("title")}</h1>
        <p className="ui-muted mb-8">{t("subtitle")}</p>
        <Link href="/fr" className="ui-btn-accent px-6 py-3">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
