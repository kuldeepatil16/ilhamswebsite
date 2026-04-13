import type { Product, SparePart } from "@/types";

export function isPlaceholderImage(url?: string | null): boolean {
  if (!url) return true;
  return /placehold|dummy|source\.unsplash|logo\.clearbit/i.test(url);
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function svgDataUri(svg: string): string {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getSeedImageUrl(seed: string, width = 1600, height = 1100): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

const PALETTES = [
  ["#061b2e", "#0f3f63", "#1b6fae", "#f28a1f"],
  ["#07131d", "#12314c", "#1d5f90", "#75fca5"],
  ["#09111a", "#19324e", "#2d6ea0", "#61b4e8"],
  ["#0a1724", "#1a4468", "#2e7fb8", "#f6b25d"],
  ["#081827", "#0f3557", "#165985", "#9ad7ff"],
];

function pickPalette(seed: string) {
  return PALETTES[hashString(seed) % PALETTES.length];
}

function initials(value: string): string {
  const parts = value
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "VF";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("")
    .slice(0, 2);
}

function createVisualSvg({
  title,
  subtitle,
  accent,
  seed,
  wide = true,
}: {
  title: string;
  subtitle?: string;
  accent?: string;
  seed: string;
  wide?: boolean;
}): string {
  const [start, mid, end, glow] = pickPalette(seed);
  const titleText = escapeXml(title);
  const subtitleText = escapeXml(subtitle || "");
  const accentText = escapeXml(accent || "");
  const initialsText = escapeXml(initials(title || seed));
  const width = wide ? 1600 : 1200;
  const height = wide ? 1100 : 1500;

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${titleText}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${start}" />
          <stop offset="55%" stop-color="${mid}" />
          <stop offset="100%" stop-color="${end}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.45" />
          <stop offset="100%" stop-color="${glow}" stop-opacity="0" />
        </radialGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#000000" flood-opacity="0.24" />
        </filter>
      </defs>

      <rect width="${width}" height="${height}" rx="72" fill="url(#bg)" />
      <circle cx="${Math.round(width * 0.2)}" cy="${Math.round(height * 0.18)}" r="${Math.round(Math.min(width, height) * 0.18)}" fill="url(#glow)" />
      <circle cx="${Math.round(width * 0.82)}" cy="${Math.round(height * 0.2)}" r="${Math.round(Math.min(width, height) * 0.13)}" fill="${glow}" fill-opacity="0.16" />
      <path d="M0 ${Math.round(height * 0.78)} C${Math.round(width * 0.2)} ${Math.round(height * 0.64)} ${Math.round(width * 0.42)} ${Math.round(height * 0.96)} ${width} ${Math.round(height * 0.7)} L${width} ${height} L0 ${height} Z" fill="#ffffff" fill-opacity="0.06" />

      <g filter="url(#shadow)">
        <rect x="${Math.round(width * 0.07)}" y="${Math.round(height * 0.11)}" width="${Math.round(width * 0.34)}" height="${Math.round(height * 0.12)}" rx="999" fill="#ffffff" fill-opacity="0.1" />
        <text x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.185)}" fill="#ffffff" fill-opacity="0.88" font-family="Inter, Arial, sans-serif" font-size="${Math.round(height * 0.032)}" font-weight="700" letter-spacing="6">${accentText || "VERREN ELECTRO FROID"}</text>
      </g>

      <g filter="url(#shadow)">
        <rect x="${Math.round(width * 0.07)}" y="${Math.round(height * 0.26)}" width="${Math.round(width * 0.56)}" height="${Math.round(height * 0.36)}" rx="48" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.14" />
        <rect x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.31)}" width="${Math.round(width * 0.22)}" height="${Math.round(height * 0.06)}" rx="999" fill="#ffffff" fill-opacity="0.14" />
        <text x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.43)}" fill="#ffffff" font-family="Manrope, Inter, Arial, sans-serif" font-size="${Math.round(height * 0.076)}" font-weight="800">${titleText}</text>
        <text x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.5)}" fill="#dbeafe" fill-opacity="0.92" font-family="Inter, Arial, sans-serif" font-size="${Math.round(height * 0.03)}" font-weight="500">${subtitleText}</text>
      </g>

      <g filter="url(#shadow)">
        <rect x="${Math.round(width * 0.72)}" y="${Math.round(height * 0.16)}" width="${Math.round(width * 0.2)}" height="${Math.round(height * 0.2)}" rx="40" fill="#ffffff" fill-opacity="0.12" stroke="#ffffff" stroke-opacity="0.18" />
        <circle cx="${Math.round(width * 0.82)}" cy="${Math.round(height * 0.26)}" r="${Math.round(height * 0.06)}" fill="#ffffff" fill-opacity="0.16" />
        <text x="${Math.round(width * 0.82)}" y="${Math.round(height * 0.284)}" text-anchor="middle" fill="#ffffff" font-family="Manrope, Inter, Arial, sans-serif" font-size="${Math.round(height * 0.054)}" font-weight="800">${initialsText}</text>
      </g>

      <g opacity="0.88">
        <rect x="${Math.round(width * 0.07)}" y="${Math.round(height * 0.7)}" width="${Math.round(width * 0.86)}" height="${Math.round(height * 0.17)}" rx="42" fill="#081827" fill-opacity="0.28" stroke="#ffffff" stroke-opacity="0.12" />
        <rect x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.74)}" width="${Math.round(width * 0.19)}" height="${Math.round(height * 0.05)}" rx="999" fill="#ffffff" fill-opacity="0.14" />
        <rect x="${Math.round(width * 0.1)}" y="${Math.round(height * 0.82)}" width="${Math.round(width * 0.28)}" height="${Math.round(height * 0.03)}" rx="999" fill="#ffffff" fill-opacity="0.1" />
        <rect x="${Math.round(width * 0.41)}" y="${Math.round(height * 0.74)}" width="${Math.round(width * 0.15)}" height="${Math.round(height * 0.05)}" rx="999" fill="${glow}" fill-opacity="0.42" />
        <rect x="${Math.round(width * 0.41)}" y="${Math.round(height * 0.82)}" width="${Math.round(width * 0.38)}" height="${Math.round(height * 0.03)}" rx="999" fill="#ffffff" fill-opacity="0.1" />
      </g>
    </svg>
  `);
}

function shouldUseFallback(url?: string | null): boolean {
  if (!url) return true;
  if (isPlaceholderImage(url)) return true;

  if (url.startsWith("data:") || url.startsWith("/")) return false;

  try {
    const parsed = new URL(url);
    return parsed.protocol !== "http:" && parsed.protocol !== "https:";
  } catch {
    return true;
  }
}

export function getRenderableImageUrl(
  url: string | null | undefined,
  fallbackTitle: string,
  fallbackSubtitle: string,
  seed: string
): string {
  if (!shouldUseFallback(url)) {
    return url as string;
  }

  return getSeedImageUrl(`${fallbackTitle}-${fallbackSubtitle}-${seed}`);
}

export function getBrandLogoUrl(websiteUrl?: string | null, brandName?: string): string | null {
  const brand = brandName || websiteUrl || "Vereen Electro Froid";
  if (!brand) return null;

  return createVisualSvg({
    title: brand.toUpperCase(),
    subtitle: "Authorized partner",
    accent: brand,
    seed: brand,
    wide: false,
  });
}

export function getProductImageUrl(product: Pick<Product, "brand" | "category" | "image_url" | "slug">, seed = "1"): string {
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

  return getRenderableImageUrl(
    product.image_url,
    product.brand,
    baseQueries[product.category] || baseQueries.other,
    `${product.slug}-${seed}`
  );
}

export function getPartImageUrl(part: Pick<SparePart, "image_url" | "slug" | "part_number">, seed = "1"): string {
  const title = part.part_number || part.slug;
  return getRenderableImageUrl(part.image_url, title, "Appliance part and repair component", `${part.slug}-${seed}`);
}

export function getPortraitImageUrl(name: string, role: string, seed = name): string {
  return getSeedImageUrl(`${name}-${role}-${seed}`, 1200, 1500);
}

export function getHeroVisualUrl(title: string, subtitle: string, seed = title): string {
  return getSeedImageUrl(`${title}-${subtitle}-${seed}`);
}

export function getExternalUrl(value?: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).toString();
  } catch {
    try {
      return new URL(`https://${value.replace(/^\/+/, "")}`).toString();
    } catch {
      return null;
    }
  }
}
