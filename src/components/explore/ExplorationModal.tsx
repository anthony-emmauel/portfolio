"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ExplorationEntry, Versioned } from "@content/types";
import { formatEntryDate } from "@/lib/feed";
import { ImageViewer } from "./ImageViewer";
import { LiveFrame } from "./LiveFrame";

type Exploration = Versioned<ExplorationEntry>;

/**
 * Every exploration opens here: a modal on desktop, a full-screen sheet on
 * mobile. `mode="intercept"` is the soft-navigation overlay (close = back);
 * `mode="page"` is a direct visit to /explorations/<slug> (close = go to the
 * Explorations view). Esc closes, ← → step through, focus stays inside and
 * returns to whatever opened it.
 */
export function ExplorationModal({
  entry,
  all,
  mode,
}: {
  entry: Exploration;
  all: Exploration[];
  mode: "intercept" | "page";
}) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const i = all.findIndex((e) => e.slug === entry.slug);
  const prev = all[i - 1];
  const next = all[i + 1];
  const short = (e: Exploration) => e.modal?.titleShort ?? e.title;

  const close = useCallback(() => {
    if (mode === "intercept") router.back();
    else router.push("/?show=explorations");
  }, [mode, router]);

  const go = useCallback((e?: Exploration) => e && router.replace(`/explorations/${e.slug}`, { scroll: false }), [router]);

  useEffect(() => {
    opener.current = opener.current ?? document.activeElement;
    const d = dialog.current;
    if (d && !d.open) d.showModal();
    const root = document.documentElement;
    setTheme(
      root.dataset.theme === "dark" || (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches)
        ? "dark"
        : "light",
    );
    const restore = opener.current;
    return () => {
      if (restore instanceof HTMLElement) restore.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      // Arrow keys belong to inputs, radio groups and the image viewer (pan) when they have focus.
      if (t.closest("input, textarea, [role=radiogroup], [role=img][tabindex]")) return;
      if (e.key === "ArrowLeft") go(prev);
      if (e.key === "ArrowRight") go(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, prev, next]);

  const live = entry.media === "live" && entry.links?.live;
  const context = entry.modal?.context ?? entry.summary;
  const primary = live ? (
    <a
      href={entry.links!.live}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-eb bg-accent px-3.5 py-3 text-[0.875rem] font-medium text-accent-on lg:py-[9px] lg:text-[0.8125rem]"
    >
      Open live site <span aria-hidden>&nbsp;↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : entry.links?.caseStudy ? (
    <Link
      href={entry.links.caseStudy}
      className="flex items-center justify-center rounded-eb border border-strong bg-surface px-3.5 py-3 text-[0.875rem] font-medium text-primary lg:py-[9px] lg:text-[0.8125rem]"
    >
      Built with NokGridCore <span aria-hidden>&nbsp;→</span>
    </Link>
  ) : null;

  const navLink = (e: Exploration | undefined, dir: "prev" | "next") =>
    e ? (
      <button type="button" onClick={() => go(e)} className="font-mono text-[0.6875rem] text-secondary hover:text-primary">
        {dir === "prev" && <span aria-hidden>← </span>}
        <span className="sr-only">{dir === "prev" ? "Previous: " : "Next: "}</span>
        <span className="lg:hidden">{short(e)}</span>
        <span className="hidden lg:inline">{e.title}</span>
        {dir === "next" && <span aria-hidden> →</span>}
      </button>
    ) : (
      <span aria-hidden className="font-mono text-[0.6875rem] opacity-0">
        —
      </span>
    );

  return (
    <dialog
      ref={dialog}
      aria-labelledby="exploration-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-0 hidden h-[100dvh] open:flex max-h-none w-screen max-w-none flex-col overflow-hidden bg-surface p-0 text-primary backdrop:bg-scrim-strong lg:m-auto lg:h-[min(760px,calc(100dvh-64px))] lg:w-[min(1200px,calc(100vw-64px))] lg:rounded-[6px] lg:border lg:border-subtle lg:shadow-modal"
    >
      <div className="flex flex-col gap-1.5 border-b border-subtle px-4 pb-3 pt-3.5 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:py-4 lg:pl-6 lg:pr-4">
        <div className="flex min-w-0 flex-col gap-1.5 lg:gap-1">
          <div className="flex items-center justify-between gap-2 lg:justify-start">
            <div className="flex min-w-0 items-center gap-2 lg:gap-2.5">
              {/* autoFocus: showModal() focuses the title (announced by screen readers) rather than the first button */}
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <h2
                id="exploration-title"
                tabIndex={-1}
                autoFocus
                className="truncate text-[1.125rem] font-medium text-primary focus:outline-none lg:text-[1.25rem]"
              >
                <span className="lg:hidden">{short(entry)}</span>
                <span className="hidden lg:inline">{entry.title}</span>
              </h2>
              <span className="shrink-0 rounded-eb bg-sunken px-[7px] py-[3px] font-mono text-[0.625rem] tracking-[0.1px] text-secondary">
                {entry.kind.toUpperCase()}
              </span>
              <span className="hidden font-mono text-[0.625rem] tracking-[0.1px] text-tertiary lg:inline">
                {formatEntryDate(entry)}
              </span>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-eb border border-subtle text-[0.875rem] lg:hidden"
            >
              ✕
            </button>
          </div>
          <p className="text-[0.8125rem] text-secondary">
            <span className="lg:hidden">{entry.modal?.contextShort ?? context}</span>
            <span className="hidden lg:inline">{context}</span>
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {primary}
          <button
            type="button"
            onClick={close}
            aria-label="Close (Esc)"
            className="flex size-[34px] items-center justify-center rounded-eb border border-subtle text-[0.875rem] hover:border-strong"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 bg-stage px-4 py-3 lg:px-6 lg:py-5">
        {live ? (
          <LiveFrame key={entry.slug} url={entry.links!.live!} poster={entry.cover} title={entry.title} />
        ) : entry.modal?.images ? (
          <ImageViewer key={entry.slug} images={entry.modal.images} title={entry.title} theme={theme} />
        ) : null}
      </div>

      <footer className="flex flex-col gap-2.5 border-t border-subtle px-4 pb-7 pt-3 lg:flex-row lg:items-center lg:justify-between lg:py-3 lg:pl-6 lg:pr-4">
        <div className="lg:hidden">{primary}</div>
        <p className="hidden font-mono text-[0.6875rem] text-secondary lg:block">{entry.modal?.footer ?? entry.role}</p>
        <nav aria-label="Explorations" className="flex items-center justify-between lg:gap-4">
          {navLink(prev, "prev")}
          <span className="font-mono text-[0.625rem] text-tertiary">
            {i + 1} / {all.length}
          </span>
          {navLink(next, "next")}
          <span className="hidden font-mono text-[0.625rem] tracking-[0.1px] text-tertiary lg:inline">ESC · ← →</span>
        </nav>
      </footer>
    </dialog>
  );
}
