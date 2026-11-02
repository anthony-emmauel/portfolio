import type { ExplorationEntry } from "../types";

const entry: ExplorationEntry = {
  type: "exploration",
  slug: "ai-resume-builder",
  kind: "product flow",
  title: "Blocks 02 · AI resume builder",
  date: "2026-10-30",
  summary:
    "An AI resume builder built only from NokGridCore parts: six screens (dashboard, sample library, job search, editor, review and settings) and an Upgrade to Pro modal. Light and dark.",
  summaryShort: "A six-screen AI resume builder built only from NokGridCore parts.",
  role: "Design + build · NokGridCore blocks",
  tag: "NOKGRID",
  cover: "/work/ai-resume-builder/poster.png",
  coverVideo: { src: "/work/ai-resume-builder/cover" },
  media: "live",
  links: { live: "https://blocks.nokgrid.com/blocks/ai-resume-builder" },
  modal: {
    context: "An AI resume builder built only from NokGridCore parts. Use the sidebar to move between screens; Pro items open the upgrade modal.",
    contextShort: "Six screens from NokGridCore parts. Use the sidebar to switch.",
    titleShort: "AI resume builder",
  },
};
export default entry;
