#!/usr/bin/env node
// One-off back-catalogue import. The RSS feed only has the latest 10 posts, so
// older ones come from Medium's data export:
//   medium.com → Settings → Security and apps → Download your information.
// Unzip it and point this at the `posts` folder:
//
//   npm run import:medium -- ~/Downloads/medium-export/posts
//
// Drafts and replies (comments) are skipped; existing posts are never changed.
// With no folder it falls back to the live feed (same as `npm run sync:medium`).

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cleanUrl, decode, excerptOf, fetchFeed, mergePosts, parseFeed, readingMinutes, stripTags } from "./lib/medium.mjs";

const STORE = path.join(path.dirname(fileURLToPath(import.meta.url)), "../content/writing.json");
const dir = process.argv[2];

const pick = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : "";
};

async function fromExport(folder) {
  const files = (await readdir(folder)).filter((f) => f.endsWith(".html") && !f.startsWith("draft_"));
  const posts = [];
  for (const f of files) {
    const html = await readFile(path.join(folder, f), "utf8");
    const url = pick(html, /<a[^>]*href="([^"]+)"[^>]*class="p-canonical"/) || pick(html, /class="p-canonical"[^>]*href="([^"]+)"/);
    const date = pick(html, /<time[^>]*class="dt-published"[^>]*datetime="([^"]+)"/);
    const body = pick(html, /<section data-field="body"[^>]*>([\s\S]*?)<\/section>\s*<footer/) || html;
    const title = stripTags(pick(html, /<h1 class="p-name">([\s\S]*?)<\/h1>/) || pick(html, /<title>([\s\S]*?)<\/title>/));
    const subtitle = stripTags(pick(html, /<section data-field="subtitle"[^>]*>([\s\S]*?)<\/section>/));
    // Replies are exported as posts too; they have no title of their own.
    if (!url || !date || !title || stripTags(body).split(" ").length < 80) continue;
    posts.push({
      title,
      url: cleanUrl(url),
      date: new Date(date).toISOString(),
      readingMinutes: readingMinutes(body),
      tags: [],
      excerpt: subtitle ? (/[.!?…]$/.test(subtitle) ? subtitle : `${subtitle}.`) : excerptOf(body),
    });
  }
  return posts;
}

const incoming = dir ? await fromExport(dir) : parseFeed(await fetchFeed());
const stored = JSON.parse(await readFile(STORE, "utf8").catch(() => "[]"));
const { posts, added } = mergePosts(stored, incoming);
if (added.length) await writeFile(STORE, `${JSON.stringify(posts, null, 2)}\n`);
console.log(added.length ? `imported ${added.length}: ${added.map((p) => p.title).join(" · ")}` : "nothing new");
