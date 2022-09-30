/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH_SECRET: "Getfit2022",
  },
};

module.exports = nextConfig;
