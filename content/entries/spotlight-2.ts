import type { ReleaseEntry } from "../types";

const entry: ReleaseEntry = {
  type: "release",
  slug: "spotlight-2",
  kind: "internal tool",
  title: "Spotlight 2.0",
  date: "2025-09-01",
  datePrecision: "year",
  nda: true,
  summary:
    "Internal OMS for 100+ agents monitoring 20,000+ orders a day, rebuilt around clear order status.",
  summaryShort: "Internal OMS for 100+ agents monitoring 20,000+ orders a day.",
  role: "Lead product designer · research with 35 ops users, status model, IA",
  tag: "IN BUILD",
  cover: "/work/spotlight-2/poster.png",
  coverVideo: { src: "/work/spotlight-2/cover", startAt: 2 },
  diffLabel: "PHASE 1 SCOPE",
  diff: [
    { sign: "+", text: "live order list, no manual refresh" },
    { sign: "+", text: "confirmation before cancel and reset" },
    { sign: "+", text: "role-based views" },
    { sign: "-", text: "“Completed Late” confusion" },
  ],
};
export default entry;
