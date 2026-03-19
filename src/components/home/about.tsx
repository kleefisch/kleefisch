"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Subtle Background Glow for immersion */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-[250px] w-[500px] h-[500px] rounded-full bg-accent-emerald/10 blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left side: Text Pitch */}
            <div className="flex flex-col space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-accent-cyan" />
                <span className="text-accent-cyan font-mono text-sm uppercase tracking-wider">
                  Elevator Pitch
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight md:text-5xl"
              >
                Bridging the gap between <br />
                <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
                  design
                </span>{" "}
                &{" "}
                <span className="bg-gradient-to-r from-accent-violet to-accent-emerald bg-clip-text text-transparent">
                  engineering
                </span>
                .
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="space-y-4 text-lg text-muted-foreground"
              >
                <p>
                  I am a Full Stack Developer passionate about crafting digital experiences that are
                  not only visually stunning but also technically robust under the hood.
                </p>
                <p>
                  With a deep understanding of modern web architectures, I build scalable solutions
                  that solve real-world problems. My philosophy is simple: write clean code,
                  prioritize user experience, and always stay curious.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-foreground font-medium transition-colors hover:text-accent-cyan"
                >
                  Read my full story
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:text-accent-cyan" />
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
                <h3 className="mb-2 text-xl font-semibold text-foreground">Clean Code</h3>
                <p className="text-sm text-muted-foreground">
                  Maintainable, strictly typed, and well-documented codebases built for scalability.
                </p>
              </div>

              {/* Card 2 - Offset for asymmetrical grid layout */}
              <div className="group relative p-6 rounded-2xl bg-foreground/[0.03] border border-white/5 backdrop-blur-md transition-colors hover:bg-foreground/[0.05] sm:translate-y-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-violet/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Globe className="h-8 w-8 text-accent-violet mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Pixel Perfect</h3>
                <p className="text-sm text-muted-foreground">
                  Fluid animations and responsive, accessible interfaces that captivate users.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative p-6 rounded-2xl bg-foreground/[0.03] border border-white/5 backdrop-blur-md transition-colors hover:bg-foreground/[0.05]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-emerald/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <Cpu className="h-8 w-8 text-accent-emerald mb-4" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Modern Stack</h3>
                <p className="text-sm text-muted-foreground">
                  Leveraging Next.js App Router, Server Actions, and solid CI/CD workflows.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
