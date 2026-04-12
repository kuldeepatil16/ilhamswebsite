import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import ServiceRequestForm from "@/components/forms/ServiceRequestForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/services" });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("services");

  return (
    <div className="ui-page">
      <section className="bg-gradient-to-br from-navy via-dark-blue to-blue py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-extrabold">{t("title")}</h1>
          <p className="mt-3 text-white/75">{t("subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 lg:px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="ui-surface rounded-xl p-6">
            <h2 className="ui-text text-xl font-bold">{t(`items.${i}.title`)}</h2>
            <p className="ui-muted mt-2">{t(`items.${i}.fullDesc`)}</p>
            <ul className="ui-muted mt-4 grid gap-1 text-sm md:grid-cols-2">
              {Array.from({ length: 6 }).map((__, j) => (
                <li key={j}>- {t(`items.${i}.includes.${j}`)}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 lg:px-8">
        <ServiceRequestForm />
        <div className="mt-4">
          <Link href={`/${locale}/contact`} className="ui-link text-sm font-semibold">
            {t("requestService")}
          </Link>
        </div>
      </section>
    </div>
  );
}
