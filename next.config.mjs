/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.ayho.test",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "backend.ayho.app",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
