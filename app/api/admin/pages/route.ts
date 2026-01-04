import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const page = await Page.create({
      title,
      status: "draft",
      seo: { slug: title.toLowerCase().replace(/\s+/g, "-") },
      sections: [],
    });

    return NextResponse.json({ page }, { status: 201 });
  } catch (err: any) {
    console.error("CREATE PAGE ERROR:", err);

    return NextResponse.json(
      { error: err?.message || "Internal Server Error" },
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

