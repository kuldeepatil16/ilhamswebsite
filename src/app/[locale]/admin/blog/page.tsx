import { revalidatePath } from "next/cache";
import BlogEditor from "@/components/admin/BlogEditor";
import DataTable from "@/components/admin/DataTable";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeText, slugify } from "@/lib/utils";

async function addPost(formData: FormData) {
  "use server";
  const title = sanitizeText(formData.get("title_fr"));
  const admin = createAdminClient();
  await admin.from("blog_posts").insert({
    slug: slugify(title),
    title_fr: title,
    excerpt_fr: sanitizeText(formData.get("excerpt_fr")),
    content_fr: sanitizeText(formData.get("content_fr")),
    is_published: true,
    published_at: new Date().toISOString(),
  });
  revalidatePath("/fr/admin/blog");
}

export default async function AdminBlogPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("blog_posts").select("slug,title_fr,is_published,published_at").order("created_at", { ascending: false });

  return (
    <div className="space-y-5">
      <form action={addPost} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <input name="title_fr" placeholder="Title" className="w-full rounded-lg border border-slate-200 px-3 py-2" />
        <textarea name="excerpt_fr" rows={3} placeholder="Excerpt" className="w-full rounded-lg border border-slate-200 px-3 py-2" />
        <BlogEditor />
        <button className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy">Save</button>
      </form>
      <DataTable rows={(data as Record<string, unknown>[]) || []} columns={[{ key: "slug", label: "Slug" }, { key: "title_fr", label: "Title" }, { key: "is_published", label: "Published" }, { key: "published_at", label: "Date" }]} />
    </div>
  );
}
