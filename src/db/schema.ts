import { pgTable, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password"),
    isVerified: boolean("is_verified").default(false),
    verificationToken: text("verification_token"),
    verificationExpires: timestamp("verification_expires"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});