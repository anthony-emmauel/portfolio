import type { ReleaseEntry } from "../types";

const entry: ReleaseEntry = {
  type: "release",
  slug: "systemone",
  kind: "design system",
  title: "SystemOne",
  date: "2025-04-01",
  datePrecision: "year",
  bump: "major",
  nda: true,
  summary: "OneCart's internal design system. One token pipeline theming three platforms.",
  summaryShort: "OneCart's internal design system. One token pipeline, three platforms.",
  role: "Initiated and led · audit, token architecture, rollout",
  tag: "225+ TOKENS",
  cover: "/work/systemone/poster.png",
  diff: [
    { sign: "+", text: "adopted by the OneCart product team" },
    { sign: "-", text: "3 different hex values for “primary”" },
  ],
};
export default entry;
