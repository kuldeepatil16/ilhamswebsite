import type { Product, SparePart } from "@/types";

export function isPlaceholderImage(url?: string | null): boolean {
  if (!url) return true;
  return /picsum\.photos|placehold|dummy/i.test(url);
}

function unsplashSource(query: string, seed: string, width = 1600, height = 1200): string {
  return `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}&sig=${encodeURIComponent(seed)}`;
}

export function getBrandLogoUrl(websiteUrl?: string | null): string | null {
  if (!websiteUrl) return null;

  try {
    const hostname = new URL(websiteUrl).hostname.replace(/^www\./, "");
    return `https://logo.clearbit.com/${hostname}`;
  } catch {
    return null;
  }
}

export function getProductImageUrl(product: Pick<Product, "brand" | "category" | "image_url" | "slug">, seed = "1"): string {
  if (!isPlaceholderImage(product.image_url)) {
    return product.image_url as string;
  }

  const baseQueries: Record<string, string> = {
    climatisation: "air conditioner hvac indoor",
    refrigeration: "refrigerator kitchen appliance",
    solar: "solar water heater rooftop",
    washing_machine: "washing machine laundry appliance",
    dishwasher: "dishwasher kitchen appliance",
    freezer: "freezer appliance cold storage",
    water_heater: "water heater boiler appliance",
    other: "home appliance repair",
  };

  const query = `${product.brand} ${baseQueries[product.category] || baseQueries.other}`;
  return unsplashSource(query, `${product.slug}-${seed}`);
}

export function getPartImageUrl(part: Pick<SparePart, "image_url" | "slug" | "part_number">, seed = "1"): string {
  if (!isPlaceholderImage(part.image_url)) {
    return part.image_url as string;
  }

  const query = `${part.part_number || part.slug} appliance part repair component`;
  return unsplashSource(query, `${part.slug}-${seed}`, 1400, 1000);
}
