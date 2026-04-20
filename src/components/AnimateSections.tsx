"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Null component that lives in the root layout.
 * On every route change it finds all <section> elements (not marked data-no-animate)
 * and wires up IntersectionObserver to fade-slide them in on scroll.
 */
export default function AnimateSections() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver;

    const init = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
              // Clear transform after transition so the section no longer
              // creates a stacking context that traps position:fixed children
              setTimeout(() => { el.style.transform = ""; }, 600);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );

      document
        .querySelectorAll<HTMLElement>("section:not([data-no-animate])")
        .forEach((section) => {
          section.style.opacity = "0";
          section.style.transform = "translateY(20px)";
          section.style.transition = "opacity 0.55s ease, transform 0.55s ease";
          observer.observe(section);
        });
    };

    // Double rAF — let new page DOM settle before querying
    let raf2: number;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(init);
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
