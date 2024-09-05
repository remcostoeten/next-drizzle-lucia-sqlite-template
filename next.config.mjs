/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "a8xlps4iyghkmbtr.public.blob.vercel-storage.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
