/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
