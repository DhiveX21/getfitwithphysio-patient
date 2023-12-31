/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    AUTH_SECRET: "Getfit2022",
    URL_USER_SERVICE: "http://103.250.11.128:8002/user-service/api",
    URL_APPOINTMENT_SERVICE: "http://103.250.11.128:8002/appointment-service",
    URL_EXERCISE_SERVICE: "http://103.250.11.128:8002/lesson-service/api",
    URL_PRODUCT_SERVICE: "http://103.250.11.128:8002/product-service/api",
    URL_ORDER_SERVICE: "http://103.250.11.128:8002/order-service/api",
    URL_NOTIFICATION_SERVICE:
      "http://103.250.11.128:8002/notification-service/api",
    URL_TRANSACTION_SERVICE:
      "http://103.250.11.128:8002/transaction-service/api",
  },
};

module.exports = nextConfig;
