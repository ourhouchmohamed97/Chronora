import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  try {
    // Find user with this token
    const user = await db.query.users.findFirst({
      where: eq(users.verificationToken, token),
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    if (user.verificationExpires && user.verificationExpires < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // Update user to mark verified
    await db.update(users)
      .set({
        isVerified: true,
        verificationToken: null,
        verificationExpires: null,
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}