import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import BlogEditor from "@/components/admin/BlogEditor";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeOptionalText, sanitizeText, slugify } from "@/lib/utils";
import type { BlogPost } from "@/types";

export default async function AdminBlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ edit?: string }>;
}) {
  const { locale } = await params;
  const { edit } = (await searchParams) || {};
  const t = await getTranslations({ locale, namespace: "admin.blog" });
  const formT = await getTranslations({ locale, namespace: "admin.form" });
  const tc = await getTranslations({ locale, namespace: "admin" });
  const admin = createAdminClient();

  async function upsertPost(formData: FormData) {
    "use server";
    const admin = createAdminClient();
    const id = String(formData.get("id") || "").trim();
    const title = sanitizeText(formData.get("title_fr"));
    const payload = {
      slug: sanitizeText(formData.get("slug")) || slugify(title),
      title_fr: title,
      excerpt_fr: sanitizeOptionalText(formData.get("excerpt_fr")),
      content_fr: sanitizeText(formData.get("content_fr")),
      cover_image_url: sanitizeOptionalText(formData.get("cover_image_url")),
      tags: parseTags(formData.get("tags")),
      is_published: formData.get("is_published") === "on",
      published_at: formData.get("is_published") === "on" ? new Date().toISOString() : null,
    };

    if (id) {
      await admin.from("blog_posts").update(payload).eq("id", id);
    } else {
      await admin.from("blog_posts").insert(payload);
    }

    revalidatePath(`/${locale}/admin/blog`);
  }

  async function deletePost(formData: FormData) {
    "use server";
    const admin = createAdminClient();
    const id = String(formData.get("id") || "").trim();
    if (!id) return;
    await admin.from("blog_posts").delete().eq("id", id);
    revalidatePath(`/${locale}/admin/blog`);
  }

  function parseTags(value: FormDataEntryValue | null) {
    return String(value || "")
      .split(/[\n,]/)
      .map((tag) => sanitizeText(tag))
      .filter(Boolean);
  }

  const [{ data }, { data: editRow }] = await Promise.all([
    admin.from("blog_posts").select("id,slug,title_fr,excerpt_fr,content_fr,cover_image_url,tags,is_published,published_at").order("created_at", { ascending: false }),
    edit
      ? admin
          .from("blog_posts")
          .select("id,slug,title_fr,excerpt_fr,content_fr,cover_image_url,tags,is_published,published_at")
          .eq("id", edit)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const post = editRow as BlogPost | null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="ui-text text-3xl font-extrabold">{t("title")}</h1>
          <p className="ui-muted mt-2">Write production SEO content, technical notes, and service updates.</p>
        </div>
        {edit ? (
          <Link href={`/${locale}/admin/blog`} className="ui-btn-outline px-4 py-2 text-sm">
            {tc("cancel")}
          </Link>
        ) : null}
      </div>

      <form action={upsertPost} className="grid gap-4">
        {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            <span>{formT("slug")}</span>
            <input name="slug" defaultValue={post?.slug} placeholder={formT("slug")} className="ui-input" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            <span>{formT("titleFr")}</span>
            <input name="title_fr" defaultValue={post?.title_fr} placeholder={formT("titleFr")} className="ui-input" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{formT("excerptFr")}</span>
          <textarea name="excerpt_fr" rows={3} defaultValue={post?.excerpt_fr} placeholder={formT("excerptFr")} className="ui-input" />
        </label>
        <BlogEditor content={post?.content_fr ?? ""} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            <span>{formT("imageUrl")}</span>
            <input name="cover_image_url" defaultValue={post?.cover_image_url} placeholder={formT("imageUrl")} className="ui-input" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-foreground">
            <span>Tags</span>
            <input name="tags" defaultValue={post?.tags?.join(", ")} placeholder="service, hvac, solar" className="ui-input" />
          </label>
        </div>
        <label className="flex items-center gap-2 rounded-2xl border border-border/70 px-4 py-3 text-sm font-semibold text-foreground">
          <input type="checkbox" name="is_published" defaultChecked={post?.is_published ?? true} />
          {t("publish")}
        </label>
        <button type="submit" className="ui-btn-accent w-fit px-5 py-3 text-sm font-semibold">
          {post ? t("edit") : t("add")}
        </button>
      </form>

      <section className="ui-surface overflow-hidden rounded-2xl border border-border/80 shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/70">
            <tr>
              {["Slug", "Title", "Published", "Date", "Actions"].map((label) => (
                <th key={label} className="px-4 py-3 text-left font-semibold text-foreground">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data as BlogPost[] | null)?.map((row) => (
              <tr key={row.id} className="border-t border-border/70">
                <td className="px-4 py-3 text-muted-foreground">{row.slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.title_fr}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.is_published ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.published_at ? new Date(row.published_at).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/${locale}/admin/blog?edit=${row.id}`} className="ui-btn-outline px-3 py-1.5 text-xs">
                      {t("edit")}
                    </Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={row.id} />
                      <button className="ui-btn-primary px-3 py-1.5 text-xs" type="submit">
                        {t("delete")}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
