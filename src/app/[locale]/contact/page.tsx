import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/contact" });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="bg-slate-50 py-12">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h1 className="text-3xl font-extrabold text-dark-blue">{t("title")}</h1>
          <p className="mt-2 text-slate-600">{t("subtitle")}</p>
          <div className="mt-5 space-y-2 text-sm text-slate-700">
            <p>{COMPANY.phone1}</p>
            <p>{COMPANY.phone2}</p>
            <p>{COMPANY.fax}</p>
            <p>{COMPANY.email}</p>
            <p>{t("addressFull")}</p>
            <a href={COMPANY.whatsappUrl} className="text-blue">WhatsApp</a>
            <a href={COMPANY.instagramUrl} className="text-blue">Instagram</a>
          </div>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <iframe
              src={`https://maps.google.com/maps?q=${COMPANY.geo.lat},${COMPANY.geo.lng}&z=14&output=embed`}
              width="100%"
              height="260"
              style={{ border: 0 }}
              loading="lazy"
              title="Map"
            />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <ContactForm sourcePage="contact-page" />
        </div>
      </div>
    </div>
  );
}
