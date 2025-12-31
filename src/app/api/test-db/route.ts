// src/app/api/test-db/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();
    // Count documents in the 'users' collection
    const db = mongoose.connection.db;
if (!db) throw new Error("MongoDB db is not ready yet");
const count = await db.collection("users").countDocuments();

    return NextResponse.json({ ok: true, users: count });
  } catch (err) {
    console.error("test-db error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

