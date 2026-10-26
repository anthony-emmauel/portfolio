import type { DiffLine } from "../types";

// A case study is a list of numbered sections built from these blocks.
// Copy is taken verbatim from Figma ("v2.3 · Case studies (NDA)").

export type Block =
  | { type: "p"; text: string; /** 17px lead paragraph instead of 15px body */ lead?: boolean }
  | { type: "rows"; label?: string; rows: { title: string; text: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "chips"; label?: string; items: string[] }
  | { type: "decision"; decision: string; rejected: string; why: string }
  | { type: "pipeline"; steps: { label: string; value: string }[] }
  | { type: "outcomes"; label: string; items: { value: string; label: string }[]; note?: string }
  | { type: "checklist"; items: { title: string; detail: string }[] }
  | { type: "quote"; text: string }
  | { type: "grid"; items: { eyebrow: string; title: string; text: string }[] }
  | {
      type: "diagram";
      diagram: "status-badges";
      before: { label: string; chip: string };
      status: { label: string; flow: string[] };
      badges: { label: string; items: string[] };
      foot: string;
    }
  | {
      type: "diagram";
      diagram: "values-to-token";
      before: { label: string; items: { name: string; value: string }[] };
      after: { label: string; token: string; swatch: string; alias: string; usedBy: string };
      foot: string;
    }
  | {
      type: "diagram";
      diagram: "events-to-stages";
      head: [string, string];
      rows: { events: string; stage: string; flag?: string }[];
      foot: string;
    };

export type Section = { id: string; title: string; blocks: Block[] };

export type CaseStudy = {
  /** Must match a release in content/entries/. */
  slug: string;
  lede: string;
  tags: string[];
  /** Sidebar (desktop) / bottom (mobile) facts. */
  meta: { label: string; value: string; /** green status dot, e.g. "In build" */ live?: boolean }[];
  /** NDA studies show the fixed NDA line; open ones say their own thing with links. */
  notice: { tag: string; text?: string; links?: { label: string; href: string }[] };
  hero: { src: string; alt: string };
  glance: { label: string; diff: DiffLine[] };
  sections: Section[];
  cta: { title: string; text: string; button: { label: string; href: string; external?: boolean } };
};
