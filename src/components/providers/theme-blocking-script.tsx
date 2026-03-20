import { themeInlineScript } from "@/lib/next-themes-inline-script";

export type ThemeBlockingScriptProps = {
  attribute?: string | string[];
  storageKey?: string;
  defaultTheme?: string;
  forcedTheme?: string;
  themes?: string[];
  value?: Record<string, string> | null;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  nonce?: string;
};

const defaultThemes = ["light", "dark"];

/**
 * Script de tema antes da hidratação. Usar dentro de `<head>` no layout (Server Component).
 * Evita `next/script` e `<script>` em boundaries de cliente — React 19 / Next 16 avisam nesses casos.
 */
export function ThemeBlockingScript({
  attribute = "data-theme",
  storageKey = "theme",
  defaultTheme = "system",
  forcedTheme,
  themes = defaultThemes,
  value = null,
  enableSystem = true,
  enableColorScheme = true,
  nonce,
}: ThemeBlockingScriptProps) {
  const scriptArgs = JSON.stringify([
    attribute,
    storageKey,
    defaultTheme,
    forcedTheme ?? null,
    themes,
    value,
    enableSystem,
    enableColorScheme,
  ]).slice(1, -1);

  return (
    <script
      id="next-themes-init"
      suppressHydrationWarning
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: `(${themeInlineScript.toString()})(${scriptArgs})`,
      }}
    />
  );
}
