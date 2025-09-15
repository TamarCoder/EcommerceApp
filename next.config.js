/** @type {import('next').NextConfig} */
const nextConfig = {
  // შენი არსებული image configuration
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  
  // AWS Amplify optimizations
  output: 'standalone',
  distDir: '.next',
  
  experimental: {
    // CSS optimizations
    cssChunking: false,
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Trailing slash handling
  trailingSlash: false,
};

module.exports = nextConfig;