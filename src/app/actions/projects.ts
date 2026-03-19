"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

export async function createProjectAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const rawTags = formData.get("tags") as string;
  const tags = rawTags ? rawTags.split(",").map(t => t.trim()).filter(t => t.length > 0) : [];
  const featured = formData.get("featured") === "on";
  const content = (formData.get("content") as string) || null;

  if (!title || !description || !category) {
    return { error: "Title, Description, and Category are required." };
  }

  const imageFile = formData.get("image") as File;
  let imageUrl = null;
  
  if (imageFile && imageFile.size > 0) {
    try {
      const blob = await put(imageFile.name, imageFile, { access: 'public' });
      imageUrl = blob.url;
    } catch (e) {
      console.error("Vercel Blob failed:", e);
    }
  }

  try {
    await prisma.project.create({
      data: {
        title, description, category, liveUrl, githubUrl, tags, featured, content, imageUrl,
      },
    });
    revalidatePath("/projects");
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: "Database error: Could not create the project." };
  }

  redirect("/admin/dashboard");
}

export async function updateProjectAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const liveUrl = (formData.get('liveUrl') as string) || null;
  const githubUrl = (formData.get('githubUrl') as string) || null;
  const rawTags = formData.get('tags') as string;
  const tags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(t => t.length > 0) : [];
  const featured = formData.get('featured') === 'on';
  const content = (formData.get('content') as string) || null;
  
  const imageFile = formData.get("image") as File;
  let imageUrl: string | undefined = undefined;

  if (imageFile && imageFile.size > 0) {
    try {
      const blob = await put(imageFile.name, imageFile, { access: 'public' });
      imageUrl = blob.url;
    } catch (e) {
      console.error("Vercel Blob failed:", e);
    }
  }

  try {
    const updateData: any = { title, description, category, liveUrl, githubUrl, tags, featured, content };
    if (imageUrl) updateData.imageUrl = imageUrl;

    await prisma.project.update({
      where: { id },
      data: updateData
    });
    
    revalidatePath('/projects');
    revalidatePath(`/projects/${id}`);
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating project:', error);
    return { error: 'Database error: Could not update the project.' };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { error: 'Database error: Could not delete the project.' };
  }
}
