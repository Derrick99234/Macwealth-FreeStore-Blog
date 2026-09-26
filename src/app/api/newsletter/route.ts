import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      if (existing.status === "UNSUBSCRIBED") {
        await prisma.subscriber.update({ where: { id: existing.id }, data: { status: "ACTIVE" } });
        return NextResponse.json({ message: "Re-subscribed successfully" });
      }
      return NextResponse.json({ message: "Already subscribed" });
    }

    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
