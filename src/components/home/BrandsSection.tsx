import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { BRANDS } from "@/lib/constants";
import { getBrandLogoUrl } from "@/lib/visuals";

export default async function BrandsSection() {
  const t = await getTranslations("brands");
  const supabase = await createClient();
  const { data } = await supabase
    .from("brand_partners")
    .select("name,website_url,logo_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const brands = (data?.length
    ? data
    : BRANDS.map((brand) => ({ name: brand, website_url: undefined, logo_url: undefined }))) as {
    name: string;
    website_url?: string | null;
    logo_url?: string | null;
  }[];

  return (
    <section className="ui-page py-6">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest/90 px-6 py-8 shadow-card md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Authorized partner network</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl font-manrope">{t("title")}</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {brands.map((brand) => (
                <article
                  key={brand.name}
                  className="group overflow-hidden rounded-[1.6rem] border border-border/70 bg-surface-container-low transition duration-300 hover:-translate-y-0.5 hover:bg-surface-container"
                >
                  <div className="flex h-full flex-col gap-4 p-4 text-center">
                    <div className="relative overflow-hidden rounded-[1.3rem] border border-border/60 bg-surface-container-highest p-4 shadow-sm">
                      <img
                        src={brand.logo_url || getBrandLogoUrl(brand.website_url) || "/images/logo-monogram.svg"}
                        alt={brand.name}
                        className="mx-auto h-14 w-auto object-contain"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground/5" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-base font-bold leading-tight text-foreground">{brand.name}</h3>
                      {brand.website_url ? (
                        <Link href={brand.website_url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-muted-foreground transition hover:text-accent">
                          {brand.website_url.replace(/^https?:\/\//, "")}
                        </Link>
                      ) : (
                        <p className="text-xs text-muted-foreground">Authorized distributor</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
