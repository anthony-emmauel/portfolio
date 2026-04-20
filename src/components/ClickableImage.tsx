"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface Props {
  src: string;
  alt?: string;
  height?: string;
  className?: string;
}

export default function ClickableImage({ src, alt = "", className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const openLightbox = () => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const closeLightbox = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 180);
  };

  // Escape key
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  // Scale-in thumbnail on scroll
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.style.opacity = "0";
    el.style.transform = "scale(0.97)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
          setTimeout(() => { el.style.transform = ""; }, 550);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lightbox = mounted ? (
    // Backdrop — clicking it closes the lightbox
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm cursor-zoom-out ${
        visible ? "lightbox-backdrop-in" : "lightbox-backdrop-out"
      }`}
      onClick={closeLightbox}
    >
      {/* Close button */}
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-5 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white text-xl transition-colors rounded-full hover:bg-white/10 z-10"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Image — stopPropagation here so only clicking outside closes */}
      <div
        className={`flex items-center justify-center ${visible ? "lightbox-image-in" : "lightbox-image-out"}`}
        style={{ width: "min(90vw, 1200px)", height: "min(88vh, 900px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          className="cursor-default"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: "8px",
            display: "block",
          }}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        onClick={openLightbox}
        onKeyDown={(e) => e.key === "Enter" && openLightbox()}
        className={`w-full rounded-[6px] overflow-hidden cursor-zoom-in ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={900}
          quality={100}
          className="w-full h-auto block"
        />
      </div>

      {typeof document !== "undefined" && mounted
        ? createPortal(lightbox, document.body)
        : null}
    </>
  );
}
