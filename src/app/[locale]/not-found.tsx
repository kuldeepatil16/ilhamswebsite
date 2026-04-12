import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="mb-3 text-4xl font-extrabold text-dark-blue">{t("title")}</h1>
      <p className="mb-8 text-slate-600">{t("subtitle")}</p>
      <Link href="/fr" className="rounded-full bg-accent px-6 py-3 font-semibold text-navy">
        {t("backHome")}
      </Link>
    </div>
  );
}
