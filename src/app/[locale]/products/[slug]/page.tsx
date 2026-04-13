import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import ProductDetailView from "@/components/products/ProductDetailView";
import { createClient } from "@/lib/supabase/server";
import { buildPageMetadata } from "@/lib/seo";
import { getLocalizedField } from "@/lib/utils";
import type { Locale, Product, SparePart } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  const product = data as Product | null;
  const t = await getTranslations({ locale, namespace: "metadata.products" });
  return buildPageMetadata({
    title: product ? `${getLocalizedField(product, "name", locale as Locale)} | Vereen Electro Froid` : t("title"),
    description: product ? getLocalizedField(product, "description", locale as Locale) || t("description") : t("description"),
    locale,
    path: `/products/${slug}`,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  const product = data as Product | null;

  if (!product) {
    notFound();
  }

  const [{ data: related }, { data: parts }] = await Promise.all([
    supabase
      .from("products")
      .select("id,slug,name_fr,name_ar,name_en,image_url,price_mad,category,brand,is_featured,is_active,sort_order,created_at,updated_at")
      .eq("category", product.category)
      .neq("id", product.id)
      .limit(3),
    supabase
      .from("spare_parts")
      .select("id,slug,part_number,compatible_brands,compatible_categories,name_fr,name_ar,name_en,description_fr,description_ar,description_en,price_mad,image_url,in_stock,is_active,sort_order,created_at,updated_at")
      .contains("compatible_brands", [product.brand.toLowerCase()])
      .limit(3),
  ]);

  return (
    <ProductDetailView
      product={product}
      relatedProducts={(related as Product[] | null) || []}
      compatibleParts={(parts as SparePart[] | null) || []}
    />
  );
}
