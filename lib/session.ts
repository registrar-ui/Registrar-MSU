import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "msu_session";
const secretKey = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "dev-only-secret-change-me"
);

export type SessionPayload = {
  sub: string; // user id
  email: string;
};

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;