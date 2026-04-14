import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/widget",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://puntopago.net https://*.puntopago.net http://localhost:* https://localhost:*;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
