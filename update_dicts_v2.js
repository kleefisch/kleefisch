const fs = require("fs");

const en = JSON.parse(fs.readFileSync("./messages/en.json", "utf-8"));
const pt = JSON.parse(fs.readFileSync("./messages/pt.json", "utf-8"));
const de = JSON.parse(fs.readFileSync("./messages/de.json", "utf-8"));

// Fix Contact title spacing
en.Contact.title = "Let's work<br/>together.";
pt.Contact.title = "Vamos trabalhar<br/>juntos.";
de.Contact.title = "Lass uns zusammen<br/>arbeiten.";

en.AboutPage = {
  badge: "About Me",
  title: "The person behind <br /> <gradient>the code.</gradient>",
  bio_1:
    "Hi, I'm John. I build digital products that balance aesthetic beauty with engineering rigor.",
  bio_2:
    "My journey into software development didn't start with a formal computer science degree. It started with a relentless curiosity to understand how things work on the internet. What began as modifying HTML templates evolved into engineering complex, scalable full-stack applications.",
  bio_3:
    "Over the past few years, I've had the privilege of working across various industries—from early-stage startups to established digital agencies. This diversity has taught me that the best code isn't just clever; it's code that solves real human problems efficiently.",
  bio_4:
    "Today, my main focus is on modern web architectures using the React/Next.js ecosystem. I believe in the power of serverless technologies, edge computing, and strict typing with TypeScript to deliver flawless user experiences.",
  photoSlot: "[Photo Slot]",
  outOfOfficeTitle: "Out of Office",
  outOfOfficeDesc:
    "Writing code is my profession, but I believe that the best ideas often come when stepping away from the keyboard. Here is what keeps me grounded:",
  hobby1Title: "Specialty Coffee",
  hobby1Desc:
    "I treat making coffee like writing a complex algorithm. Perfecting the grind size and brewing methods.",
  hobby2Title: "Gaming",
  hobby2Desc:
    "Appreciating the immense engineering and narrative design behind modern video game development.",
  hobby3Title: "Open Source",
  hobby3Desc:
    "Contributing to tools I use daily, studying repositories, and learning from the global community.",
};
en.ProjectsPage = {
  badge: "Portfolio Showcase",
  title: "Projects",
  description: "A collection of things I've built, from side projects to complex web applications.",
  filterAll: "All",
  noProjects: "No projects found for this category.",
  viewDetails: "View Details",
};
en.ProjectDetailPage = {
  backToProjects: "Back to projects",
  accessLive: "Live Demo",
  viewCode: "Source Code (GitHub)",
  aboutProject: "About the Project",
  notionError: "Could not load detailed content for this project at the moment.",
};
en.NotFoundPage = {
  initDiagnostic: "> Initializing system diagnostics...",
  seq1: "> Status: File not found.",
  seq2: "> Critical Error: Dev forgot to build this page.",
  seq3: "> Trying to bribe the server with coffee...",
  seq4: "> Failed: Server demanded pizza.",
  seq5: "> Solution: Return to safety.",
  returnBase: "Return to Base",
  tryAgain: "Try Again",
};

/* --- PT --- */
pt.AboutPage = {
  badge: "Sobre Mim",
  title: "A pessoa por trás <br /> <gradient>do código.</gradient>",
  bio_1:
    "Olá, eu sou o John. Construo produtos digitais que equilibram estética e rigor na engenharia.",
  bio_2:
    "Minha jornada no desenvolvimento de software não começou com um diploma formal. Começou com uma curiosidade incansável de entender como as coisas funcionam na internet. O que começou modificando templates HTML evoluiu para a engenharia de aplicações full-stack complexas e escaláveis.",
  bio_3:
    "Nos últimos anos, tive o privilégio de trabalhar em diversas indústrias — de startups em estágio inicial a agências digitais estabelecidas. Essa diversidade me ensinou que o melhor código não é apenas inteligente; é um código que resolve problemas reais de pessoas de forma eficiente.",
  bio_4:
    "Hoje, meu foco principal são arquiteturas web modernas usando o ecossistema React/Next.js. Acredito no poder das tecnologias serverless, edge computing e tipagem estrita com TypeScript para entregar experiências perfeitas.",
  photoSlot: "[Espaço para Foto]",
  outOfOfficeTitle: "Fora do Escritório",
  outOfOfficeDesc:
    "Escrever código é minha profissão, mas acredito que as melhores ideias muitas vezes surgem ao nos afastarmos do teclado. Aqui está o que me mantém equilibrado:",
  hobby1Title: "Café Especial",
  hobby1Desc:
    "Eu trato o preparo de café como a escrita de um algoritmo complexo. Aperfeiçoando a moagem e os métodos de extração.",
  hobby2Title: "Jogos",
  hobby2Desc:
    "Apreciando a imensa engenharia e design narrativo por trás do desenvolvimento de jogos modernos.",
  hobby3Title: "Código Aberto",
  hobby3Desc:
    "Contribuindo para ferramentas que use diariamente, estudando repositórios e aprendendo com a comunidade global.",
};
pt.ProjectsPage = {
  badge: "Mostruário do Portfólio",
  title: "Projetos",
  description:
    "Uma coleção de coisas que construí, desde projetos pessoais a aplicações web complexas.",
  filterAll: "Todos",
  noProjects: "Nenhum projeto encontrado nesta categoria.",
  viewDetails: "Ver Detalhes",
};
pt.ProjectDetailPage = {
  backToProjects: "Voltar para projetos",
  accessLive: "Acessar ao Vivo",
  viewCode: "Ver Código (GitHub)",
  aboutProject: "Sobre o Projeto",
  notionError: "Não foi possível carregar o conteúdo detalhado deste projeto no momento.",
};
pt.NotFoundPage = {
  initDiagnostic: "> Inicializando diagnóstico do sistema...",
  seq1: "> Status: Arquivo não encontrado.",
  seq2: "> Erro crítico: O dev esqueceu de criar essa página.",
  seq3: "> Tentando subornar o servidor com café...",
  seq4: "> Falha: O servidor exigiu pizza.",
  seq5: "> Solução: Voltar para segurança.",
  returnBase: "Retornar à Base",
  tryAgain: "Tentar Novamente",
};

/* --- DE --- */
de.AboutPage = {
  badge: "Über Mich",
  title: "Die Person hinter <br /> <gradient>dem Code.</gradient>",
  bio_1:
    "Hallo, ich bin John. Ich entwickle digitale Produkte, die Ästhetik und technische Präzision miteinander verbinden.",
  bio_2:
    "Meine Reise in die Softwareentwicklung begann nicht mit einem Informatikstudium. Sie begann mit einer unermüdlichen Neugier zu verstehen, wie Dinge im Internet funktionieren. Was als das Ändern von HTML-Vorlagen begann, hat sich zur Entwicklung komplexer, skalierbarer Full-Stack-Anwendungen entwickelt.",
  bio_3:
    "In den letzten Jahren hatte ich das Privileg, mit verschiedenen Branchen zusammenzuarbeiten — von Startups in der Frühphase bis hin zu etablierten digitalen Agenturen. Diese Vielfalt hat mich gelehrt, dass der beste Code nicht nur clever ist; es ist Code, der reale Menschliche Probleme effizient löst.",
  bio_4:
    "Heute liegt mein Hauptfokus auf modernen Webarchitekturen unter Verwendung des React/Next.js-Ökosystems. Ich glaube an die Macht von Serverless-Technologien, Edge-Computing und der strikten Typisierung durch TypeScript, um makellose Benutzererfahrungen zu liefern.",
  photoSlot: "[Platz für Foto]",
  outOfOfficeTitle: "Außerhalb des Büros",
  outOfOfficeDesc:
    "Das Schreiben von Code ist mein Beruf, aber ich glaube, dass die besten Ideen oft dann entstehen, wenn man sich von der Tastatur entfernt. Folgendes hält mich im Gleichgewicht:",
  hobby1Title: "Spezialitätenkaffee",
  hobby1Desc:
    "Ich betrachte die Kaffeezubereitung wie das Schreiben eines komplexen Algorithmus. Eine Perfektionierung des Mahlgrads und der Brühmethoden.",
  hobby2Title: "Gaming",
  hobby2Desc:
    "Die enorme Ingenieurskunst und das narrative Design moderner Videospiele schätzen lernen.",
  hobby3Title: "Open Source",
  hobby3Desc:
    "Beiträge zu Tools leisten, die ich täglich nutze, Repositories studieren und von der globalen Gemeinschaft lernen.",
};
de.ProjectsPage = {
  badge: "Portfolio Showcase",
  title: "Projekte",
  description:
    "Eine Sammlung von Dingen, die ich gebaut habe, von Nebenprojekten bis hin zu komplexen Webanwendungen.",
  filterAll: "Alle",
  noProjects: "Keine Projekte für diese Kategorie gefunden.",
  viewDetails: "Details anzeigen",
};
de.ProjectDetailPage = {
  backToProjects: "Zurück zu Projekten",
  accessLive: "Live Demo",
  viewCode: "Quellcode (GitHub)",
  aboutProject: "Über das Projekt",
  notionError: "Detaillierte Inhalte für dieses Projekt konnten derzeit nicht geladen werden.",
};
de.NotFoundPage = {
  initDiagnostic: "> Initialisiere Systemdiagnose...",
  seq1: "> Status: Datei nicht gefunden.",
  seq2: "> Kritischer Fehler: Der Entwickler hat diese Seite vergessen.",
  seq3: "> Versuche, den Server mit Kaffee zu bestechen...",
  seq4: "> Fehlgeschlagen: Server hat Pizza verlangt.",
  seq5: "> Lösung: Zurück in die Sicherheit.",
  returnBase: "Zurück zur Basis",
  tryAgain: "Erneut versuchen",
};

fs.writeFileSync("./messages/en.json", JSON.stringify(en, null, 2));
fs.writeFileSync("./messages/pt.json", JSON.stringify(pt, null, 2));
fs.writeFileSync("./messages/de.json", JSON.stringify(de, null, 2));
console.log("Dictionaries updated successfully");
