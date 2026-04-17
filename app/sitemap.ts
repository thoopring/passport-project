import { MetadataRoute } from "next";
import { BLOG_POSTS } from "./blog/data";
import { SAMPLE_PLANS } from "../lib/samples";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://checkvisamap.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/plan/new`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/samples`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const sampleRoutes: MetadataRoute.Sitemap = SAMPLE_PLANS.map((s) => ({
    url: `${baseUrl}/samples/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = Object.keys(BLOG_POSTS).map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...sampleRoutes, ...blogRoutes];
}
