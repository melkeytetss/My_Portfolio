/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // SAMEORIGIN (not DENY) so the resume page can embed its own PDF;
          // still blocks other sites from framing us (clickjacking protection).
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // NOTE: no Cache-Control override for /_next/static. One was here and it
      // caused persistent "module factory is not available" crashes in dev:
      // headers() applies in development too, and `immutable` told the browser
      // to never revalidate Turbopack HMR chunks — so after any edit/restart
      // the page ran a stale jsx-dev-runtime against a new chunk graph.
      // Next.js already sends correct caching headers for its own hashed
      // production assets; overriding them buys nothing and breaks HMR.
    ];
  },
};

export default nextConfig;
