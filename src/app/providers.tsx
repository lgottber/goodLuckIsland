"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SupabaseAuthSync } from "../components/SupabaseAuthSync";
import { BlockedGuard } from "../components/BlockedGuard";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "../lib/auth0";

// @auth0/auth0-spa-js contains browser-only module chunks that webpack cannot
// load during Next.js prerendering. Loading with ssr: false prevents the
// "module factory not available" prerender error.
const Auth0Provider = dynamic(
  () => import("@auth0/auth0-react").then((mod) => mod.Auth0Provider),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  if (!AUTH0_DOMAIN) throw new Error("NEXT_PUBLIC_AUTH0_DOMAIN is not set");
  if (!AUTH0_CLIENT_ID)
    throw new Error("NEXT_PUBLIC_AUTH0_CLIENT_ID is not set");

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined"
            ? window.location.origin + "/auth/callback"
            : undefined,
      }}
      onRedirectCallback={(appState) => {
        router.replace(appState?.returnTo ?? "/");
      }}
    >
      <SupabaseAuthSync />
      <BlockedGuard>{children}</BlockedGuard>
    </Auth0Provider>
  );
}
