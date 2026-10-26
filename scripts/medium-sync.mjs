#!/usr/bin/env node
// Reads the Medium RSS feed and appends new posts to content/writing.json.
// Never deletes or rewrites stored posts: the feed only holds the latest 10, and
// stored entries may have hand-edited excerpts. Exit code 0 either way; prints
// "changed" or "unchanged" so CI can decide whether to commit.
//
//   node scripts/medium-sync.mjs            # sync from the live feed
//   node scripts/medium-sync.mjs feed.xml   # sync from a saved file (testing)

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const FEED = "https://medium.com/feed/@antorneejnr";
const STORE = path.join(path.dirname(fileURLToPath(import.meta.url)), "../content/writing.json");
const WORDS_PER_MINUTE = 265; // Medium's reading speed

const decode = (s) =>
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

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]).trim() : "";
};
const stripTags = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/** Medium's subtitle is the first <h4>, or a short first paragraph. Falls back to the first sentence. */
function excerptOf(html) {
  const blocks = [...html.matchAll(/<(h3|h4|p)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => ({ tag: m[1], text: stripTags(m[2]) }));
  const first = blocks.find((b) => b.text);
  if (!first) return "";
  let text = first.text;
  if (first.tag !== "h4" && text.length > 140) text = text.split(/(?<=[.!?])\s/)[0];
  return /[.!?…]$/.test(text) ? text : `${text}.`;
}

export function parseFeed(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const html = tag(item, "content:encoded");
    const words = stripTags(html).split(" ").filter(Boolean).length;
    return {
      title: tag(item, "title"),
      url: tag(item, "link").split("?")[0],
      date: new Date(tag(item, "pubDate")).toISOString(),
      readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(m[1]).trim()),
      excerpt: excerptOf(html),
    };
  });
}

async function main() {
  const src = process.argv[2];
  const xml = src
    ? await readFile(src, "utf8")
    : await fetch(FEED, { headers: { "user-agent": "emmanuelanthony.site medium-sync" } }).then((r) => {
        if (!r.ok) throw new Error(`Feed request failed: ${r.status}`);
        return r.text();
      });

  const stored = JSON.parse(await readFile(STORE, "utf8").catch(() => "[]"));
  const known = new Set(stored.map((p) => p.url));
  const fresh = parseFeed(xml).filter((p) => p.url && !known.has(p.url));

  if (!fresh.length) {
    console.log("unchanged");
    return;
  }
  const all = [...stored, ...fresh].sort((a, b) => b.date.localeCompare(a.date));
  await writeFile(STORE, `${JSON.stringify(all, null, 2)}\n`);
  console.log(`changed: +${fresh.length} (${fresh.map((p) => p.title).join(" · ")})`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
