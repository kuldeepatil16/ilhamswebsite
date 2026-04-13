import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { BRANDS } from "@/lib/constants";

export default async function BrandsSection() {
  const t = await getTranslations("brands");
  const supabase = await createClient();
  const { data } = await supabase
    .from("brand_partners")
    .select("name,website_url,logo_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const brands = (data?.length ? data : BRANDS.map((brand) => ({ name: brand, website_url: undefined, logo_url: undefined }))) as {
    name: string;
    website_url?: string | null;
    logo_url?: string | null;
  }[];

  return (
    <section className="ui-page py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="ui-surface rounded-[2rem] border border-border/80 p-6 shadow-card md:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="ui-soft text-sm font-semibold uppercase tracking-[0.3em]">{t("title")}</p>
            <h2 className="mt-3 text-3xl font-black text-foreground md:text-4xl">{t("subtitle")}</h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand) => (
              <article
                key={brand.name}
                className="ui-surface border border-border/80 p-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted text-sm font-black text-foreground">
                    {brand.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-foreground">{brand.name}</h3>
                    {brand.website_url ? (
                      <Link href={brand.website_url} target="_blank" rel="noreferrer" className="ui-link text-sm font-semibold">
                        {brand.website_url.replace(/^https?:\/\//, "")}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
