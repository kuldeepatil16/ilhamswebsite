import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";

export default async function AdminDashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.dashboard" });
  const supabase = await createClient();
  const [{ count: leads }, { count: requests }, { count: products }, { count: parts }, { count: posts }] = await Promise.all([
    supabase.from("contact_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("spare_parts").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("is_published", true),
  ]);

  const cards = [
    [t("newLeads"), leads ?? 0],
    [t("pendingRequests"), requests ?? 0],
    [t("totalProducts"), products ?? 0],
    [t("totalParts"), parts ?? 0],
    [t("totalBlogPosts"), posts ?? 0],
  ] as const;

  return (
    <section className="space-y-5">
      <div>
        <h1 className="ui-text text-3xl font-extrabold">{t("title")}</h1>
        <p className="ui-muted mt-2">{t("subtitle")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(([label, value]) => (
          <article key={label} className="ui-surface rounded-xl p-5">
            <p className="ui-soft text-sm">{label}</p>
            <p className="ui-text mt-1 text-3xl font-extrabold">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
