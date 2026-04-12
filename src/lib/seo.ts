import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export function buildPageMetadata({
  title,
  description,
  locale,
  path,
}: {
  title: string;
  description: string;
  locale: string;
  path: string;
}): Metadata {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${SITE_URL}/${locale}${pathname === "/" ? "" : pathname}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: `${SITE_URL}/fr${pathname === "/" ? "" : pathname}`,
        ar: `${SITE_URL}/ar${pathname === "/" ? "" : pathname}`,
        en: `${SITE_URL}/en${pathname === "/" ? "" : pathname}`,
        "x-default": `${SITE_URL}/fr${pathname === "/" ? "" : pathname}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      images: [`${SITE_URL}/images/og-image.jpg`],
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/images/og-image.jpg`],
    },
  };
}
