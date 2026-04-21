import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "session";

export type SessionUser = {
  uid: string;
  email: string | null;
};

export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function verifyServerSession() {
  const sessionCookie = await getSessionCookie();

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
    } as SessionUser;
  } catch {
    return null;
  }
}

export async function createSessionCookieFromIdToken(idToken: string, expiresInMs: number) {
  return adminAuth.createSessionCookie(idToken, { expiresIn: expiresInMs });
}

export async function verifyFreshIdToken(idToken: string, maxAgeSeconds: number) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const ageInSeconds = nowSeconds - decoded.auth_time;

  if (ageInSeconds > maxAgeSeconds) {
    return null;
  }

  return decoded;
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}
