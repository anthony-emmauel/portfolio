"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// TODO(v2.3): Figma shows only the closed MENU label — contents are pending
// confirmation. For now it lists the pages that aren't reachable from the home feed.
const ITEMS = [{ label: "About", href: "/about" }];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div ref={root} className="relative shrink-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="font-mono text-[0.6875rem] tracking-[0.22px] text-primary"
      >
        MENU
      </button>
      {open && (
        <ul
          id="mobile-menu"
          className="absolute right-0 top-full z-20 mt-2 min-w-32 rounded-eb border border-subtle bg-surface py-1"
        >
          {ITEMS.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="block px-3 py-2 text-[0.8125rem] text-primary hover:bg-sunken">
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
