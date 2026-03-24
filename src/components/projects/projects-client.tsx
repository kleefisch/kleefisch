"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, MonitorPlay, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

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
  slug?: string | null;
};

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const t = useTranslations("ProjectsPage");
  const [activeCategory, setActiveCategory] = useState(t("filterAll"));

  // Get distinct categories from the DB projects + "All"
  const categories = [t("filterAll"), ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter(
    (project) => activeCategory === t("filterAll") || project.category === activeCategory,
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
    {
      color: "from-accent-cyan",
      iconColor: "text-accent-cyan",
      borderHover: "hover:border-accent-cyan/50",
    },
    {
      color: "from-accent-violet",
      iconColor: "text-accent-violet",
      borderHover: "hover:border-accent-violet/50",
    },
    {
      color: "from-emerald-400",
      iconColor: "text-emerald-400",
      borderHover: "hover:border-emerald-400/50",
    },
    { color: "from-blue-500", iconColor: "text-blue-500", borderHover: "hover:border-blue-500/50" },
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
                  {t("badge")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
                {t("title")}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">{t("description")}</p>
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
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.length === 0 && (
              <div className="text-muted-foreground col-span-full py-12 text-center text-lg">
                {t("noProjects")}
              </div>
            )}

            {filteredProjects.map((project, index) => {
              const gradient = gradients[index % gradients.length];

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`group relative flex flex-col rounded-2xl bg-foreground/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm transition-all hover:bg-foreground/[0.05] h-full shadow-lg ${gradient.borderHover}`}
                >
                  {/* Imagem / Mockup Topo */}
                  <div className="relative aspect-video overflow-hidden bg-background/50 border-b border-white/5 flex items-center justify-center shrink-0 min-h-[200px]">
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
                          className={`absolute inset-0 bg-gradient-to-br ${gradient.color} opacity-50 group-hover:opacity-70 transition-opacity`}
                        />

                        <div className="relative z-10 flex flex-col items-center gap-3 text-muted-foreground">
                          <MonitorPlay className={`h-10 w-10 ${gradient.iconColor} opacity-60`} />
                          <span className="font-mono text-xs opacity-50">[{project.category}]</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Conteúdo Abaixo */}
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-background border border-white/10 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interações Bottom */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-5 border-t border-white/5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {project.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md text-sm font-medium text-foreground transition-all hover:shadow-[0_0_14px_rgba(6,182,212,0.25)] active:scale-95"
                            style={{
                              background:
                                "linear-gradient(var(--color-background), var(--color-background)) padding-box, linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet)) border-box",
                              border: "1px solid transparent",
                            }}
                          >
                            <ExternalLink className="h-4 w-4" /> Demo
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md text-sm font-medium text-muted-foreground border border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground transition-colors active:scale-95"
                          >
                            <Github className="h-4 w-4" /> Code
                          </Link>
                        )}
                      </div>

                      {/* Link para página interna */}
                      <Link
                        href={`/projects/${project.slug || project.id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-cyan transition-colors group/link whitespace-nowrap ml-auto"
                      >
                        {t("viewDetails")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
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
