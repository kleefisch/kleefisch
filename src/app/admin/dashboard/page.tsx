import prisma from "@/lib/prisma";
import { formatDistanceToNow, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import {
  deleteMessageAction,
  toggleMessageReadAction,
  archiveMessageAction,
} from "@/app/actions/contact";
import { deleteProjectAction } from "@/app/actions/projects";
import { DeleteButton } from "@/components/admin/delete-button";
import { ProjectModalController } from "@/components/admin/project-modal-controller";
import {
  FolderGit2,
  Mail,
  Plus,
  Edit3,
  Globe,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Reply,
  Archive,
  MailOpen,
  Inbox,
} from "lucide-react";

// Cache para cada 60 segundos em vez de 0
export const revalidate = 60;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const view = params.view === "messages" ? "messages" : "projects";
  const messagesFilter = params.filter === "archived" ? "archived" : "inbox";
  const page = Number(params.page) || 1;
  const take = 20;
  const skip = (page - 1) * take;

  const totalProjects = await prisma.project.count();

  const [totalMessages, unreadMessagesCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false, archived: false } }),
  ]);

  const allMessages =
    view === "messages"
      ? await prisma.contactMessage.findMany({
          where: { archived: messagesFilter === "archived" },
          orderBy: { createdAt: "desc" },
          take,
          skip,
        })
      : [];

  const projects =
    view === "projects"
      ? await prisma.project.findMany({
          orderBy: { createdAt: "desc" },
          take,
          skip,
        })
      : [];

  const messages = allMessages;

  return (
    <div className="min-h-screen relative flex flex-col bg-background selection:bg-accent-cyan/30 pb-20">
      <ProjectModalController projects={projects} />
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-accent-violet/10 blur-[150px] mix-blend-screen pointer-events-none -z-10" />

      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
              <LayoutDashboard className="h-4 w-4 text-accent-cyan" />
            </div>
            <span className="font-semibold tracking-tight text-lg text-white">
              Nexus <span className="text-white/40 font-normal">Admin</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <Globe className="h-4 w-4" />
              Ver Site
            </Link>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 max-w-7xl py-10 space-y-8 relative z-10 w-full">
        {/* Header / Intro */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="text-neutral-400">
            Aqui você gerencia todo o portfólio e interações com os usuários.
          </p>
        </div>

        {/* KPI Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between z-10">
              <h3 className="text-sm font-medium text-neutral-400">Projetos Ativos</h3>
              <FolderGit2 className="h-4 w-4 text-accent-cyan" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-white z-10">
              {totalProjects}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between z-10">
              <h3 className="text-sm font-medium text-neutral-400">Msgs Não Lidas</h3>
              <div className="flex items-center justify-center">
                {unreadMessagesCount > 0 ? (
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                ) : (
                  <span className="relative flex h-3 w-3 bg-white/10 rounded-full"></span>
                )}
              </div>
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-white z-10">
              {unreadMessagesCount}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between z-10">
              <h3 className="text-sm font-medium text-neutral-400">Total de Contatos</h3>
              <Mail className="h-4 w-4 text-neutral-400" />
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight text-white z-10">
              {totalMessages}
            </p>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-white/5 mt-8 px-1">
          <Link
            href="/admin/dashboard?view=projects"
            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${view === "projects" ? "border-accent-cyan text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
          >
            <span className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4" />
              Projetos Web
            </span>
          </Link>
          <Link
            href="/admin/dashboard?view=messages"
            className={`pb-4 text-sm font-medium transition-colors border-b-2 flex items-center gap-2 ${view === "messages" ? "border-accent-violet text-white" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
          >
            <span className="flex items-center gap-2">
              <Inbox className="h-4 w-4" />
              Caixa de Entrada
            </span>
            {unreadMessagesCount > 0 && (
              <span className="bg-accent-violet text-white text-[10px] px-1.5 py-0.5 rounded-full leading-none">
                {unreadMessagesCount}
              </span>
            )}
          </Link>
        </div>

        {/* Content Area */}
        <div className="w-full pt-2">
          {view === "projects" ? (
            /* Projects Management */
            <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-accent-cyan rounded-full" />
                  <h2 className="text-xl font-bold text-white">Gerenciar Projetos</h2>
                </div>
                <Link
                  href="?action=new"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent-cyan px-5 text-sm font-bold text-black transition-all hover:bg-accent-cyan/90 hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                >
                  <Plus className="h-4 w-4" />
                  Criar Novo
                </Link>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-3 min-h-[400px]">
                {projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[380px] text-center p-8">
                    <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <Sparkles className="h-8 w-8 text-accent-cyan/40" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Nenhum projeto ainda</h3>
                    <p className="text-neutral-400 max-w-sm">
                      Clique em &quot;Criar Novo&quot; acima para adicionar o seu primeiro projeto
                      ao banco de
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 p-4 transition-all duration-300"
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-black/50 border border-white/10 shadow-inner">
                            <FolderGit2 className="h-6 w-6 text-neutral-500 group-hover:text-accent-cyan transition-colors" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <h3 className="font-semibold text-[15px] text-white flex items-center gap-3">
                              {project.title}
                              {project.featured && (
                                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                                  Destaque
                                </span>
                              )}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-400 font-mono tracking-wide">
                              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 uppercase">
                                {project.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-center bg-black/40 p-1.5 rounded-xl border border-white/5">
                          <Link
                            href={`/projects/${project.slug || project.id}`}
                            target="_blank"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-xs font-medium text-accent-cyan/80 hover:text-accent-cyan transition-colors"
                          >
                            <Globe className="h-3.5 w-3.5" />
                            Visualizar
                          </Link>
                          <div className="w-[1px] h-4 bg-white/10" />
                          <Link
                            href={`?action=edit&id=${project.id}`}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Editar
                          </Link>
                          <DeleteButton
                            action={deleteProjectAction.bind(null, project.id)}
                            type="projeto"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ) : (
            /* Messages Management */
            <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-accent-violet rounded-full" />
                  <h2 className="text-xl font-bold text-white">Central de Mensagens</h2>
                </div>

                <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/5">
                  <Link
                    href="/admin/dashboard?view=messages&filter=inbox"
                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${messagesFilter === "inbox" ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"}`}
                  >
                    Caixa de Entrada
                  </Link>
                  <Link
                    href="/admin/dashboard?view=messages&filter=archived"
                    className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${messagesFilter === "archived" ? "bg-white/10 text-white shadow-sm" : "text-neutral-400 hover:text-white"}`}
                  >
                    Arquivadas
                  </Link>
                </div>
              </div>

              <div className="w-full">
                {messages.length === 0 ? (
                  <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-12 text-center text-neutral-500 flex flex-col items-center">
                    <Archive className="h-10 w-10 mb-4 opacity-20" />
                    Nenhuma mensagem{" "}
                    {messagesFilter === "archived" ? "arquivada" : "na caixa de entrada"}.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`relative rounded-3xl border p-6 transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[250px] ${
                          msg.read
                            ? "bg-neutral-900/40 border-white/5 hover:bg-white/5"
                            : "bg-accent-violet/5 border-accent-violet/20 shadow-[0_4px_20px_rgba(139,92,246,0.05)]"
                        }`}
                      >
                        {!msg.read && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-violet/20 blur-[50px] rounded-full pointer-events-none" />
                        )}
                        <div className="flex flex-col gap-5 relative z-10 w-full mb-6">
                          {/* Email Header */}
                          <div className="flex justify-between items-start border-b border-white/5 pb-5">
                            <div className="flex gap-4 items-center w-full">
                              <div
                                className={`h-12 w-12 shrink-0 border rounded-[14px] flex items-center justify-center font-bold text-xl ${msg.read ? "bg-white/5 border-white/10 text-white/50" : "bg-accent-violet/10 border-accent-violet/30 text-accent-violet"}`}
                              >
                                {msg.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex flex-col w-full gap-0.5">
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-white text-[15px] font-semibold">
                                    {msg.name}
                                  </span>
                                  <time className="text-[11px] text-neutral-400 font-mono bg-black/40 border border-white/5 px-2.5 py-1 rounded-md">
                                    {format(msg.createdAt, "dd/MM/yyyy • HH:mm")}
                                  </time>
                                </div>
                                <div className="text-neutral-400 text-[13px]">
                                  De:{" "}
                                  <a
                                    href={`mailto:${msg.email}`}
                                    className="text-accent-cyan hover:underline"
                                  >
                                    {msg.email}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Email Body */}
                          <div
                            className={`text-[14px] leading-relaxed whitespace-pre-wrap ${msg.read ? "text-neutral-400" : "text-neutral-200 font-medium"}`}
                          >
                            {msg.message}
                          </div>
                        </div>

                        {/* Email Actions */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 relative z-10">
                          <div className="text-[11px] text-neutral-500 font-mono hidden sm:block">
                            {formatDistanceToNow(msg.createdAt, { addSuffix: true, locale: ptBR })}
                          </div>
                          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                            <a
                              href={`mailto:${msg.email}?subject=Re:${encodeURIComponent(" Seu contato via Portfólio")}&body=${encodeURIComponent(`\n\n\n--- Mensagem Original ---\nDe: ${msg.name}\nEm: ${format(msg.createdAt, "dd/MM/yyyy HH:mm")}\nMensagem:\n${msg.message}`)}`}
                              className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-md bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20 transition-colors w-full sm:w-auto"
                            >
                              <Reply className="h-3.5 w-3.5" />
                              <span>Responder</span>
                            </a>

                            <form
                              action={async () => {
                                "use server";
                                await toggleMessageReadAction(msg.id, !msg.read);
                              }}
                            >
                              <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-md bg-white/5 text-neutral-300 hover:bg-white/10 transition-colors w-full sm:w-auto">
                                {msg.read ? (
                                  <Mail className="h-3.5 w-3.5" />
                                ) : (
                                  <MailOpen className="h-3.5 w-3.5" />
                                )}
                                <span className="hidden xl:inline">
                                  {msg.read ? "Marcar Não Lido" : "Marcar Lida"}
                                </span>
                              </button>
                            </form>

                            <form
                              action={async () => {
                                "use server";
                                await archiveMessageAction(msg.id, !msg.archived);
                              }}
                            >
                              <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-md bg-white/5 text-neutral-300 hover:bg-white/10 transition-colors w-full sm:w-auto">
                                <Archive className="h-3.5 w-3.5" />
                                <span className="hidden xl:inline">
                                  {msg.archived ? "Desarquivar" : "Arquivar"}
                                </span>
                              </button>
                            </form>

                            <DeleteButton
                              action={deleteMessageAction.bind(null, msg.id)}
                              type="mensagem"
                              className="flex items-center justify-center p-2 text-neutral-400 hover:bg-red-500/10 hover:text-red-400 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
