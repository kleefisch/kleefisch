import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const content = `
    <h2>The Next-Gen Development Architecture</h2>
    <p>Este sistema é uma demonstração do novo portfólio desenvolvido do zero com Next.js 15 e PostgreSQL, focado em alta conversão e design impactante.</p>
    <p>Com um CMS integrado e protegido por senha, podemos editar esses mesmos conteúdos direto do painel (como se estivéssemos no Notion), e as alterações refletem no servidor instantaneamente.</p>

    <h3>O Desafio Técnico</h3>
    <p>Precisávamos não apenas de uma vitrine, mas de uma ferramenta de vendas com SEO impecável e velocidade absurda, sem esquecer a estética. O site teria que:</p>
    <ul>
      <li>Suportar múltiplos idiomas sem recarregar a tela (Next-Intl)</li>
      <li>Troca entre Light/Dark mode imediata (Tailwind CSS V4)</li>
      <li>Ser fácil de manter e adicionar novos estudos de caso.</li>
    </ul>

    <blockquote>
      <p>O design <strong>importa muito</strong> no momento de converter visitantes em clientes potenciais. Essa foi a nossa premissa.</p>
    </blockquote>

    <h3>Nossa Solução</h3>
    <p>Criamos um portal com modo escuro automático, tema de galáxia no fundo e transições fluidas. A cereja do bolo foi o Painel Admin CMS construído com TipTap.</p>

    <pre><code class="language-typescript">
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "A modern developer portfolio API", 
    status: 200,
    metrics: ["100/100 Lighthouse", "Sub-1s LCP"]
  });
}
    </code></pre>

    <p>E como uma imagem vale mais que mil palavras, aqui está o resultado detalhado da interface adaptada para todos os tipos de telas:</p>
    
    <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" alt="Coding on phone" />
    <p><em>Setup de desenvolvimento que usamos como inspiração para o Design.</em></p>
  `;

  // First we find if there is an old project to delete or just create!
  const project = await prisma.project.create({
    data: {
      title: "Neon Nexus Portfolio with CMS",
      description:
        "Um portfólio incrível e performático com CMS embutido estilo Notion para o desenvolvedor do futuro.",
      content: content,
      category: "Fullstack",
      tags: ["Next.js 15", "TipTap", "Postgres", "TailwindCSS V4", "Neon"],
      liveUrl: "https://nextjs.org",
      githubUrl: "https://github.com/vercel/next.js",
      featured: true,
      imageUrl:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
  });

  console.log("Mock project created!", project.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
