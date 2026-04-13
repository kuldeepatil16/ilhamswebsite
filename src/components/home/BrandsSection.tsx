import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { BRANDS } from "@/lib/constants";
import { getBrandLogoUrl, getExternalUrl } from "@/lib/visuals";

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
    <section className="ui-page py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-lowest/95 px-5 py-8 shadow-card md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary-container">Authorized partner network</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl font-manrope">{t("title")}</h2>
              <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {brands.map((brand, index) => {
                const partnerUrl = getExternalUrl(brand.website_url);
                const logoSrc = brand.logo_url && !/^(?:[a-z]+:)?\/\//i.test(brand.logo_url) && !brand.logo_url.startsWith("data:") && !brand.logo_url.startsWith("/") ? null : brand.logo_url;
                const fallbackLogo = getBrandLogoUrl(brand.website_url, brand.name) || "/images/logo-monogram.svg";

                return (
                  <article
                    key={brand.name}
                    className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface-container-low transition duration-300 hover:-translate-y-1 hover:bg-surface-container"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className="flex h-full flex-col gap-4 p-4 text-center">
                      <div className="relative overflow-hidden rounded-[1.25rem] border border-border/60 bg-surface-container-highest p-4 shadow-sm">
                        <img
                          src={logoSrc || fallbackLogo}
                          alt={brand.name}
                          className="mx-auto h-16 w-full max-w-[11rem] object-contain"
                          loading="lazy"
                          decoding="async"
                          onError={(event) => {
                            const image = event.currentTarget;
                            if (image.src !== fallbackLogo) {
                              image.src = fallbackLogo;
                            }
                          }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground/5" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h3 className="text-base font-bold leading-tight text-foreground">{brand.name}</h3>
                        {partnerUrl ? (
                          <a
                            href={partnerUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm font-semibold text-muted-foreground transition hover:text-accent"
                          >
                            {partnerUrl.replace(/^https?:\/\//, "")}
                          </a>
                        ) : (
                          <p className="text-xs text-muted-foreground">Authorized distributor</p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
