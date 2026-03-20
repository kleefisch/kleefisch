"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { isLocaleHomePath } from "@/lib/is-locale-home";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];

/** When true, the wheel should scroll the page normally instead of snapping to the next/prev section. */
function sectionStillHasContentToScroll(sectionEl: HTMLElement, direction: 1 | -1) {
  const rect = sectionEl.getBoundingClientRect();
  const vh = window.innerHeight;
  const epsilon = 10;

  if (direction === 1) {
    // Scrolling down: bottom of section still below the fold
    return rect.bottom > vh + epsilon;
  }
  // Scrolling up: section top is above the viewport (we are scrolled into this section)
  return rect.top < -epsilon;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest('input:not([type="hidden"]), textarea, select, [contenteditable="true"]'),
  );
}

/** block = smooth snap in progress (consume input); snap = moved section; pass = let browser handle */
type NavigateResult = "block" | "snap" | "pass";

export function SectionNav() {
  const pathname = usePathname();
  const isHome = isLocaleHomePath(pathname);

  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHome) {
      document.documentElement.removeAttribute("data-active-section");
      return;
    }
    document.documentElement.dataset.activeSection = activeSection;
  }, [isHome, activeSection]);

  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapReleaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackReleaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);
  /** Target section while a smooth programmatic scroll is in flight (hero scrolls without wheel lock). */
  const snapTargetIdxRef = useRef<number | null>(null);
  const activeSectionIdxRef = useRef(0);
  const wheelAccRef = useRef(0);
  const wheelFlushRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActiveSection = useCallback(() => {
    const trigger = window.scrollY + window.innerHeight * 0.4;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i].id);
      if (el && el.offsetTop <= trigger) {
        setActiveSection(SECTIONS[i].id);
        activeSectionIdxRef.current = i;
        return;
      }
    }
    setActiveSection(SECTIONS[0].id);
    activeSectionIdxRef.current = 0;
  }, []);

  const releaseSnap = useCallback(() => {
    isSnappingRef.current = false;
    snapTargetIdxRef.current = null;
    wheelAccRef.current = 0;
    if (snapReleaseTimerRef.current) clearTimeout(snapReleaseTimerRef.current);
    if (fallbackReleaseTimerRef.current) clearTimeout(fallbackReleaseTimerRef.current);
  }, []);

  const snapTo = useCallback(
    (index: number) => {
      // Hero: canonical top is scrollY === 0 (main has pt-16). Use scrollTo, not scrollIntoView, and
      // never set isSnappingRef — locking + preventDefault caused Chrome/Edge stuck scroll.
      if (index === 0) {
        if (snapReleaseTimerRef.current) clearTimeout(snapReleaseTimerRef.current);
        if (fallbackReleaseTimerRef.current) clearTimeout(fallbackReleaseTimerRef.current);
        isSnappingRef.current = false;
        snapTargetIdxRef.current = null;
        wheelAccRef.current = 0;

        window.scrollTo({ top: 0, left: window.scrollX, behavior: "smooth" });
        return;
      }

      const el = document.getElementById(SECTIONS[index].id);
      if (!el) return;

      isSnappingRef.current = true;
      snapTargetIdxRef.current = index;
      if (snapReleaseTimerRef.current) clearTimeout(snapReleaseTimerRef.current);
      if (fallbackReleaseTimerRef.current) clearTimeout(fallbackReleaseTimerRef.current);

      const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

      fallbackReleaseTimerRef.current = setTimeout(releaseSnap, 1600);
    },
    [releaseSnap],
  );

  useEffect(() => {
    if (!isHome) return;

    const rafId = requestAnimationFrame(() => {
      updateActiveSection();
    });

    const handleScroll = () => {
      updateActiveSection();
      setIsScrolling(true);

      if (isSnappingRef.current) {
        // Reset the "scroll stopped" timer on every scroll event during snap.
        if (snapReleaseTimerRef.current) clearTimeout(snapReleaseTimerRef.current);
        snapReleaseTimerRef.current = setTimeout(releaseSnap, 180);
      } else {
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 1200);
      }
    };

    const handleScrollEnd = () => {
      if (isSnappingRef.current) {
        releaseSnap();
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 1200);
      }
    };

    const attemptSectionNavigate = (direction: 1 | -1): NavigateResult => {
      if (isSnappingRef.current) return "block";

      const currentIdx = activeSectionIdxRef.current;
      const nextIdx = currentIdx + direction;

      if (nextIdx < 0 || nextIdx >= SECTIONS.length) return "pass";

      const currentEl = document.getElementById(SECTIONS[currentIdx].id);
      if (currentEl && sectionStillHasContentToScroll(currentEl, direction)) {
        return "pass";
      }

      snapTo(nextIdx);
      return "snap";
    };

    const handleWheel = (e: WheelEvent) => {
      wheelAccRef.current += e.deltaY;
      if (wheelFlushRef.current) clearTimeout(wheelFlushRef.current);
      wheelFlushRef.current = setTimeout(() => {
        wheelAccRef.current = 0;
      }, 80);

      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(wheelAccRef.current) < 40) return;

      const direction = wheelAccRef.current > 0 ? 1 : -1;
      wheelAccRef.current = 0;
      if (wheelFlushRef.current) clearTimeout(wheelFlushRef.current);

      const result = attemptSectionNavigate(direction);
      if (result !== "pass") e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === "Home") {
        e.preventDefault();
        snapTo(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        snapTo(SECTIONS.length - 1);
        return;
      }

      let direction: 1 | -1 | null = null;
      if (e.key === "ArrowDown") direction = 1;
      else if (e.key === "ArrowUp") direction = -1;

      if (direction === null) return;

      const result = attemptSectionNavigate(direction);
      if (result !== "pass") e.preventDefault();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (snapReleaseTimerRef.current) clearTimeout(snapReleaseTimerRef.current);
      if (fallbackReleaseTimerRef.current) clearTimeout(fallbackReleaseTimerRef.current);
      if (wheelFlushRef.current) clearTimeout(wheelFlushRef.current);
    };
  }, [isHome, updateActiveSection, snapTo, releaseSnap]);

  const scrollTo = (id: string) => {
    const idx = SECTIONS.findIndex((s) => s.id === id);
    if (idx !== -1) snapTo(idx);
  };

  const visible = isScrolling || isHovered;

  if (!isHome) return null;

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4"
      animate={{ opacity: visible ? 1 : 0.2 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3"
            aria-label={`Navigate to ${label}`}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-200 ${
                    isActive
                      ? "text-accent-cyan"
                      : "text-muted-foreground/40 group-hover:text-accent-violet/80"
                  }`}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? "var(--color-accent-cyan)" : "rgba(255,255,255,0.2)",
                boxShadow: isActive ? "0 0 10px rgba(6,182,212,0.8)" : "none",
              }}
              whileHover={
                !isActive
                  ? {
                      backgroundColor: "rgba(139,92,246,0.7)",
                      boxShadow: "0 0 8px rgba(139,92,246,0.5)",
                      scale: 1.3,
                    }
                  : {}
              }
              transition={{ duration: 0.2 }}
              className="rounded-full shrink-0"
            />
          </button>
        );
      })}
    </motion.div>
  );
}
