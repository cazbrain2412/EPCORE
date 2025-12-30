import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Page from "@/lib/models/Page";


/* ===================== GET PAGE ===================== */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const page = await Page.findById(id);
  return NextResponse.json({ success: true, data: page });
}

/* ===================== UPDATE PAGE ===================== */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  const body = await req.json();
  const page = await Page.findByIdAndUpdate(id, body, { new: true });

  return NextResponse.json({ success: true, data: page });
}

/* ===================== DELETE PAGE ===================== */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  await Page.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

