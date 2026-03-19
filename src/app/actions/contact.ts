"use server"; import prisma from "@/lib/prisma"; import { Resend } from "resend"; export async function submitContactForm(formData: FormData) { try { const name = formData.get("name") as string; const email = formData.get("email") as string; const message = formData.get("message") as string; if (!name || !email || !message) { return { success: false, error: "Please fill all required fields." }; } await prisma.contactMessage.create({ data: { name, email, message }, }); const apiKey = process.env.RESEND_API_KEY; if (apiKey) { const resend = new Resend(apiKey); await resend.emails.send({ from: "Portfólio <onboarding@resend.dev>", to: process.env.CONTACT_EMAIL || email, subject: `Novo Contato de ${name}`, replyTo: email, html: `<h3>Nova Mensagem</h3><p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`, }); } return { success: true }; } catch (error) { console.error(error); return { success: false, error: "Ocorreu um erro no servidor." }; } }
import { revalidatePath } from "next/cache";


export async function markMessageReadAction(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });
  revalidatePath("/admin/dashboard");
}

export async function deleteMessageAction(id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/dashboard");
}
