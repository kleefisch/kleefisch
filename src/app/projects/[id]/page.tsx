import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, MonitorPlay } from "lucide-react";
import Image from "next/image";

export const revalidate = 60; // ISR para manter a performance alta

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  // No Next.js 15+, os params são tratados de forma assíncrona
  const resolvedParams = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 relative flex-1">
        {/* Background ambient glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent-cyan/10 blur-[150px] mix-blend-screen pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para projetos
          </Link>

          {project.imageUrl ? (<div className="w-full aspect-video md:aspect-[21/9] rounded-3xl bg-neutral-900 border border-white/5 relative overflow-hidden group">
            <Image src={project.imageUrl} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
          </div>) : (<div className="w-full aspect-video md:aspect-[21/9] rounded-3xl bg-foreground/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-transparent opacity-40 z-10" />
            <MonitorPlay className="h-16 w-16 text-accent-cyan opacity-40 z-20 transition-transform duration-700 group-hover:scale-110" />
          </div>)}

          <div className="space-y-6 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 text-xs font-mono rounded bg-foreground/5 border border-white/10 text-accent-cyan">
                {project.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span key={index} className="px-2.5 py-1 text-sm font-mono rounded bg-white/5 text-foreground/80">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Acessar ao Vivo
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-white/5 border border-white/10 text-foreground font-medium hover:bg-white/10 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Ver Código (GitHub)
                </a>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none pb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Projeto</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>
            
            {project.content && (
              <div className="mt-8 text-muted-foreground whitespace-pre-wrap">
                {project.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}