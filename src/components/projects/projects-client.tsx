"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, MonitorPlay, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  createdAt: Date;
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Get distinct categories from the DB projects + "All"
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory,
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Helper properties to add dynamic styling to the DB projects based on their index
  const gradients = [
    { color: "from-accent-cyan/20 to-transparent", iconColor: "text-accent-cyan" },
    { color: "from-accent-violet/20 to-transparent", iconColor: "text-accent-violet" },
    { color: "from-accent-emerald/20 to-transparent", iconColor: "text-accent-emerald" },
    { color: "from-blue-500/20 to-transparent", iconColor: "text-blue-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Background Ambient Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent-violet/10 blur-[150px] mix-blend-screen pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-accent-violet" />
                <span className="text-accent-violet font-mono text-sm uppercase tracking-wider">
                  Portfolio Showcase
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
                Projects
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A collection of things I&apos;ve built, from side projects to complex web
                applications.
              </p>
            </div>

            {/* Filter Navigation */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-background border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Galeria em Grid Flexível */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory} // Force re-render animation when filter changes
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {filteredProjects.length === 0 && (
              <div className="text-muted-foreground col-span-full py-12 text-center text-lg">
                No projects found for this category.
              </div>
            )}

            {filteredProjects.map((project, index) => {
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group flex flex-col h-full rounded-3xl bg-foreground/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm transition-colors hover:bg-foreground/[0.04]"
                >
                  {/* Imagem / Mockup Topo */}
                  <div className="relative aspect-video w-full border-b border-white/5 bg-background flex items-center justify-center overflow-hidden">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${gradient.color} opacity-40 group-hover:opacity-60 transition-opacity z-10`}
                        />

                        <div className="relative z-20 flex flex-col items-center gap-2">
                          <MonitorPlay
                            className={`h-10 w-10 ${gradient.iconColor} opacity-50 transition-transform group-hover:scale-110`}
                          />
                        </div>
                      </>
                    )}

                    {/* Etiqueta de Categoria no canto */}
                    <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-xs font-mono text-muted-foreground">
                      {project.category}
                    </div>
                  </div>

                  {/* Conteúdo Abaixo */}
                  <div className="flex flex-col flex-1 p-6 sm:p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-base mb-6 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-foreground/70">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Interações Bottom */}
                    <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Source code"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          )}
                        </div>

                        {/* Link para página interna */}
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent-cyan transition-colors group/link ml-auto"
                        >
                          Ver Detalhes
                          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:-translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
