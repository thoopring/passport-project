import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://checkvisamap.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private paid plans and API routes should never be indexed — the UUID
        // URLs are unguessable but crawler indexing would still leak them.
        disallow: ["/api/", "/plan/", "/r/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
