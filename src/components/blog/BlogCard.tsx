"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { BlogPost, Locale } from "@/types";
import { formatDate, getLocalizedField } from "@/lib/utils";

export default function BlogCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const t = useTranslations("blog");

  return (
    <article className="card-hover overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card">
      <img src={post.cover_image_url || "/images/og-image.jpg"} alt={getLocalizedField(post, "title", locale)} className="h-44 w-full object-cover" />
      <div className="p-4">
        <p className="text-xs text-slate-500">{post.published_at ? formatDate(post.published_at, locale) : ""}</p>
        <h3 className="mt-1 text-lg font-bold text-dark-blue">{getLocalizedField(post, "title", locale)}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-600">{getLocalizedField(post, "excerpt", locale)}</p>
        <Link href={`/${locale}/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-blue">
          {t("readMore")}
        </Link>
      </div>
    </article>
  );
}
