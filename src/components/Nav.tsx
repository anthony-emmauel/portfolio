"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" onClick={close} className="text-sm font-bold tracking-tight text-white link-hover">
            EA
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-xs tracking-widest text-white/70 link-hover">WORK</Link>
            <Link href="/about" className="text-xs tracking-widest text-white/70 link-hover">ABOUT</Link>
            <a href="mailto:antorneejnr@gmail.com" className="text-xs tracking-widest text-white/70 link-hover">CONTACT</a>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 -mr-2"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/" onClick={close} className="text-2xl tracking-widest text-white/70 link-hover">WORK</Link>
        <Link href="/about" onClick={close} className="text-2xl tracking-widest text-white/70 link-hover">ABOUT</Link>
        <a href="mailto:antorneejnr@gmail.com" onClick={close} className="text-2xl tracking-widest text-white/70 link-hover">CONTACT</a>
      </div>
    </>
  );
}
