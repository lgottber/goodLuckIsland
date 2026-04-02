"use client";

import { useRouter } from "next/navigation";
import { Auth0Provider } from "@auth0/auth0-react";

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
