import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "nikola.svircevic.hu" }],
          destination: "/nikola",
        },
        {
          source: "/en",
          has: [{ type: "host", value: "nikola.svircevic.hu" }],
          destination: "/nikola/en",
        },
        {
          source: "/",
          has: [{ type: "host", value: "agota.bodnar.svircevic.hu" }],
          destination: "/agota",
        },
        {
          source: "/en",
          has: [{ type: "host", value: "agota.bodnar.svircevic.hu" }],
          destination: "/agota/en",
        },
      ],
    };
  },
};

export default nextConfig;
