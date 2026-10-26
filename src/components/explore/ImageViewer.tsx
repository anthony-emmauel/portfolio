"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Images = { light: string; dark?: string; width: number; height: number };

const MIN = 0.5;
const MAX = 4;
const STEP = 1.25;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const variant = (src: string, ext: string) => src.replace(/\.(png|jpe?g)$/i, `.${ext}`);

/**
 * High-res image viewer. 100% = image fits the viewer's height (on a phone that
 * means it pans horizontally, as in Figma). Zoom with the buttons, wheel/trackpad
 * pinch, or a two-finger pinch; drag to pan; full screen via the Fullscreen API.
 */
export function ImageViewer({ images, title, theme }: { images: Images; title: string; theme: "light" | "dark" }) {
  const [mode, setMode] = useState<"light" | "dark">(images.dark ? theme : "light");
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const src = mode === "dark" && images.dark ? images.dark : images.light;

  const zoom = useCallback((next: number) => {
    setScale(clamp(next, MIN, MAX));
  }, []);
  const fit = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // The modal resolves the site theme after mount; follow it when it arrives.
  useEffect(() => {
    if (images.dark) setMode(theme);
  }, [theme, images.dark]);

  // Keep the image from being dragged entirely out of view.
  useEffect(() => {
    if (scale <= 1) setOffset((o) => (o.y === 0 ? o : { ...o, y: 0 }));
  }, [scale]);

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return; // plain scroll stays scroll; pinch-zoom on trackpads sends ctrlKey
    e.preventDefault();
    zoom(scale * Math.exp(-e.deltaY / 200));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      zoom((pinch.current.scale * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.current.dist);
      return;
    }
    setOffset((o) => ({ x: o.x + e.clientX - prev.x, y: o.y + e.clientY - prev.y }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  const fullscreen = () => {
    const el = stage.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  };

  const btn = "flex size-[34px] items-center justify-center rounded-eb border border-subtle bg-surface text-[14px] text-primary hover:border-strong";

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 bg-stage">
      <div className="flex items-center justify-between">
        {images.dark ? (
          <div role="radiogroup" aria-label="Image theme" className="flex rounded-eb border border-subtle bg-surface p-[3px]">
            {(["light", "dark"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-eb px-3 py-[5px] text-[12px] font-medium ${
                  mode === m ? "bg-accent text-accent-on" : "text-secondary hover:text-primary"
                }`}
              >
                {m === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="hidden items-center gap-2 lg:flex">
          <output aria-live="polite" className="font-mono text-[11px] text-secondary">
            {Math.round(scale * 100)}%
          </output>
          <button type="button" aria-label="Zoom out" className={btn} onClick={() => zoom(scale / STEP)}>
            −
          </button>
          <button type="button" aria-label="Zoom in" className={btn} onClick={() => zoom(scale * STEP)}>
            +
          </button>
          <button type="button" aria-label="Fit" className={`${btn} w-auto px-2.5 font-mono text-[11px]`} onClick={fit}>
            FIT
          </button>
          <button type="button" aria-label="Full screen" className={btn} onClick={fullscreen}>
            ⤢
          </button>
        </div>
      </div>

      <div
        ref={stage}
        role="img"
        aria-label={`${title}, ${mode} theme. Drag to pan; pinch or use the zoom buttons to zoom.`}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => (scale === 1 ? zoom(2) : fit())}
        className="relative min-h-0 flex-1 cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
      >
        <picture>
          <source srcSet={variant(src, "avif")} type="image/avif" />
          <source srcSet={variant(src, "webp")} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-generated AVIF/WebP via <picture> */}
          <img
            src={src}
            alt=""
            width={images.width}
            height={images.height}
            draggable={false}
            className="absolute left-0 top-0 h-full w-auto max-w-none border border-subtle lg:left-1/2 lg:[--center:-50%]"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) translateX(var(--center, 0)) scale(${scale})`,
              transformOrigin: "center",
            }}
          />
        </picture>
      </div>
      <span aria-hidden className="self-start rounded-eb bg-surface px-2 py-1 font-mono text-[10px] tracking-[0.1px] text-secondary lg:hidden">
        DRAG TO PAN →
      </span>
    </div>
  );
}
