"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProjectLike(projectId: string) {
  try {
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
