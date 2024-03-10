/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //domains: ["cdn-icons-png.flaticon.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
