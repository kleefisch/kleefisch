"use client";

import { motion } from "framer-motion";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { ArrowRight, ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

const SOCIAL_LINKS = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github,
    color: "hover:text-accent-cyan hover:border-accent-cyan/40",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin,
    color: "hover:text-accent-violet hover:border-accent-violet/40",
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Aurora Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/20 blur-[120px] mix-blend-screen animate-pulse [animation-duration:30s]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent-violet/20 blur-[120px] mix-blend-screen animate-pulse [animation-duration:15s] [animation-delay:2s]" />
      </div>

      {/* Galaxy / Connecting Dots Particles */}
      <ParticlesBackground />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 pt-10 lg:grid-cols-2 lg:gap-8 lg:pt-0">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 text-xl font-medium text-muted-foreground md:text-2xl"
            >
              <div className="h-[2px] w-8 bg-foreground/50 sm:w-12 border-0" />
              <span>Hello, I&apos;m</span>
            </motion.div>

            {/* Name with shimmer */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-7xl font-bold tracking-tighter whitespace-nowrap md:text-8xl lg:text-[7rem]"
            >
              <span
                className="bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] [animation:shimmer-slide_6s_linear_infinite]"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-emerald), var(--color-accent-violet), var(--color-accent-cyan))",
                  backgroundSize: "200% auto",
                }}
              >
                John Kleefisch
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex min-h-[48px] items-center text-2xl font-mono text-muted-foreground md:text-3xl lg:text-4xl"
            >
              <span className="mr-3 font-bold text-accent-emerald">&gt;</span>
              <TypeAnimation
                sequence={[
                  "Software Engineer",
                  4000,
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col items-start gap-4 pt-4 sm:flex-row"
            >
              <Link
                href="/projects"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-md px-8 font-medium text-foreground transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] active:scale-95 sm:w-auto"
                style={{
                  background:
                    "linear-gradient(var(--color-background), var(--color-background)) padding-box, linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-violet)) border-box",
                  border: "1px solid transparent",
                }}
              >
                See my Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-md border border-accent-violet/40 bg-background px-8 font-medium text-muted-foreground transition-all hover:border-accent-violet/80 hover:text-foreground hover:shadow-[0_0_16px_rgba(139,92,246,0.2)] active:scale-95 sm:w-auto"
              >
                Get in Touch
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-2"
            >
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={href as any} // eslint-disable-line @typescript-eslint/no-explicit-any
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-muted-foreground/50 transition-all ${color}`}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Photo Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mt-12 flex items-center justify-center lg:mt-0 lg:justify-end"
          >
            {/* Photo Composition Container */}
            <div className="isolate relative h-[560px] w-[560px]">
              {/* Inner backdrop for depth */}
              <div className="absolute inset-0 z-0 rounded-full bg-background/40 backdrop-blur-sm" />

              {/* Rotating Aura / Glow */}
              <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[762px] w-[762px] -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite] opacity-80 blur-3xl">
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
                style={{ clipPath: "inset(-50% 0 0 0 round 0 0 280px 280px)" }}
              >
                <Image
                  src="/images/profile.png"
                  alt="John - Software Engineer"
                  width={500}
                  height={600}
                  priority
                  className="relative left-1/2 h-[672px] w-auto -translate-x-1/2 object-cover drop-shadow-2xl"
                  style={{ bottom: "0", position: "absolute" }}
                />
              </div>

              {/* Front Circular Border (Bottom Half - 3D Wrap effect) */}
              <div
                className="absolute inset-0 z-40 pointer-events-none rounded-full border-[4px] border-accent-violet/60 shadow-[0_0_30px_rgba(139,92,246,0.5),inset_0_0_20px_rgba(139,92,246,0.3)]"
                style={{ clipPath: "inset(50% -20% -20% -20%)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan/60">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-accent-violet/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
