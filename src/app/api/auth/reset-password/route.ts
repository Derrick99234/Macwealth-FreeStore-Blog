import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();
    if (!token || !password) return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!resetToken) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    if (resetToken.expiresAt < new Date()) return NextResponse.json({ error: "Token expired" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { email: resetToken.email },
      data: { hashedPassword },
    });

    await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

    return NextResponse.json({ message: "Password reset successful" });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
