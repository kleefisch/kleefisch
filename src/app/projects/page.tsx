export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white sm:px-12 md:px-24">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">Projetos</h1>
        <p className="mb-12 text-zinc-400">
          Uma seleção de aplicações, ferramentas e experimentos que construí recentemente.
        </p>

        {/* Simulando o Grid de Projetos Mapeado no Blueprint */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group flex aspect-video flex-col justify-end rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700"
            >
              <h3 className="text-xl font-medium">Projeto {i}</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Breve descrição do que faz e stack usada.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
