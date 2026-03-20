import { routing } from "@/i18n/routing";

/** True for `/`, `/en`, `/pt`, `/de` (locale index routes only). */
export function isLocaleHomePath(pathname: string): boolean {
  const parts = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  if (parts.length === 0) return true;
  return parts.length === 1 && (routing.locales as readonly string[]).includes(parts[0] ?? "");
}
