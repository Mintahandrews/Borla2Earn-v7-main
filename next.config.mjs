/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Only ignore build errors in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:` protocol
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify/browser',
    };

    return config;
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Enable standalone output
  output: 'standalone',
  // External packages for server components
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
};

export default nextConfig;
