import { NextResponse } from "next/server";
import { draftMode } from "next/headers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const redirectTo = searchParams.get("redirect") || "/";

  const dm = await draftMode();
  dm.enable();

  return NextResponse.redirect(new URL(redirectTo, req.url));
}

