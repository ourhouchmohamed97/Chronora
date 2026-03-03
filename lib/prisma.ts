import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DIRECT_URL,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter } as any);
}

export const prisma = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
