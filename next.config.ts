import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@auth0/auth0-react", "@auth0/auth0-spa-js"],
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
