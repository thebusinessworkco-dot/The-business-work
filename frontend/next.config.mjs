import path from "node:path";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://images.unsplash.com;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.upstash.io https://*.supabase.co wss://*.supabase.co;
  frame-src 'self' https://challenges.cloudflare.com https://cafe-demo-lovat-sigma.vercel.app;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
`.replace(/\s{2,}/g, " ").trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "next/dist/build/polyfills/polyfill-module": path.resolve("./src/lib/empty-polyfill.js"),
        "../build/polyfills/polyfill-module": path.resolve("./src/lib/empty-polyfill.js"),
      };
    }
    return config;
  },
  async rewrites() {
    const rawCafeOrigin =
      process.env.CAFE_DEMO_ORIGIN || "https://cafe-demo-lovat-sigma.vercel.app";
    const cafeOrigin = rawCafeOrigin.replace(/\/+$/, "");

    return [
      {
        source: "/demo/cafe",
        destination: `${cafeOrigin}/demo/cafe`,
      },
      {
        source: "/demo/cafe/:path*",
        destination: `${cafeOrigin}/demo/cafe/:path*`,
      },
      {
        source: "/cafe-static/:path*",
        destination: `${cafeOrigin}/cafe-static/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};
export default nextConfig;
