import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContactLead, LeadStatus } from "@/types";

const STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

export default async function AdminLeadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.leads" });
  const admin = createAdminClient();

  async function updateLeadStatus(formData: FormData) {
    "use server";
    const admin = createAdminClient();
    const id = String(formData.get("id") || "");
    const status = String(formData.get("status") || "new") as LeadStatus;
    await admin.from("contact_leads").update({ status }).eq("id", id);
    revalidatePath(`/${locale}/admin/leads`);
  }

  const { data } = await admin.from("contact_leads").select("id,name,phone,email,status,service_type,message,created_at").order("created_at", { ascending: false });

  return (
    <section className="space-y-5">
      <div>
        <h1 className="ui-text text-3xl font-extrabold">{t("title")}</h1>
        <p className="ui-muted mt-2">Track inbound enquiries and move them through the sales pipeline.</p>
      </div>
      <section className="ui-surface overflow-hidden rounded-2xl border border-border/80 shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/70">
            <tr>
              {["Name", "Phone", "Email", t("status"), "Service", "Created", t("updateStatus")].map((label) => (
                <th key={label} className="px-4 py-3 text-left font-semibold text-foreground">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data as ContactLead[] | null)?.map((row) => (
              <tr key={row.id} className="border-t border-border/70 align-top">
                <td className="px-4 py-3 text-muted-foreground">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.email || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{t(`statuses.${row.status}` as never)}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.service_type || "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(row.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <form action={updateLeadStatus} className="flex flex-wrap items-center gap-2">
                    <input type="hidden" name="id" value={row.id} />
                    <select name="status" defaultValue={row.status} className="ui-input w-40">
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {t(`statuses.${status}` as never)}
                        </option>
                      ))}
                    </select>
                    <button className="ui-btn-primary px-3 py-2 text-xs" type="submit">
                      {t("updateStatus")}
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
