"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TIMEOUT_MS = 4000;

/**
 * A live site in a browser-chrome frame. The iframe only exists while the modal
 * is open; the cover poster shows until it loads, and stays (with an "Open live
 * site" button) if it errors or takes longer than ~4s.
 */
export function LiveFrame({ url, poster, title }: { url: string; poster: string; title: string }) {
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");
  const host = new URL(url).host;

  useEffect(() => {
    setState("loading");
    const t = setTimeout(() => setState((s) => (s === "loading" ? "failed" : s)), TIMEOUT_MS);
    return () => clearTimeout(t);
  }, [url]);

  return (
    <div className="flex h-full min-h-0 flex-col gap-2.5 lg:gap-0 lg:overflow-hidden lg:rounded-[4px] lg:border lg:border-subtle">
      {/* Desktop: browser chrome. Mobile: compact URL pill. */}
      <div className="hidden items-center gap-2.5 bg-sunken px-3 py-2 lg:flex">
        <span aria-hidden className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-[7px] rounded-full bg-line-strong" />
          ))}
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-eb bg-surface px-2.5 py-[5px] font-mono">
          <span aria-hidden className="text-[0.5625rem] text-tertiary">
            🔒
          </span>
          <span className="truncate text-[0.6875rem] text-secondary">{host}</span>
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.1px] text-secondary">
          <span aria-hidden className="size-[7px] rounded-full bg-live" />
          LIVE · SCROLL AND CLICK
        </span>
      </div>
      <div className="flex items-center gap-2 self-start rounded-eb bg-surface px-2.5 py-1.5 font-mono text-[0.625rem] text-secondary lg:hidden">
        <span aria-hidden className="size-[7px] rounded-full bg-live" />
        {host}
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[4px] border border-subtle bg-page lg:rounded-none lg:border-0">
        {state !== "failed" && (
          <iframe
            src={url}
            title={`${title} — live site`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            onLoad={() => setState("ready")}
            onError={() => setState("failed")}
            className={`absolute inset-0 size-full border-0 bg-page transition-opacity duration-300 ${
              state === "ready" ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {state !== "ready" && (
          <div className="absolute inset-0">
            <Image src={poster} alt="" fill sizes="(min-width: 1024px) 1152px, 100vw" className="object-cover object-top" />
            {state === "failed" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-page/80 p-6 text-center">
                <p className="text-[0.8125rem] text-secondary">The live preview didn&apos;t load here.</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-eb bg-accent px-3.5 py-[9px] text-[0.8125rem] font-medium text-accent-on"
                >
                  Open live site <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
