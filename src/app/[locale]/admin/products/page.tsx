import { revalidatePath } from "next/cache";
import ProductForm from "@/components/admin/ProductForm";
import DataTable from "@/components/admin/DataTable";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeText } from "@/lib/utils";

async function addProduct(formData: FormData) {
  "use server";
  const admin = createAdminClient();
  await admin.from("products").insert({
    slug: sanitizeText(formData.get("slug")),
    brand: sanitizeText(formData.get("brand")),
    category: "climatisation",
    name_fr: sanitizeText(formData.get("name_fr")),
    price_mad: Number(formData.get("price_mad") || 0),
    is_active: true,
    is_featured: false,
  });
  revalidatePath("/fr/admin/products");
}

export default async function AdminProductsPage() {
  const admin = createAdminClient();
  const { data } = await admin.from("products").select("id,slug,brand,name_fr,price_mad").order("created_at", { ascending: false });

  return (
    <div className="space-y-5">
      <form action={addProduct}>
        <ProductForm actionLabel="Save" />
      </form>
      <DataTable rows={(data as Record<string, unknown>[]) || []} columns={[{ key: "slug", label: "Slug" }, { key: "brand", label: "Brand" }, { key: "name_fr", label: "Name" }, { key: "price_mad", label: "Price" }]} />
    </div>
  );
}
