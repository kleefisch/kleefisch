"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, MonitorPlay } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { LikeButton } from "@/components/ui/like-button";
import { SectionScrollHint } from "@/components/ui/section-scroll-hint";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl?: string | null;
  likes: number;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Projects({ featuredProjects }: { featuredProjects: Project[] }) {
  const gradients = [
    {
      color: "from-accent-cyan/20 to-transparent",
      iconColor: "text-accent-cyan",
      borderHover: "hover:border-accent-cyan/30",
    },
    {
      color: "from-accent-violet/20 to-transparent",
      iconColor: "text-accent-violet",
      borderHover: "hover:border-accent-violet/30",
    },
    {
      color: "from-accent-emerald/20 to-transparent",
      iconColor: "text-accent-emerald",
      borderHover: "hover:border-accent-emerald/30",
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen flex flex-col justify-start pt-24 pb-16 overflow-hidden scroll-mt-16"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60" />
      {/* Cyan aurora — slow drift left to right */}
      <motion.div
        animate={{ x: [-200, 180, -200], y: [-60, 140, -60] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-[200px] w-[850px] h-[700px] rounded-full bg-accent-cyan/18 blur-[130px] mix-blend-screen pointer-events-none"
      />
      {/* Emerald aurora — slow drift bottom-right */}
      <motion.div
        animate={{ x: [160, -140, 160], y: [100, -120, 100] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute bottom-0 right-0 w-[800px] h-[700px] rounded-full bg-accent-emerald/14 blur-[150px] mix-blend-screen pointer-events-none"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-accent-cyan" />
                <span className="text-accent-cyan font-mono text-sm uppercase tracking-wider">
                  Portfolio
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground mb-2"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {(!featuredProjects || featuredProjects.length === 0) && (
            <div className="text-muted-foreground text-lg py-12">No featured projects found.</div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProjects?.map((project, index) => {
              const style = gradients[index % gradients.length];
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`group relative flex flex-col rounded-2xl bg-foreground/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm transition-all hover:bg-foreground/[0.05] ${style.borderHover}`}
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden bg-background/50 border-b border-white/5 flex items-center justify-center shrink-0">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-50 group-hover:opacity-70 transition-opacity`}
                        />
                        <div className="relative z-10 flex flex-col items-center gap-3 text-muted-foreground">
                          <MonitorPlay className={`h-10 w-10 ${style.iconColor} opacity-60`} />
                          <span className="font-mono text-xs opacity-50">[{project.category}]</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 text-[10px] font-mono font-medium rounded-full bg-background border border-white/10 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-sm font-medium text-foreground transition-all hover:shadow-[0_0_14px_rgba(6,182,212,0.25)] active:scale-95"
                          style={{
                            background:
                              "linear-gradient(var(--color-background), var(--color-background)) padding-box, linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet)) border-box",
                            border: "1px solid transparent",
                          }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:shadow-[0_0_14px_rgba(139,92,246,0.2)] active:scale-95"
                          style={{
                            background:
                              "linear-gradient(var(--color-background), var(--color-background)) padding-box, linear-gradient(135deg, var(--color-accent-violet), var(--color-accent-cyan)) border-box",
                            border: "1px solid transparent",
                          }}
                        >
                          <Github className="h-3.5 w-3.5" /> Source
                        </Link>
                      )}
                      <div className="ml-auto">
                        <LikeButton projectId={project.id} initialLikes={project.likes} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
      <SectionScrollHint />
    </section>
  );
}
