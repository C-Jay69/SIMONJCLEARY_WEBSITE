import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles output automatically — no need for "standalone"
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Optimize images for Vercel's Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
