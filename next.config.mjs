import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  compiler: {
    removeConsole: false,
  },
  reactStrictMode: true,
  output: "standalone",
  rewrites: () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
      },
      {
        source: "/api/auth/callback",
        destination: "/api/auth/callback/confirmate",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
