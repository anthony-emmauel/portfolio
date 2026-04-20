"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Tailwind background-color class e.g. "bg-white/10" or "bg-[#262626]" */
  color?: string;
  className?: string;
}

/**
 * A 1px horizontal line that grows from 0 → 100% width
 * when it enters the viewport.
 */
export default function GrowLine({ color = "bg-white/10", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.width = "100%";
      return;
    }

    el.style.transition = "width 0.65s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = "100%";
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`h-px ${color} ${className}`}
      style={{ width: 0 }}
    />
  );
}
