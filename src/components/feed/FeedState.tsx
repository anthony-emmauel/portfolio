"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_FILTER, FILTERS, type FilterId } from "@/lib/feed";

type Ctx = { filter: FilterId; setFilter: (f: FilterId, opts?: { scroll?: boolean }) => void };
const FeedContext = createContext<Ctx | null>(null);

const isFilter = (v: string | null): v is FilterId => FILTERS.some((f) => f.id === v);

/**
 * Current filter. Case studies on load; `?show=<filter>` makes any view
 * shareable. The URL is updated with replaceState so filters don't pile up in
 * history.
 */
export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [filter, setState] = useState<FilterId>(DEFAULT_FILTER);

  useEffect(() => {
    const show = new URLSearchParams(window.location.search).get("show");
    if (isFilter(show)) setState(show);
  }, []);

  const setFilter = useCallback<Ctx["setFilter"]>((f, opts) => {
    setState(f);
    const url = new URL(window.location.href);
    if (f === DEFAULT_FILTER) url.searchParams.delete("show");
    else url.searchParams.set("show", f);
    window.history.replaceState(window.history.state, "", url);
    if (opts?.scroll) {
      const main = document.getElementById("main");
      main?.scrollIntoView({ block: "start" });
      main?.focus({ preventScroll: true });
    }
  }, []);

  return <FeedContext.Provider value={{ filter, setFilter }}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const ctx = useContext(FeedContext);
  if (!ctx) throw new Error("useFeed must be used inside <FeedProvider>");
  return ctx;
}
