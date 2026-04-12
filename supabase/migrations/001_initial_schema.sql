-- ============================================
-- Vereen Electro Froid — Full Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE product_category AS ENUM (
  'climatisation',
  'refrigeration',
  'solar',
  'washing_machine',
  'dishwasher',
  'freezer',
  'water_heater',
  'other'
);

CREATE TYPE service_type AS ENUM (
  'installation',
  'maintenance',
  'repair',
  'centralized_hvac',
  'solar_installation',
  'parts_replacement',
  'consultation'
);

CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'quoted',
  'won',
  'lost'
);

CREATE TYPE request_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled'
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  category product_category NOT NULL,
  brand TEXT NOT NULL,
  -- Multilingual fields
  name_fr TEXT NOT NULL,
  name_ar TEXT,
  name_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  description_en TEXT,
  -- Pricing
  price_mad DECIMAL(10,2),            -- Price in Moroccan Dirhams
  price_display_fr TEXT,              -- e.g., "À partir de 3,500 MAD"
  price_display_ar TEXT,
  price_display_en TEXT,
  -- Media
  image_url TEXT,                     -- Main product image (Supabase Storage URL)
  gallery_urls TEXT[] DEFAULT '{}',   -- Additional images array
  -- Metadata
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  -- SEO
  meta_title_fr TEXT,
  meta_title_ar TEXT,
  meta_title_en TEXT,
  meta_description_fr TEXT,
  meta_description_ar TEXT,
  meta_description_en TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SPARE PARTS TABLE
-- ============================================
CREATE TABLE spare_parts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  -- Part info
  part_number TEXT,                   -- Manufacturer part number
  compatible_brands TEXT[] DEFAULT '{}',  -- e.g., {'whirlpool', 'ariston'}
  compatible_categories product_category[] DEFAULT '{}',
  -- Multilingual
  name_fr TEXT NOT NULL,
  name_ar TEXT,
  name_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  description_en TEXT,
  -- Pricing
  price_mad DECIMAL(10,2),
  -- Media
  image_url TEXT,
  -- Metadata
  in_stock BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTACT LEADS TABLE
-- ============================================
CREATE TABLE contact_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  -- Contact info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  -- Request details
  service_type service_type,
  message TEXT,
  -- Source tracking
  source_page TEXT,                   -- Which page they submitted from
  locale TEXT DEFAULT 'fr',           -- Which language they were browsing in
  -- Status
  status lead_status DEFAULT 'new',
  admin_notes TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SERVICE REQUESTS TABLE
-- ============================================
CREATE TABLE service_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  -- Customer info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  -- Service details
  service_type service_type NOT NULL,
  appliance_brand TEXT,
  appliance_model TEXT,
  problem_description TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  -- Status tracking
  status request_status DEFAULT 'pending',
  assigned_technician TEXT,
  admin_notes TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUOTE REQUESTS TABLE (for parts & bulk orders)
-- ============================================
CREATE TABLE quote_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  -- Customer info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company_name TEXT,
  -- Quote details
  items JSONB NOT NULL DEFAULT '[]',  -- Array of {part_id, product_id, quantity, notes}
  message TEXT,
  -- Status
  status lead_status DEFAULT 'new',
  quoted_amount DECIMAL(10,2),
  admin_notes TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  -- Multilingual content
  title_fr TEXT NOT NULL,
  title_ar TEXT,
  title_en TEXT,
  excerpt_fr TEXT,
  excerpt_ar TEXT,
  excerpt_en TEXT,
  content_fr TEXT NOT NULL,           -- Markdown content
  content_ar TEXT,
  content_en TEXT,
  -- Media
  cover_image_url TEXT,
  -- Metadata
  author TEXT DEFAULT 'Vereen Electro Froid',
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  -- SEO
  meta_title_fr TEXT,
  meta_title_ar TEXT,
  meta_title_en TEXT,
  meta_description_fr TEXT,
  meta_description_ar TEXT,
  meta_description_en TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BRAND PARTNERS TABLE
-- ============================================
CREATE TABLE brand_partners (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,                      -- Supabase Storage URL
  website_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SITE SETTINGS TABLE (key-value store)
-- ============================================
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_spare_parts_brands ON spare_parts USING GIN(compatible_brands);
CREATE INDEX idx_spare_parts_categories ON spare_parts USING GIN(compatible_categories);
CREATE INDEX idx_contact_leads_status ON contact_leads(status);
CREATE INDEX idx_contact_leads_created ON contact_leads(created_at DESC);
CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Products: public read, admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Products are editable by admins" ON products FOR ALL USING (auth.role() = 'authenticated');

-- Spare parts: public read, admin write
ALTER TABLE spare_parts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parts are viewable by everyone" ON spare_parts FOR SELECT USING (is_active = true);
CREATE POLICY "Parts are editable by admins" ON spare_parts FOR ALL USING (auth.role() = 'authenticated');

-- Contact leads: insert by anyone, read by admins
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON contact_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON contact_leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update leads" ON contact_leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Service requests: insert by anyone, read/update by admins
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit service request" ON service_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view requests" ON service_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update requests" ON service_requests FOR UPDATE USING (auth.role() = 'authenticated');

-- Quote requests: insert by anyone, read/update by admins
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit quote" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view quotes" ON quote_requests FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update quotes" ON quote_requests FOR UPDATE USING (auth.role() = 'authenticated');

-- Blog posts: published are public, all for admins
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published posts are public" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Brand partners: public read
ALTER TABLE brand_partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Brands are public" ON brand_partners FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage brands" ON brand_partners FOR ALL USING (auth.role() = 'authenticated');

-- Site settings: public read, admin write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are public" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER spare_parts_updated_at BEFORE UPDATE ON spare_parts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER contact_leads_updated_at BEFORE UPDATE ON contact_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER service_requests_updated_at BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER quote_requests_updated_at BEFORE UPDATE ON quote_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
