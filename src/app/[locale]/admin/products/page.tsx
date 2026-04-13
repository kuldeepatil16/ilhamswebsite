import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import ProductForm from "@/components/admin/ProductForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { sanitizeOptionalText, sanitizeText, slugify } from "@/lib/utils";
import type { Product } from "@/types";

function parseList(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(/[\n,]/)
    .map((item) => sanitizeText(item))
    .filter(Boolean);
}

export default async function AdminProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ edit?: string }>;
}) {
  const { locale } = await params;
  const { edit } = (await searchParams) || {};
  const t = await getTranslations({ locale, namespace: "admin.products" });
  const tc = await getTranslations({ locale, namespace: "admin" });
  const admin = createAdminClient();

  async function upsertProduct(formData: FormData) {
    "use server";
    const admin = createAdminClient();
    const id = String(formData.get("id") || "").trim();
    const payload = {
      slug: sanitizeText(formData.get("slug")) || slugify(String(formData.get("name_fr") || "")),
      brand: sanitizeText(formData.get("brand")),
      category: sanitizeText(formData.get("category")) || "other",
      name_fr: sanitizeText(formData.get("name_fr")),
      description_fr: sanitizeOptionalText(formData.get("description_fr")),
      price_mad: Number(formData.get("price_mad") || 0),
      image_url: sanitizeOptionalText(formData.get("image_url")),
      gallery_urls: parseList(formData.get("gallery_urls")),
      meta_title_fr: sanitizeOptionalText(formData.get("meta_title_fr")),
      meta_description_fr: sanitizeOptionalText(formData.get("meta_description_fr")),
      sort_order: Number(formData.get("sort_order") || 0),
      is_active: formData.get("is_active") === "on",
      is_featured: formData.get("is_featured") === "on",
    };

    if (id) {
      await admin.from("products").update(payload).eq("id", id);
    } else {
      await admin.from("products").insert(payload);
    }

    revalidatePath(`/${locale}/admin/products`);
  }

  async function deleteProduct(formData: FormData) {
    "use server";
    const admin = createAdminClient();
    const id = String(formData.get("id") || "").trim();
    if (!id) return;
    await admin.from("products").delete().eq("id", id);
    revalidatePath(`/${locale}/admin/products`);
  }

  const [{ data }, { data: editRow }] = await Promise.all([
    admin.from("products").select("id,slug,brand,category,name_fr,description_fr,price_mad,image_url,gallery_urls,meta_title_fr,meta_description_fr,sort_order,is_active,is_featured,created_at").order("created_at", { ascending: false }),
    edit
      ? admin
          .from("products")
          .select("id,slug,brand,category,name_fr,description_fr,price_mad,image_url,gallery_urls,meta_title_fr,meta_description_fr,sort_order,is_active,is_featured,created_at")
          .eq("id", edit)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const product = editRow as Product | null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="ui-text text-3xl font-extrabold">{t("title")}</h1>
          <p className="ui-muted mt-2">{t("confirmDelete")}</p>
        </div>
        {edit ? (
          <Link href={`/${locale}/admin/products`} className="ui-btn-outline px-4 py-2 text-sm">
            {tc("cancel")}
          </Link>
        ) : null}
      </div>

      <form action={upsertProduct}>
        <ProductForm product={product || undefined} actionLabel={product ? t("edit") : t("add")} />
      </form>

      <section className="ui-surface overflow-hidden rounded-2xl border border-border/80 shadow-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/70">
            <tr>
              {["Slug", "Brand", "Name", "Price", "State", "Actions"].map((label) => (
                <th key={label} className="px-4 py-3 text-left font-semibold text-foreground">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(data as Product[] | null)?.map((row) => (
              <tr key={row.id} className="border-t border-border/70">
                <td className="px-4 py-3 text-muted-foreground">{row.slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.brand}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.name_fr}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.price_mad ?? 0}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.is_active ? "Active" : "Archived"} {row.is_featured ? "· Featured" : ""}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/${locale}/admin/products?edit=${row.id}`} className="ui-btn-outline px-3 py-1.5 text-xs">
                      {t("edit")}
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={row.id} />
                      <button className="ui-btn-primary px-3 py-1.5 text-xs" type="submit">
                        {t("delete")}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
