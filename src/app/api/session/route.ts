import { NextResponse } from "next/server";
import { verifyServerSession } from "@/lib/auth/session";

export async function GET() {
  const sessionUser = await verifyServerSession();

  if (!sessionUser) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: sessionUser,
  });
}
