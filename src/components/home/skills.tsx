"use client";

import { motion } from "framer-motion";

import {
  MonitorSmartphone,
  TerminalSquare,
  Database,
  Wrench,
  ShieldCheck,
  Key,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReactquery,
  SiFigma,
  SiRedux,
  SiSass,
  SiVuedotjs,
  SiHtml5,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPython,
  SiGraphql,
  SiTrpc,
  SiSocketdotio,
  SiFlask,
  SiFastapi,
  SiSwagger,
  SiJsonwebtokens,
  SiPostman,
  SiStripe,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiSupabase,
  SiFirebase,
  SiMysql,
  SiSqlite,
  SiRender,
  SiRailway,
  SiCloudflare,
  SiSanity,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiJest,
  SiCypress,
  SiEslint,
  SiPrettier,
  SiLinux,
  SiWebpack,
  SiNetlify,
  SiVercel,
  SiResend,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrandFramerMotion } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";
import { useTranslations } from "next-intl";
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
      title: t("category_1"), // Frontend
      icon: <MonitorSmartphone className="h-8 w-8 text-accent-blue" />,
      gradientHover: "from-accent-blue/10 to-transparent",
      borderHover: "hover:border-accent-blue/30",
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
          label: "Tailwind CSS",
          Icon: SiTailwindcss,
          color: "text-muted-foreground group-hover/skill:text-[#06B6D4]",
        },
        {
          label: "Motion",
          Icon: TbBrandFramerMotion,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "React Query",
          Icon: SiReactquery,
          color: "text-muted-foreground group-hover/skill:text-[#FF4154]",
        },
        {
          label: "Zustand",
          Icon: GiBearFace,
          color:
            "text-muted-foreground group-hover/skill:text-[#443E38] dark:group-hover/skill:text-[#F3F3F3]",
        },
        {
          label: "Figma",
          Icon: SiFigma,
          color: "text-muted-foreground group-hover/skill:text-[#F24E1E]",
        },
        {
          label: "Redux",
          Icon: SiRedux,
          color: "text-muted-foreground group-hover/skill:text-[#764ABC]",
        },
        {
          label: "Sass",
          Icon: SiSass,
          color: "text-muted-foreground group-hover/skill:text-[#CC6699]",
        },
        {
          label: "Vue.js",
          Icon: SiVuedotjs,
          color: "text-muted-foreground group-hover/skill:text-[#4FC08D]",
        },
        {
          label: "HTML/CSS",
          Icon: SiHtml5,
          color: "text-muted-foreground group-hover/skill:text-[#E34F26]",
        },
      ],
    },
    {
      title: t("category_2"), // Backend
      icon: <TerminalSquare className="h-8 w-8 text-accent-orange" />,
      gradientHover: "from-accent-orange/10 to-transparent",
      borderHover: "hover:border-accent-orange/30",
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
        {
          label: "tRPC",
          Icon: SiTrpc,
          color: "text-muted-foreground group-hover/skill:text-[#2596BE]",
        },
        {
          label: "Socket.io",
          Icon: SiSocketdotio,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "Flask",
          Icon: SiFlask,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "FastAPI",
          Icon: SiFastapi,
          color: "text-muted-foreground group-hover/skill:text-[#009688]",
        },
        {
          label: "REST APIs",
          Icon: SiSwagger,
          color: "text-muted-foreground group-hover/skill:text-[#85EA2D]",
        },
        {
          label: "JWT",
          Icon: SiJsonwebtokens,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "Postman",
          Icon: SiPostman,
          color: "text-muted-foreground group-hover/skill:text-[#FF6C37]",
        },
        {
          label: "Auth.js",
          Icon: ShieldCheck,
          color: "text-muted-foreground group-hover/skill:text-[#8B5CF6]",
        },
        {
          label: "Stripe",
          Icon: SiStripe,
          color: "text-muted-foreground group-hover/skill:text-[#008CDD]",
        },
        {
          label: "OAuth",
          Icon: Key,
          color: "text-muted-foreground group-hover/skill:text-[#F97316]",
        },
      ],
    },
    {
      title: t("category_3"), // Database & Cloud
      icon: <Database className="h-8 w-8 text-accent-emerald" />,
      gradientHover: "from-accent-emerald/10 to-transparent",
      borderHover: "hover:border-accent-emerald/30",
      skills: [
        {
          label: "PostgreSQL",
          Icon: SiPostgresql,
          color: "text-muted-foreground group-hover/skill:text-[#336791]",
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
            "text-muted-foreground group-hover/skill:text-[#2D3748] dark:group-hover/skill:text-white",
        },
        {
          label: "AWS",
          Icon: FaAws,
          color: "text-muted-foreground group-hover/skill:text-[#FF9900]",
        },
        {
          label: "Supabase",
          Icon: SiSupabase,
          color: "text-muted-foreground group-hover/skill:text-[#3ECF8E]",
        },
        {
          label: "Neon",
          Icon: Database,
          color: "text-muted-foreground group-hover/skill:text-[#00E599]",
        },
        {
          label: "Firebase",
          Icon: SiFirebase,
          color: "text-muted-foreground group-hover/skill:text-[#FFCA28]",
        },
        {
          label: "MySQL",
          Icon: SiMysql,
          color: "text-muted-foreground group-hover/skill:text-[#4479A1]",
        },
        {
          label: "SQLite",
          Icon: SiSqlite,
          color: "text-muted-foreground group-hover/skill:text-[#003B57]",
        },
        {
          label: "Render",
          Icon: SiRender,
          color: "text-muted-foreground group-hover/skill:text-[#46E3B7]",
        },
        {
          label: "Railway",
          Icon: SiRailway,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "Cloudflare",
          Icon: SiCloudflare,
          color: "text-muted-foreground group-hover/skill:text-[#F38020]",
        },
        {
          label: "Sanity",
          Icon: SiSanity,
          color: "text-muted-foreground group-hover/skill:text-[#F03E2F]",
        },
      ],
    },
    {
      title: t("category_4"), // DevOps & Tools
      icon: <Wrench className="h-8 w-8 text-accent-purple" />,
      gradientHover: "from-accent-purple/10 to-transparent",
      borderHover: "hover:border-accent-purple/30",
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
          label: "CI/CD",
          Icon: SiGithubactions,
          color: "text-muted-foreground group-hover/skill:text-[#2088FF]",
        },
        {
          label: "Jest",
          Icon: SiJest,
          color: "text-muted-foreground group-hover/skill:text-[#C21325]",
        },
        {
          label: "Cypress",
          Icon: SiCypress,
          color: "text-muted-foreground group-hover/skill:text-[#17202C]",
        },
        {
          label: "ESLint",
          Icon: SiEslint,
          color: "text-muted-foreground group-hover/skill:text-[#4B32C3]",
        },
        {
          label: "Prettier",
          Icon: SiPrettier,
          color: "text-muted-foreground group-hover/skill:text-[#F7B93E]",
        },
        {
          label: "Linux",
          Icon: SiLinux,
          color: "text-muted-foreground group-hover/skill:text-[#FCC624]",
        },
        {
          label: "Webpack",
          Icon: SiWebpack,
          color: "text-muted-foreground group-hover/skill:text-[#8DD6F9]",
        },
        {
          label: "Netlify",
          Icon: SiNetlify,
          color: "text-muted-foreground group-hover/skill:text-[#00C7B7]",
        },
        {
          label: "Vercel",
          Icon: SiVercel,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
        {
          label: "Resend",
          Icon: SiResend,
          color:
            "text-muted-foreground group-hover/skill:text-black dark:group-hover/skill:text-white",
        },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col justify-center py-16 md:py-20 lg:py-24 overflow-hidden scroll-mt-16"
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
            className="mb-10 lg:mb-12 text-center"
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
                className={`group relative p-6 lg:p-8 rounded-2xl bg-foreground/[0.03] border border-white/5 backdrop-blur-md transition-all duration-300 hover:bg-foreground/[0.05] overflow-hidden ${category.borderHover}`}
              >
                {/* Background Gradient Mesh inside Card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradientHover} opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    {category.icon}
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  {/* Tech Pills Grid */}
                  <motion.div
                    className="flex flex-wrap gap-2 lg:gap-2.5 mt-auto"
                    variants={containerVariants}
                  >
                    {category.skills.map(({ label, Icon, color }, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        variants={pillVariants}
                        whileHover={{ scale: 1.05 }}
                        className="group/skill flex items-center gap-1.5 lg:gap-2 px-2.5 py-1.5 lg:px-3 lg:py-2 text-xs lg:text-[13px] font-sans font-medium tracking-wide rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-transparent shadow-sm text-zinc-600 dark:text-zinc-400 transition-all duration-300 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 hover:text-foreground cursor-default"
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
