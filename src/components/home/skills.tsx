"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, TerminalSquare, Database, Wrench } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiFramer,
  SiNodedotjs,
  SiNestjs,
  SiPython,
  SiGraphql,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiGit,
  SiGithub,
  SiJest,
  SiFigma,
  SiTestinglibrary,
  SiGithubactions,
} from "react-icons/si";
import { useTranslations } from "next-intl";
import { FaAws } from "react-icons/fa6";
import { SectionScrollHint } from "@/components/ui/section-scroll-hint";

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

  const categories = [
    {
      title: t("category_1"),
      icon: <MonitorSmartphone className="h-6 w-6 text-accent-cyan" />,
      color: "from-accent-cyan/20 to-transparent",
      borderHover: "hover:border-accent-cyan/50",
      skills: [
        {
          label: "React",
          Icon: SiReact,
          color: "text-muted-foreground group-hover/skill:text-[#61DAFB]",
        },
        {
          label: "Next.js",
          Icon: SiNextdotjs,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "TypeScript",
          Icon: SiTypescript,
          color: "text-muted-foreground group-hover/skill:text-[#3178C6]",
        },
        {
          label: "JavaScript",
          Icon: SiJavascript,
          color: "text-muted-foreground group-hover/skill:text-[#F7DF1E]",
        },
        {
          label: "Tailwind CSS",
          Icon: SiTailwindcss,
          color: "text-muted-foreground group-hover/skill:text-[#06B6D4]",
        },
        {
          label: "Framer Motion",
          Icon: SiFramer,
          color: "text-muted-foreground group-hover/skill:text-[#0055FF]",
        },
      ],
    },
    {
      title: t("category_2"),
      icon: <TerminalSquare className="h-6 w-6 text-accent-violet" />,
      color: "from-accent-violet/20 to-transparent",
      borderHover: "hover:border-accent-violet/50",
      skills: [
        {
          label: "Node.js",
          Icon: SiNodedotjs,
          color: "text-muted-foreground group-hover/skill:text-[#339933]",
        },
        {
          label: "NestJS",
          Icon: SiNestjs,
          color: "text-muted-foreground group-hover/skill:text-[#E0234E]",
        },
        {
          label: "Express",
          Icon: SiExpress,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "Python",
          Icon: SiPython,
          color: "text-muted-foreground group-hover/skill:text-[#3776AB]",
        },
        {
          label: "GraphQL",
          Icon: SiGraphql,
          color: "text-muted-foreground group-hover/skill:text-[#E10098]",
        },
      ],
    },
    {
      title: t("category_3"),
      icon: <Database className="h-6 w-6 text-accent-emerald" />,
      color: "from-accent-emerald/20 to-transparent",
      borderHover: "hover:border-accent-emerald/50",
      skills: [
        {
          label: "PostgreSQL",
          Icon: SiPostgresql,
          color: "text-muted-foreground group-hover/skill:text-[#4169E1]",
        },
        {
          label: "MongoDB",
          Icon: SiMongodb,
          color: "text-muted-foreground group-hover/skill:text-[#47A248]",
        },
        {
          label: "Redis",
          Icon: SiRedis,
          color: "text-muted-foreground group-hover/skill:text-[#DC382D]",
        },
        {
          label: "Prisma",
          Icon: SiPrisma,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "AWS",
          Icon: FaAws,
          color: "text-muted-foreground group-hover/skill:text-[#FF9900]",
        },
        {
          label: "Vercel",
          Icon: SiVercel,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
      ],
    },
    {
      title: t("category_4"),
      icon: <Wrench className="h-6 w-6 text-muted-foreground" />,
      color: "from-white/10 to-transparent",
      borderHover: "hover:border-foreground/30",
      skills: [
        {
          label: "Docker",
          Icon: SiDocker,
          color: "text-muted-foreground group-hover/skill:text-[#2496ED]",
        },
        {
          label: "Git",
          Icon: SiGit,
          color: "text-muted-foreground group-hover/skill:text-[#F05032]",
        },
        {
          label: "GitHub",
          Icon: SiGithub,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "GitHub Actions",
          Icon: SiGithubactions,
          color: "text-muted-foreground group-hover/skill:text-[#2088FF]",
        },
        {
          label: "Jest",
          Icon: SiJest,
          color: "text-muted-foreground group-hover/skill:text-[#C21325]",
        },
        {
          label: "RTL",
          Icon: SiTestinglibrary,
          color: "text-muted-foreground group-hover/skill:text-[#E33332]",
        },
        {
          label: "Figma",
          Icon: SiFigma,
          color: "text-muted-foreground group-hover/skill:text-[#F24E1E]",
        },
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
              <div className="h-[1px] w-8 bg-accent-violet/50" />
              <span className="text-accent-violet font-sans font-semibold text-sm uppercase tracking-widest">
                Tech Stack
              </span>
              <div className="h-[1px] w-8 bg-accent-violet/50" />
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
                className={`group relative p-8 rounded-2xl bg-white dark:bg-[#111827] border border-black/5 dark:border-white/5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${category.borderHover}`}
              >
                {/* Material Elevation Interactive State */}
                <div
                  className={`absolute inset-0 bg-foreground/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-muted/50 rounded-xl shadow-inner border border-black/5 dark:border-white/5">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  {/* Tech Pills Grid */}
                  <motion.div
                    className="flex flex-wrap gap-2.5 mt-auto"
                    variants={containerVariants}
                  >
                    {category.skills.map(({ label, Icon, color }, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        variants={pillVariants}
                        whileHover={{ scale: 1.05 }}
                        className="group/skill flex items-center gap-2 px-3.5 py-2 text-[13px] font-sans font-medium tracking-wide rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-transparent shadow-sm text-zinc-600 dark:text-zinc-400 transition-all duration-300 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 hover:text-foreground cursor-default"
                      >
                        {Icon && <Icon className={`h-4 w-4 shrink-0 transition-colors ${color}`} />}
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
