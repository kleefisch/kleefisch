"use client";

import { useEffect } from "react";

const IDLE_MS = 2000;
/** Evita resetar o timer a cada pixel ao mover o rato */
const MOUSE_MOVE_THROTTLE_MS = 100;

/**
 * Esconde a scrollbar do documento após um período sem atividade (estilo overlay).
 * Scroll, wheel, toque, clique ou movimento do rato voltam a mostrar a barra.
 */
export function ScrollbarAutoHide() {
  useEffect(() => {
    const html = document.documentElement;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let lastMoveBump = 0;

    const bumpVisibility = () => {
      html.classList.remove("scrollbar-idle");
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        html.classList.add("scrollbar-idle");
      }, IDLE_MS);
    };

    const onMouseMove = () => {
      const now = Date.now();
      if (now - lastMoveBump < MOUSE_MOVE_THROTTLE_MS) return;
      lastMoveBump = now;
      bumpVisibility();
    };

    bumpVisibility();

    window.addEventListener("scroll", bumpVisibility, { passive: true });
    window.addEventListener("wheel", bumpVisibility, { passive: true });
    window.addEventListener("touchstart", bumpVisibility, { passive: true });
    window.addEventListener("pointerdown", bumpVisibility);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      html.classList.remove("scrollbar-idle");
      window.removeEventListener("scroll", bumpVisibility);
      window.removeEventListener("wheel", bumpVisibility);
      window.removeEventListener("touchstart", bumpVisibility);
      window.removeEventListener("pointerdown", bumpVisibility);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return null;
}
