"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction, updateProjectAction } from "@/app/actions/projects";
import { Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ImageCropperField } from "@/components/admin/image-cropper-field";

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
  imageUrl?: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  mode: "create" | "edit";
};

export function ProjectModal({ isOpen, onClose, project, mode }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // States to hold controlled forms
  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [content, setContent] = useState(project?.content || "");
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  // Reset internal state if project prop changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle(project?.title || "");
      setSlug(project?.slug || "");
      setContent(project?.content || "");
      setSlugEdited(!!project?.slug);
      setCroppedImage(null);
      setIsImageRemoved(false);
      setError(null);
    }
  }, [isOpen, project]);

  function generateSlug(text: string) {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setTitle(val);
    if (!slugEdited) {
      setSlug(generateSlug(val));
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(e.target.value);
    setSlugEdited(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    formData.set("content", content); // Injection do HTML/Notion ID

    if (croppedImage) {
      const file = new File([croppedImage], "project-image.jpg", { type: "image/jpeg" });
      formData.set("image", file);
    }

    startTransition(async () => {
      let result;
      if (mode === "edit" && project) {
        result = await updateProjectAction(project.id, formData);
      } else {
        result = await createProjectAction(formData);
      }

      if (result?.error) {
        setError(result.error);
      } else {
        onClose();
        router.refresh();
      }
    });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Modal Layer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar scroll-smooth bg-neutral-950 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 m-4 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-neutral-950/80 backdrop-blur pb-4 z-20 border-b border-white/5 -mt-2 -mx-2 px-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {mode === "create" ? "Criar Novo Projeto" : "Editar Projeto"}
                </h2>
                <p className="text-sm text-neutral-400">
                  {mode === "create"
                    ? "Preencha as informações para adicionar algo novo ao portfólio."
                    : "Modifique as propriedades deste projeto."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 flex-1 pr-2"
              encType="multipart/form-data"
            >
              {error && (
                <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20 flex items-center gap-3">
                  <div className="w-1.5 h-full min-h-[40px] bg-red-500 rounded-full" />
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-neutral-300">
                      Título do Projeto *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                      placeholder="Ex: Nexus Dashboard"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="slug" className="block text-sm font-medium text-neutral-300">
                      Slug *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      required
                      value={slug}
                      onChange={handleSlugChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all font-mono"
                      placeholder="ex: nexus-dashboard"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-neutral-300"
                  >
                    Descrição Curta *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={3}
                    defaultValue={project?.description}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all resize-none"
                    placeholder="Resumo que aparece no card do projeto..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-300">
                    Categoria *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    defaultValue={project?.category}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                    placeholder="Ex: Frontend, Backend, Full Stack"
                  />
                </div>

                <div className="space-y-2">
                  <ImageCropperField
                    currentImageUrl={project?.imageUrl}
                    onCropComplete={(blob) => {
                      if (blob === null) {
                        setCroppedImage(null);
                        setIsImageRemoved(true);
                      } else {
                        setCroppedImage(blob);
                        setIsImageRemoved(false);
                      }
                    }}
                  />
                  {isImageRemoved && <input type="hidden" name="removeImage" value="true" />}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">
                      URL ao Vivo
                    </label>
                    <input
                      type="url"
                      name="liveUrl"
                      defaultValue={project?.liveUrl || ""}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-300">
                      URL do GitHub
                    </label>
                    <input
                      type="url"
                      name="githubUrl"
                      defaultValue={project?.githubUrl || ""}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-300">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    defaultValue={project?.tags?.join(", ") || ""}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                    placeholder="React, Next.js, Tailwind..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium text-neutral-300">
                    Notion Page ID (Detalhes)
                  </label>
                  <input
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="ID ou URL da página do Notion"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    defaultChecked={project?.featured}
                    className="h-5 w-5 rounded border-white/10 bg-neutral-900 text-accent-cyan focus:ring-accent-cyan/30"
                  />
                  <div className="space-y-1 mt-0.5">
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium text-white cursor-pointer select-none"
                    >
                      Projeto em Destaque
                    </label>
                    <p className="text-xs text-neutral-500">Destaca este projeto na Home Page.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/5 mt-8 sticky bottom-0 bg-neutral-950 pt-4 z-20 pb-4 -mb-8">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-11 px-6 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet px-8 text-sm font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:pointer-events-none active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : mode === "create" ? (
                      "Criar Projeto"
                    ) : (
                      "Salvar Alterações"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
