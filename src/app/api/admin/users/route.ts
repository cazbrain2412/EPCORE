// src/app/api/admin/users/route.ts
import { NextResponse } from "next/server";
// from src/app/api/admin/users -> go up 5 levels to reach project root, then /lib/mongoose
import dbConnect from "../../../../../lib/mongoose";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_a_strong_secret";

function verifyTokenFromHeader(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; role: string; email: string };
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const decoded = verifyTokenFromHeader(req);
    if (!decoded) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    if (decoded.role !== "admin") return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

    await dbConnect();
    const users = await User.find({}, { passwordHash: 0 }).lean();
    return NextResponse.json({ ok: true, users });
  } catch (err: any) {
    console.error("admin/users error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

