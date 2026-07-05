import path from "path";
import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- conditional require needed since this can't be a top-level ESM import
  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
  setupDevPlatform();
}

const nextConfig: NextConfig = {
  transpilePackages: ["@auth0/auth0-react", "@auth0/auth0-spa-js"],
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
