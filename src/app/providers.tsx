"use client";

import dynamic from "next/dynamic";

const Auth0Provider = dynamic(
  () => import("@auth0/nextjs-auth0/client").then((mod) => mod.Auth0Provider),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <Auth0Provider>{children}</Auth0Provider>;
}
