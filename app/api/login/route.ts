import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        return NextResponse.json({ error: "No account found with this email." }, { status: 401 });
    }

    if (!user.password) {
        return NextResponse.json({ error: "Please sign in with Google" }, { status: 400 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return NextResponse.json({ error: "Incorrect password. Please try again." }, { status: 401 });
    }

    if (!user.isVerified) {
        return NextResponse.json(
            { error: "Please verify your email before logging in." },
            { status: 401 }
        );
    }

    return NextResponse.json({ success: true });
}