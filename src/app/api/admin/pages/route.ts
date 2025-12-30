import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Page from "@/lib/models/Page";


export async function GET() {
  try {
    await connectDB();
    const pages = await Page.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const page = await Page.create(body);
    return NextResponse.json({ success: true, data: page });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

