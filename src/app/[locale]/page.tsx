import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import BrandsSection from "@/components/home/BrandsSection";
import ProductsPreview from "@/components/home/ProductsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCTA from "@/components/home/ContactCTA";
import { COMPANY } from "@/lib/constants";
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

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vereen Electro Froid",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Hoceima",
      addressLocality: "Al Hoceima",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    telephone: [COMPANY.phone1, COMPANY.phone2],
    url: "https://vereenelectrofroid.ma",
    email: COMPANY.email,
    sameAs: [COMPANY.instagramUrl],
    areaServed: "Morocco",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Climatisation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Réfrigération" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Énergie solaire" } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <BrandsSection />
      <ProductsPreview />
      <WhyChooseUs />
      <ContactCTA />
    </>
  );
}
