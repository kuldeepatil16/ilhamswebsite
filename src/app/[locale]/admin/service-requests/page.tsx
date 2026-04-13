import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { RequestStatus, ServiceRequest } from "@/types";

const STATUSES: RequestStatus[] = ["pending", "confirmed", "in_progress", "completed", "cancelled"];

export default async function AdminServiceRequestsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.serviceRequests" });
  const admin = createAdminClient();

  async function updateRequestStatus(formData: FormData) {
    "use server";
    const admin = createAdminClient();
    const id = String(formData.get("id") || "");
    const status = String(formData.get("status") || "pending") as RequestStatus;
    await admin.from("service_requests").update({ status }).eq("id", id);
    revalidatePath(`/${locale}/admin/service-requests`);
  }

  const { data } = await admin
    .from("service_requests")
    .select("id,name,phone,service_type,status,preferred_date,preferred_time,city,created_at")
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-5">
      <div>
        <h1 className="ui-text text-3xl font-extrabold">{t("title")}</h1>
        <p className="ui-muted mt-2">Schedule repairs, installs, and maintenance visits with a clear status pipeline.</p>
      </div>
      <section className="ui-surface overflow-hidden rounded-2xl border border-border/80 shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/70">
            <tr>
              {["Name", "Phone", "Service", "Status", "Date", "Time", "City", "Actions"].map((label) => (
                <th key={label} className="px-4 py-3 text-left font-semibold text-foreground">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data as ServiceRequest[] | null)?.map((row) => (
              <tr key={row.id} className="border-t border-border/70 align-top">
                <td className="px-4 py-3 text-muted-foreground">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.service_type}</td>
                <td className="px-4 py-3 text-muted-foreground">{t(`statuses.${row.status}` as never)}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.preferred_date || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.preferred_time || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.city || "—"}</td>
                <td className="px-4 py-3">
                  <form action={updateRequestStatus} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={row.id} />
                    <select name="status" defaultValue={row.status} className="ui-input w-44">
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {t(`statuses.${status}` as never)}
                        </option>
                      ))}
                    </select>
                    <button className="ui-btn-primary px-3 py-2 text-xs" type="submit">
                      {t("title")}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
}
