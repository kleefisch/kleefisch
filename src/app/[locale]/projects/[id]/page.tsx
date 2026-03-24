import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ExternalLink, Github, MonitorPlay } from "lucide-react";
import Image from "next/image";
import { getNotionPage } from "@/lib/notion";
import { NotionRenderer } from "@/components/notion-renderer";
import { getTranslations } from "next-intl/server";

export const revalidate = 60; // ISR para manter a performance alta

type Props = {
  params: Promise<{ id: string }>;
};

function extractNotionId(content: string): string | null {
  // Simple extraction: se for uma URL, tenta pegar o final, senão assume que é o ID 32 chars
  try {
    const cleanId = content.replace(/-/g, "");
    const match = cleanId.match(/[a-f0-9]{32}/);
    if (match) return match[0];

    const url = new URL(content);
    const pathParts = url.pathname.split("-");
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart.length >= 32) return lastPart;
    return null;
  } catch {
    // If not a valid URL, it might be the ID directly
    const cleanId = content.replace(/-/g, "");
    if (cleanId.length === 32) return cleanId;

    // Tenta encontrar qualquer ID de 32 chars
    const match = cleanId.match(/[a-f0-9]{32}/);
    if (match) return match[0];
    return null;
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  // No Next.js 15+, os params são tratados de forma assíncrona
  const resolvedParams = await params;
  const t = await getTranslations("ProjectDetailPage");

  const project = await prisma.project.findFirst({
    where: {
      OR: [{ id: resolvedParams.id }, { slug: resolvedParams.id }],
    },
  });

  if (!project) {
    notFound();
  }

  let recordMap = null;
  let notionError = false;

  if (project.content) {
    const notionId = extractNotionId(project.content);
    console.log("NOTION EXTRACT TEST for ID:", project.id, " -> notionId:", notionId);
    if (notionId) {
      try {
        console.log("Fetching Notion page...", notionId);
        recordMap = await getNotionPage(notionId);
        console.log("Got recordMap keys count:", Object.keys(recordMap.block).length);
      } catch (error) {
        console.error("Failed to load Notion page", error);
        notionError = true;
      }
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 relative flex-1">
        {/* Background ambient glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent-cyan/10 blur-[150px] mix-blend-screen pointer-events-none -z-10" />

        <div className="w-full max-w-5xl mx-auto space-y-8 relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToProjects")}
          </Link>

          {project.imageUrl ? (
            <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl bg-neutral-900 border border-white/5 relative overflow-hidden group">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          ) : (
            <div className="w-full aspect-video md:aspect-[21/9] rounded-3xl bg-foreground/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-transparent opacity-40 z-10" />
              <MonitorPlay className="h-16 w-16 text-accent-cyan opacity-40 z-20 transition-transform duration-700 group-hover:scale-110" />
            </div>
          )}

          <div className="space-y-6 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 text-xs font-mono rounded bg-foreground/5 border border-white/10 text-accent-cyan">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-sm font-mono rounded bg-white/5 text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("accessLive")}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-white/5 border border-white/10 text-foreground font-medium hover:bg-white/10 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  {t("viewCode")}
                </a>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none pb-12 w-full">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t("aboutProject")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
              {project.description}
            </p>

            {recordMap && (
              <div className="mt-8 -mx-4 sm:mx-0">
                <NotionRenderer recordMap={recordMap} />
              </div>
            )}

            {!recordMap && project.content && !notionError && (
              <div
                className="mt-8 prose-img:rounded-xl prose-img:shadow-lg focus:outline-none text-muted-foreground whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: project.content }}
              ></div>
            )}

            {notionError && (
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                {t("notionError")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
