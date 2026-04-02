import { Auth0Client } from "@auth0/auth0-spa-js";
import process from "node:process";

export const auth0 = typeof window !== "undefined"
  ? new Auth0Client({
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN!,
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!,
    authorizationParams: {
      redirect_uri: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
    },
  })
  : null as unknown as Auth0Client;
