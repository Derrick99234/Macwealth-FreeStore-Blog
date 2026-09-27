import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

async function getSetting(key: string, fallback: string): Promise<string> {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? fallback;
}

async function upsertSetting(key: string, value: string) {
  if (!value) return;
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [blogName, blogDescription, blogLogo, seoTitle, seoDescription, admin] = await Promise.all([
    getSetting("blogName", process.env.NEXT_PUBLIC_SITE_NAME || "Macwealth FreeStore"),
    getSetting("blogDescription", process.env.BLOG_DESCRIPTION || "Transformational teachings on biblical wisdom, kingdom stewardship, spiritual illumination, and mindset renewal by Dr. Isaiah Macwealth."),
    getSetting("blogLogo", process.env.BLOG_LOGO || ""),
    getSetting("seoTitle", process.env.SEO_TITLE || "Macwealth FreeStore Blog — Spiritual Wisdom, Kingdom Wealth & Purpose"),
    getSetting("seoDescription", process.env.SEO_DESCRIPTION || "Free life-transforming teachings, spiritual strategies, and kingdom literature by Prophet Dr. Isaiah Macwealth."),
    prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { name: true, email: true, image: true },
    }),
  ]);

  return NextResponse.json({
    blogName,
    blogDescription,
    blogLogo,
    seoTitle,
    seoDescription,
    adminEmail: admin?.email || session.user.email,
    adminName: admin?.name || "Admin",
    adminImage: admin?.image || null,
  });
}

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    if (body.adminEmail || body.adminName || body.adminImage !== undefined) {
      await prisma.user.updateMany({
        where: { role: "ADMIN" },
        data: {
          ...(body.adminName && { name: body.adminName }),
          ...(body.adminEmail && { email: body.adminEmail }),
          ...(body.adminImage !== undefined && { image: body.adminImage }),
        },
      });
    }

    const settable = ["blogName", "blogDescription", "blogLogo", "seoTitle", "seoDescription"] as const;
    await Promise.all(
      settable.map((k) => (body[k] ? upsertSetting(k, body[k]) : Promise.resolve()))
    );

    return NextResponse.json({ message: "Settings updated" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
