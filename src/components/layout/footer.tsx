import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-background text-muted-foreground mt-auto py-8">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        {/* Left Side - Copyright & Tech */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-sm font-medium text-foreground">© {currentYear} Kleefisch.</p>
          <p className="mt-1 text-xs">
            Built with{" "}
            <span className="font-mono text-accent-cyan transition-colors hover:text-accent-violet">
              Next.js
            </span>{" "}
            &{" "}
            <span className="font-mono text-accent-cyan transition-colors hover:text-accent-violet">
              Tailwind v4
            </span>
            .
          </p>
        </div>

        {/* Right Side - Social Links */}
        <div className="flex gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter/X"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:contact@example.com"
            aria-label="Email Contact"
            className="rounded-full p-2 transition-colors hover:bg-zinc-100 hover:text-foreground dark:hover:bg-zinc-800"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
