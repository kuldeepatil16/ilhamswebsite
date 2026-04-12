import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/about" });
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const values = t.raw("values.items") as string[];

  return (
    <div className="ui-page">
      <section className="bg-gradient-to-br from-navy via-dark-blue to-blue py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-extrabold">{t("title")}</h1>
          <p className="mt-3 max-w-3xl text-white/75">{t("story.content")}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <article className="ui-surface rounded-xl p-6">
          <h2 className="ui-text text-2xl font-bold">{t("mission.title")}</h2>
          <p className="ui-muted mt-2">{t("mission.content")}</p>
        </article>
        <article className="ui-surface rounded-xl p-6">
          <h2 className="ui-text text-2xl font-bold">{t("vision.title")}</h2>
          <p className="ui-muted mt-2">{t("vision.content")}</p>
        </article>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 lg:px-8">
        <h3 className="ui-text mb-3 text-xl font-bold">{t("values.title")}</h3>
        <div className="flex flex-wrap gap-2">
          {values.map((value) => (
            <span key={value} className="rounded-full bg-ice px-4 py-2 text-sm ui-text">{value}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
