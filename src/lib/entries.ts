import type { Bump, Entry, EntryInput, EntryType, Versioned, WritingEntry } from "@content/types";
import writing from "@content/writing.json";
import { site } from "@content/site";
import { FILTERS, type FilterId } from "./feed";

// Every file in content/entries/ is picked up automatically — adding work never
// means editing this list.
const ctx = require.context("../../content/entries", false, /\.ts$/);
const fileEntries: EntryInput[] = ctx.keys().map((k) => (ctx(k) as { default: EntryInput }).default);

const writingEntries: WritingEntry[] = writing
  .filter((p) => p.date >= site.writing.since)
  .map((p) => ({
    type: "writing",
    kind: "essay",
    slug: p.url.split("/").pop()!,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    readingMinutes: p.readingMinutes,
    url: p.url,
    tags: p.tags,
  }));

/** Same-day tie-break: a release lands before the patches that follow it. */
const TYPE_ORDER: Record<EntryType, number> = { release: 0, exploration: 1, writing: 2, note: 3 };

const defaultBump = (e: Entry): Bump => e.bump ?? (e.type === "release" ? "minor" : "patch");

function bump(v: [number, number, number], b: Bump): [number, number, number] {
  if (b === "major") return [v[0] + 1, 0, 0];
  if (b === "minor") return [v[0], v[1] + 1, 0];
  return [v[0], v[1], v[2] + 1];
}

/**
 * Versions are derived from date + type order: the oldest entry gets
 * site.startVersion, then each entry bumps it (release → minor, others → patch,
 * overridable with `bump`). Throws — failing the build — if two entries ever
 * share a version or a slug.
 */
export function versionEntries(entries: Entry[], start: string): Versioned[] {
  const ordered = [...entries].sort(
    (a, b) => a.date.localeCompare(b.date) || TYPE_ORDER[a.type] - TYPE_ORDER[b.type] || a.slug.localeCompare(b.slug),
  );
  let v = start.split(".").map(Number) as [number, number, number];
  const out = ordered.map((e, i) => {
    if (i > 0) v = bump(v, defaultBump(e));
    return { ...e, version: `v${v.join(".")}` };
  });

  const seen = new Map<string, string>();
  for (const e of out) {
    for (const key of [`version ${e.version}`, `slug ${e.type}/${e.slug}`]) {
      if (seen.has(key)) throw new Error(`Duplicate ${key}: "${seen.get(key)}" and "${e.title}"`);
      seen.set(key, e.title);
    }
  }
  return out.reverse(); // newest first
}

export const entries: Versioned[] = versionEntries([...fileEntries, ...writingEntries], site.startVersion);

/** The newest release gets the filled marker and the accent version tag. */
export const latestReleaseSlug = entries.find((e) => e.type === "release")?.slug;

export const entriesFor = (id: FilterId) => {
  const type = FILTERS.find((f) => f.id === id)?.type;
  return type ? entries.filter((e) => e.type === type) : entries;
};

export const counts = Object.fromEntries(FILTERS.map((f) => [f.id, entriesFor(f.id).length])) as Record<FilterId, number>;
