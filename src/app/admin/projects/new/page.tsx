"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/app/actions/projects";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await createProjectAction(formData);
      
      if (result?.error) {
        setError(result.error);
      } else {
        // Redireciona de volta para o dashboard em caso de sucesso
        router.push("/admin/dashboard");
      }
    });
  }

  return (
    <div className="container max-w-2xl py-12">
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/admin/dashboard" 
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Novo Projeto</h1>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Ex: Next.js Portfolio"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1">
                Descrição *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white resize-none"
                placeholder="Descreva o projeto..."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-300 mb-1">
                Categoria *
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-neutral-300 mb-1">
                  URL ao Vivo
                </label>
                <input
                  type="url"
                  id="liveUrl"
                  name="liveUrl"
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-neutral-300 mb-1">
                  URL do GitHub
                </label>
                <input
                  type="url"
                  id="githubUrl"
                  name="githubUrl"
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-neutral-300 mb-1">
                Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="React, Next.js, Tailwind..."
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-neutral-300 mb-1">
                Conteúdo do Case Study (Markdown)
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                className="w-full font-mono rounded-md border border-neutral-800 bg-neutral-950 px-3 py-3 text-sm text-white placeholder-neutral-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white resize-y"
                placeholder="## Arquitetura do Projeto&#10;\nEscreva aqui os detalhes do desenvolvimento..."
              />
              <p className="text-xs text-neutral-500 mt-1">
                Este texto aparecerá na página detalhada do projeto. Suporta formato Markdown.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-950/50 p-4">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                className="h-4 w-4 rounded border-neutral-800 bg-neutral-950 text-white focus:ring-white focus:ring-offset-neutral-950"
              />
              <div className="space-y-1 leading-none">
                <label htmlFor="featured" className="text-sm font-medium text-white cursor-pointer">
                  Projeto em Destaque
                </label>
                <p className="text-xs text-neutral-500">
                  Marque para exibir este projeto na página inicial do portfólio.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Criar Projeto"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
