import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "utfs.io" }, // UploadThing
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "*.cloudfront.net" }, // AWS CloudFront CDN
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/";
    const target = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
    return [
      {
        source: "/backend-api/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },
};

export default nextConfig;
