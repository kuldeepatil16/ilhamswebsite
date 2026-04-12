import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PartsCatalog from "@/components/parts/PartsCatalog";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.parts" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/parts" });
}

export default function PartsPage() {
  return <PartsCatalog />;
}
