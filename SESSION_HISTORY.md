# Histórico da Sessão 1: Fundação do Portfólio & Hero Section

_Data: 19 de Março de 2026_

## Resumo das Decisões e Implementações

Esta primeira sessão abordou o setup inicial, o mapa arquitetural do projeto e toda a implementação inicial do **Hero Section** da Landing Page.

### 1. Planejamento Inicial (`PROJECT_BLUEPRINT.md`)

Discutimos a estruturação macro de um Portfólio de Alta Performance e montamos um documento mestre.

- **Conceito Visual:** Tech Imersivo, Cyberpunk clean
- **Stack Consolidada:** Next.js 15 (App Router), Tailwind v4, Prisma, PostgreSQL (Neon), Framer Motion.
- **Seções Definidas:** Navbar, Hero, About/Elevator Pitch, Skills, Projects, Experience, Contact.

### 2. Configurações Globais e Arquitetura de Tema

- Injetamos as variáveis de design tokens (sistema de cores) dentro do arquivo `globals.css` utilizando o novo sistema de diretivas `@theme` do Tailwind CSS v4.
- As cores principais configuradas foram `--color-tech-bg`, combinadas a accent-colors como `--color-tech-cyan`, `--color-tech-violet` e `--color-tech-emerald`.
- Um seletor global (`ThemeProvider`) não precisou ser tocado profundamente ainda, mas já incluímos as cores como neutras de um tema escuro e text-colors adaptados.
- Criação base dos componentes de layout: `<Navbar />` (fixada com Glassmorphism) e `<Footer />` (com links básicos sociais).

### 3. O Componente Hero (`src/components/home/hero.tsx`)

A maior parte da sessão se concentrou no refino do Hero.

- **O Fundo (Particles):** Instalação inicial do módulo do `@tsparticles/react` e `@tsparticles/slim`, renderizando as teias galáticas do background.
- **Textos & Tipografia (Lado Esquerdo):**
  - "Hello, I'm" - Linha inicial com barra de indentação customizada `-`.
  - "John Kleefisch" - Título principal (`h1`) muito maior em gradiente de texto colorido (cyan -> emerald -> violet).
  - "Software Engineer" - Reduzimos o peso visual da fonte desta tagline para equilibrar.
  - "> Typewriter Effect" - Inserção de uma string em typescript que roda um loop (`react-type-animation`). Reduzimos por final a sua escala, para complementar o todo sem poluir.
- **Composto Fotográfico & Aura (Lado Direito):**
  - Chegamos em um design complexo em duas metades simulando uma janela/portal.
  - **A Aura/Glow:** Abandonamos lógicas antigas, e criamos um "radar" cósmico de aurora (h-[680px]) rodando atrás (`animate-[spin_15s_linear_infinite]`) fazendo blend das 3 cores primárias suavemente desfocadas com `blur-3xl`.
  - **A Borda (O "Portal"):** Dividimos circularmente uma borda de tamanho fixo em duas instâncias - Traseira e Frontal - ambas com cor _violeta_, separadas através de cortes matemáticos de CSS (`clip-path: inset()`) garantindo que a foto saia fisicamente em efeito 3D pelo meio das bordas, sem duplicar a cor de sobreposição nas luzes que a circundam.

### 4. Setup e Próximos Passos

Preparamos o blueprint final englobando a listagem atualizada do `package.json` para facilitar a portabilidade do repositório para uma nova máquina pelo desenvolvedor (comando `npm install`, seguido de `npm run dev`).

**Onde Paramos:**
Hero Stage perfeito e pronto.
O primeiro degrau na proxima máquina será engatar na confecção do **<About />** (Elevator Pitch) posicionado abaixo do Hero.
