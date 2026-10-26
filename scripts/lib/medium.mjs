// Medium feed parsing, shared by scripts/medium-sync.mjs (daily GitHub Action),
// scripts/medium-import.mjs (back catalogue) and src/lib/writing.ts (build + ISR).

export const FEED_URL = "https://medium.com/feed/@antorneejnr";
export const WORDS_PER_MINUTE = 265; // Medium's reading speed

/**
 * @typedef {{ title: string; url: string; date: string; readingMinutes: number; tags: string[]; excerpt: string }} Post
 */

export const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

export const stripTags = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]).trim() : "";
};

/** Canonical post URL without tracking params. */
export const cleanUrl = (url) => url.split("?")[0].replace(/\/$/, "");

export const readingMinutes = (html) =>
  Math.max(1, Math.ceil(stripTags(html).split(" ").filter(Boolean).length / WORDS_PER_MINUTE));

/** Medium's subtitle is the first <h4>, or a short first paragraph. Falls back to the first sentence. */
export function excerptOf(html) {
  const blocks = [...html.matchAll(/<(h3|h4|p)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => ({ tag: m[1], text: stripTags(m[2]) }));
  const first = blocks.find((b) => b.text);
  if (!first) return "";
  let text = first.text;
  if (first.tag !== "h4" && text.length > 140) text = text.split(/(?<=[.!?])\s/)[0];
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

/** @returns {Post[]} */
export function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const html = tag(item, "content:encoded");
    return {
      title: tag(item, "title"),
      url: cleanUrl(tag(item, "link")),
      date: new Date(tag(item, "pubDate")).toISOString(),
      readingMinutes: readingMinutes(html),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(m[1]).trim()),
      excerpt: excerptOf(html),
    };
  });
}

/**
 * Adds posts not already stored (matched by URL). Never removes or rewrites a
 * stored post — the feed only holds the latest 10, and stored excerpts may be
 * hand-edited. Newest first.
 * @param {Post[]} stored @param {Post[]} incoming
 */
export function mergePosts(stored, incoming) {
  const known = new Set(stored.map((p) => cleanUrl(p.url)));
  const added = incoming.filter((p) => p.url && p.title && !known.has(cleanUrl(p.url)));
  return { posts: [...stored, ...added].sort((a, b) => b.date.localeCompare(a.date)), added };
}

export async function fetchFeed(init) {
  const res = await fetch(FEED_URL, { headers: { "user-agent": "emmanuelanthony.site medium-sync" }, ...init });
  if (!res.ok) throw new Error(`Medium feed request failed: ${res.status}`);
  return res.text();
}
