import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations();
  return <div className="ui-muted mx-auto max-w-3xl px-4 py-24 text-center">{t("loading")}</div>;
}
