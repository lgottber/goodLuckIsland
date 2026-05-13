import { Auth0Client } from "@auth0/auth0-spa-js";

const REDIRECT_URL_PATH = "/auth/callback";

export const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

export const auth0: Auth0Client | null = typeof window !== "undefined"
  ? new Auth0Client({
    domain: AUTH0_DOMAIN!,
    clientId: AUTH0_CLIENT_ID!,
    authorizationParams: {
      // eslint-disable-next-line camelcase
      redirect_uri: `${window.location.origin}${REDIRECT_URL_PATH}`,
    },
  })
  : null;
