import type { Entry, EntryType } from "@content/types";

// Pure helpers shared by server and client. No content imports here, so client
// components can use them without bundling the data.

export type FilterId = "case-studies" | "explorations" | "writing" | "notes" | "everything";

export const FILTERS: { id: FilterId; label: string; heading: string; type?: EntryType }[] = [
  { id: "case-studies", label: "Case studies", heading: "case studies", type: "release" },
  { id: "explorations", label: "Explorations", heading: "explorations", type: "exploration" },
  { id: "writing", label: "Writing", heading: "writing", type: "writing" },
  { id: "notes", label: "Notes", heading: "notes from teammates", type: "note" },
  { id: "everything", label: "Everything", heading: "everything" },
];

export const DEFAULT_FILTER: FilterId = "case-studies";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
export function formatEntryDate(e: Pick<Entry, "date" | "datePrecision">) {
  const d = new Date(e.date);
  return e.datePrecision === "year" ? `${d.getUTCFullYear()}` : `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
