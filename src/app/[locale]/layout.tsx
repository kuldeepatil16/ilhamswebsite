import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import LocaleDocumentSync from "@/components/layout/LocaleDocumentSync";
import { buildPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/",
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={isRTL ? "rtl" : "ltr"} lang={locale} className={isRTL ? "font-arabic" : "font-dm"}>
        <LocaleDocumentSync locale={locale} dir={isRTL ? "rtl" : "ltr"} />
        <Navbar />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </NextIntlClientProvider>
  );
}
