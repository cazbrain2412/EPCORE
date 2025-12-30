import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";

type Ctx = { params: Promise<{ id: string }> };

function makeCopySlug(base: string, n: number) {
  return n === 1 ? `${base}-copy` : `${base}-copy-${n}`;
}

export async function POST(_: Request, { params }: Ctx) {
  const { id } = await params;
  await dbConnect();

  const original = await Page.findById(id).lean();
  if (!original) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const baseSlug = original?.slug || original?.seo?.slug || "page";

  let n = 1;
  let newSlug = makeCopySlug(baseSlug, n);
  while (await Page.exists({ slug: newSlug })) {
    n += 1;
    newSlug = makeCopySlug(baseSlug, n);
  }

  const copy = await Page.create({
    title: `${original.title} (Copy)`,
    slug: newSlug, // ✅ top-level
    status: "draft",
    seo: {
      ...(original.seo || {}),
      slug: newSlug, // ✅ seo.slug
      metaTitle: (original?.seo?.metaTitle || original.title || "Page") + " (Copy)",
      metaDescription: original?.seo?.metaDescription ?? "Write your SEO meta description.",
      canonicalUrl: original?.seo?.canonicalUrl ?? "",
      ogImageUrl: original?.seo?.ogImageUrl ?? "",
      noIndex: original?.seo?.noIndex ?? false,
    },
    sections: original.sections || [],
    publishedAt: null,
  });

  return NextResponse.json({ page: copy }, { status: 201 });
}
