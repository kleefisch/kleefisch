"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { TerminalSquare, RefreshCw, MoveLeft } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-violet/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 translate-x-1/4 -translate-y-1/4 w-72 h-72 bg-accent-cyan/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center text-center max-w-2xl"
      >
        {/* Animated Glitchy 404 */}
        <div className="relative mb-8">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.1,
            }}
            className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/20"
          >
            404
          </motion.h1>

          <motion.div
            animate={{
              x: [-2, 2, -2, 2, 0],
              y: [1, -1, 1, -1, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
              repeatDelay: 3,
            }}
            className="absolute top-0 left-0 w-full h-full text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-accent-cyan/50 mix-blend-screen pointer-events-none"
            style={{ clipPath: "polygon(0 40%, 100% 40%, 100% 60%, 0 60%)" }}
          >
            404
          </motion.div>
          <motion.div
            animate={{
              x: [2, -2, 2, -2, 0],
              y: [-1, 1, -1, 1, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2,
              repeatDelay: 3.2,
            }}
            className="absolute top-0 left-0 w-full h-full text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-accent-violet/50 mix-blend-screen pointer-events-none"
            style={{ clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)" }}
          >
            404
          </motion.div>
        </div>

        {/* Terminal Window with Typed Messages */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-lg mb-8 bg-background/50 backdrop-blur-xl border border-border/50 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="flex items-center px-4 py-2 border-b border-border/50 bg-muted/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center items-center gap-2 text-xs text-muted-foreground font-mono">
              <TerminalSquare className="w-3 h-3" />
              system-error.log
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 text-left font-mono text-sm sm:text-base min-h-[120px] text-muted-foreground">
            <div className="text-accent-cyan mb-2">{t("initDiagnostic")}</div>
            <TypeAnimation
              sequence={[
                1000,
                t("seq1"),
                1000,
                t("seq2"),
                1000,
                t("seq3"),
                1000,
                t("seq4"),
                1000,
                t("seq5"),
                2000,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              className="text-foreground"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            href="/"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("returnBase")}</span>
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-background px-8 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
            <span>{t("tryAgain")}</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
