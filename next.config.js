/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
        protocol: "https",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
