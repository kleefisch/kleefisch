import prisma from '@/lib/prisma';
import ProjectsClient from '@/components/projects/projects-client';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <ProjectsClient projects={projects} />
  );
}
