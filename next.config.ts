import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/farther-hp",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
