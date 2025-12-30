import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Page from "@/models/Page";

export async function GET() {
  await dbConnect();

  const siteUrl = process.env.SITE_URL || "http://localhost:3000";

  const pages = await Page.find({ status: "published" }, { seo: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 })
    .lean();

  const urls = pages
    .filter((p: any) => p?.seo?.slug)
    .map((p: any) => {
      const loc = `${siteUrl.replace(/\/$/, "")}/${p.seo.slug}`;
      const lastmod = p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString();
      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls +
    `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
