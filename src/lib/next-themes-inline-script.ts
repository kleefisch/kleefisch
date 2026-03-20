/**
 * Same blocking initializer as next-themes@0.4.6 (`script.ts`).
 * Used with `next/script` strategy="beforeInteractive" so we never render
 * `<script>` inside a client component (React 19 / Next 16 warns on that).
 */
export function themeInlineScript(
  attribute: unknown,
  storageKey: string,
  defaultTheme: string,
  forcedTheme: string | null,
  themes: string[],
  value: Record<string, string> | null,
  enableSystem: boolean,
  enableColorScheme: boolean,
) {
  const el = document.documentElement;
  const systemThemes = ["light", "dark"];

  function updateDOM(theme: string) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute];

    attributes.forEach((attr) => {
      const attrStr = String(attr);
      const isClass = attrStr === "class";
      const classes = isClass && value ? themes.map((t) => value[t] || t) : themes;
      if (isClass) {
        el.classList.remove(...classes);
        el.classList.add(value && value[theme] ? value[theme] : theme);
      } else {
        el.setAttribute(attrStr, theme);
      }
    });

    setColorScheme(theme);
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (forcedTheme) {
    updateDOM(forcedTheme);
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme;
      const isSystem = enableSystem && themeName === "system";
      const theme = isSystem ? getSystemTheme() : themeName;
      updateDOM(theme);
    } catch {
      // Unsupported
    }
  }
}
