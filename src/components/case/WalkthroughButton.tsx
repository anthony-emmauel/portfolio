"use client";

import { useEffect, useRef, useState } from "react";

type Links = { email: string; mailto: string; gmail: string };

/**
 * "Request a walkthrough": a mailto link that, with JS, opens a small menu —
 * mail app, Gmail in the browser, or copy the address — because desktop
 * browsers silently ignore mailto: when no mail app is configured.
 */
export function WalkthroughButton({
  links,
  className,
  children,
  align = "start",
}: {
  links: Links;
  className: string;
  children: React.ReactNode;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        trigger.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => !root.current?.contains(e.target as Node) && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    root.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
    } catch {
      window.prompt("Copy my email address:", links.email);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const item = "flex w-full items-center justify-between gap-4 px-3.5 py-2.5 text-left text-[13px] text-primary hover:bg-sunken focus:bg-sunken focus:outline-none";

  return (
    <div ref={root} className="relative shrink-0">
      <a
        ref={trigger}
        href={links.mailto}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        className={className}
      >
        {children}
      </a>
      {open && (
        <div
          role="menu"
          aria-label="Request a walkthrough"
          className={`absolute top-full z-30 mt-1.5 w-60 overflow-hidden rounded-[4px] border border-subtle bg-surface py-1 shadow-sheet ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          <a role="menuitem" href={links.mailto} onClick={() => setOpen(false)} className={item}>
            Open email app
          </a>
          <a role="menuitem" href={links.gmail} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={item}>
            Write in Gmail <span aria-hidden>↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button role="menuitem" type="button" onClick={copy} className={`${item} flex-col !items-start !gap-0.5`}>
            <span>{copied ? "Copied ✓" : "Copy email address"}</span>
            <span className="font-mono text-[11px] text-tertiary">{links.email}</span>
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? "Email address copied" : ""}
          </span>
        </div>
      )}
    </div>
  );
}
