import type { ExplorationEntry } from "../types";

const entry: ExplorationEntry = {
  type: "exploration",
  slug: "blocks-index",
  kind: "landing page",
  title: "Block index",
  date: "2026-11-02",
  summary:
    "The home of NokGridCore Blocks: a library of blocks generated from a registry, with tag filters and a live preview of each block, built only from NokGridCore parts. Light and dark.",
  summaryShort: "The NokGridCore Blocks library, with tag filters and live previews.",
  role: "Design + build · NokGridCore blocks",
  tag: "NOKGRID",
  cover: "/work/blocks-index/poster.png",
  coverVideo: { src: "/work/blocks-index/cover" },
  media: "live",
  links: { live: "https://blocks.nokgrid.com/" },
  modal: {
    context: "The NokGridCore Blocks library. Filter by tag, then open a block to try it live.",
    contextShort: "Filter by tag, then open a block to try it live.",
    titleShort: "Block index",
  },
};
export default entry;
