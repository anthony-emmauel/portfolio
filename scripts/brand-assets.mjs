#!/usr/bin/env node
// Generates the avatar, favicons and social preview image from the photos in
// assets/source/. Re-run after replacing a photo:  npm run brand
//
//   public/avatar/avatar-{96,192}.{avif,webp}   sidebar avatar (square crop)
//   src/app/icon.png (512) · apple-icon.png (180) · favicon.ico (16/32/48)
//                                               tight face crop, circle-masked
//   src/app/opengraph-image.png · twitter-image.png (1200×630, < 300 KB)

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const r = (...p) => path.join(root, ...p);

const SQUARE = r("assets/source/emmanuel-avatar-1500.png");
const ORIGINAL = r("assets/source/emmanuel-photo-original.png");

// Crops, in source pixels. FACE is tight (cap brim to chin) so it reads at 16px.
const FACE = { left: 110, top: 130, width: 1280, height: 1280 };
const PORTRAIT = { left: 269, top: 941, width: 2554, height: 3091 };

// Site tokens (src/app/globals.css, light theme) — the preview is a static image.
const PAGE = "#f5f4f0";
const TEXT_PRIMARY = "#141413";
const TEXT_SECONDARY = "#5c5b56";
const NAME = "Emmanuel Anthony";
const ROLE = "Senior product designer · design systems, ops tools & design engineering";

const circle = (size) =>
  Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`);

async function face(size, background) {
  const img = sharp(SQUARE).extract(FACE).resize(size, size).composite([{ input: circle(size), blend: "dest-in" }]);
  const png = { palette: true, effort: 10, compressionLevel: 9 };
  if (!background) return img.png(png).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: await img.png().toBuffer() }])
    .png(png)
    .toBuffer();
}

/** ICO with PNG payloads (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4); // colour planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

/** Lays text out as SVG paths (no system fonts needed), wrapping at maxWidth. */
function textPaths(font, text, { x, y, size, lineHeight, maxWidth, fill }) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (line && font.getAdvanceWidth(next, size) > maxWidth) {
      lines.push(line);
      line = w;
    } else line = next;
  }
  lines.push(line);
  const d = lines.map((l, i) => font.getPath(l, x, y + i * lineHeight, size).toPathData(2)).join(" ");
  return { svg: `<path d="${d}" fill="${fill}"/>`, height: lines.length * lineHeight };
}

async function socialImage() {
  const W = 1200;
  const H = 630;
  const PHOTO_W = 520;
  const medium = opentype.parse((await readFile(r("node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf"))).buffer);
  const regular = opentype.parse((await readFile(r("node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf"))).buffer);

  const photo = await sharp(ORIGINAL).extract(PORTRAIT).resize(PHOTO_W, H).greyscale().toBuffer();

  const x = PHOTO_W + 72;
  const maxWidth = W - x - 72;
  const name = textPaths(medium, NAME, { x, y: 0, size: 60, lineHeight: 70, maxWidth, fill: TEXT_PRIMARY });
  const role = textPaths(regular, ROLE, { x, y: 0, size: 28, lineHeight: 40, maxWidth, fill: TEXT_SECONDARY });
  // Vertically centre the block (cap height ≈ 0.7 em sits above the first baseline).
  const block = name.height + 20 + role.height;
  const top = (H - block) / 2 + 48;
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 ${top})">${name.svg}</g>
    <g transform="translate(0 ${top + name.height + 20})">${role.svg}</g>
  </svg>`;

  return sharp({ create: { width: W, height: H, channels: 3, background: PAGE } })
    .composite([{ input: photo, left: 0, top: 0 }, { input: Buffer.from(svg) }])
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(r("public/avatar"), { recursive: true });
  for (const size of [96, 192]) {
    const img = sharp(SQUARE).resize(size, size);
    await img.clone().avif({ quality: 60 }).toFile(r(`public/avatar/avatar-${size}.avif`));
    await img.clone().webp({ quality: 82 }).toFile(r(`public/avatar/avatar-${size}.webp`));
  }

  await writeFile(r("src/app/icon.png"), await face(512));
  await writeFile(r("src/app/apple-icon.png"), await face(180, PAGE)); // iOS shows transparency as black
  const sizes = [16, 32, 48];
  await writeFile(r("src/app/favicon.ico"), ico(await Promise.all(sizes.map(async (size) => ({ size, data: await face(size) })))));

  const og = await socialImage();
  if (og.length > 300 * 1024) throw new Error(`Social image is ${Math.round(og.length / 1024)} KB (limit 300 KB)`);
  await writeFile(r("src/app/opengraph-image.png"), og);
  await writeFile(r("src/app/twitter-image.png"), og);
  console.log(`avatar, icons and social image written (og ${Math.round(og.length / 1024)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
