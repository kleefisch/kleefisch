import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditProjectForm } from "@/components/admin/edit-project-form";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!project) return notFound();

  return (
    <div className="container max-w-2xl py-12">
      <EditProjectForm project={project} />
    </div>
  );
}
