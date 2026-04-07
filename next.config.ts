import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@auth0/auth0-react", "@auth0/auth0-spa-js"],
  turbopack: {
    root: ".",
  },
  allowedDevOrigins: ["192.168.8.151"],
};

export default nextConfig;
