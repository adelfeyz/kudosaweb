import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  transpilePackages: ['@adelfeyz/ui', '@adelfeyz/sdk'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3051').replace(
      /\/$/,
      ''
    );
    return [
      {
        source: '/uploads/:path*',
        destination: `${apiBase}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/pointer', destination: '/', permanent: true },
      { source: '/hadafsanj', destination: '/', permanent: true },
      { source: '/planning-agent', destination: '/', permanent: true },
      { source: '/training', destination: '/', permanent: true },
      { source: '/solutions/how-to-use', destination: '/', permanent: true },
      { source: '/solutions/performance', destination: '/', permanent: true },
    ];
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname, 'src'),
    },
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;
