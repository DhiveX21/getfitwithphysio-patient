/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH_SECRET: "Getfit2022",
    URL_USER_SERVICE: "http://103.174.114.48:8002/user-service/api",
    URL_APPOINTMENT_SERVICE: "http://103.174.114.48:8002/appointment-service",
  },
};

module.exports = nextConfig;
