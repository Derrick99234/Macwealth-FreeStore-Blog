import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const last30 = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalPosts,
    totalViews,
    publishedPosts,
    draftPosts,
    totalSubscribers,
    unreadInquiries,
    recentPosts,
    recentSubscribers,
    categoryDistribution,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.aggregate({ _sum: { viewCount: true } }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.subscriber.count({ where: { status: "ACTIVE" } }),
    prisma.contactInquiry.count({ where: { read: false } }),
    prisma.post.findMany({
      where: { createdAt: { gte: last30 } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { author: { select: { name: true } } },
    }),
    prisma.subscriber.count({ where: { createdAt: { gte: last30 } } }),
    prisma.category.findMany({
      select: { name: true, postCount: true },
      orderBy: { postCount: "desc" },
    }),
  ]);

  return NextResponse.json({
    totalPosts,
    totalViews: totalViews._sum.viewCount || 0,
    publishedPosts,
    draftPosts,
    totalSubscribers,
    unreadInquiries,
    recentPosts,
    recentSubscribers,
    categoryDistribution,
  });
}
