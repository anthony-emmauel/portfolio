import type { ExplorationEntry, Versioned } from "@content/types";
import { entries } from "./entries";

/** Explorations in feed order (newest first) — the order ← → steps through. */
export const explorations = entries.filter((e): e is Versioned<ExplorationEntry> => e.type === "exploration");

export const getExploration = (slug: string) => explorations.find((e) => e.slug === slug);
