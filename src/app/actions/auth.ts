"use server";

import { signToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifySync } from "otplib";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const totpCode = formData.get("totpCode") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  // Find Admin
  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin) {
    return { error: "Invalid credentials" };
  }

  // Check Password
  const isMatch = await bcrypt.compare(password, admin.passwordHash);

  if (!isMatch) {
    return { error: "Invalid credentials" };
  }

  // Step 1: verify password -> success, requires TOTP
  if (admin.isTwoFactorEnabled && !totpCode) {
    return { requiresTwoFactor: true, email };
  }

  // Step 2: verify TOTP
  if (admin.isTwoFactorEnabled && totpCode) {
    const timeTolerance = 1; // 1 step backward/forward is safe
    const result = verifySync({
      token: totpCode,
      secret: admin.twoFactorSecret || "",
      strategy: "totp",
      epochTolerance: timeTolerance, // Allows for slight clock drift
    });

    if (!result.valid) {
      return { error: "Código 2FA inválido", requiresTwoFactor: true, email };
    }
  }

  // Success: Set Cookie
  const token = await signToken({ role: "admin", email: admin.email });
  const cookieStore = await cookies();
  cookieStore.set({
    name: "admin_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { success: true };
}
