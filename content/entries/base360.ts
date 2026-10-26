import type { ExplorationEntry } from "../types";

const entry: ExplorationEntry = {
  type: "exploration",
  slug: "base360",
  kind: "landing page",
  title: "Base360",
  date: "2026-10-15",
  summary:
    "A landing page for a social-commerce inbox: one comment to a closed customer. Designed in Figma, then built and animated with AI.",
  summaryShort: "A landing page for a social-commerce inbox, designed in Figma and built with AI.",
  role: "Design + build · Figma to a live site",
  tag: "LIVE SITE",
  cover: "/work/base360/poster.png",
  coverVideo: { src: "/work/base360/cover", startAt: 0.5 },
  media: "live",
  links: { live: "https://visionary-pegasus-d7362a.netlify.app/" },
  modal: {
    context: "Landing page for a social-commerce inbox. Designed in Figma, then built and animated with AI.",
    contextShort: "Designed in Figma, then built and animated with AI.",
  },
};
export default entry;
