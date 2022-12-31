/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "pngimg.com",
      "fakestoreapi.com",
      "i.pcmag.com",
      "fortheloveblog.com",
    ],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
  async redirects() {
    return [
      {
        source: "/cancel",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
