"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
      {/* Background Aurora Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-accent-cyan/20 blur-[120px] mix-blend-screen animate-pulse [animation-duration:12s]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent-violet/20 blur-[120px] mix-blend-screen animate-pulse [animation-duration:15s] [animation-delay:2s]" />
      </div>

      {/* Galaxy / Connecting Dots Particles */}
      <ParticlesBackground />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 items-center gap-12 pt-10 lg:grid-cols-2 lg:gap-8 lg:pt-0">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 text-xl font-medium text-muted-foreground md:text-2xl"
            >
              {/* Indentation line (------) */}
              <div className="h-[2px] w-8 bg-foreground/50 sm:w-12 border-0" />
              <span>Hello, I&apos;m</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl font-bold tracking-tighter md:text-7xl lg:text-[5.5rem]"
            >
              <span className="bg-gradient-to-r from-accent-cyan via-accent-emerald to-accent-violet bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                John Kleefisch
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl drop-shadow-sm whitespace-nowrap"
            >
              Software Engineer
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex min-h-[48px] items-center text-xl font-mono text-muted-foreground md:text-2xl lg:text-3xl"
            >
              <span className="mr-3 font-bold text-accent-emerald">&gt;</span>
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2500,
                  "Problem Solver",
                  2500,
                  "Results-Driven",
                  2500,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="inline-block font-medium text-accent-violet drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col items-start gap-4 pt-4 sm:flex-row"
            >
              <Link
                href="/projects"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground px-8 font-medium text-background transition-all hover:bg-foreground/90 active:scale-95 sm:w-auto"
              >
                See my Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex h-12 w-full items-center justify-center rounded-md border border-white/10 bg-white/5 px-8 font-medium text-foreground backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95 sm:w-auto"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Photo Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mt-12 flex items-center justify-center lg:mt-0"
          >
            {/* Photo Composition Container */}
            <div className="isolate relative h-[500px] w-[500px]">
              {/* Inner backdrop for depth */}
              <div className="absolute inset-0 z-0 rounded-full bg-background/40 backdrop-blur-sm" />

              {/* Rotating Aura / Glow (Expanding outside the circle) */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite] opacity-80 blur-3xl">
                <div
                  className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--color-accent-violet)_0%,var(--color-accent-cyan)_33%,var(--color-accent-emerald)_66%,var(--color-accent-violet)_100%)]"
                  style={{
                    maskImage: "radial-gradient(circle at center, black 18%, transparent 68%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at center, black 18%, transparent 68%)",
                  }}
                />
              </div>

              {/* Base Circular Border (Behind Photo - Top half only) */}
              <div
                className="absolute inset-0 z-20 rounded-full border-[4px] border-accent-violet/60 shadow-[0_0_30px_rgba(139,92,246,0.5),inset_0_0_20px_rgba(139,92,246,0.3)]"
                style={{ clipPath: "inset(-20% -20% 50% -20%)" }}
              />

              {/* Emerging Photo Wrapper */}
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{ clipPath: "inset(-50% 0 0 0 round 0 0 250px 250px)" }}
              >
                <Image
                  src="/images/profile.png"
                  alt="John - Software Engineer"
                  width={500}
                  height={600}
                  priority
                  className="relative left-1/2 h-[600px] w-auto -translate-x-1/2 object-cover drop-shadow-2xl"
                  style={{ bottom: "0", position: "absolute" }}
                />
              </div>

              {/* Front Circular Border (Bottom Half to create 3D Wrap effect) */}
              <div
                className="absolute inset-0 z-40 pointer-events-none rounded-full border-[4px] border-accent-violet/60 shadow-[0_0_30px_rgba(139,92,246,0.5),inset_0_0_20px_rgba(139,92,246,0.3)]"
                style={{ clipPath: "inset(50% -20% -20% -20%)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
