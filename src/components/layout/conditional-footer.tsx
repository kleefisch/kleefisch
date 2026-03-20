"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { routing } from "@/i18n/routing";

function isLocaleHomePath(pathname: string) {
  const parts = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  if (parts.length === 0) return true;
  return parts.length === 1 && (routing.locales as readonly string[]).includes(parts[0] ?? "");
}

/** Footer is embedded in the home Contact section; avoid rendering it twice. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (isLocaleHomePath(pathname)) return null;
  return <Footer />;
}
