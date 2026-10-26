"use client";

import { useEffect, useRef } from "react";
import { FILTERS, pad2, type FilterId } from "@/lib/feed";
import { useFeed } from "./FeedState";

/** Desktop: vertical list in the sidebar. Mobile: horizontally scrolling chips. */
export function Filters({ layout, counts }: { layout: "list" | "chips"; counts: Record<FilterId, number> }) {
  const { filter, setFilter } = useFeed();
  const list = layout === "list";
  const row = useRef<HTMLUListElement>(null);

  // Keep the active chip visible in the scrolling mobile row (e.g. ?show=everything).
  useEffect(() => {
    if (list) return;
    const el = row.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
    const ul = row.current;
    if (el && ul) ul.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [filter, list]);

  return (
    <nav aria-label="Filter the changelog" className="flex w-full flex-col gap-1">
      <p className="font-mono text-[10px] tracking-[0.2px] text-tertiary">SHOW</p>
      <ul
        ref={row}
        className={
          list
            ? "flex w-full flex-col gap-1"
            : "relative -mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <li key={f.id} className={list ? "w-full" : "shrink-0"}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id, { scroll: !list })}
                className={`flex items-center rounded-eb text-[13px] ${
                  list ? "w-full justify-between px-2.5 py-2" : "gap-2 border px-3 py-2"
                } ${
                  active
                    ? `bg-accent font-medium text-accent-on ${list ? "" : "border-transparent"}`
                    : `text-secondary hover:text-primary ${list ? "hover:bg-sunken" : "border-subtle bg-surface"}`
                }`}
              >
                <span>{f.label}</span>
                <span className={`font-mono text-[10px] font-normal ${active ? "" : "text-tertiary"}`}>
                  {pad2(counts[f.id])}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
