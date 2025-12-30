// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
// from src/app/api/auth/login -> go up 5 levels to reach project root, then /lib/mongoose
import dbConnect from "../../../../../lib/mongoose";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_a_strong_secret";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return NextResponse.json({ ok: false, error: "email and password required" }, { status: 400 });

    await dbConnect();
    const user = await User.findOne({ email }).lean();
    if (!user) return NextResponse.json({ ok: false, error: "invalid credentials" }, { status: 401 });

    const match = await bcrypt.compare(password, (user as any).passwordHash);
    if (!match) return NextResponse.json({ ok: false, error: "invalid credentials" }, { status: 401 });

    const token = jwt.sign({ sub: user._id.toString(), role: user.role, email: user.email }, JWT_SECRET, { expiresIn: "8h" });
    return NextResponse.json({ ok: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    console.error("login error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

