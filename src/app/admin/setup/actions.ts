"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateSecret, generateURI } from "otplib";

export async function setupAdminAction() {
  const email = "johnffreires@gmail.com";
  const plainPassword = "admin-portfolio-secure";

  // Check if admin already exists
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    return {
      success: false,
      message: "Usuário Admin já existe.",
      admin: existingAdmin,
      plainPassword:
        "Já foi definida, olhe os logs se perdeu, não posso mostrar de volta, tem que resetar ou usar a senha atual.",
    };
  }

  // Generate Hash
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  // Generate 2FA Secret
  const twoFactorSecret = generateSecret();

  // Create Admin
  const adminUser = await prisma.adminUser.create({
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
