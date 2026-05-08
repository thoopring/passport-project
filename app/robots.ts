import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://checkvisamap.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private paid plans and API routes should never be indexed — the
        // UUID URLs are unguessable but crawler indexing would still leak
        // them. Locale-prefixed variants (/ko/api/..., /ja/plan/..., etc.)
        // are also blocked because the middleware passes them through to
        // the same protected handlers.
        disallow: [
          "/api/",
          "/plan/",
          "/r/",
          "/ko/api/",
          "/ko/plan/",
          "/ko/r/",
          "/ja/api/",
          "/ja/plan/",
          "/ja/r/",
          "/zh/api/",
          "/zh/plan/",
          "/zh/r/",
          "/fr/api/",
          "/fr/plan/",
          "/fr/r/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
