"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, TerminalSquare, Database, Wrench } from "lucide-react";

// Data structure for skills
const skillCategories = [
  {
    title: "Frontend & UI",
    icon: <MonitorSmartphone className="h-6 w-6 text-accent-cyan" />,
    color: "from-accent-cyan/20 to-transparent",
    skills: [
      "React 19",
      "Next.js 15",
      "Tailwind CSS v4",
      "TypeScript",
      "Framer Motion",
      "Shadcn/UI",
    ],
  },
  {
    title: "Backend & APIs",
    icon: <TerminalSquare className="h-6 w-6 text-accent-violet" />,
    color: "from-accent-violet/20 to-transparent",
    skills: ["Node.js", "RESTful APIs", "GraphQL", "Server Actions", "NextAuth.js", "Express"],
  },
  {
    title: "Data & Cloud",
    icon: <Database className="h-6 w-6 text-accent-emerald" />,
    color: "from-accent-emerald/20 to-transparent",
    skills: ["PostgreSQL (Neon)", "Prisma ORM", "Redis", "Vercel", "AWS", "Docker"],
  },
  {
    title: "Tools & Workflow",
    icon: <Wrench className="h-6 w-6 text-muted-foreground" />,
    color: "from-white/10 to-transparent",
    skills: [
      "Git & GitHub",
      "CI/CD",
      "Jest / Cypress",
      "ESLint & Prettier",
      "Figma",
      "Agile/Scrum",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Subtle Background Glow - Violet to contrast with About's Emerald */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-accent-violet/10 blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent-violet" />
              <span className="text-accent-violet font-mono text-sm uppercase tracking-wider">
                Tech Stack
              </span>
              <div className="h-[1px] w-8 bg-accent-violet" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Skills & Technologies</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              My technical arsenal is built around modern, scalable, and high-performance tools.
              Here is what I use to bring ideas to life.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative p-8 rounded-2xl bg-foreground/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden transition-all hover:bg-foreground/[0.04]"
              >
                {/* Background Gradient Mesh inside Card */}
                <div
                  className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-background rounded-lg border border-white/5 shadow-sm">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  </div>

                  {/* Tech Pills Grid */}
                  <motion.div className="flex flex-wrap gap-2 mt-auto" variants={containerVariants}>
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        variants={pillVariants}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 text-xs font-mono font-medium rounded-full bg-background border border-white/10 text-muted-foreground transition-colors hover:text-foreground hover:border-white/25 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
