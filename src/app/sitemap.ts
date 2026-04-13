import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/constants";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const basePages = ["", "/services", "/products", "/parts", "/about", "/promotions", "/contact", "/blog"];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const page of basePages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createAdminClient();
    const [{ data: products }, { data: posts }] = await Promise.all([
      admin.from("products").select("slug").eq("is_active", true),
      admin.from("blog_posts").select("slug").eq("is_published", true),
    ]);

    for (const locale of LOCALES) {
      for (const product of products ?? []) {
        entries.push({
          url: `${SITE_URL}/${locale}/products/${product.slug}`,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }

      for (const post of posts ?? []) {
        entries.push({
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
