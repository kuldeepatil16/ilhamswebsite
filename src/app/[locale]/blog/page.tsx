import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost, Locale } from "@/types";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return buildPageMetadata({ title: t("title"), description: t("description"), locale, path: "/blog" });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="ui-page mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="ui-surface rounded-xl p-5">
        <h1 className="ui-text text-3xl font-extrabold">{t("title")}</h1>
        <p className="ui-muted mt-2">{t("subtitle")}</p>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(data as BlogPost[] | null)?.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale as Locale} />
        ))}
      </div>
      <Link href={`/${locale}`} className="ui-link mt-6 inline-block text-sm font-semibold">
        {t("backToBlog")}
      </Link>
    </div>
  );
}
