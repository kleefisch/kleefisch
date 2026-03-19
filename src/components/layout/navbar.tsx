"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { Globe } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tighter text-lg md:text-xl transition-colors hover:text-accent-cyan"
        >
          <span className="text-accent-cyan">&lt;</span>
          Kleefisch
          <span className="text-accent-cyan">/&gt;</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.href ? "text-foreground" : "text-muted",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions (Theme + i18n placeholder) */}
        <div className="flex items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
