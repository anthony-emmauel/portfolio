import type { ReleaseEntry } from "../types";

const entry: ReleaseEntry = {
  type: "release",
  slug: "onecart",
  kind: "e-commerce",
  title: "OneCart",
  date: "2022-06-01",
  datePrecision: "year",
  nda: true,
  summary: "Discovery and order transparency for a multi-store grocery marketplace.",
  summaryShort: "Discovery and order transparency for a grocery marketplace.",
  role: "Lead product designer · research, discovery, order tracking",
  tag: "+27% RETURNING USERS",
  cover: "/work/onecart/poster.png",
  coverVideo: { src: "/work/onecart/cover", startAt: 6 },
  diff: [
    { sign: "+", text: "29% customer growth · 18% revenue (YoY)" },
    { sign: "-", text: "“where is my order?” tickets" },
  ],
};
export default entry;
