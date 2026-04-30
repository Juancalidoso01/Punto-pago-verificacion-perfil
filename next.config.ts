import type { NextConfig } from "next";

const frameAncestorsCsp =
  "frame-ancestors 'self' https://puntopago.net https://*.puntopago.net http://localhost:* https://localhost:*;";

const baselineSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/widget",
        destination: "/embed",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: baselineSecurityHeaders,
      },
      {
        source: "/embed",
        headers: [
          {
            key: "Content-Security-Policy",
            value: frameAncestorsCsp,
          },
        ],
      },
      {
        source: "/embed/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: frameAncestorsCsp,
          },
        ],
      },
      {
        source: "/widget",
        headers: [
          {
            key: "Content-Security-Policy",
            value: frameAncestorsCsp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
