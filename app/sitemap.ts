import { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/data";
import { SAMPLE_PLANS } from "../lib/samples";
import { SITE_URL, sitemapAlternates } from "../lib/i18n/seo";

/**
 * Sitemap with multi-locale hreflang annotations.
 *
 * Every public page declares all 5 locale variants so Google can index
 * each language separately. Middleware (middleware.ts) serves the
 * /ko/, /ja/, /zh/, /fr/ prefixed URLs by rewriting to the existing
 * root pages and setting the NEXT_LOCALE cookie.
 *
 * Pages that should NOT be locale-enumerated:
 *   - Private plan UUIDs (/plan/[id]) — robots-disallowed, accessed via
 *     unguessable token, not a public surface
 *   - Referral redirects (/r/[code]) — not content
 *   - API routes — not content
 *   - Auth callbacks — not content
 *
 * Phase 1 community gallery (/community + /community/[id]) will be
 * added here when it ships — see docs/COMMUNITY-SHARING-PLAN.md.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Each entry is the language-neutral path; sitemapAlternates() expands
  // it into the hreflang record used by Next.js sitemap to emit the
  // proper xhtml:link rel="alternate" hreflang="ko" tags.
  const staticPages: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/plan/new", changeFrequency: "weekly", priority: 0.95 },
    { path: "/samples", changeFrequency: "weekly", priority: 0.9 },
    { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
    { path: "/refund", changeFrequency: "monthly", priority: 0.3 },
    { path: "/disclaimer", changeFrequency: "monthly", priority: 0.3 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    alternates: sitemapAlternates(p.path),
  }));

  const sampleRoutes: MetadataRoute.Sitemap = SAMPLE_PLANS.map((s) => ({
    url: `${SITE_URL}/samples/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
    alternates: sitemapAlternates(`/samples/${s.slug}`),
  }));

  const blogRoutes: MetadataRoute.Sitemap = Object.keys(BLOG_POSTS).map(
    (slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: sitemapAlternates(`/blog/${slug}`),
    }),
  );

  return [...staticRoutes, ...sampleRoutes, ...blogRoutes];
}
