# Passport Power (Check Visa Map)

## Project Overview
- **URL**: https://checkvisamap.com
- **Purpose**: Interactive visa requirement checker for 190+ countries across 8 major passports
- **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3
- **Deploy Target**: Vercel

## Architecture
```
app/
  layout.tsx          - Root layout (analytics, SEO metadata, JSON-LD schemas)
  page.tsx            - Home (client component: map, passport selector, search, affiliate)
  about/page.tsx      - Brand story page
  blog/page.tsx       - Blog index
  blog/[slug]/page.tsx - Blog post detail (with related posts)
  blog/data.ts        - All blog content (hardcoded BlogPost objects)
  visa/[slug]/page.tsx - Visa detail (static generation, affiliate toolkit, FAQ schema)
  privacy/page.tsx    - Privacy policy (required for AdSense)
  disclaimer/page.tsx - Affiliate & data disclaimer
  sitemap.ts          - Dynamic XML sitemap
  robots.ts           - Robots.txt generator
  manifest.ts         - PWA manifest
components/
  WorldMap.tsx         - react-simple-maps interactive visa map
  AffiliateSection.tsx - Home page affiliate banner (Aviasales, Agoda)
  AffiliateLink.tsx    - Tracked affiliate link with GA4 events
  AdBanner.tsx         - Google AdSense ad slot component
  NewsletterSignup.tsx - Email capture form
  TravelFortune.tsx    - Gamification fortune teller
```

## Data Files
- `visa_data.json` - Master visa database (~24K lines, 8 origins x 190+ destinations)
- `visa_data_usa.json` - Extended US-specific visa data

## Key Conventions
- Slug format: `{origin}-to-{destination}` (lowercase, alphanumeric, hyphens)
- Color palette: Primary `#1a4d2e`, Accent `#ff9f1c`, Background `#FFFBF0`
- Dark mode: class-based toggle, persisted to localStorage
- All affiliate links must use `rel="noopener noreferrer sponsored"`
- Blog content is HTML stored in TypeScript objects (not MDX/markdown files)

## Revenue Streams
1. **Affiliate Programs**: Agoda (cid:1956855), Aviasales, Airalo, Viator, NordVPN, Insubuy, Rail Europe
2. **Google AdSense**: Component ready (`AdBanner.tsx`), needs publisher ID after approval
3. **Newsletter**: Email capture for future monetization (courses, premium content)
4. **Travelpayouts**: Marker ID 491612

## SEO Setup
- OpenGraph + Twitter cards on all pages
- JSON-LD schemas: Organization, WebSite, BreadcrumbList, BlogPosting, FAQPage
- Dynamic metadata with `generateMetadata()`
- Canonical URLs on all dynamic routes
- XML sitemap with all static + dynamic routes
- Google Search Console verified

## Development Commands
```bash
npm run dev      # Local development
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

## Important Notes
- Home page (`app/page.tsx`) is a client component ("use client") - no server-side metadata export
- Visa detail pages use `generateStaticParams()` for ISR
- Blog posts use `generateStaticParams()` for static generation
- AdSense publisher ID placeholder: `ca-pub-XXXXXXXXXXXXXXXX` (replace after approval)
- Google Analytics: `G-3LF8H03QZG` | GTM: `GTM-TPRWDJ9X`

## Content Strategy
- Blog posts should target long-tail keywords: "visa requirements [country] 2026"
- Each blog post needs: title, date, excerpt, content (HTML), category
- Categories: Destinations, Visa Run Guides, Horror Stories, Lifestyle, Tips
- Visa pages auto-generate FAQ schema for Google rich snippets
