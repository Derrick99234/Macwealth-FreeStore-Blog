import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: { select: { id: true, name: true, image: true } }, category: true },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, excerpt, featuredImage, status, categoryId, tags, seoDescription, slug } = body;

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const oldCategoryId = existing.categoryId;

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(excerpt !== undefined && { excerpt }),
        ...(featuredImage !== undefined && { featuredImage }),
        ...(slug !== undefined && { slug }),
        ...(categoryId !== undefined && { categoryId }),
        ...(tags !== undefined && { tags }),
        ...(seoDescription !== undefined && { seoDescription }),
        ...(status !== undefined && {
          status,
          publishedAt: status === "PUBLISHED" && !existing.publishedAt ? new Date() : existing.publishedAt,
        }),
      },
      include: { author: { select: { id: true, name: true } }, category: true },
    });

    if (categoryId !== undefined && categoryId !== oldCategoryId) {
      if (oldCategoryId) await prisma.category.update({ where: { id: oldCategoryId }, data: { postCount: { decrement: 1 } } });
      if (categoryId) await prisma.category.update({ where: { id: categoryId }, data: { postCount: { increment: 1 } } });
    }

    await prisma.activityLog.create({
      data: { action: "UPDATE_POST", userId: session.user.id, postId: id },
    });

    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (existing.categoryId) {
    await prisma.category.update({ where: { id: existing.categoryId }, data: { postCount: { decrement: 1 } } });
  }

  await prisma.post.delete({ where: { id } });

  await prisma.activityLog.create({
    data: { action: "DELETE_POST", userId: session.user.id, postId: id },
  });

  return NextResponse.json({ message: "Deleted" });
}
