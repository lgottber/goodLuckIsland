"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { SupabaseAuthSync } from "../components/SupabaseAuthSync";
import { BlockedGuard } from "../components/BlockedGuard";

// @auth0/auth0-spa-js contains browser-only module chunks that webpack cannot
// load during Next.js prerendering. Loading with ssr: false prevents the
// "module factory not available" prerender error.
const Auth0Provider = dynamic(
  () => import("@auth0/auth0-react").then((mod) => mod.Auth0Provider),
  { ssr: false },
);


export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth0Domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const auth0ClientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  if (!auth0Domain) throw new Error("NEXT_PUBLIC_AUTH0_DOMAIN is not set");
  if (!auth0ClientId) throw new Error("NEXT_PUBLIC_AUTH0_CLIENT_ID is not set");

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      cacheLocation="localstorage"
      authorizationParams={{
        // eslint-disable-next-line camelcase
        redirect_uri: typeof window !== "undefined" ? window.location.origin + "/auth/callback" : undefined,
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
