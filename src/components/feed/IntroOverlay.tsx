"use client";

import { useLayoutEffect, useRef } from "react";
import { INTRO_MS } from "@/lib/intro";

const STEPS = ["v3.0", "v4.0", "v4.1"];

/**
 * Overlay for the first-visit intro. The real page is already rendered (and
 * painted, so LCP isn't delayed) underneath; this only adds the version
 * counter, the tag that flies into the latest release's gutter, the line that
 * draws down from it, and the panels that reveal sidebar then main. All timing
 * lives in globals.css (`[data-intro="play"]`); this component measures where
 * the tag and line should go, and ends the intro early on any input.
 */
export function IntroOverlay() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "play") return;
    const el = root.current!;

    const visible = (sel: string) =>
      [...document.querySelectorAll<HTMLElement>(sel)].find((n) => n.offsetParent !== null);
    const target = visible("[data-intro-target]");
    const line = visible("[data-intro-line]");
    if (target) {
      const r = target.getBoundingClientRect();
      el.style.setProperty("--dx", `${r.left + r.width / 2 - innerWidth / 2}px`);
      el.style.setProperty("--dy", `${r.top + r.height / 2 - innerHeight / 2}px`);
    }
    if (line) {
      const r = line.getBoundingClientRect();
      el.style.setProperty("--lx", `${r.left}px`);
      el.style.setProperty("--ly", `${r.top}px`);
      el.style.setProperty("--lh", `${Math.max(0, innerHeight - r.top)}px`);
    }
    // The counter's CSS animations started at first paint; join their clock.
    const clock = el.querySelector(".intro-meta")?.getAnimations()[0]?.currentTime;
    const elapsed = typeof clock === "number" ? clock : 0;
    el.style.setProperty("--t0", `${-Math.round(elapsed)}ms`);
    el.dataset.ready = "";

    const end = () => {
      html.dataset.intro = "done";
      cleanup();
    };
    const events = ["pointerdown", "keydown", "wheel", "touchmove"] as const;
    const timer = setTimeout(end, INTRO_MS);
    events.forEach((e) => window.addEventListener(e, end, { passive: true }));
    function cleanup() {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, end));
    }
    return cleanup;
  }, []);

  return (
    <div ref={root} aria-hidden className="intro">
      <div className="intro-panel intro-panel-side" />
      <div className="intro-panel intro-panel-main" />
      <span className="intro-line" />
      {STEPS.map((v, i) => (
        <span key={v} className="intro-tag intro-step" style={{ "--d": `${i * 375}ms` } as React.CSSProperties}>
          {v}
        </span>
      ))}
      <span className="intro-tag intro-fly">v4.3.0</span>
      <div className="intro-meta">
        <span className="intro-dots">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ "--d": `${i * 375}ms` } as React.CSSProperties} />
          ))}
        </span>
        <span className="intro-label">LOADING CHANGELOG</span>
      </div>
    </div>
  );
}
