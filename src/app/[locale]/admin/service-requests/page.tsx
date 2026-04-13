import DataTable from "@/components/admin/DataTable";
import { createClient } from "@/lib/supabase/server";

export default async function AdminServiceRequestsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("service_requests")
    .select("name,phone,service_type,status,preferred_date,created_at")
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-4">
      <h1 className="ui-text text-2xl font-bold">Service Requests</h1>
      <DataTable rows={(data as Record<string, unknown>[]) || []} columns={[{ key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "service_type", label: "Type" }, { key: "status", label: "Status" }, { key: "preferred_date", label: "Date" }]} />
    </section>
  );
}
