import prisma from "./prisma";
import { headers } from "next/headers";

export async function checkRateLimit(
  action: string,
  limit: number,
  windowMs: number,
): Promise<boolean> {
  try {
    const headersList = await headers();
    let ip =
      headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") ||
      "127.0.0.1";

    // In Vercel, x-forwarded-for is often a list. The first item is the real IP.
    ip = ip.trim();

    const now = new Date();

    // Clean up expired rate limits occasionally (can be roughly every time, or a cron job. We'll do it inline for simplicity but safely)
    await prisma.rateLimit.deleteMany({
      where: {
        resetAt: { lt: now },
      },
    });

    const record = await prisma.rateLimit.findUnique({
      where: {
        ip_action: {
          ip,
          action,
        },
      },
    });

    if (!record) {
      // First attempt
      await prisma.rateLimit.create({
        data: {
          ip,
          action,
          count: 1,
          resetAt: new Date(now.getTime() + windowMs),
        },
      });
      return true; // Allowed
    }

    if (record.count >= limit) {
      // Limit exceeded
      return false;
    }

    // Increment count
    await prisma.rateLimit.update({
      where: { id: record.id },
      data: { count: { increment: 1 } },
    });

    return true; // Allowed
  } catch (error) {
    console.error("Rate limit error:", error);
    // On error, let it pass rather than breaking the application (fail-open)
    return true;
  }
}
