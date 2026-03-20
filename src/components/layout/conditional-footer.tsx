"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { isLocaleHomePath } from "@/lib/is-locale-home";

/** Footer is embedded in the home Contact section; avoid rendering it twice. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (isLocaleHomePath(pathname)) return null;
  return <Footer />;
}
