"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateSecret, generateURI } from "otplib";

export async function setupAdminAction() {
  const email = process.env.SETUP_ADMIN_EMAIL;
  const plainPassword = process.env.SETUP_ADMIN_PASSWORD;

  if (!email || !plainPassword) {
    return {
      success: false,
      message: "Credenciais não configuradas no .env (SETUP_ADMIN_EMAIL e SETUP_ADMIN_PASSWORD).",
    };
  }

  // Check if ANY admin already exists to prevent takeover
  const existingConfig = await prisma.adminUser.count();

  if (existingConfig > 0) {
    return {
      success: false,
      message:
        "Acesso Negado: Já existe um admin configurado. Delete os dados do banco para recriar.",
    };
  }

  // Generate Hash
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  // Generate 2FA Secret
  const twoFactorSecret = generateSecret();

  // Create Admin
  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
      twoFactorSecret,
      isTwoFactorEnabled: true, // Forcing to true for this portolio
    },
  });

  // Calculate the provisioning URI (what the QR Code reads)
  // Format: otpauth://totp/Portfólio%20Admin:johnffreires@gmail.com?secret={secret}&issuer=Portfólio%20Admin
  const totpUri = generateURI({
    issuer: "Portfólio Admin",
    label: email,
    secret: twoFactorSecret,
    strategy: "totp",
  });

  return {
    success: true,
    email,
    plainPassword,
    totpUri,
    message: "Admin gerado com sucesso!",
  };
}
