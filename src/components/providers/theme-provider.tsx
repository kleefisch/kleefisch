"use client";

/**
 * Fork of next-themes ThemeProvider without the inline `<script>` child.
 * React 19 / Next 16 warns when client components render `<script>`; the
 * blocking initializer lives in `ThemeBlockingScript` (next/script).
 */
import * as React from "react";
import type { Attribute, ThemeProviderProps, UseThemeProps } from "next-themes";

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const isServer = typeof window === "undefined";
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = { setTheme: () => {}, themes: [] };

export const useTheme = () => React.useContext(ThemeContext) ?? defaultContext;

export function ThemeProvider(props: ThemeProviderProps) {
  const context = React.useContext(ThemeContext);
  if (context) return <>{props.children}</>;
  return <Theme {...props} />;
}

const defaultThemes = ["light", "dark"];

function Theme({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes = defaultThemes,
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
  value,
  children,
  nonce,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState(() => getTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = React.useState(() =>
    theme === "system" ? getSystemTheme() : theme,
  );
  const attrs = !value ? themes : Object.values(value);

  const applyTheme = React.useCallback(
    (selected: string | undefined) => {
      let resolved = selected;
      if (!resolved) return;

      if (resolved === "system" && enableSystem) {
        resolved = getSystemTheme();
      }

      const name = value && resolved ? value[resolved] : resolved;
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
      const d = document.documentElement;

      const handleAttribute = (attr: Attribute) => {
        if (attr === "class") {
          d.classList.remove(...attrs);
          if (name) d.classList.add(name);
        } else if (attr.startsWith("data-")) {
          if (name) {
            d.setAttribute(attr, name);
          } else {
            d.removeAttribute(attr);
          }
        }
      };

      if (Array.isArray(attribute)) attribute.forEach(handleAttribute);
      else handleAttribute(attribute);

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
        const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
        d.style.colorScheme = colorScheme ?? "";
      }

      enable?.();
    },
    [
      attribute,
      attrs,
      defaultTheme,
      disableTransitionOnChange,
      enableColorScheme,
      enableSystem,
      nonce,
      value,
    ],
  );

  const setTheme = React.useCallback(
    (next: React.SetStateAction<string>) => {
      setThemeState((prev) => {
        const newTheme = typeof next === "function" ? next(prev ?? defaultTheme) : next;
        try {
          localStorage.setItem(storageKey, newTheme);
        } catch {
          // Unsupported
        }
        return newTheme;
      });
    },
    [defaultTheme, storageKey],
  );

  const handleMediaQuery = React.useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [applyTheme, enableSystem, forcedTheme, theme],
  );

  React.useEffect(() => {
    const media = window.matchMedia(MEDIA);
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);
    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) return;
      if (!e.newValue) {
        setTheme(defaultTheme);
      } else {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [defaultTheme, setTheme, storageKey]);

  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [applyTheme, forcedTheme, theme]);

  const providerValue = React.useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, "system"] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as "light" | "dark" | undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
  );

  return <ThemeContext.Provider value={providerValue}>{children}</ThemeContext.Provider>;
}

function getTheme(key: string, fallback?: string) {
  if (isServer) return undefined;
  let stored: string | undefined;
  try {
    stored = localStorage.getItem(key) || undefined;
  } catch {
    // Unsupported
  }
  return stored || fallback;
}

function disableAnimation(nonce?: string) {
  const css = document.createElement("style");
  if (nonce) css.setAttribute("nonce", nonce);
  css.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
    ),
  );
  document.head.appendChild(css);

  return () => {
    void window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

function getSystemTheme(e?: MediaQueryList | MediaQueryListEvent) {
  const mq = e ?? window.matchMedia(MEDIA);
  return mq.matches ? "dark" : "light";
}

export type { ThemeProviderProps, UseThemeProps } from "next-themes";
