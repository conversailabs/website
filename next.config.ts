import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  },
  // Optional: Add any other specific configurations
};

export default nextConfig;