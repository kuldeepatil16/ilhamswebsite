import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { buildPageMetadata } from "@/lib/seo";
import { formatPrice, getLocalizedField, getWhatsAppLink } from "@/lib/utils";
import type { Locale, Product } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.products" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/products" });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "products" });
  const supabase = await createClient();

  const { data } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  const product = data as Product | null;

  if (!product) {
    return <div className="ui-page mx-auto max-w-5xl px-4 py-16">Not found</div>;
  }

  const { data: related } = await supabase
    .from("products")
    .select("id,slug,name_fr,name_ar,name_en,image_url,price_mad,category,brand,is_featured,is_active,sort_order,created_at,updated_at")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(3);

  return (
    <div className="ui-page mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <img src={product.image_url || "/images/og-image.jpg"} alt={getLocalizedField(product, "name", typedLocale)} className="ui-border w-full rounded-xl object-cover" />
        <div className="ui-surface rounded-xl p-6">
          <h1 className="ui-text text-3xl font-extrabold">{getLocalizedField(product, "name", typedLocale)}</h1>
          <p className="ui-muted mt-3">{getLocalizedField(product, "description", typedLocale)}</p>
          <p className="mt-4 text-2xl font-black text-accent">{product.price_mad ? formatPrice(product.price_mad, typedLocale) : "MAD"}</p>
          <a
            href={getWhatsAppLink("212663572130", `Bonjour, je veux un devis pour ${product.name_fr}`)}
            className="bg-whatsapp mt-5 inline-block rounded-full px-6 py-3 font-bold text-contrast"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="ui-text mb-4 text-xl font-bold">{t("relatedProducts")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(related as Product[] | null)?.map((item) => (
            <Link key={item.id} href={`/${locale}/products/${item.slug}`} className="ui-surface rounded-xl p-4">
              <p className="ui-text font-semibold">{getLocalizedField(item, "name", typedLocale)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
