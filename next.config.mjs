/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "cdn-contents-web.weverse.io",
      "weverse-phinf.pstatic.net",
      "pbs.twimg.com",
    ],
    deviceSizes: [5, 280, 320, 375, 500],
    imageSizes: [1, 270, 315, 360, 490],
  },
  async rewrites() {
    return [
      {
        source: "/instagram/image/:path*",
        destination: "https://scontent.cdninstagram.com/:path*",
      },
      {
        source: "/twitter/video/:path*",
        destination: "https://video.twimg.com/:path*",
      },
      {
        source: "/twitter/image/:path*",
        destination: "https://pbs.twimg.com/:path*",
      },
      {
        source: "/weverse/image/:path*",
        destination: "https://weverse-phinf.pstatic.net/:path*",
      },
    ];
  },
};

export default nextConfig;
