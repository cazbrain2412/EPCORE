import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;
  await dbConnect();

  const page = await Page.findById(id).lean();
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ page });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  await dbConnect();

  const body = await req.json();

  const nextSlug = body?.seo?.slug || body?.slug;

  const updated = await Page.findByIdAndUpdate(
    id,
    {
      title: body.title,
      status: body.status,
      slug: nextSlug, // ✅ keep top-level in sync
      seo: {
        ...body.seo,
        slug: nextSlug,
        metaTitle: body?.seo?.metaTitle ?? body?.title ?? "",
        metaDescription: body?.seo?.metaDescription ?? "",
      },
      sections: body.sections,
      publishedAt: body.status === "published" ? new Date() : null,
      trashedAt: body.status === "trash" ? new Date() : null,
    },
    { new: true }
  ).lean();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ page: updated });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;
  await dbConnect();

  await Page.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
