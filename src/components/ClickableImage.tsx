"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  height?: string;
  className?: string;
}

export default function ClickableImage({ src, alt = "", height = "387px", className = "" }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        className={`w-full rounded-[6px] overflow-hidden relative cursor-zoom-in ${className}`}
        style={{ height }}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
          onClick={() => setOpen(false)}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-6 text-white/60 hover:text-white text-2xl leading-none transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="relative w-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1440}
              height={900}
              className="object-contain w-full h-auto max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
