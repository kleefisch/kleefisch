"use server";

import { signToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password || !adminPassword) {
    return { error: "Missing configuration or password" };
  }

  // Verifica se a senha bate com a variável de ambiente segura
  if (password === adminPassword) {
    // 1. Gera o token
    const token = await signToken({ role: "admin" });

    // 2. Salva o token no Cookie (HTTP only, modo estritíssimo)
    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 dia limite
      path: "/",
    });

    // 3. Sucesso (O client irá redirecionar para a dashboard pela UI)
    return { success: true };
  } else {
    // Falhou
    return { error: "Invalid password" };
  }
}
