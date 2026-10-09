import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack inside this project when parent directories contain lockfiles.
  turbopack: { root: process.cwd() },
};

export default nextConfig;
