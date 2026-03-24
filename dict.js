const fs = require("fs");

const pt = {
  Navigation: { home: "Início", about: "Sobre", projects: "Projetos", contact: "Contato" },
  Footer: {
    built_with: "desenvolvido com",
    all_rights_reserved: "Kleefisch. Todos os direitos reservados.",
  },
  Hero: {
    greeting: "Olá, eu sou",
    cta_projects: "Veja meu Trabalho",
    cta_contact: "Entre em Contato",
  },
  About: {
    badge: "Resumo Rápido",
    title:
      "Unindo a ponte entre <gradient1>design</gradient1> & <gradient2>engenharia</gradient2>.",
    description_1:
      "Sou um Desenvolvedor Full Stack apaixonado por criar experiências digitais que não são apenas visualmente impressionantes, mas também tecnicamente robustas.",
    description_2:
      "Com um profundo entendimento de arquiteturas web modernas, desenvolvo soluções escaláveis que resolvem problemas reais. Minha filosofia é simples: escreva código limpo, priorize a experiência do usuário e sempre seja curioso.",
    cta: "Leia minha história completa",
    card1_title: "Código Limpo",
    card1_desc:
      "Bases de código de fácil manutenção, estritamente tipadas e bem documentadas, construídas para escalabilidade.",
    card2_title: "Pixel Perfect",
    card2_desc: "Animações fluidas e interfaces responsivas e acessíveis que cativam os usuários.",
    card3_title: "Stack Moderno",
    card3_desc:
      "Aproveitando as vantagens do Next.js App Router, Server Actions e fluxos de CI/CD sólidos.",
  },
  Skills: {
    badge: "Tech Stack",
    title: "Habilidades & Tecnologias",
    description:
      "Meu arsenal técnico é construído em torno de ferramentas modernas, escaláveis e de alta performance. Aqui está o que eu uso para dar vida a ideias.",
    category_1: "Frontend & UI",
    category_2: "Backend & APIs",
    category_3: "Dados & Cloud",
    category_4: "Ferramentas & Workflow",
  },
  Projects: {
    badge: "Portfólio",
    title: "Projetos em Destaque",
    view_all: "Ver todos os projetos",
    empty_state: "Nenhum projeto em destaque encontrado.",
    view_repo: "Código",
  },
  Journey: {
    badge: "Experiência",
    title: "Jornada Profissional",
    item1_title: "Engenheiro Full Stack Sênior",
    item1_company: "TechNova Solutions",
    item1_period: "2023 - Presente",
    item1_desc:
      "Liderando a migração de monólitos legados para Next.js App Router e microsserviços. Arquitetei um novo dashboard de análise em tempo real usado por mais de 10 mil clientes enterprise.",
    item2_title: "Desenvolvedor de Software",
    item2_company: "Creative Digital Agency",
    item2_period: "2020 - 2023",
    item2_desc:
      "Desenvolvimento de landing pages de alta conversão e aplicações web interativas. Melhoria da pontuação do core vitals em 40% em todos os principais produtos.",
    item3_title: "Bacharel em Ciência da Computação",
    item3_company: "University of Technology",
    item3_period: "2016 - 2020",
    item3_desc:
      "Graduado com honras. Especialização em sistemas distribuídos e interação humano-computador.",
  },
  Contact: {
    badge: "Contato",
    title: "Vamos trabalhar <br></br> juntos.",
    description:
      "Atualmente estou aberto a novas oportunidades. Se você tem uma pergunta ou quer apenas dizer um oi, farei o possível para te responder!",
    email_label: "E-mail",
    location_label: "Localização",
    location_value: "Remoto / Terra",
    form_name: "Nome",
    form_name_placeholder: "João Silva",
    form_email: "E-mail",
    form_email_placeholder: "joao@exemplo.com",
    form_message: "Mensagem",
    form_message_placeholder: "Fale sobre o seu projeto...",
    form_send: "Enviar Mensagem",
    form_sending: "Enviando...",
    success_title: "Mensagem Enviada!",
    success_desc: "Obrigado pelo contato. Responderei em breve.",
    error_fallback: "Ocorreu um erro ao enviar a mensagem.",
    error_server: "Erro de conexão com o servidor.",
  },
};

const de = {
  Navigation: { home: "Start", about: "Über mich", projects: "Projekte", contact: "Kontakt" },
  Footer: {
    built_with: "erstellt mit",
    all_rights_reserved: "Kleefisch. Alle Rechte vorbehalten.",
  },
  Hero: {
    greeting: "Hallo, ich bin",
    cta_projects: "Meine Arbeiten ansehen",
    cta_contact: "Kontakt aufnehmen",
  },
  About: {
    badge: "Auf den Punkt gebracht",
    title:
      "Die Brücke zwischen <gradient1>Design</gradient1> & <gradient2>Technik</gradient2> schlagen.",
    description_1:
      "Ich bin ein Full-Stack-Entwickler mit einer Leidenschaft für die Gestaltung digitaler Erlebnisse, die nicht nur visuell beeindrucken, sondern auch technisch robust sind.",
    description_2:
      "Mit einem tiefen Verständnis für moderne Web-Architekturen baue ich skalierbare Lösungen, die reale Probleme lösen. Meine Philosophie ist einfach: Schreibe sauberen Code, priorisiere die Nutzererfahrung und bleibe stets neugierig.",
    cta: "Meine ganze Geschichte lesen",
    card1_title: "Sauberer Code",
    card1_desc:
      "Wartbare, streng typisierte und gut dokumentierte Codebasen, die für Skalierbarkeit entwickelt wurden.",
    card2_title: "Pixelperfekt",
    card2_desc:
      "Flüssige Animationen und reaktionsschnelle, barrierefreie Schnittstellen, die Nutzer begeistern.",
    card3_title: "Moderner Tech-Stack",
    card3_desc: "Nutzung von Next.js App Router, Server Actions und soliden CI/CD-Prozessen.",
  },
  Skills: {
    badge: "Tech-Stack",
    title: "Fähigkeiten & Technologien",
    description:
      "Mein technisches Arsenal basiert auf modernen, skalierbaren und leistungsstarken Tools. Dies ist, was ich verwende, um Ideen zum Leben zu erwecken.",
    category_1: "Frontend & UI",
    category_2: "Backend & APIs",
    category_3: "Daten & Cloud",
    category_4: "Tools & Workflow",
  },
  Projects: {
    badge: "Portfolio",
    title: "Ausgewählte Projekte",
    view_all: "Alle Projekte ansehen",
    empty_state: "Keine ausgewählten Projekte gefunden.",
    view_repo: "Quellcode",
  },
  Journey: {
    badge: "Erfahrung",
    title: "Beruflicher Werdegang",
    item1_title: "Senior Full-Stack-Entwickler",
    item1_company: "TechNova Solutions",
    item1_period: "2023 - Heute",
    item1_desc:
      "Leitung der Migration monolithischer Altsysteme zu Next.js App Router und Microservices. Entwurf eines neuen Echtzeit-Analyse-Dashboards, das von über 10.000 Unternehmenskunden genutzt wird.",
    item2_title: "Softwareentwickler",
    item2_company: "Creative Digital Agency",
    item2_period: "2020 - 2023",
    item2_desc:
      "Entwicklung konversionsstarker Landingpages und interaktiver Webanwendungen. Verbesserung des Core-Vitals-Scores um 40 % bei allen Hauptprodukten.",
    item3_title: "B.Sc. in Informatik",
    item3_company: "University of Technology",
    item3_period: "2016 - 2020",
    item3_desc:
      "Abschluss mit Auszeichnung. Spezialisiert auf verteilte Systeme und Mensch-Computer-Interaktion.",
  },
  Contact: {
    badge: "Kontakt aufnehmen",
    title: "Lassen Sie uns <br></br> zusammenarbeiten.",
    description:
      "Ich bin derzeit offen für neue Möglichkeiten. Wenn Sie eine Frage haben oder einfach nur Hallo sagen wollen, werde ich mein Bestes tun, um mich bei Ihnen zu melden!",
    email_label: "E-Mail",
    location_label: "Standort",
    location_value: "Remote / Erde",
    form_name: "Name",
    form_name_placeholder: "Max Mustermann",
    form_email: "E-Mail",
    form_email_placeholder: "max@beispiel.de",
    form_message: "Nachricht",
    form_message_placeholder: "Erzählen Sie mir von Ihrem Projekt...",
    form_send: "Nachricht senden",
    form_sending: "Wird gesendet...",
    success_title: "Nachricht gesendet!",
    success_desc: "Danke für Ihre Nachricht. Ich melde mich bald bei Ihnen.",
    error_fallback: "Beim Senden der Nachricht ist ein Fehler aufgetreten.",
    error_server: "Verbindungsfehler mit dem Server.",
  },
};

const en = {
  Navigation: { home: "Home", about: "About", projects: "Projects", contact: "Contact" },
  Footer: { built_with: "built with", all_rights_reserved: "Kleefisch. All rights reserved." },
  Hero: { greeting: "Hello, I'm", cta_projects: "See my Work", cta_contact: "Get in Touch" },
  About: {
    badge: "Elevator Pitch",
    title:
      "Bridging the gap between <gradient1>design</gradient1> & <gradient2>engineering</gradient2>.",
    description_1:
      "I am a Full Stack Developer passionate about crafting digital experiences that are not only visually stunning but also technically robust under the hood.",
    description_2:
      "With a deep understanding of modern web architectures, I build scalable solutions that solve real-world problems. My philosophy is simple: write clean code, prioritize user experience, and always stay curious.",
    cta: "Read my full story",
    card1_title: "Clean Code",
    card1_desc:
      "Maintainable, strictly typed, and well-documented codebases built for scalability.",
    card2_title: "Pixel Perfect",
    card2_desc: "Fluid animations and responsive, accessible interfaces that captivate users.",
    card3_title: "Modern Stack",
    card3_desc: "Leveraging Next.js App Router, Server Actions, and solid CI/CD workflows.",
  },
  Skills: {
    badge: "Tech Stack",
    title: "Skills & Technologies",
    description:
      "My technical arsenal is built around modern, scalable, and high-performance tools. Here is what I use to bring ideas to life.",
    category_1: "Frontend & UI",
    category_2: "Backend & APIs",
    category_3: "Data & Cloud",
    category_4: "Tools & Workflow",
  },
  Projects: {
    badge: "Portfolio",
    title: "Featured Projects",
    view_all: "View all projects",
    empty_state: "No featured projects found.",
    view_repo: "Source",
  },
  Journey: {
    badge: "Experience",
    title: "Professional Journey",
    item1_title: "Senior Full Stack Engineer",
    item1_company: "TechNova Solutions",
    item1_period: "2023 - Present",
    item1_desc:
      "Leading the migration of legacy monoliths to Next.js App Router and microservices. Architected a new real-time analytics dashboard used by over 10k enterprise clients.",
    item2_title: "Software Developer",
    item2_company: "Creative Digital Agency",
    item2_period: "2020 - 2023",
    item2_desc:
      "Developed high-conversion landing pages and interactive web applications. Improved core vitals score by 40% across all main products.",
    item3_title: "B.S. in Computer Science",
    item3_company: "University of Technology",
    item3_period: "2016 - 2020",
    item3_desc:
      "Graduated with honors. Specialized in distributed systems and human-computer interaction.",
  },
  Contact: {
    badge: "Get in Touch",
    title: "Let's work <br></br> together.",
    description:
      "I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    email_label: "Email",
    location_label: "Location",
    location_value: "Remote / Earth",
    form_name: "Name",
    form_name_placeholder: "John Doe",
    form_email: "Email",
    form_email_placeholder: "john@example.com",
    form_message: "Message",
    form_message_placeholder: "Tell me about your project...",
    form_send: "Send Message",
    form_sending: "Sending...",
    success_title: "Message Sent!",
    success_desc: "Thank you for reaching out. I'll get back to you soon.",
    error_fallback: "An error occurred while sending the message.",
    error_server: "Connection error with the server.",
  },
};

fs.writeFileSync("messages/pt.json", JSON.stringify(pt, null, 2));
fs.writeFileSync("messages/de.json", JSON.stringify(de, null, 2));
fs.writeFileSync("messages/en.json", JSON.stringify(en, null, 2));
console.log("Successfully wrote language files.");
