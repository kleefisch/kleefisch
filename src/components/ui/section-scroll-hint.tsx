"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

type SectionScrollHintProps = {
  /** `down` = rodapé da secção (padrão, como o hero). `up` = topo da secção, seta para cima (ex.: contact). */
  variant?: "down" | "up";
};

/**
 * Mesmo bloco visual e animação do indicador "scroll" do `hero.tsx`.
 * `whileInView` garante que cada secção só reproduz o fade quando entra no viewport.
 */
export function SectionScrollHint({ variant = "down" }: SectionScrollHintProps) {
  const up = variant === "up";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className={`pointer-events-none absolute left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 ${up ? "top-8" : "bottom-8"}`}
    >
      <span className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/60">
        scroll
      </span>
      <motion.div
        animate={
          up ? { y: [0, -5, 0], opacity: [0.5, 1, 0.5] } : { y: [0, 5, 0], opacity: [0.5, 1, 0.5] }
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {up ? (
          <ChevronUp className="h-5 w-5 text-accent-violet/80" />
        ) : (
          <ChevronDown className="h-5 w-5 text-accent-violet/80" />
        )}
      </motion.div>
    </motion.div>
  );
}
