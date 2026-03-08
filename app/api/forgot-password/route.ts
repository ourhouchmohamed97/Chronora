import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await db.select().from(users).where(eq(users.email, email));
  if (user.length === 0) {
    // Ne pas révéler si l'email existe ou non
    return Response.json({ message: "If this email exists, a reset link has been sent." });
  }

  const resetToken = uuid();
  const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

  await db.update(users).set({
    resetToken,
    resetExpires,
  }).where(eq(users.email, email));

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your Chronora password",
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
    `,
  });

  return Response.json({ message: "If this email exists, a reset link has been sent." });
}