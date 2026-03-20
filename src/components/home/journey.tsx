"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, CalendarDays } from "lucide-react";

// Mock data for the timeline
const journeyItems = [
  {
    id: 1,
    type: "work",
    title: "Senior Full Stack Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description:
      "Leading the migration of legacy monoliths to Next.js App Router and microservices. Architected a new real-time analytics dashboard used by over 10k enterprise clients.",
    skills: ["Next.js", "PostgreSQL", "AWS", "WebSockets"],
  },
  {
    id: 2,
    type: "work",
    title: "Software Developer",
    company: "Creative Digital Agency",
    period: "2020 - 2023",
    description:
      "Developed high-conversion landing pages and interactive web applications. Improved core vitals score by 40% across all main products.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 3,
    type: "education",
    title: "B.S. in Computer Science",
    company: "University of Technology",
    period: "2016 - 2020",
    description:
      "Graduated with honors. Specialized in distributed systems and human-computer interaction.",
    skills: ["Data Structures", "Algorithms", "System Design"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export function Journey() {
  return (
    <section
      id="journey"
      className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden scroll-mt-16"
    >
      {/* Dot grid texture */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60" />
      {/* Emerald aurora — slow drift bottom-right to top-left */}
      <motion.div
        animate={{ x: [180, -160, 180], y: [140, -100, 140] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[900px] h-[800px] rounded-full bg-accent-emerald/17 blur-[140px] mix-blend-screen pointer-events-none"
      />
      {/* Violet aurora — slow drift top-left to bottom-right */}
      <motion.div
        animate={{ x: [-150, 180, -150], y: [-100, 120, -100] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut", delay: 12 }}
        className="absolute top-0 left-0 w-[800px] h-[700px] rounded-full bg-accent-violet/15 blur-[150px] mix-blend-screen pointer-events-none"
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent-emerald" />
              <span className="text-accent-emerald font-mono text-sm uppercase tracking-wider">
                Experience
              </span>
              <div className="h-[1px] w-8 bg-accent-emerald" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Professional Journey</h2>
          </motion.div>

          {/* Timeline Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative ml-4 md:ml-8"
          >
            {/* Gradient timeline line */}
            <div
              className="absolute left-0 top-0 w-[1px] h-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-accent-violet), var(--color-accent-emerald), var(--color-accent-cyan))",
                opacity: 0.4,
              }}
            />

            {journeyItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="mb-12 relative pl-8 md:pl-12"
              >
                {/* Timeline Icon Node */}
                <div
                  className={`absolute -left-[20px] top-1 h-10 w-10 rounded-full border bg-background flex items-center justify-center z-10 transition-all
                  ${
                    item.type === "work"
                      ? "border-accent-cyan/50 text-accent-cyan shadow-[0_0_16px_rgba(6,182,212,0.4)]"
                      : "border-accent-violet/50 text-accent-violet shadow-[0_0_16px_rgba(139,92,246,0.4)]"
                  }
                `}
                >
                  {item.type === "work" ? (
                    <Briefcase className="h-4 w-4" />
                  ) : (
                    <GraduationCap className="h-5 w-5" />
                  )}
                </div>

                {/* Content Card */}
                <div className="group relative p-6 md:p-8 rounded-2xl bg-foreground/[0.02] border border-white/5 backdrop-blur-sm transition-colors hover:bg-foreground/[0.04]">
                  {/* Subtle hover gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none bg-gradient-to-br
                    ${item.type === "work" ? "from-accent-cyan/5 to-transparent" : "from-accent-violet/5 to-transparent"}
                  `}
                  />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <span className="text-lg text-muted-foreground font-medium">
                        {item.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full border border-white/5 w-fit">
                      <CalendarDays className="h-4 w-4" />
                      {item.period}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 text-foreground/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
