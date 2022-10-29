/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH_SECRET: "Getfit2022",
    URL_USER_SERVICE: "https://api.getfitwithphysio.com/user-service/api",
    URL_APPOINTMENT_SERVICE:
      "https://api.getfitwithphysio.com/appointment-service",
    URL_EXERCISE_SERVICE: "https://api.getfitwithphysio.com/lesson-service/api",
    URL_PRODUCT_SERVICE: "https://api.getfitwithphysio.com/product-service/api",
    URL_ORDER_SERVICE: "https://api.getfitwithphysio.com/order-service/api",
    URL_NOTIFICATION_SERVICE:
      "https://api.getfitwithphysio.com/notification-service/api",
  },
};

module.exports = nextConfig;
