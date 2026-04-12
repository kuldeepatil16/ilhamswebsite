import { revalidatePath } from "next/cache";
import DataTable from "@/components/admin/DataTable";
import PartForm from "@/components/admin/PartForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeText } from "@/lib/utils";

async function addPart(formData: FormData) {
  "use server";
  const admin = createAdminClient();
  await admin.from("spare_parts").insert({
    slug: sanitizeText(formData.get("slug")),
    name_fr: sanitizeText(formData.get("name_fr")),
    part_number: sanitizeText(formData.get("part_number")),
    compatible_brands: ["whirlpool"],
    compatible_categories: ["climatisation"],
    price_mad: Number(formData.get("price_mad") || 0),
    is_active: true,
    in_stock: true,
  });
  revalidatePath("/fr/admin/parts");
}

export default async function AdminPartsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("spare_parts").select("slug,part_number,name_fr,price_mad").order("created_at", { ascending: false });

  return (
    <div className="space-y-5">
      <form action={addPart}>
        <PartForm actionLabel="Save" />
      </form>
      <DataTable rows={(data as Record<string, unknown>[]) || []} columns={[{ key: "slug", label: "Slug" }, { key: "part_number", label: "Part #" }, { key: "name_fr", label: "Name" }, { key: "price_mad", label: "Price" }]} />
    </div>
  );
}
