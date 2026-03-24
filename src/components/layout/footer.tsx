import * as React from "react";
import { Link } from "@/i18n/routing";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://github.com",
    label: "GitHub",
    icon: Github,
    className: "hover:text-accent-cyan hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.7)]",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: Linkedin,
    className: "hover:text-accent-violet hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.7)]",
  },
  {
    href: "https://twitter.com",
    label: "Twitter/X",
    icon: Twitter,
    className: "hover:text-accent-cyan hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.7)]",
  },
  {
    href: "mailto:contact@example.com",
    label: "Email",
    icon: Mail,
    className: "hover:text-accent-emerald hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.7)]",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto">
      {/* Top gradient border */}
      <div
        className="h-[1px] w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--color-accent-violet), var(--color-accent-emerald), var(--color-accent-cyan), var(--color-accent-violet), transparent)",
        }}
      />

      <div className="bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Left: Brand + stack */}
            <div className="flex flex-col items-center gap-2 md:items-start">
              <Link
                href="/"
                className="group flex items-center gap-0.5 font-bold tracking-tighter text-lg"
              >
                <span className="text-accent-cyan transition-all group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
                  &lt;
                </span>
                <span className="transition-colors group-hover:text-accent-cyan">Kleefisch</span>
                <span className="text-accent-cyan transition-all group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
                  /&gt;
                </span>
              </Link>
              <p className="font-mono text-xs text-muted-foreground/50">
                <span className="text-accent-emerald/60">{"//"}</span> built with{" "}
                <span className="text-accent-cyan/80">Next.js</span> &amp;{" "}
                <span className="text-accent-violet/80">Tailwind v4</span>
              </p>
            </div>

            {/* Center: Copyright */}
            <p className="font-mono text-xs text-muted-foreground/40">
              © {currentYear} Kleefisch. All rights reserved.
            </p>

            {/* Right: Social Links */}
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon, className }) => (
                <Link
                  key={label}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  href={href as any}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className={`rounded-lg p-2 text-muted-foreground/40 transition-all ${className}`}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
