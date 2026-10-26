import type { ReleaseEntry } from "../types";

const entry: ReleaseEntry = {
  type: "release",
  slug: "nokgridcore",
  kind: "open source",
  title: "NokGridCore 1.0",
  date: "2026-10-01",
  summary:
    "Open-source design system for data-heavy dashboards. 69 components and 400+ tokens, built from an audit of 25+ products.",
  summaryShort: "Open-source design system for data-heavy dashboards. 69 components, 400+ tokens.",
  role: "Design lead · research, tokens, Figma library · built the landing page",
  tag: "69 COMPONENTS",
  cover: "/work/nokgridcore/poster.png",
  coverVideo: { src: "/work/nokgridcore/cover", startAt: 2 },
  diff: [
    { sign: "+", text: "69 components, 400+ tokens, light and dark" },
    { sign: "+", text: "full ops dashboard built only from its parts →" },
    { sign: "-", text: "guessing which components dashboards need" },
  ],
};
export default entry;
