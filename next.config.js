/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration
  images: {
    domains: ["images.unsplash.com"],
    // უკეთესია remotePatterns გამოყენება domains-ის მაგივრად
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
 
  
  experimental: {
    // ✅ სწორი ღირებულება
    cssChunking: 'strict', // ან მთლიანად წაშალე ეს ლაინი
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Trailing slash handling
  trailingSlash: false,
};

module.exports = nextConfig;