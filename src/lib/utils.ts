import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedField<T extends object>(
  obj: T,
  field: string,
  locale: Locale,
  fallbackLocale: Locale = "fr"
): string {
  const localizedKey = `${field}_${locale}`;
  const fallbackKey = `${field}_${fallbackLocale}`;
  const source = obj as Record<string, unknown>;

  return (source[localizedKey] as string) || (source[fallbackKey] as string) || "";
}

export function formatPrice(price: number, locale: Locale): string {
  if (locale === "ar") {
    return `${price.toLocaleString("ar-MA")} درهم`;
  }

  if (locale === "en") {
    return `${price.toLocaleString("en-US")} MAD`;
  }

  return `${price.toLocaleString("fr-MA")} MAD`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  const localeMap = { fr: "fr-FR", ar: "ar-MA", en: "en-US" };

  return date.toLocaleDateString(localeMap[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isRTL(locale: Locale): boolean {
  return locale === "ar";
}

export function getOgImageUrl(path?: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://vereenelectrofroid.ma";
  return path ? `${baseUrl}${path}` : `${baseUrl}/images/og-image.jpg`;
}

export function sanitizeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim();
}

export function sanitizeOptionalText(value: unknown): string | null {
  const sanitized = sanitizeText(value);
  return sanitized.length ? sanitized : null;
}

export function getBasePathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && ["fr", "ar", "en"].includes(segments[0])) {
    return `/${segments.slice(1).join("/")}` || "/";
  }
  return pathname || "/";
}
