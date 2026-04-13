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
      <div>
        <h1 className="ui-text text-3xl font-extrabold">Blog</h1>
        <p className="ui-muted mt-2">Publish updates and maintenance notes.</p>
      </div>
      <form action={addPost} className="ui-surface space-y-3 rounded-xl p-4">
        <input name="title_fr" placeholder="Title" className="ui-input" />
        <textarea name="excerpt_fr" rows={3} placeholder="Excerpt" className="ui-input" />
        <BlogEditor />
        <button className="ui-btn-accent px-4 py-2 text-sm">Save</button>
      </form>
      <DataTable rows={(data as Record<string, unknown>[]) || []} columns={[{ key: "slug", label: "Slug" }, { key: "title_fr", label: "Title" }, { key: "is_published", label: "Published" }, { key: "published_at", label: "Date" }]} />
    </div>
  );
}
