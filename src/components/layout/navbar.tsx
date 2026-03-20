"use client";

import * as React from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("projects"), href: "/projects" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-0.5 font-bold tracking-tighter text-lg md:text-xl"
        >
          <span className="text-accent-cyan transition-all group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
            &lt;
          </span>
          <span className="transition-colors group-hover:text-accent-cyan">Kleefisch</span>
          <span className="text-accent-cyan transition-all group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]">
            /&gt;
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                href={link.href as any}
                className={cn(
                  "group relative pb-1 text-sm font-medium transition-colors",
                  isActive ? "text-accent-cyan" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300",
                    isActive
                      ? "w-full bg-accent-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                      : "w-0 bg-accent-violet/40 group-hover:w-1/2",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom gradient border — only visible on scroll */}
      <div
        className="h-[1px] w-full transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          background:
            "linear-gradient(to right, transparent, var(--color-accent-violet), var(--color-accent-emerald), var(--color-accent-cyan), var(--color-accent-violet), transparent)",
        }}
      />
    </header>
  );
}
