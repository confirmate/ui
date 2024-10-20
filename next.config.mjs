import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  reactStrictMode: true,
  output: "standalone",
  rewrites: () => {
    return [
      {
        source: "/",
        destination: "/certification-targets",
      }
    ];
  },
};

export default withNextIntl(nextConfig);
