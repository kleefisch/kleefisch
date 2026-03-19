"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProjectAction } from "@/app/actions/projects";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  content: string | null;
};

export function EditProjectForm({ project }: { project: Project }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState(project.content || "");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    formData.set("content", content); // Injection do HTML

    startTransition(async () => {
      const result = await updateProjectAction(project.id, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/dashboard");
      }
    });
  }

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Editar Projeto</h1>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {error && (
            <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-1">
                Título do Projeto *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={project.title}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-neutral-300 mb-1"
              >
                Descrição Curta *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={3}
                defaultValue={project.description}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white resize-y"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-neutral-300 mb-1">
                Imagem do Projeto
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white file:mr-4 file:bg-neutral-800 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 hover:file:bg-neutral-700"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Selecione uma imagem para atualizar (opcional).
              </p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-1">
                Categoria *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                defaultValue={project.category}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  URL ao Vivo
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  defaultValue={project.liveUrl || ""}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  URL do GitHub
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  defaultValue={project.githubUrl || ""}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                name="tags"
                defaultValue={project.tags.join(", ")}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-neutral-300 mb-1">
                Notion Page ID
              </label>
              <input
                id="content"
                name="content"
                defaultValue={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="ID ou URL da página do Notion"
                className="flex h-10 w-full rounded-md border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Coloque o ID da página pública do Notion.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-950/50 p-4">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                defaultChecked={project.featured}
                className="h-4 w-4 rounded border-neutral-800 bg-neutral-950 text-white"
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer">
                  Projeto em Destaque
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black hover:bg-neutral-200 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
