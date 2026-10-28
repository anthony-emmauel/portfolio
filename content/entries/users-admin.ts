import type { ExplorationEntry } from "../types";

const entry: ExplorationEntry = {
  type: "exploration",
  slug: "users-admin",
  kind: "dashboard",
  title: "Blocks 01 · Users admin",
  date: "2026-10-28",
  summary:
    "An admin-centre users screen built only from NokGridCore parts: sidebar nav, command bar and a users table with search, filters and row selection. Light and dark.",
  summaryShort: "An admin users screen built only from NokGridCore parts.",
  role: "Design + build · NokGridCore blocks",
  tag: "NOKGRID",
  cover: "/work/users-admin/poster.png",
  coverVideo: { src: "/work/users-admin/cover" },
  media: "live",
  links: { live: "https://nokgrid-blocks.netlify.app/blocks/users-admin" },
  modal: {
    context: "An admin users screen built only from NokGridCore parts. Try the filter, search and row selection.",
    contextShort: "Built only from NokGridCore parts. Try the filter and selection.",
    titleShort: "Users admin",
  },
};
export default entry;
