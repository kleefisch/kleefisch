"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github, MonitorPlay } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { LikeButton } from "@/components/ui/like-button";

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
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Projects({ featuredProjects }: { featuredProjects: Project[] }) {
  const gradients = [
    { color: "from-accent-cyan/20 to-transparent", iconColor: "text-accent-cyan" },
    { color: "from-accent-violet/20 to-transparent", iconColor: "text-accent-violet" },
  ];

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-[150px] w-[500px] h-[500px] rounded-full bg-accent-cyan/10 blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
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
            className="grid grid-cols-1 gap-12"
          >
            {featuredProjects?.map((project, index) => {
              const style = gradients[index % gradients.length];
              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative flex flex-col lg:flex-row gap-8 items-center rounded-3xl bg-foreground/[0.02] border border-white/5 p-4 sm:p-6 lg:p-8 backdrop-blur-sm transition-all hover:bg-foreground/[0.04]"
                >
                  <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl bg-background/50 relative aspect-video border border-white/5 flex items-center justify-center group-hover:border-white/10 transition-colors">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-40 group-hover:opacity-60 transition-opacity z-10`}
                        />
                        <div className="relative z-20 flex flex-col items-center gap-4 text-muted-foreground">
                          <MonitorPlay className={`h-12 w-12 ${style.iconColor} opacity-50`} />
                          <span className="font-mono text-sm opacity-50">[{project.category}]</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-background border border-white/10 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mt-auto">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-foreground text-background font-medium transition-all hover:bg-foreground/90 active:scale-95"
                        >
                          <ExternalLink className="h-4 w-4" /> Live Demo
                        </Link>
                      )}
                      {project.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 h-10 px-6 rounded-md bg-white/5 border border-white/10 text-foreground font-medium transition-all hover:bg-white/10 active:scale-95"
                        >
                          <Github className="h-4 w-4" /> Source
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
    </section>
  );
}
