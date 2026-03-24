"use server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitContactForm(formData: FormData) {
  try {
    // Rate limit: Max 3 messages per hour (3600000 ms) per IP
    const allowed = await checkRateLimit("contact_form", 3, 3600000);
    if (!allowed) {
      return {
        success: false,
        error: "Muitas tentativas. Por favor, aguarde antes de enviar outra mensagem.",
      };
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Basic validations
    if (!name || !email || !message) {
      return { success: false, error: "Please fill all required fields." };
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, error: "Formato de e-mail inválido." };
    }

    if (message.length > 5000) {
      return { success: false, error: "A mensagem é muito longa (máximo 5000 caracteres)." };
    }

    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfólio <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || email,
        subject: `Novo Contato de ${name}`,
        replyTo: email,
        html: `<h3>Nova Mensagem</h3><p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`,
      });
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Ocorreu um erro no servidor." };
  }
}

export async function markMessageReadAction(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/dashboard");
}

export async function toggleMessageReadAction(id: string, read: boolean) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read },
  });
  revalidatePath("/admin/dashboard");
}

export async function archiveMessageAction(id: string, archived: boolean) {
  await prisma.contactMessage.update({
    where: { id },
    data: { archived },
  });
  revalidatePath("/admin/dashboard");
}

export async function deleteMessageAction(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/dashboard");
}
