-- ============================================
-- Vereen Electro Froid - Storage Buckets
-- Run after 001_initial_schema.sql
-- ============================================

-- Create public buckets with 5MB limit and image mime types only
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('product-images', 'product-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('part-images', 'part-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('brand-logos', 'brand-logos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('blog-images', 'blog-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('site-assets', 'site-assets', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public read access for objects in public buckets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Public can read public bucket objects'
  ) THEN
    CREATE POLICY "Public can read public bucket objects"
      ON storage.objects
      FOR SELECT
      USING (bucket_id IN ('product-images', 'part-images', 'brand-logos', 'blog-images', 'site-assets'));
  END IF;
END $$;

-- Authenticated users can upload/update/delete in project buckets
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Authenticated can manage project bucket objects'
  ) THEN
    CREATE POLICY "Authenticated can manage project bucket objects"
      ON storage.objects
      FOR ALL
      USING (
        auth.role() = 'authenticated'
        AND bucket_id IN ('product-images', 'part-images', 'brand-logos', 'blog-images', 'site-assets')
      )
      WITH CHECK (
        auth.role() = 'authenticated'
        AND bucket_id IN ('product-images', 'part-images', 'brand-logos', 'blog-images', 'site-assets')
      );
  END IF;
END $$;