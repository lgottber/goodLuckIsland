import { Auth0Client } from "@auth0/auth0-spa-js";

const REDIRECT_URL_PATH = "/auth/callback";

export const auth0 = typeof window !== "undefined"
  ? new Auth0Client({
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: `${globalThis.location.origin}${REDIRECT_URL_PATH}`,
    },
  })
  : null as unknown as Auth0Client;
