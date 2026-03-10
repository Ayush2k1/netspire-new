/** @type {import('next').NextConfig} */

const nextConfig = {
  turbopack: {
    // ...
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION", //your next configs goes here
  },
  // experimental: {
  //   taint: true,
  //   urlImports: ["https://themer.sanity.build/"],
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
