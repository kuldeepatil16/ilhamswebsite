"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import type { BlogPost, Locale } from "@/types";
import { formatDate, getLocalizedField } from "@/lib/utils";
import { getHeroVisualUrl } from "@/lib/visuals";

export default function BlogCard({ post, locale }: { post: BlogPost; locale: Locale }) {
  const t = useTranslations("blog");

  return (
    <article className="ui-surface card-hover overflow-hidden rounded-xl shadow-card">
      <img
        src={post.cover_image_url || getHeroVisualUrl(getLocalizedField(post, "title", locale), getLocalizedField(post, "excerpt", locale), post.slug)}
        alt={getLocalizedField(post, "title", locale)}
        className="h-44 w-full object-cover"
        onError={(event) => {
          event.currentTarget.src = getHeroVisualUrl(
            getLocalizedField(post, "title", locale),
            getLocalizedField(post, "excerpt", locale),
            post.slug
          );
        }}
      />
      <div className="p-4">
        <p className="ui-soft text-xs">{post.published_at ? formatDate(post.published_at, locale) : ""}</p>
        <h3 className="ui-text mt-1 text-lg font-bold">{getLocalizedField(post, "title", locale)}</h3>
        <p className="ui-muted mt-2 line-clamp-3 text-sm">{getLocalizedField(post, "excerpt", locale)}</p>
        <Link href={`/${locale}/blog/${post.slug}`} className="ui-link mt-3 inline-block text-sm font-semibold">
          {t("readMore")}
        </Link>
      </div>
    </article>
  );
}
