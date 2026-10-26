import type { Bump, Entry, EntryInput, EntryType, Versioned, WritingEntry } from "@content/types";
import writing from "@content/writing.json";
import { fetchFeed, mergePosts, parseFeed, type Post } from "../../scripts/lib/medium.mjs";
import { site } from "@content/site";
import { FILTERS, type FilterId } from "./feed";

// Every file in content/entries/ is picked up automatically — adding work never
// means editing this list.
const ctx = require.context("../../content/entries", false, /\.ts$/);
const fileEntries: EntryInput[] = ctx.keys().map((k) => (ctx(k) as { default: EntryInput }).default);

const toWritingEntries = (posts: Post[]): WritingEntry[] =>
  posts
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

const build = (posts: Post[]) => versionEntries([...fileEntries, ...toWritingEntries(posts)], site.startVersion);

/** From committed content only (content/writing.json). Used by case studies and explorations. */
export const entries: Versioned[] = build(writing);

export const DAY = 60 * 60 * 24;

/**
 * The feed: committed content plus any Medium posts newer than the last sync.
 * Fetched at build and refreshed at most daily (ISR); a failed fetch falls
 * back to the stored posts. The daily GitHub Action commits them for good.
 */
export async function loadFeed() {
  let posts: Post[] = writing;
  try {
    const xml = await fetchFeed({ next: { revalidate: DAY } });
    posts = mergePosts(writing, parseFeed(xml)).posts;
  } catch (e) {
    console.warn(`[writing] using stored posts: ${(e as Error).message}`);
  }
  const all = build(posts);
  const counts = Object.fromEntries(
    FILTERS.map((f) => [f.id, f.type ? all.filter((e) => e.type === f.type).length : all.length]),
  ) as Record<FilterId, number>;
  return {
    entries: all,
    counts,
    /** The newest release gets the filled marker and the accent version tag. */
    latestReleaseSlug: all.find((e) => e.type === "release")?.slug,
  };
}
