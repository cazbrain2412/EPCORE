import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Next.js 15: draftMode() is async
  (await draftMode()).disable();

  const url = new URL(req.url);
  const redirectTo = url.searchParams.get("redirect") || "/";

  return NextResponse.redirect(new URL(redirectTo, req.url));
}

