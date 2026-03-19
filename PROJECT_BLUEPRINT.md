# Blueprint do Projeto: Portfólio Full Stack Ambicioso

## 1. Visão Geral e Objetivo Principal

O objetivo deste projeto é construir um site de portfólio pessoal, moderno e de alto impacto para um desenvolvedor de software full stack. O site servirá como uma vitrine de habilidades técnicas, não apenas através dos projetos exibidos, mas pela própria tecnologia e arquitetura com que foi construído.

As características principais que demonstram essa ambição são:

- Arquitetura de ponta com Next.js (App Router).
- Funcionalidades de backend (CMS, likes, formulário de contato) para demonstrar proficiência full stack.
- Interface multilíngue (Inglês, Português, Alemão).
- Design sofisticado e imersivo (efeitos de Galáxia e Aurora Boreal).
- Código de alta qualidade, seguindo as melhores práticas da indústria.

---

## 2. Funcionalidades Planejadas

- **Design Totalmente Responsivo:** Perfeita visualização em desktops, tablets e celulares.
- **Conteúdo Trilíngue (i18n):** Suporte para Inglês (padrão), Português (Brasil) e Alemão.
- **Tema Claro e Escuro (Light/Dark Mode):** Com seletor manual e detecção da preferência do sistema.
- **Efeito de Fundo Dinâmico:** Um efeito de partículas conectadas (galáxia) e suaves ondas iluminadas ao fundo simulando aurora boreal.
- **Sistema de Conteúdo via Arquivos Locais:** Seções como "Blog" ou "Projetos" serão gerenciadas por arquivos `.mdx` locais, combinando a facilidade de escrita do Markdown com o poder dos componentes React.
- **Funcionalidades com Backend:**
  - **Formulário de Contato:** Salvará as mensagens enviadas em um banco de dados e disparará notificação por email (via Resend).
  - **Sistema de "Likes":** Visitantes poderão "curtir" projetos ou posts do blog, com a contagem persistida no banco de dados.
  - **Contador de Visitas e Analytics:** Rastreamento otimizado focado na privacidade via Vercel Analytics.

---

## 3. Arquitetura da Interface (Mapa do Site)

O fluxo de navegação e as páginas foram desenhadas para destacar o conteúdo progressivamente, mantendo um design limpo e de alto impacto.

### 3.1. Navbar e Footer (Globais)

- **Navbar:** Sticky, "glassmorphism", links para as seções (Home, About, Projects), seletor de Idioma e Theme Toggle (Dark/Light).
- **Footer:** Links sociais (GitHub, LinkedIn, Twitter/X), navegação rápida, status do sistema ou um pequeno "feito com Next.js & Tailwind".

### 3.2. Página Inicial (`/`) - Landing Page

Uma página longa e fluida atuando como "cartão de visitas" executivo.

1. **Hero Section:** Intro magnética com o nome, cargo (Full Stack Developer), call-to-action primário (Ver Projetos/Contato) e os efeitos visuais imersivos (Galáxia + Aurora Boreal).
2. **About Me (Resumo):** Um "Elevator Pitch" rápido sobre quem sou e minha filosofia de código. Link para a página detalhada.
3. **Skills & Technologies:** Uma exibição visual das ferramentas que domino (icons flutuantes, barras de proficiência ou grid interativo).
4. **Featured Projects:** Um "Taste" do portfólio. Apenas 2 a 4 dos projetos mais importantes e impressionantes com grandes cards e vídeos/imagens curtas.
5. **Professional Journey:** Uma linha do tempo (Timeline) enxuta destacando as últimas experiências de trabalho e conquistas.
6. **Contact Section:** Um formulário moderno com nome, email, mensagem utilizando Server Actions para enviar direto para a nossa base via Resend.

### 3.3. Página Sobre Mim (`/about`)

Um mergulho profundo na história, formação, visões e objetivos do desenvolvedor.

- Biografia longa (jornada até a tecnologia).
- Filosofias de trabalho, hobbies e curiosidades fora do código.

### 3.4. Lista de Projetos (`/projects`)

- Galeria em Grid.
- Overview completo com Cards atrativos de todos os projetos de portfólio.
- **Filtros ou Categorias:** (Ex: Frontend, Full Stack, Mobile, etc.).

### 3.5. Projeto Específico (`/projects/[slug]`)

Páginas geradas dinamicamente via Markdown (`.mdx`).

- **Header:** Título do projeto, ano, role, e botões diretos: **Live Demo** e **GitHub Repo**.
- **The Challenge / O Desafio:** Qual era o problema a ser resolvido.
- **The Solution / A Solução:** Arquitetura e abordagem.
- **Highlights:** Destaques técnicos (features complexas implementadas).
- **Tech Stack:** Ferramentas usadas naquele projeto específico.

## 4. Design System, Cores e Tipografia (Tech & Imersivo)

O design visual foca em um ambiente "Tech Imersivo", usando contrastes vibrantes, cores que remetem à alta tecnologia (cyber/neon) e extrema legibilidade.

### 4.1. Paleta de Cores (Vibrante & Tech)

O sistema de cores utiliza variáveis CSS modernas para transições vibrantes e vivas.

- **Fundo Principal (Dark Mode):** Um tom profundo de azul/cinza tecnológico (Ex: `#0A0E17` ou `#09090B`). Foge do preto puro para dar mais profundidade e conforto visual.
- **Texto Principal:** Branco fosco (`#F8FAFC`).
- **Texto Secundário:** Cinza Azulado (`#94A3B8`) para criar uma hierarquia clara.
- **Cores de Acento (Vivas e "Tech"):**
  - **Electric Cyan (`#06B6D4` a `#00FFD1`):** Usada para botões de destaque, links e detalhes técnicos que pulam na tela.
  - **Neon Violet (`#8B5CF6` a `#A855F7`):** Usada para o brilho da "aurora boreal" de fundo misturada ao Cyan, criando um efeito espacial moderno e pulsante.
  - **Tech Emerald (`#10B981`):** Usada para status "online", pill de tecnologias, ou badges de sucesso.
- **Superfícies (Cards e Navbars):** Efeito Glassmorphism (vidro) com `rgba(10, 14, 23, 0.6)` e forte amaciamento (`backdrop-blur-md`), além de bordas ultra finas iluminadas.

### 4.2. Tipografia

A tipografia combina o universo das interfaces de altíssima clareza com fontes "mono" clássicas de editores de código (IDE), unindo legibilidade ao tema "desenvolvedor".

| Elemento                 | Família de Fonte             | Peso (Weight)  | Tamanho (Desktop) |
| ------------------------ | ---------------------------- | -------------- | ----------------- |
| **Headings (H1)**        | Inter ou Geist Sans          | Bold (700)     | 4.5rem / 72px     |
| **Headings (H2)**        | Inter ou Geist Sans          | Bold (700)     | 3rem / 48px       |
| **Sub-headings (H3)**    | Inter ou Geist Sans          | Semibold (600) | 1.5rem / 24px     |
| **Body text**            | Inter ou Geist Sans          | Regular (400)  | 1rem / 16px       |
| **Code / Mono elements** | JetBrains Mono ou Geist Mono | Medium (500)   | 0.75rem / 12px    |
| **Tech pills**           | JetBrains Mono ou Geist Mono | Medium (500)   | 0.75rem / 12px    |

---

## 5. A Stack de Tecnologia Definitiva

| Categoria                    | Tecnologia Principal                          | Justificativa Breve                                                              |
| ---------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| **Arquitetura & Frontend**   | **Next.js 15+ (App Router) + React 19+ + TS** | Última geração, cache inteligente, Server Actions e performance.                 |
| **Backend & Banco de Dados** | **Neon (PostgreSQL Serverless) + Prisma**     | Banco rápido com scale-to-zero para redução de custos, perfeito com Prisma.      |
| **Styling & UI**             | **Tailwind CSS + Shadcn/UI + Framer Motion**  | Para uma interface bonita, customizável e fluida.                                |
| **Efeitos Visuais**          | **tsParticles + CSS Blur (Aurora)**           | Galáxia fluida com "connected dots" e ondas de Aurora Boreal otimizadas via GPU. |
| **Infra & Deploy**           | **Vercel + Vercel Analytics**                 | Deploy contínuo perfeito e tracking de tráfego sem esforço extra.                |
| **Email & Contato**          | **Resend + React Email**                      | Sistema moderno e confiável para disparar e-mails via API do backend.            |
| **Internacionalização**      | **`next-intl`**                               | Solução nativa para i18n na App Router.                                          |
| **MDX (Blog/Projetos)**      | **`next-mdx-remote`**                         | Parse flexível dos arquivos Markdown locais para React.                          |

---

### 5.1. Versões da Stack

Para garantir a consistência e reprodutibilidade do projeto, usaremos as versões _latest LTS_:

- **Node.js:** `>=22.x` (LTS atual)
- **Next.js:** `^15.x`
- **React:** `^19.x`
- **TypeScript:** `^5.x`
- **Tailwind CSS:** `^4.x`

---

## 6. Setup e Execução do Projeto (Acesso entre Máquinas)

Sempre que clonar este projeto em uma máquina nova, você precisará apenas do **Node.js** instalado para baixar as dependências e colocar o ambiente em pé. Todo o ambiente de desenvolvimento é isolado via `npm`.

### Como rodar em uma máquina nova:

1. Clone o repositório do github:

   ```bash
   git clone <sua-url-do-repositorio>
   cd kleefisch
   ```

2. Instale todas as dependências do projeto mapeadas:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse em seu navegador:
   > http://localhost:3000

### Bibliotecas Essenciais em uso no instante (registradas no package.json):

_Lembrete: O `npm install` cuida de instalar tudo automaticamente._

**Framework / Engine:**

- `next` (v15+)
- `react`, `react-dom` (v19+)

**Estilização e UI:**

- `tailwindcss` (v4+ e seu postcss plugin)
- `clsx` e `tailwind-merge` (Utilitários de classes dinâmicas)
- `next-themes` (Dark/Light mode)
- `lucide-react` (Ícones SVGs incríveis)

**Efeitos Interativos (Hero Section):**

- `framer-motion` (Animações de entrada e movimento)
- `@tsparticles/react` e `@tsparticles/slim` (Partículas/Galáxia de fundo)
- `react-type-animation` (Efeito de desenvolvedor digitando textos)

**Ferramentas dev (Qualidade do Código):**

- `typescript` (Tipagem)
- `eslint` (Linting rígido integrado)
- `prettier` (Formatação de código automática)
- `husky` e `lint-staged` (Garantia de código formatado antes de criar um commit)

---

## 7. Padrões de Código e Boas Práticas

Este guia define nossas convenções de código para garantir um desenvolvimento limpo, consistente e manutenível.

### Princípios Gerais

- **Legibilidade (Readability):** O código é lido muito mais vezes do que é escrito. Escreva para o próximo desenvolvedor (ou para você mesmo daqui a 6 meses).
- **Simplicidade (KISS - Keep It Simple, Stupid):** Prefira soluções simples e diretas. Evite complexidade desnecessária.
- **Não se Repita (DRY - Don't Repeat Yourself):** Abstraia lógicas e componentes que se repetem em múltiplos lugares.
- **Você Não Vai Precisar Disso (YAGNI - You Ain't Gonna Need It):** Não implemente funcionalidades ou abstrações "para o futuro". Resolva o problema presente.

### Estrutura de Arquivos e Pastas

- Seguiremos as convenções da App Router do Next.js e Tailwind v4 (`src/app/`, `src/components/`, `src/lib/`, etc.).
- **`src/app/`**: Contém as rotas da aplicação, e também o `globals.css` que agora centraliza a configuração do Tailwind v4.
- **`src/components/`**: Contém componentes React. Componentes reutilizáveis em toda a aplicação ficam na raiz, e específicos podem ser agrupados em subpastas.
- **`src/lib/`**: Contém lógica não-React, como funções utilitárias, lógica de banco de dados (Prisma), etc.

### Configuração do Tailwind CSS v4

- **Configuração CSS-First:** Não usaremos mais o `tailwind.config.js`. A configuração (temas, plugins, cores) será feita diretamente no `src/app/globals.css` utilizando as diretivas `@theme` e as variáveis CSS modernas nativas do v4.
- **Importação Principal:** Será feito o uso do `@import "tailwindcss";` nativo no CSS em vez das diretivas antigas do v3.

### TypeScript: O que fazer e não fazer (Do's and Don'ts)

- ✅ **FAZER:** Ser específico. Use `string`, `number`, `boolean` em vez de `any`.
- ✅ **FAZER:** Tipar os argumentos e os valores de retorno de todas as funções.
- ✅ **FAZER:** Usar `interface` para definir a "forma" de objetos e `type` para uniões, interseções ou tipos primitivos.
- ❌ **NÃO FAZER:** Usar `// @ts-ignore` ou `// @ts-expect-error` a menos que seja a única solução possível, e sempre com um comentário explicando o motivo.

### React / Next.js: O que fazer e não fazer

- ✅ **FAZER:** Manter componentes pequenos e com uma única responsabilidade.
- ✅ **FAZER:** Usar **Server Components** por padrão. Só adicione `"use client"` no topo do arquivo quando precisar de interatividade (hooks como `useState`, `useEffect`, ou eventos como `onClick`).
- ✅ **FAZER:** Manter a lógica de negócio fora dos componentes. Abstraia-a para hooks customizados ou funções na pasta `lib/`.
- ✅ **FAZER:** Dar nomes descritivos e claros para componentes, props e variáveis.
- ❌ **NÃO FAZER:** Passar objetos gigantes como props. Passe apenas os dados que o componente realmente precisa.

### Commits no Git

- ✅ **FAZER:** Seguir o padrão **Conventional Commits**. O nome do commit deve ter um prefixo que descreve a natureza da mudança.
  - `feat:` para novas funcionalidades (ex: `feat(auth): add login page`).
  - `fix:` para correção de bugs (ex: `fix(contact): validate email format`).
  - `docs:` para mudanças na documentação (ex: `docs: update project blueprint`).
  - `style:` para mudanças de formatação e estilo.
  - `refactor:` para refatorações que não alteram a funcionalidade.
  - `chore:` para tarefas de build, configuração, etc.

### Testes

- ✅ **FAZER:** Escrever testes para a lógica crítica de negócio (funções na pasta `lib/`) e para os comportamentos principais dos componentes.
- ✅ **FAZER:** Focar em testar o **comportamento** da aplicação do ponto de vista do usuário, não os detalhes de implementação.

---

## 7. Próximos Passos

Após a sua validação deste documento, o primeiro passo prático será:

1.  **Inicializar o projeto Next.js** com o comando `create-next-app`, já configurando TypeScript, Tailwind CSS e a pasta `src/`.
2.  Configurar o ESLint e o Prettier para garantir a qualidade do código desde o início.
3.  Fazer o commit inicial do projeto no Git.

Estou à disposição para quaisquer ajustes neste plano.
