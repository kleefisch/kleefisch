import prisma from '@/lib/prisma';
import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { Skills } from '@/components/home/skills';
import { Projects } from '@/components/home/projects';
import { Journey } from '@/components/home/journey';
import { Contact } from '@/components/home/contact';

export const revalidate = 60;

export default async function Home() {
  const featuredProjects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' },
    take: 2,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects featuredProjects={featuredProjects} />
      <Journey />
      <Contact />
    </div>
  );
}
