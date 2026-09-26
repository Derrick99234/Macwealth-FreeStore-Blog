import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {
    ...(status === "ACTIVE" || status === "UNSUBSCRIBED" ? { status: status as "ACTIVE" | "UNSUBSCRIBED" } : {}),
  };

  const [subscribers, total] = await Promise.all([
    prisma.subscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.subscriber.count({ where }),
  ]);

  return NextResponse.json({ subscribers, total, page, totalPages: Math.ceil(total / limit) });
}
