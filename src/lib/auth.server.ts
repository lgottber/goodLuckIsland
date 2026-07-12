import { createRemoteJWKSet, jwtVerify } from "jose";

const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
function getJwks() {
  if (!jwks) {
    if (!AUTH0_DOMAIN)
      throw new Error("NEXT_PUBLIC_AUTH0_DOMAIN is not configured");
    jwks = createRemoteJWKSet(
      new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`),
    );
  }
  return jwks;
}

export interface VerifiedMember {
  sub: string;
  emailVerified: boolean;
}

// Replaces Postgres RLS (`auth.jwt() ->> 'sub' = user_id`) as the access
// control boundary now that D1 has no row-level security -- every route
// that touches member-owned data must call this and use ONLY the
// returned `sub` for any user_id column value or WHERE clause, never a
// client-supplied id from the request body/query.
export async function verifyMember(
  request: Request,
): Promise<VerifiedMember | null> {
  const header = request.headers.get("authorization");
  const token = header?.startsWith("Bearer ")
    ? header.slice("Bearer ".length)
    : null;
  if (!token || !AUTH0_DOMAIN) return null;

  try {
    const { payload } = await jwtVerify(token, getJwks(), {
      issuer: `https://${AUTH0_DOMAIN}/`,
      audience: AUTH0_CLIENT_ID,
    });
    if (typeof payload.sub !== "string") return null;
    return { sub: payload.sub, emailVerified: payload.email_verified === true };
  } catch {
    return null;
  }
}
