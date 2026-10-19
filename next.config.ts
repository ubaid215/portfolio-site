import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF when the browser supports it, then WebP. Both reduce the
    // transfer cost of the case-study screenshots without touching the design.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
