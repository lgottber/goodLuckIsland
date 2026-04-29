import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  transpilePackages: ["@auth0/auth0-react", "@auth0/auth0-spa-js"],
  turbopack: {
    root: ".",
  },
  allowedDevOrigins: ["192.168.8.151"],
};

initOpenNextCloudflareForDev();

export default nextConfig;
