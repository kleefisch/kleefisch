"use client";

import { motion } from "framer-motion";
import { Coffee, Gamepad2, Code2, Camera } from "lucide-react";
import Image from "next/image";

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col pb-16 pt-24">
      <div className="container relative mx-auto px-4 sm:px-6">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent-cyan/10 mix-blend-screen blur-[120px]" />

        <div className="mx-auto max-w-5xl">
          {/* Header Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mb-16">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[1px] w-12 bg-accent-cyan" />
              <span className="font-mono text-sm uppercase tracking-wider text-accent-cyan">
                {t("badge")}
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-bold tracking-tight md:text-6xl md:leading-[1.1]">
              {t.rich("title", {
                br: () => <br />,
                gradient: (chunks) => (
                  <span className="bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-emerald bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h1>
          </motion.div>

          {/* Biografia: O Mergulho Profundo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="prose prose-lg prose-invert max-w-none text-muted-foreground"
          >
            <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
              <motion.div variants={fadeInUp} className="space-y-6 md:col-span-2">
                <p className="text-xl font-medium text-foreground">{t("bio_1")}</p>
                <p>{t("bio_2")}</p>
                <p>{t("bio_3")}</p>
                <p>{t("bio_4")}</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative md:col-span-1">
                <div className="isolate relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-background/50">
                  {/* Mock for personal photo */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-tr from-accent-cyan/20 to-accent-violet/20 opacity-50 mix-blend-overlay" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-muted-foreground">
                    <Camera className="mb-2 h-8 w-8 opacity-50" />
                    <span className="font-mono text-xs opacity-50">{t("photoSlot")}</span>
                  </div>
                  {/* Using next image as placeholder config */}
                  <Image
                    src="/images/profile.png"
                    alt="John's working space"
                    fill
                    className="z-0 object-cover object-center opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              </motion.div>
            </div>

            {/* Filosofias & Hobbies */}
            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-12">
              <h3 className="mb-8 text-3xl font-bold text-foreground">{t("outOfOfficeTitle")}</h3>
              <p className="mb-10">{t("outOfOfficeDesc")}</p>

              <div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-foreground/[0.02] p-6 backdrop-blur-sm">
                  <Coffee className="mb-4 h-6 w-6 text-orange-400" />
                  <h4 className="mb-2 text-lg font-semibold text-foreground">{t("hobby1Title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("hobby1Desc")}</p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-foreground/[0.02] p-6 backdrop-blur-sm">
                  <Gamepad2 className="mb-4 h-6 w-6 text-accent-violet" />
                  <h4 className="mb-2 text-lg font-semibold text-foreground">{t("hobby2Title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("hobby2Desc")}</p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-foreground/[0.02] p-6 backdrop-blur-sm">
                  <Code2 className="mb-4 h-6 w-6 text-accent-emerald" />
                  <h4 className="mb-2 text-lg font-semibold text-foreground">{t("hobby3Title")}</h4>
                  <p className="text-sm text-muted-foreground">{t("hobby3Desc")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
