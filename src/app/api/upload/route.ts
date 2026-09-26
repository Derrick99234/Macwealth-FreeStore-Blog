import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const storageKey = process.env.SUPABASE_STORAGE_KEY;
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || "blog_image";

    // If Supabase Storage is configured, upload directly to the cloud bucket
    if (supabaseUrl && storageKey) {
      const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucket}/${filename}`;
      const contentType = file.type || (ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "application/octet-stream");

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          apikey: storageKey,
          Authorization: `Bearer ${storageKey}`,
          "Content-Type": contentType,
        },
        body: buffer,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Supabase Storage upload error:", errorText);
        return NextResponse.json({ error: "Cloud storage upload failed" }, { status: 502 });
      }

      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filename}`;
      return NextResponse.json({ url: publicUrl });
    }

    // Local filesystem fallback for offline development
    const dir = path.join(process.cwd(), "public", "blog-images");
    const filepath = path.join(dir, filename);

    await mkdir(dir, { recursive: true });
    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/blog-images/${filename}` });
  } catch (err: any) {
    console.error("Upload route error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
