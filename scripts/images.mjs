#!/usr/bin/env node
// Generates AVIF + WebP siblings for PNG/JPEG sources (keeps the original as the
// fallback). Skips outputs that are newer than their source.
//
//   node scripts/images.mjs public/work/store-ops-dashboard/dashboard-light.png …
//   node scripts/images.mjs --max 1600 public/work/*/poster.png

import { stat } from "node:fs/promises";
import sharp from "sharp";

const args = process.argv.slice(2);
let max;
const files = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--max") max = Number(args[++i]);
  else files.push(args[i]);
}

const mtime = (p) => stat(p).then((s) => s.mtimeMs, () => 0);

for (const src of files) {
  const base = src.replace(/\.(png|jpe?g)$/i, "");
  const srcTime = await mtime(src);
  for (const [ext, encode] of [
    ["avif", (img) => img.avif({ quality: 55, effort: 6 })],
    ["webp", (img) => img.webp({ quality: 80 })],
  ]) {
    const out = `${base}.${ext}`;
    if ((await mtime(out)) > srcTime) continue;
    let img = sharp(src);
    if (max) img = img.resize({ width: max, height: max, fit: "inside", withoutEnlargement: true });
    const info = await encode(img).toFile(out);
    console.log(`${out}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
  }
}
