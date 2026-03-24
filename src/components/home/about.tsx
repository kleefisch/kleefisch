"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { SectionScrollHint } from "@/components/ui/section-scroll-hint";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function About() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden scroll-mt-16"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60" />
      {/* Emerald aurora — slow drift across section */}
      <motion.div
        animate={{ x: [-220, 120, -220], y: [-80, 120, -80] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-[180px] w-[850px] h-[750px] rounded-full bg-accent-emerald/18 blur-[130px] mix-blend-screen pointer-events-none"
      />
      {/* Violet aurora — slow drift, offset phase */}
      <motion.div
        animate={{ x: [180, -120, 180], y: [100, -100, 100] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-0 right-0 w-[800px] h-[700px] rounded-full bg-accent-violet/15 blur-[150px] mix-blend-screen pointer-events-none"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-7xl"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left side: Text Pitch */}
            <div className="flex flex-col space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-accent-cyan" />
                <span className="text-accent-cyan font-mono text-sm uppercase tracking-wider">
                  {t("badge")}
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight md:text-5xl"
              >
                {t.rich("title", {
                  gradient1: (chunks) => (
                    <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  ),
                  gradient2: (chunks) => (
                    <span className="bg-gradient-to-r from-accent-violet to-accent-emerald bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  ),
                })}
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="space-y-4 text-lg text-muted-foreground"
              >
                <p>{t("description_1")}</p>
                <p>{t("description_2")}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 font-medium text-muted-foreground transition-all hover:text-accent-cyan"
                  style={{
                    background:
                      "linear-gradient(var(--color-background), var(--color-background)) padding-box, linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet)) border-box",
                    border: "1px solid transparent",
                    borderRadius: "6px",
                    padding: "8px 20px",
                  }}
                >
                  {t("cta")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right side: Philosophy Cards (Glassmorphism) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:pl-10"
            >
              {/* Card 1 */}
              <div className="group relative p-6 rounded-2xl bg-foreground/[0.03] border border-white/5 backdrop-blur-md transition-colors hover:bg-foreground/[0.05]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Code2 className="h-8 w-8 text-accent-cyan mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t("card1_title")}</h3>
                <p className="text-sm text-muted-foreground">{t("card1_desc")}</p>
              </div>

              {/* Card 2 - Offset for asymmetrical grid layout */}
              <div className="group relative p-6 rounded-2xl bg-foreground/[0.03] border border-white/5 backdrop-blur-md transition-colors hover:bg-foreground/[0.05] sm:translate-y-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-violet/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Globe className="h-8 w-8 text-accent-violet mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t("card2_title")}</h3>
                <p className="text-sm text-muted-foreground">{t("card2_desc")}</p>
              </div>

              {/* Card 3 */}
              <div className="group relative p-6 rounded-2xl bg-foreground/[0.03] border border-white/5 backdrop-blur-md transition-colors hover:bg-foreground/[0.05]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-emerald/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Cpu className="h-8 w-8 text-accent-emerald mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t("card3_title")}</h3>
                <p className="text-sm text-muted-foreground">{t("card3_desc")}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <SectionScrollHint />
    </section>
  );
}
