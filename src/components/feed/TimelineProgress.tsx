"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-linked "you are here" for the changelog timeline (after evilcharts.com's
 * On This Page indicator): the line fills in from the first entry down to the
 * one in view, and a dot slides to that entry's marker. Markers are found via
 * [data-marker] inside the parent list, so it adapts to either breakpoint and
 * to filter changes. Without JS the static markers stay as they are.
 */
export function TimelineProgress({ watch }: { watch: unknown }) {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ x: number; top: number; y: number } | null>(null);

  useEffect(() => {
    const list = ref.current?.parentElement;
    if (!list) return;
    list.dataset.progress = "";
    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = list.getBoundingClientRect();
        const markers = [...list.querySelectorAll<HTMLElement>("[data-marker]")].map((m) => {
          const r = m.getBoundingClientRect();
          return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top, row: m.parentElement! };
        });
        if (!markers.length) return setGeo(null);
        // Active: the last entry whose top has passed 40% of the viewport (first entry until then).
        const line = innerHeight * 0.4;
        let active = markers[0];
        for (const m of markers) if (m.row.getBoundingClientRect().top <= line) active = m;
        setGeo({ x: markers[0].x, top: markers[0].y, y: active.y });
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    addEventListener("scroll", measure, { passive: true });
    addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      removeEventListener("scroll", measure);
      removeEventListener("resize", measure);
      delete list.dataset.progress;
    };
  }, [watch]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {geo && (
        <>
          <span
            className="absolute w-px bg-accent transition-[height] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ left: geo.x - 0.5, top: geo.top, height: geo.y - geo.top }}
          />
          <span
            className="absolute left-0 top-0 size-[9px] rounded-full bg-accent ring-[3px] ring-[color:var(--bg-page)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
            style={{ transform: `translate(${geo.x - 4.5}px, ${geo.y - 4.5}px)` }}
          />
        </>
      )}
    </div>
  );
}
