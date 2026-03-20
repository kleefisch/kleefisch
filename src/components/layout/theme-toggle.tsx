"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("w-9 h-9", className)} />;
  }

  return (
    <button
      onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        track("Theme Toggled", { theme: newTheme });
      }}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 transition-all hover:border-accent-cyan/50 dark:hover:border-accent-violet/50 dark:text-zinc-100",
        className,
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 group-hover:text-accent-cyan dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 dark:group-hover:text-accent-violet" />
    </button>
  );
}
