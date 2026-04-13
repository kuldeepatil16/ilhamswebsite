# Vereen Electro Froid

Production Next.js 16 website for Vereen Electro Froid, an HVAC, refrigeration, solar energy, and home appliance company based in Al Hoceima, Morocco.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- next-intl for `fr`, `ar`, and `en`
- Supabase for database, auth, and storage
- Resend for notifications
- Vercel Analytics

## What the app includes

- Multilingual public website
- RTL support for Arabic
- Theme-aware light/dark UI
- Product and spare parts catalogs
- Product detail pages with quote flows
- Blog and SEO pages
- Admin dashboard with CRUD for products, parts, posts, leads, and service requests
- Supabase-backed data layer

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NOTIFICATION_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GA_ID=
```

## Database

Schema and seed files live in `supabase/`.

- `supabase/migrations/001_initial_schema.sql`
- `supabase/seed.sql`

The seed file is intended for content tables:

- `brand_partners`
- `products`
- `spare_parts`
- `blog_posts`
- `site_settings`

## Remote Supabase seeding

Use the live Supabase project credentials and a Postgres client to execute the seed SQL directly against the database. The project connection details are configured in `.env.local` during development.

Recommended order:

1. Apply the migration SQL to the live project.
2. Run the seed SQL for production content.
3. Verify row counts and sample pages.
4. Confirm storage buckets and admin access.

## Brand assets

- Company logo: `public/images/logo.svg`
- Favicon: `public/favicon.svg`

## Production domain

The canonical domain for this deployment is `https://stevereenelectrofroid.com`.

## Quality checks

```bash
npm run lint
npm run build
```

## Notes

- The standalone `vereen_electro_froid_website.jsx` file is a reference artifact.
- The production app lives in `src/`.
- Supabase live data should be treated as the source of truth for catalog and content data after seeding.

## Dont remove this
Supabase Database password:
BOq9s4E5RAJQ36oL 

anon key - sb_publishable_BbT4PRHIpO_lr32cHh7Xzg_IOrnqsux
https://lyorvoeupdmoakmqzjmt.supabase.co


https://supabase.com/dashboard/project/lyorvoeupdmoakmqzjmt 

https://lyorvoeupdmoakmqzjmt.supabase.co sb_publishable_BbT4PRHIpO_lr32cHh7Xzg_IOrnqsux 


Successfully generated a new token!
Copy this access token and store it in a secure place. You will not be able to see it again.

sbp_e614f2c69a97542f0e7aa19dc98bd31cf59cbc41