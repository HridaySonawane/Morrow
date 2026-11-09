"use client";

import { useEffect } from "react";

/** Adds one-shot, reduced-motion-aware reveal states to selected blocks across the marketing pages. */
export function ScrollEffects() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".manifesto-copy, .workflow-module, .interior-product-stage, .pricing-grid, .about-manifesto-grid",
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    targets.forEach((target, index) => {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", `${index * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return null;
}
