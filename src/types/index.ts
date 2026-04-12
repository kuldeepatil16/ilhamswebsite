export type Locale = "fr" | "ar" | "en";

export type ProductCategory =
  | "climatisation"
  | "refrigeration"
  | "solar"
  | "washing_machine"
  | "dishwasher"
  | "freezer"
  | "water_heater"
  | "other";

export type ServiceType =
  | "installation"
  | "maintenance"
  | "repair"
  | "centralized_hvac"
  | "solar_installation"
  | "parts_replacement"
  | "consultation";

export type LeadStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type RequestStatus =
  | "pending"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  brand: string;
  name_fr: string;
  name_ar?: string;
  name_en?: string;
  description_fr?: string;
  description_ar?: string;
  description_en?: string;
  price_mad?: number;
  price_display_fr?: string;
  price_display_ar?: string;
  price_display_en?: string;
  image_url?: string;
  gallery_urls?: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  meta_title_fr?: string;
  meta_description_fr?: string;
  created_at: string;
  updated_at: string;
}

export interface SparePart {
  id: string;
  slug: string;
  part_number?: string;
  compatible_brands: string[];
  compatible_categories: ProductCategory[];
  name_fr: string;
  name_ar?: string;
  name_en?: string;
  description_fr?: string;
  description_ar?: string;
  description_en?: string;
  price_mad?: number;
  image_url?: string;
  in_stock: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  service_type?: ServiceType;
  message?: string;
  source_page?: string;
  locale: Locale;
  status: LeadStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  service_type: ServiceType;
  appliance_brand?: string;
  appliance_model?: string;
  problem_description?: string;
  preferred_date?: string;
  preferred_time?: string;
  status: RequestStatus;
  assigned_technician?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email?: string;
  phone: string;
  company_name?: string;
  items: QuoteItem[];
  message?: string;
  status: LeadStatus;
  quoted_amount?: number;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteItem {
  product_id?: string;
  part_id?: string;
  name: string;
  quantity: number;
  notes?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_fr: string;
  title_ar?: string;
  title_en?: string;
  excerpt_fr?: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  content_fr: string;
  content_ar?: string;
  content_en?: string;
  cover_image_url?: string;
  author: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
  meta_title_fr?: string;
  meta_description_fr?: string;
  created_at: string;
  updated_at: string;
}

export interface BrandPartner {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email?: string;
  phone: string;
  service_type?: string;
  message?: string;
}

export interface ServiceRequestFormData {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  service_type: string;
  appliance_brand?: string;
  appliance_model?: string;
  problem_description?: string;
  preferred_date?: string;
  preferred_time?: string;
}

export interface QuoteFormData {
  name: string;
  email?: string;
  phone: string;
  company_name?: string;
  items: QuoteItem[];
  message?: string;
}

// Navigation
export interface NavItem {
  href: string;
  label: string;
}

// Admin
export interface AdminUser {
  id: string;
  email: string;
}
