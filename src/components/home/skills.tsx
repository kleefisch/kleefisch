"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, TerminalSquare, Database, Wrench } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiNodedotjs,
  SiGraphql,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiVercel,
  SiDocker,
  SiGit,
  SiGithub,
  SiJest,
  SiFigma,
} from "react-icons/si";
import { useTranslations } from "next-intl";
import { SectionScrollHint } from "@/components/ui/section-scroll-hint";

// Removed unused mock data

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
  const t = useTranslations("Skills");

  // Re-build categories with translation
  const categories = [
    {
      title: t("category_1"),
      icon: <MonitorSmartphone className="h-6 w-6 text-accent-cyan" />,
      color: "from-accent-cyan/20 to-transparent",
      skills: [
        { label: "React 19", Icon: SiReact },
        { label: "Next.js 15", Icon: SiNextdotjs },
        { label: "Tailwind CSS v4", Icon: SiTailwindcss },
        { label: "TypeScript", Icon: SiTypescript },
        { label: "Framer Motion", Icon: SiFramer },
      ],
    },
    {
      title: t("category_2"),
      icon: <TerminalSquare className="h-6 w-6 text-accent-violet" />,
      color: "from-accent-violet/20 to-transparent",
      skills: [
        { label: "Node.js", Icon: SiNodedotjs },
        { label: "GraphQL", Icon: SiGraphql },
        { label: "Express", Icon: SiExpress },
        { label: "RESTful APIs", Icon: null },
        { label: "Server Actions", Icon: null },
      ],
    },
    {
      title: t("category_3"),
      icon: <Database className="h-6 w-6 text-accent-emerald" />,
      color: "from-accent-emerald/20 to-transparent",
      skills: [
        { label: "PostgreSQL", Icon: SiPostgresql },
        { label: "Prisma ORM", Icon: SiPrisma },
        { label: "Redis", Icon: SiRedis },
        { label: "Vercel", Icon: SiVercel },
        { label: "AWS", Icon: null },
        { label: "Docker", Icon: SiDocker },
      ],
    },
    {
      title: t("category_4"),
      icon: <Wrench className="h-6 w-6 text-muted-foreground" />,
      color: "from-white/10 to-transparent",
      skills: [
        { label: "Git", Icon: SiGit },
        { label: "GitHub", Icon: SiGithub },
        { label: "Jest", Icon: SiJest },
        { label: "Figma", Icon: SiFigma },
        { label: "CI/CD", Icon: null },
        { label: "Agile/Scrum", Icon: null },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden scroll-mt-16"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60" />
      {/* Violet aurora — slow drift from right to left */}
      <motion.div
        animate={{ x: [200, -150, 200], y: [-120, 100, -120] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[900px] h-[750px] rounded-full bg-accent-violet/18 blur-[140px] mix-blend-screen pointer-events-none"
      />
      {/* Cyan aurora — slow drift bottom-left to top-right */}
      <motion.div
        animate={{ x: [-180, 160, -180], y: [120, -80, 120] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute bottom-0 left-0 w-[750px] h-[650px] rounded-full bg-accent-cyan/14 blur-[150px] mix-blend-screen pointer-events-none"
      />

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
            {categories.map((category, index) => (
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
                    {category.skills.map(({ label, Icon }, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        variants={pillVariants}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-full bg-background border border-white/10 text-muted-foreground transition-colors hover:text-foreground hover:border-white/25 cursor-default"
                      >
                        {Icon && <Icon className="h-3 w-3 shrink-0" />}
                        {label}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <SectionScrollHint />
    </section>
  );
}
