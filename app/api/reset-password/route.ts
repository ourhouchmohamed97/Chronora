import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const user = await db.select().from(users).where(eq(users.resetToken, token));
  if (user.length === 0) {
    return Response.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  if (user[0].resetExpires && user[0].resetExpires < new Date()) {
    return Response.json({ error: "Token expired" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.update(users).set({
    password: hashedPassword,
    resetToken: null,
    resetExpires: null,
  }).where(eq(users.resetToken, token));

  return Response.json({ message: "Password reset successfully" });
}