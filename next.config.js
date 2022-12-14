/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pngimg.com", "fakestoreapi.com"],
  },
  env: {
    // airbnbApiKey: process.env.AIRBNB_API_KEY,
    // airbnbApiHost: process.env.AIRBNB_API_HOST,
  },
};

module.exports = nextConfig;
