// Shape of everything in content/. Add work by adding a file to content/entries/
// (see `npm run new`); versions and filter counts are derived, never typed.

export type EntryType = "release" | "exploration" | "writing" | "note";

/** How the version moves when this entry lands. Defaults: release → minor, everything else → patch. */
export type Bump = "major" | "minor" | "patch";

export type DiffLine = { sign: "+" | "-"; text: string };

type Base = {
  slug: string;
  title: string;
  /** ISO date. Only month or year is shown, per `datePrecision`. */
  date: string;
  datePrecision?: "month" | "year";
  bump?: Bump;
  tags?: string[];
};

export type ReleaseEntry = Base & {
  type: "release";
  /** e.g. "open source", "internal tool" — shown as "RELEASE · OPEN SOURCE". */
  kind: string;
  summary: string;
  /** Shorter copy for the 390px card, where Figma uses a trimmed line. */
  summaryShort?: string;
  role: string;
  tag: string;
  nda?: boolean;
  cover: string;
  diffLabel?: string;
  diff?: DiffLine[];
};

export type ExplorationEntry = Base & {
  type: "exploration";
  /** "landing page" | "dashboard" | "component" | "product flow" | "side project" … */
  kind: string;
  summary: string;
  summaryShort?: string;
  /** Shorter role for the compact mobile side-project card. */
  roleShort?: string;
  role: string;
  tag?: string;
  cover: string;
  /** live: built, shown in an iframe · image: design only, shown in an image viewer */
  media: "live" | "image";
  links?: { live?: string; caseStudy?: string };
};

export type WritingEntry = Base & {
  type: "writing";
  kind: "essay";
  excerpt: string;
  readingMinutes: number;
  url: string;
};

export type NoteEntry = Base & {
  type: "note";
  kind: "notes";
};

export type Entry = ReleaseEntry | ExplorationEntry | WritingEntry | NoteEntry;

/** What a file in content/entries/ exports. Writing comes from content/writing.json. */
export type EntryInput = ReleaseEntry | ExplorationEntry | NoteEntry;

export type Versioned<E extends Entry = Entry> = E & { version: string };

export type Note = { quote: string; name: string; role: string; company: string; linkedin?: string };
