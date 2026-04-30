import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      // Unsplash+ premium photos are hosted on plus.unsplash.com (different
      // CDN). Founder selected 2 such photos for the home hero rotation —
      // verify license terms before launch (paid subscription recommended).
      { protocol: "https", hostname: "plus.unsplash.com", pathname: "/**" },
    ],
  },

  // Security & performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // 2 years HSTS + subdomains + preload-eligible. Vercel sets a
          // basic HSTS automatically; this overrides with stricter policy
          // appropriate for a paid product.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Disable browser features we don't use. Reduces attack surface
          // if a third-party script ever tries to access them.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)\\.(js|css)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // Redirect www to non-www for SEO
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.checkvisamap.com" }],
        destination: "https://checkvisamap.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
