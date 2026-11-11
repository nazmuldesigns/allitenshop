# Pataghor (পাতাঘর) — Online Bookstore for Bangladesh 📚🇧🇩

> **"পাতা ওল্টান, জীবন গড়ুন"** / *"Every page, delivered."*

Pataghor is a complete, production-ready, mobile-first online bookstore tailored for the Bangladesh market. Built with modern web standards and adhering to a **strict ZERO-COST constraint** using only free tiers (Next.js App Router, Supabase Postgres with RLS, Resend email, Cloudflare Pages).

---

## 🎨 Brand Identity

- **Name:** Pataghor (পাতাঘর)
- **Slogan:** "পাতা ওল্টান, জীবন গড়ুন" / "Every page, delivered."
- **Brand Colors:**
  - Forest Green: `#0B6E4F` (Primary)
  - Golden Amber: `#F4A300` (Accent / Flash sale)
  - Warm Off-White: `#FAF7F0` (Background)
- **Typography:** Noto Sans Bengali (`--font-bengali`) + Inter (`--font-sans`)
- **Currency:** Bangladeshi Taka (৳ BDT) with bilingual numerals
- **Language:** Bilingual UI (Bangla default with instant English toggle)

---

## ⚡ Key Features

1. **Homepage:**
   - Hero banner with delivery value propositions
   - Live Flash Sale strip with ticking real-time countdown timer
   - Genre/Category exploration grid
   - Bestsellers and New Arrivals showcases
   - Featured author spotlight (Humayun Ahmed, Rabindranath Tagore, Kazi Nazrul Islam, Muhammad Zafar Iqbal, etc.)

2. **Catalog & Instant Search:**
   - Postgres Trigram / bilingual full-text search across book titles, authors, and ISBNs
   - Hierarchical filter sidebar (Category, Author, Language, Price range, In-stock only)
   - Dynamic sorting (Most Popular, Price: Low to High, Price: High to Low, Top Rated, Newest)
   - Pagination with instant URL query parameter synchronization

3. **Book Detail Page (`/book/[slug]`):**
   - High-resolution cover art with discount and stock indicators
   - Dual Bangla + English metadata, publisher, edition, pages, ISBN
   - Dynamic ৳ pricing and savings calculator
   - Tabbed sections: Synopsis / Description, Specifications, and interactive Reader Reviews
   - Related and recommended books by the same author
   - JSON-LD Book schema and Open Graph tags for optimal SEO

4. **Cart & Multi-Step Checkout:**
   - Persistent client-side cart and wishlist (localStorage)
   - Promo coupon engine (e.g. `BOIMELA20` for 20% off, `PATAGHOR50` for ৳50 discount)
   - **Bangladesh Hierarchical Address Selector:** Division > District > Upazila cascading dropdowns
   - **Delivery Fee Logic:** Inside Dhaka City ৳60, Outside Dhaka ৳120, Free delivery on orders ৳1500+

5. **Extensible Payment Architecture:**
   - Cash on Delivery (COD) as first-class, active payment mode
   - Modular `PaymentProvider` interface ready for **bKash**, **Nagad**, and **SSLCommerz**

6. **Order Tracking (`/track`):**
   - 5-step visual progress bar: Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Delivered
   - Courier tracking notes and parcel status

7. **Admin Panel (`/admin`):**
   - Sales dashboard with total revenue, order count, total books, and low-stock alerts
   - Instant order status switcher with color-coded badges
   - Book catalog manager with modal for adding new books
   - **Bulk CSV Importer** to onboard entire publishing catalogs in seconds
   - Coupon and category inspectors

---

## 🛠️ Zero-Cost Tech Stack

| Component | Provider / Tool | Cost Tier |
|---|---|---|
| **Framework** | Next.js 16 (App Router) + TypeScript | Open Source (Free) |
| **Styling** | Tailwind CSS v4 + Lucide Icons | Open Source (Free) |
| **Database & Auth** | Supabase (PostgreSQL 15 + RLS + Storage) | Free Tier (500MB DB, 1GB Storage) |
| **Transactional Email** | Resend API | Free Tier (3,000 emails/month) |
| **Deployment** | Cloudflare Pages / Vercel | Free Tier (Unlimited bandwidth) |

---

## 🚀 Step-by-Step Free Deployment Guide

### Step 1: Set up Supabase (Database & Storage)

1. Go to [supabase.com](https://supabase.com) and create a free account.
2. Click **New Project** and name it `pataghor-prod` (choose Singapore `ap-southeast-1` or closest region for low latency to Bangladesh).
3. Navigate to the **SQL Editor** in the Supabase dashboard.
4. Execute the migration scripts in order:
   - First, run `supabase/migrations/20240101000000_init_schema.sql` (Creates tables, triggers, indexes, and full-text search).
   - Second, run `supabase/migrations/20240101000001_rls_policies.sql` (Enables Row Level Security on every table).
   - Third, run `supabase/seed.sql` (Seeds 30 authentic sample books, authors, publishers, categories, and coupons).
5. In **Storage**, create a new public bucket named `book-covers`.
6. Go to **Project Settings > API** and copy:
   - `Project URL` ➔ `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` ➔ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` ➔ `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Set up Resend (Order Confirmation Emails)

1. Sign up at [resend.com](https://resend.com) (Free: 100 emails/day, 3000/month).
2. Go to **API Keys** and generate a new key.
3. Save it as `RESEND_API_KEY`.
*(Note: In development, if `RESEND_API_KEY` is omitted, Pataghor automatically logs emails to the server console without crashing!)*

### Step 3: Deploy to Cloudflare Pages (or Vercel)

#### Option A: Cloudflare Pages (Recommended)
1. Push this repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com), go to **Workers & Pages > Create application > Pages > Connect to Git**.
3. Select the repository and configure build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npx @opennextjs/cloudflare` or `npm run build`
   - **Output directory:** `.next`
4. Under **Environment variables**, add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   RESEND_API_KEY=re_your_resend_key
   NEXT_PUBLIC_SITE_URL=https://pataghor.pages.dev
   ```
5. Click **Save and Deploy**. Your online bookstore is live!

---

## 💻 Local Development

1. **Clone & install dependencies:**
   ```bash
   git clone <repo-url>
   cd pataghor
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Explore the homepage, categories, and live search.
   - Test adding books to the cart, applying promo coupons (`BOIMELA20`, `PATAGHOR50`).
   - Complete checkout with the Bangladesh Division/District/Upazila selector.
   - Track your order at `/track`.
   - Access the admin panel at `/admin` to inspect orders, update delivery status, or bulk import books via CSV.

---

## 📂 Project Structure

```
pataghor/
├── .env.example                       # Reference environment variables
├── README.md                          # Documentation & zero-cost deploy guide
├── supabase/
│   ├── migrations/
│   │   ├── 20240101000000_init_schema.sql   # Postgres schema with indexes & triggers
│   │   └── 20240101000001_rls_policies.sql  # Row Level Security policies on all tables
│   └── seed.sql                             # 30 authentic Bangla & English books
├── src/
│   ├── app/
│   │   ├── page.tsx                   # Homepage (Hero, Flash Sale, Bestsellers)
│   │   ├── catalog/page.tsx           # Catalog with filters, search, sort, pagination
│   │   ├── book/[slug]/page.tsx       # Book detail with reviews and JSON-LD schema
│   │   ├── cart/page.tsx              # Shopping cart with coupon engine
│   │   ├── checkout/page.tsx          # Multi-step checkout with BD location picker
│   │   ├── checkout/success/page.tsx  # Order confirmation & dispatch timeline
│   │   ├── track/page.tsx             # Real-time order tracking
│   │   ├── wishlist/page.tsx          # Persistent wishlist
│   │   ├── admin/                     # Role-protected Admin control panel
│   │   │   ├── page.tsx               # Sales dashboard & KPI metrics
│   │   │   ├── orders/page.tsx        # Order status updates & courier notes
│   │   │   ├── books/page.tsx         # Books CRUD & bulk CSV import
│   │   │   ├── coupons/page.tsx       # Coupon code manager
│   │   │   └── categories/page.tsx    # Categories & authors directory
│   │   ├── api/                       # API routes (checkout, track, coupons, CSV)
│   │   ├── layout.tsx                 # Root layout (Noto Sans Bengali, Inter)
│   │   ├── globals.css                # Tailwind 4 custom brand tokens
│   │   ├── sitemap.ts                 # Dynamic XML sitemap
│   │   └── robots.ts                  # Robots.txt generator
│   ├── components/                    # Modular UI components
│   ├── context/                       # Language (BN/EN), Cart, and Wishlist contexts
│   ├── lib/
│   │   ├── data/                      # Bangladesh geo dataset & unified store service
│   │   ├── i18n/                      # Translations and ৳ BDT formatters
│   │   ├── payments/                  # Modular PaymentProvider interface (COD, bKash, Nagad)
│   │   ├── email/                     # Resend client & transactional templates
│   │   └── supabase/                  # Supabase SSR clients
│   └── types/                         # TypeScript definitions
```

---

## 📄 License

MIT License — free for commercial and non-commercial use.
Designed & engineered with ❤️ for book lovers across Bangladesh.
