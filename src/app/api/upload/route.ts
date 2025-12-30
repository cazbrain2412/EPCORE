import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export const runtime = "nodejs"; // important for sharp

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

async function processImage(buf: Buffer, kind: string) {
  const img = sharp(buf).rotate(); // auto-rotate based on EXIF

  if (kind === "icon") {
    return await img.resize(64, 64, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  }
  if (kind === "og") {
    return await img.resize(1200, 630, { fit: "cover" }).jpeg({ quality: 85 }).toBuffer();
  }
  if (kind === "hero") {
    return await img.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
  }
  // content default
  return await img.resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
}

export async function POST(req: Request) {
  await ensureDir();

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const kind = (form.get("kind") as string) || "content";

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const outBuf = await processImage(bytes, kind);

  const ext = kind === "icon" ? "png" : "jpg";
  const filename = `${Date.now()}-${safeName(file.name.replace(/\.(png|jpg|jpeg|webp)$/i, ""))}.${ext}`;
  const fullpath = path.join(UPLOAD_DIR, filename);

  await fs.writeFile(fullpath, outBuf);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    kind,
  });
}
