"use client";

import * as React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
  { code: "de", label: "DE" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    track("Language Changed", { locale: nextLocale });

    startTransition(() => {
      
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "relative flex h-9 px-2 gap-2 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800",
          isPending && "opacity-50 cursor-not-allowed",
        )}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-xs font-mono uppercase font-medium">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-24 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={cn(
                "w-full text-center px-3 py-2 text-sm rounded-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
                locale === lang.code
                  ? "bg-zinc-100 dark:bg-zinc-800 font-medium text-accent-cyan"
                  : "text-zinc-700 dark:text-zinc-300",
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
