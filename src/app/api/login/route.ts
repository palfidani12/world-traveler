// src/app/api/login/route.ts
import {
  createSessionCookieFromIdToken,
  getSessionCookieName,
  verifyFreshIdToken,
} from "@/lib/auth/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 5;
const SESSION_DURATION_MS = SESSION_DURATION_SECONDS * 1000;
const MAX_RECENT_SIGN_IN_SECONDS = 5 * 60;

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const idToken = typeof body?.idToken === "string" ? body.idToken : null;

    if (!idToken) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    const decoded = await verifyFreshIdToken(idToken, MAX_RECENT_SIGN_IN_SECONDS);

    if (!decoded) {
      return NextResponse.json(
        { error: "Recent sign-in required" },
        { status: 401 },
      );
    }

    const sessionCookie = await createSessionCookieFromIdToken(
      idToken,
      SESSION_DURATION_MS,
    );

    const cookieStore = await cookies();
    cookieStore.set(getSessionCookieName(), sessionCookie, {
      maxAge: SESSION_DURATION_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating session cookie", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
