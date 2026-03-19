import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { deleteMessageAction, markMessageReadAction } from "@/app/actions/contact";
import { deleteProjectAction } from "@/app/actions/projects";

export default async function AdminDashboardPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Dashboard</h1>
          <p className="text-neutral-400">Gerencie projetos do portfólio e mensagens recebidas.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sessão Projetos - 7 Colunas */}
          <section className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Seus Projetos</h2>
              <Link 
                href="/admin/projects/new"
                className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
              >
                + Novo Projeto
              </Link>
            </div>
            
            <div className="grid gap-4">
              {projects.length === 0 ? (
                <div className="rounded-xl border border-neutral-800 border-dashed p-8 text-center text-neutral-500">
                  Nenhum projeto cadastrado.
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
                    <div>
                      <h3 className="font-medium text-white flex items-center gap-2">
                        {project.title}
                        {project.featured && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-accent-cyan/10 text-accent-cyan">
                            Destaque
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-neutral-500">{project.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-neutral-400 hover:text-white transition-colors text-sm"
                      >
                        Editar
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteProjectAction(project.id);
                      }}>
                        <button className="p-2 text-neutral-500 hover:text-red-400 transition-colors text-sm">
                          Deletar
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Sessão Mensagens - 5 Colunas */}
          <section className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse" />
              Mensagens
            </h2>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="rounded-xl border border-neutral-800 border-dashed p-8 text-center text-neutral-500">
                  Sua caixa de entrada está vazia.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`rounded-xl border p-5 ${msg.read ? 'bg-neutral-900/20 border-neutral-800/50 opacity-70' : 'bg-neutral-900/80 border-neutral-700'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <strong className="block text-white text-sm">{msg.name}</strong>
                        <a href={`mailto:${msg.email}`} className="text-xs text-accent-cyan hover:underline">{msg.email}</a>
                      </div>
                      <time className="text-[10px] text-neutral-500 whitespace-nowrap">
                        {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                      </time>
                    </div>
                    <p className="text-sm text-neutral-300 whitespace-pre-wrap mb-4 bg-black/20 p-3 rounded-md border border-white/5">
                      {msg.message}
                    </p>
                    <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-3">
                      {!msg.read && (
                        <form action={async () => {
                          "use server";
                          await markMessageReadAction(msg.id);
                        }}>
                          <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
                            Marcar como Lida
                          </button>
                        </form>
                      )}
                      <form action={async () => {
                        "use server";
                        await deleteMessageAction(msg.id);
                      }}>
                        <button className="text-xs font-medium text-neutral-500 hover:text-red-400">
                          Excluir
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}