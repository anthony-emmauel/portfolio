import type { CaseStudy } from "@content/case-studies/types";
import type { ReleaseEntry, Versioned } from "@content/types";
import { entries } from "./entries";

// Every content/case-studies/<slug>.ts (except helpers) is a case study.
const ctx = require.context("../../content/case-studies", false, /^\.\/(?!types|walkthrough)[\w-]+\.ts$/);
const studies: CaseStudy[] = ctx.keys().map((k) => (ctx(k) as { default: CaseStudy }).default);

/** Releases, newest first — the order case studies are read in. */
const releases = entries.filter((e): e is Versioned<ReleaseEntry> => e.type === "release");

for (const s of studies) {
  if (!releases.some((r) => r.slug === s.slug)) {
    throw new Error(`content/case-studies/${s.slug}.ts has no matching release in content/entries/`);
  }
}

export type NavLink = { label: string; title: string; href: string };

export type ResolvedCaseStudy = CaseStudy & {
  entry: Versioned<ReleaseEntry>;
  prev: NavLink;
  next: NavLink;
};

export const caseStudySlugs = () => studies.map((s) => s.slug);

export function getCaseStudy(slug: string): ResolvedCaseStudy | undefined {
  const study = studies.find((s) => s.slug === slug);
  if (!study) return undefined;
  const i = releases.findIndex((r) => r.slug === slug);
  const newer = releases[i - 1];
  const older = releases[i + 1];
  return {
    ...study,
    entry: releases[i],
    prev: newer
      ? { label: `← NEWER · ${newer.version}`, title: newer.title, href: `/work/${newer.slug}` }
      : { label: "← BACK", title: "Changelog", href: "/" },
    next: older
      ? { label: `OLDER · ${older.version} →`, title: older.title, href: `/work/${older.slug}` }
      : { label: "END OF CHANGELOG →", title: "Back to everything", href: "/?show=everything" },
  };
}
