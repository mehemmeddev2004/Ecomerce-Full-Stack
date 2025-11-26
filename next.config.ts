import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:3000'
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "kith.com",
      },
      {
        protocol: "https",
        hostname: "media.endclothing.com",
      },
    ],
  },
  // Video optimization
  webpack: (config: any) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://etor.onrender.com/api/auth/:path*',
      },
      {
        source: '/api/user/:path*',
        destination: 'https://etor.onrender.com/api/user/:path*',
      },
      {
        source: '/api/category/:path*',
        destination: 'https://etor.onrender.com/api/category/:path*',
      },
      {
        source: '/api/categories/:path*',
        destination: 'https://etor.onrender.com/api/categories/:path*',
      },
      {
        source: '/api/upload/:path*',
        destination: 'https://etor.onrender.com/api/upload/:path*',
      },
    ];
  },
};

export default nextConfig;
