"use client";

import { useEffect, useRef, useState } from "react";
import { pad2 } from "@/lib/feed";

type Item = { id: string; title: string };

/** Tracks which section is in view. Falls back to the first section before any scrolling. */
function useActiveSection(items: Item[]) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) visible.set(r.target.id, r.isIntersecting);
        const current = items.find((i) => visible.get(i.id));
        if (current) setActive(current.id);
      },
      // A section is "current" while it crosses the upper third of the viewport.
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const i of items) {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return active;
}

/** Desktop sidebar list, styled like the home filters. */
export function OnThisPageList({ items }: { items: Item[] }) {
  const active = useActiveSection(items);
  return (
    <nav aria-label="On this page" className="flex w-full flex-col gap-1">
      <p className="font-mono text-[10px] tracking-[0.2px] text-tertiary">ON THIS PAGE</p>
      <ol className="flex w-full flex-col gap-1">
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex w-full items-center justify-between rounded-eb px-2.5 py-2 text-[13px] ${
                  on ? "bg-accent font-medium text-accent-on" : "text-secondary hover:bg-sunken hover:text-primary"
                }`}
              >
                <span>{it.title}</span>
                <span className={`font-mono text-[10px] font-normal ${on ? "" : "text-tertiary"}`}>{pad2(i + 1)}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Mobile: sticky bar showing the current section; opens the full list. */
export function OnThisPageDropdown({ items }: { items: Item[] }) {
  const active = useActiveSection(items);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const index = Math.max(0, items.findIndex((i) => i.id === active));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="on-this-page-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-eb border border-subtle bg-surface py-2.5 pl-3.5 pr-3"
      >
        <span className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-tertiary">{pad2(index + 1)}</span>
          <span className="text-[13px] font-medium text-primary">{items[index]?.title}</span>
        </span>
        <span className="font-mono text-[10px] text-secondary">
          ON THIS PAGE <span aria-hidden>{open ? "▴" : "▾"}</span>
        </span>
      </button>
      {open && (
        <ol
          id="on-this-page-menu"
          className="absolute inset-x-0 top-full mt-1 rounded-eb border border-subtle bg-surface py-1 shadow-sheet"
        >
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={() => setOpen(false)}
                aria-current={it.id === active ? "location" : undefined}
                className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-primary hover:bg-sunken aria-[current]:font-medium"
              >
                <span className="font-mono text-[11px] text-tertiary">{pad2(i + 1)}</span>
                {it.title}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
