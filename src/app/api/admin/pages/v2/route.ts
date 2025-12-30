import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";
import slugify from "slugify";

function makeSlug(base: string, n: number) {
  return n === 1 ? base : `${base}-${n}`;
}

export async function GET() {
  await dbConnect();
  const pages = await Page.find(
    { status: { $ne: "trash" } },
    { title: 1, status: 1, seo: 1, slug: 1, updatedAt: 1, publishedAt: 1 }
  )
    .sort({ updatedAt: -1 })
    .lean();

  return NextResponse.json({ pages });
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json().catch(() => ({}));
  const title = body?.title?.trim() || "New Page";

  const base = slugify(title, { lower: true, strict: true }) || "page";
  let n = 1;
  let slug = makeSlug(base, n);

  while (await Page.exists({ slug })) {
    n += 1;
    slug = makeSlug(base, n);
  }

  const created = await Page.create({
    title,
    slug, // ✅ top-level
    status: "draft",
    seo: {
      slug, // ✅ seo.slug
      metaTitle: title,
      metaDescription: "Write your SEO meta description.",
      canonicalUrl: "",
      ogImageUrl: "",
      noIndex: false,
    },
    sections: [],
    publishedAt: null,
  });

  return NextResponse.json({ page: created }, { status: 201 });
}
