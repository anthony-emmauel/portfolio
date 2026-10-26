#!/usr/bin/env node
// Appends new Medium posts to content/writing.json. Run daily by
// .github/workflows/medium-sync.yml; prints "changed" or "unchanged".
//
//   npm run sync:medium              # from the live feed
//   npm run sync:medium -- feed.xml  # from a saved file (testing)

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fetchFeed, mergePosts, parseFeed } from "./lib/medium.mjs";

const STORE = path.join(path.dirname(fileURLToPath(import.meta.url)), "../content/writing.json");

const src = process.argv[2];
const xml = src ? await readFile(src, "utf8") : await fetchFeed();
const stored = JSON.parse(await readFile(STORE, "utf8").catch(() => "[]"));
const { posts, added } = mergePosts(stored, parseFeed(xml));

if (!added.length) {
  console.log("unchanged");
} else {
  await writeFile(STORE, `${JSON.stringify(posts, null, 2)}\n`);
  console.log(`changed: +${added.length} (${added.map((p) => p.title).join(" · ")})`);
}
