"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectModal } from "./project-modal";

type Project = {
  id: string;
  title: string;
  slug?: string | null;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  content: string | null;
};

export function ProjectModalController({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const projectId = searchParams.get("id");

  const [isOpen, setIsOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    if (action === "new") {
      setMode("create");
      setActiveProject(null);
      setIsOpen(true);
    } else if (action === "edit" && projectId) {
      const proj = projects.find((p) => p.id === projectId);
      if (proj) {
        setMode("edit");
        setActiveProject(proj);
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }, [action, projectId, projects]);

  const handleClose = () => {
    setIsOpen(false);
    // Remove query params smoothly without refreshing the page
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("action");
    newUrl.searchParams.delete("id");
    router.replace(newUrl.pathname + newUrl.search);
  };

  return <ProjectModal isOpen={isOpen} onClose={handleClose} mode={mode} project={activeProject} />;
}
