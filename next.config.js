/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["74gslzvj-3000.asse.devtunnels.ms"],
  },
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
