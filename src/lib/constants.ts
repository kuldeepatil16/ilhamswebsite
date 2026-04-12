export const SITE_NAME = "Vereen Electro Froid";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://vereenelectrofroid.ma";

export const COMPANY = {
  name: "Societe Vereen Electro Froid",
  nameShort: "Vereen Electro Froid",
  phone1: "0663572130",
  phone2: "0637237869",
  fax: "0539982020",
  email: "vereenelectrofroid@gmail.com",
  address: "Al Hoceima, Maroc",
  addressFull: "Al Hoceima, Region de Tanger-Tetouan-Al Hoceima, Maroc",
  instagram: "ste.vereen_electrofroid",
  instagramUrl: "https://instagram.com/ste.vereen_electrofroid",
  whatsapp: "212663572130",
  whatsappUrl: "https://wa.me/212663572130",
  geo: {
    lat: 35.2517,
    lng: -3.9372,
  },
};

export const BRANDS = [
  "WHIRLPOOL",
  "SAMSUNG",
  "ARISTON",
  "BOSCH",
  "AUX",
  "LG",
  "DAIKIN",
  "CARRIER",
];

export const LOCALES = ["fr", "ar", "en"] as const;
export const DEFAULT_LOCALE = "fr";
export const RTL_LOCALES = ["ar"] as const;

export const PRODUCT_CATEGORIES = [
  "climatisation",
  "refrigeration",
  "solar",
  "washing_machine",
  "dishwasher",
  "freezer",
  "water_heater",
  "other",
] as const;

export const SERVICE_TYPES = [
  "installation",
  "maintenance",
  "repair",
  "centralized_hvac",
  "solar_installation",
  "parts_replacement",
  "consultation",
] as const;

export const STATS = [
  { key: "years", value: 10, suffix: "+" },
  { key: "clients", value: 2000, suffix: "+" },
  { key: "brands", value: 8, suffix: "" },
  { key: "cities", value: 15, suffix: "+" },
];

export const WHATSAPP_DEFAULT_MESSAGE = {
  fr: "Bonjour, je souhaite obtenir un devis pour ",
  ar: "?????? ???? ?????? ??? ??? ??? ??",
  en: "Hello, I would like to get a quote for ",
};

export const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "vereenelectrofroid@gmail.com";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const STORAGE_BUCKETS = {
  productImages: "product-images",
  partImages: "part-images",
  brandLogos: "brand-logos",
  blogImages: "blog-images",
  siteAssets: "site-assets",
} as const;

export const ADMIN_EMAILS = [
  "ilhamassi98@gmail.com",
  "kuldeepspatil16@gmail.com",
] as const;
