"use client";

import { NotionRenderer as NotionRendererComponent } from "react-notion-x";
import "react-notion-x/src/styles.css";

import "prismjs/themes/prism-tomorrow.css";
import Prism from "prismjs";
if (typeof window !== "undefined") {
  window.Prism = window.Prism || Prism;
}
if (typeof globalThis !== "undefined") {
  globalThis.Prism = globalThis.Prism || Prism;
}

import "prismjs/components/prism-clike.js";

import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-markup.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-cpp.js";
import "prismjs/components/prism-csharp.js";
import "prismjs/components/prism-docker.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-js-templates.js";
import "prismjs/components/prism-coffeescript.js";
import "prismjs/components/prism-diff.js";
import "prismjs/components/prism-git.js";
import "prismjs/components/prism-go.js";
import "prismjs/components/prism-graphql.js";
import "prismjs/components/prism-handlebars.js";
import "prismjs/components/prism-less.js";
import "prismjs/components/prism-makefile.js";
import "prismjs/components/prism-markdown.js";
import "prismjs/components/prism-objectivec.js";
import "prismjs/components/prism-ocaml.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-reason.js";
import "prismjs/components/prism-rust.js";
import "prismjs/components/prism-sass.js";
import "prismjs/components/prism-scss.js";
import "prismjs/components/prism-solidity.js";
import "prismjs/components/prism-sql.js";
import "prismjs/components/prism-stylus.js";
import "prismjs/components/prism-swift.js";
import "prismjs/components/prism-wasm.js";
import "prismjs/components/prism-yaml.js";

import "katex/dist/katex.min.css";

import { type ExtendedRecordMap } from "notion-types";
import { useTheme } from "@/components/providers/theme-provider";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ErrorBoundary } from "@/components/error-boundary";

const emptySubscribe = () => () => {};

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code), {
  ssr: false,
});
const Collection = dynamic(
  () => import("react-notion-x/build/third-party/collection").then((m) => m.Collection),
  { ssr: false },
);
const Equation = dynamic(
  () => import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
  { ssr: false },
);
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
  ssr: false,
});

export function NotionRenderer({ recordMap }: { recordMap: ExtendedRecordMap }) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) return <div className="h-96 w-full animate-pulse bg-neutral-900/50 rounded-xl" />;

  return (
    <ErrorBoundary>
      <div className="w-full relative notion-custom-wrapper">
        <NotionRendererComponent
          recordMap={recordMap}
          fullPage={false}
          darkMode={resolvedTheme === "dark"}
          showTableOfContents={false}
          components={{
            nextImage: Image,
            nextLink: Link,
            Code,
            Collection,
            Equation,
            Pdf,
            Modal,
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
