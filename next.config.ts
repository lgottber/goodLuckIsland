import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@auth0/auth0-react", "@auth0/auth0-spa-js"],
};

export default nextConfig;
