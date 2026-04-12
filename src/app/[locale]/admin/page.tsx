import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: leads }, { count: requests }, { count: products }] = await Promise.all([
    supabase.from("contact_leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("service_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("products").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    ["New leads", leads ?? 0],
    ["Pending requests", requests ?? 0],
    ["Total products", products ?? 0],
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(([label, value]) => (
        <article key={label} className="ui-surface rounded-xl p-5">
          <p className="ui-soft text-sm">{label}</p>
          <p className="ui-text mt-1 text-3xl font-extrabold">{value}</p>
        </article>
      ))}
    </div>
  );
}
