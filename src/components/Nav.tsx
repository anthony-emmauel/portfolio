"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-white"
        >
          EA
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xs tracking-widest text-white/70 hover:text-white transition-colors">
            WORK
          </Link>
          <Link href="/about" className="text-xs tracking-widest text-white/70 hover:text-white transition-colors">
            ABOUT
          </Link>
          <a
            href="mailto:antorneejnr@gmail.com"
            className="text-xs tracking-widest text-white/70 hover:text-white transition-colors"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}
