"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import process from "node:process";

// @auth0/auth0-spa-js contains browser-only module chunks that webpack cannot
// load during Next.js prerendering. Loading with ssr: false prevents the
// "module factory not available" prerender error.
const Auth0Provider = dynamic(
  () => import("@auth0/auth0-react").then((mod) => mod.Auth0Provider),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
      }}
      onRedirectCallback={(appState) => {
        router.replace(appState?.returnTo ?? "/");
      }}
    >
      {children}
    </Auth0Provider>
  );
}
