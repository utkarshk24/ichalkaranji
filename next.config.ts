import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Two build modes:
 * - default: a Node server (Vercel, VPS) with the locale-redirect proxy and HTTP security headers;
 * - GITHUB_PAGES=true: a fully static export for GitHub Pages, served under NEXT_PUBLIC_BASE_PATH
 *   (e.g. /ichalkaranji). Pages can't run the proxy or send headers, so the root page redirects by
 *   browser language and the CSP is delivered as a <meta> tag instead.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "") : "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

/**
 * Content Security Policy for production. Next.js and the JSON-LD blocks use inline scripts, so script-src
 * allows 'unsafe-inline'; everything else is limited to this origin plus the two services the browser calls
 * (Open-Meteo for weather/AQI, OpenStreetMap for map tiles). Dev mode skips it (React refresh needs eval).
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://upload.wikimedia.org",
  "font-src 'self'",
  "connect-src 'self' https://api.open-meteo.com https://air-quality-api.open-meteo.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

if (process.env.NODE_ENV === "production") securityHeaders.push({ key: "Content-Security-Policy", value: csp });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Inline the (small) stylesheet into the HTML so first paint doesn't wait on a CSS request.
  experimental: { inlineCss: true },
  // Exposed to client and server code (canonical URLs, asset links, the root redirect).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_STATIC_EXPORT: isPages ? "true" : "false",
    NEXT_PUBLIC_CSP: csp,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Static hosting has no image optimiser.
    unoptimized: isPages,
    remotePatterns: [
      // Licensed photographs (data/media.json) are expected from Wikimedia Commons.
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  ...(isPages
    ? { output: "export" as const, basePath, trailingSlash: true }
    : {
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default withNextIntl(nextConfig);
