import type { ExplorationEntry } from "../types";

const entry: ExplorationEntry = {
  type: "exploration",
  slug: "store-ops-dashboard",
  kind: "dashboard",
  title: "Store operations dashboard",
  date: "2026-10-01",
  summary:
    "A full ops dashboard built only from NokGridCore parts: KPIs, charts, tables and attention lists. Light and dark.",
  summaryShort: "A full ops dashboard built only from NokGridCore parts.",
  role: "Design · built with NokGridCore",
  tag: "NOKGRID",
  cover: "/work/store-ops-dashboard/poster.png",
  media: "image",
  links: { caseStudy: "/work/nokgridcore" },
  modal: {
    context: "A full ops dashboard built only from NokGridCore parts: KPIs, charts, tables and attention lists.",
    contextShort: "Built only from NokGridCore parts. Pinch to zoom, drag to pan.",
    titleShort: "Store ops dashboard",
    footer: "Design · built with NokGridCore · light + dark",
    images: {
      light: "/work/store-ops-dashboard/dashboard-light.png",
      dark: "/work/store-ops-dashboard/dashboard-dark.png",
      width: 2100,
      height: 1677,
    },
  },
};
export default entry;
