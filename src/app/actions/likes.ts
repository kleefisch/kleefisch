"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { checkRateLimit } from "@/lib/rate-limit";

export async function incrementProjectLike(projectId: string) {
  try {
    // Rate limit: Max 50 likes per hour per IP overall
    const allowed = await checkRateLimit(`like_${projectId}`, 50, 3600000);
    if (!allowed) {
      return { success: false, error: "Limite de curtidas atingido. Tente novamente mais tarde." };
    }

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        likes: {
          increment: 1,
        },
      },
      select: { likes: true },
    });

    // Revalidate paths where projects are shown
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${projectId}`);

    return { success: true, likes: project.likes };
  } catch (error) {
    console.error("Failed to increment like:", error);
    return { success: false, error: "Failed to like project" };
  }
}
