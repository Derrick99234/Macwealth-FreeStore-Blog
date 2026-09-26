import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {
    ...(status === "DRAFT" || status === "PUBLISHED" ? { status: status as "DRAFT" | "PUBLISHED" } : {}),
    ...(search ? {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { excerpt: { contains: search, mode: "insensitive" as const } },
      ],
    } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: { select: { id: true, name: true } }, category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  return NextResponse.json({ posts, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const authorId = session.user.id || (await prisma.user.findFirst({ where: { email: session.user.email || undefined } }))?.id || (await prisma.user.findFirst({ where: { role: "ADMIN" } }))?.id;
    if (!authorId) return NextResponse.json({ error: "No author found" }, { status: 400 });

    const body = await request.json();
    const { title, content, excerpt, featuredImage, status, categoryId, tags, seoDescription } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let slug = slugify(title);
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        featuredImage: featuredImage || null,
        status: status || "DRAFT",
        authorId,
        categoryId: categoryId || null,
        tags: tags || null,
        seoDescription: seoDescription || null,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
      include: { author: { select: { id: true, name: true } }, category: true },
    });

    if (categoryId) {
      await prisma.category.update({ where: { id: categoryId }, data: { postCount: { increment: 1 } } });
    }

    await prisma.activityLog.create({
      data: { action: "CREATE_POST", userId: session.user.id, postId: post.id },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
