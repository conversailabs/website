import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Fix workspace root detection for multiple package-lock.json files
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  typescript: {
    // Allows for more detailed type checking during build
    tsconfigPath: './tsconfig.json',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eleven-public-cdn.elevenlabs.io',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Optional: Add any other specific configurations
};

export default nextConfig;