import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import BlogContent from "@/components/blog/BlogContent";
import { getLocalizedField } from "@/lib/utils";
import type { BlogPost, Locale } from "@/types";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/blog" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
  const post = data as BlogPost | null;

  if (!post) {
    return <div className="mx-auto max-w-4xl px-4 py-14">Not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href={`/${locale}/blog`} className="ui-link text-sm font-semibold">{t("backToBlog")}</Link>
      <h1 className="ui-text mt-2 text-4xl font-extrabold">{getLocalizedField(post, "title", locale as Locale)}</h1>
      <img src={post.cover_image_url || "/images/og-image.jpg"} alt={getLocalizedField(post, "title", locale as Locale)} className="ui-border my-5 w-full rounded-xl" />
      <BlogContent content={getLocalizedField(post, "content", locale as Locale)} />
    </div>
  );
}
