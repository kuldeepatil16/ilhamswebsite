import DataTable from "@/components/admin/DataTable";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_leads").select("name,phone,email,status,created_at").order("created_at", { ascending: false });

  return (
    <section className="space-y-4">
      <h1 className="ui-text text-2xl font-bold">Leads</h1>
      <DataTable rows={(data as Record<string, unknown>[]) || []} columns={[{ key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "email", label: "Email" }, { key: "status", label: "Status" }, { key: "created_at", label: "Created" }]} />
    </section>
  );
}
