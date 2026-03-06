import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existing = await db.select().from(users).where(eq(users.email, user.email!));
      if (existing.length === 0) {
        await db.insert(users).values({
          email: user.email!,
          password: "",
          isVerified: true,
          verificationToken: null,
          verificationExpires: null,
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };