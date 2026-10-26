"use client";

import type { Note, Versioned } from "@content/types";
import { FILTERS, pad2, type FilterId } from "@/lib/feed";
import { useFeed } from "./FeedState";
import { ExplorationItem, NotesItem, ReleaseItem, WritingItem } from "./FeedItem";

export function Changelog({
  entries,
  counts,
  notes,
  latestReleaseSlug,
}: {
  entries: Versioned[];
  counts: Record<FilterId, number>;
  notes: Note[];
  latestReleaseSlug?: string;
}) {
  const { filter, setFilter } = useFeed();
  const current = FILTERS.find((f) => f.id === filter)!;
  const visible = current.type ? entries.filter((e) => e.type === current.type) : entries;
  const n = visible.length;

  const summary =
    filter === "notes"
      ? { desktop: `${pad2(n)} ${n === 1 ? "ENTRY" : "ENTRIES"} · ${notes.length} NOTES`, mobile: `${notes.length} NOTES` }
      : { desktop: `${pad2(n)} ENTRIES · NEWEST FIRST`, mobile: `${pad2(n)} ENTRIES` };

  const next: FilterId = filter === "everything" ? "case-studies" : "everything";
  const nextLabel = FILTERS.find((f) => f.id === next)!.heading;

  return (
    <section aria-labelledby="changelog-heading">
      <div className="flex items-baseline justify-between border-b border-subtle pb-2.5 font-mono lg:pb-3">
        <h2 id="changelog-heading" className="text-[12px] text-secondary">
          <span className="hidden lg:inline">changelog / </span>
          {current.heading}
        </h2>
        <p aria-live="polite" className="text-[10px] tracking-[0.2px] text-tertiary">
          <span className="hidden lg:inline">{summary.desktop}</span>
          <span className="lg:hidden">{summary.mobile}</span>
        </p>
      </div>

      <div>
        {visible.map((e, i) => {
          // Index among cards with a cover image, in display order.
          const coverIndex = visible
            .slice(0, i)
            .filter((v) => v.type === "release" || (v.type === "exploration" && v.kind !== "side project")).length;
          switch (e.type) {
            case "release":
              return <ReleaseItem key={e.slug} entry={e} latest={e.slug === latestReleaseSlug} coverIndex={coverIndex} />;
            case "exploration":
              return <ExplorationItem key={e.slug} entry={e} coverIndex={coverIndex} />;
            case "writing":
              return <WritingItem key={e.slug} entry={e} />;
            case "note":
              return (
                <NotesItem
                  key={e.slug}
                  entry={e}
                  notes={notes}
                  expanded={filter === "notes"}
                  onReadAll={() => setFilter("notes", { scroll: true })}
                />
              );
          }
        })}
      </div>

      <button
        type="button"
        onClick={() => setFilter(next, { scroll: true })}
        className="mt-0 inline-flex items-center gap-2 rounded-eb border border-subtle bg-surface px-3 py-2 text-[13px] text-secondary hover:text-primary lg:gap-2.5 lg:bg-transparent lg:px-4 lg:py-2.5 lg:font-mono lg:text-[10px] lg:tracking-[0.2px] lg:text-tertiary"
      >
        <span className="lg:hidden">
          Show {nextLabel} <span aria-hidden>→</span>
        </span>
        <span className="font-mono text-[10px] text-tertiary lg:hidden">{pad2(counts[next])}</span>
        <span className="hidden lg:inline">
          SHOW {nextLabel.toUpperCase()} ({pad2(counts[next])}) <span aria-hidden>→</span>
        </span>
      </button>
    </section>
  );
}
