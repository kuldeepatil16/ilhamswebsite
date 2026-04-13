import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import BrandsSection from "@/components/home/BrandsSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProductsPreview from "@/components/home/ProductsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCTA from "@/components/home/ContactCTA";
import { buildPageMetadata } from "@/lib/seo";

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

export default async function HomePage() {
  return (
    <main className="ui-page">
      <HeroSection />
      <BrandsSection />
      <StatsBar />
      <ServicesGrid />
      <ProductsPreview />
      <WhyChooseUs />
      <ContactCTA />
    </main>
  );
}
