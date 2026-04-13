import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { BRANDS } from "@/lib/constants";

export default async function BrandsSection() {
  const t = await getTranslations("brands");
  const supabase = await createClient();
  const { data } = await supabase
    .from("brand_partners")
    .select("name")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const brands = (data?.length
    ? data
    : BRANDS.map((brand) => ({ name: brand }))) as {
    name: string;
  }[];

  const partnerNames = brands.map((brand) => brand.name).filter(Boolean);
  const tickerNames = [...partnerNames, ...partnerNames];
  const tickerDuration = Math.max(partnerNames.length * 4, 24);

  return (
    <section className="ui-page py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-surface-container-lowest/95 px-5 py-8 shadow-card md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl font-manrope">{t("title")}</h2>
              <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{t("subtitle")}</p>
            </div>

            <div className="space-y-3">
              <div className="ticker-mask overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface-container-low px-4 py-4 shadow-sm">
                <div
                  className="flex w-max items-center gap-3 whitespace-nowrap animate-ticker-left motion-reduce:animate-none"
                  style={{ animationDuration: `${tickerDuration}s` }}
                >
                  {tickerNames.map((brand, index) => (
                    <div
                      key={`${brand}-${index}`}
                      className="rounded-full border border-border/70 bg-surface-container px-4 py-2 text-sm font-semibold tracking-[0.18em] text-foreground"
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
