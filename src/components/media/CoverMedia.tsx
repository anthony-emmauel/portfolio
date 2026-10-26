"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
 * Animated cover: poster image (always rendered — it's what LCP and
 * reduced-motion users see) with a muted looping video faded in on top once it
 * plays. A shared controller lets at most MAX_PLAYING covers play, preferring
 * the most visible ones, and pauses everything while the tab is hidden.
 */

const MAX_PLAYING = 2;

type Player = { video: HTMLVideoElement; ratio: number; start: number; started: boolean };
const players = new Set<Player>();

function schedule() {
  const hidden = document.visibilityState === "hidden";
  const ranked = [...players].filter((p) => p.ratio > 0.25).sort((a, b) => b.ratio - a.ratio);
  const allowed = new Set(hidden ? [] : ranked.slice(0, MAX_PLAYING));
  for (const p of players) {
    if (allowed.has(p)) {
      if (p.video.preload !== "auto") p.video.preload = "auto";
      if (!p.started && p.video.readyState >= 1) {
        p.video.currentTime = p.start;
        p.started = true;
      }
      if (p.video.paused) void p.video.play().catch(() => {});
    } else if (!p.video.paused) {
      p.video.pause();
    }
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", schedule);
}

export function CoverMedia({
  poster,
  video,
  startAt = 0,
  priority = false,
  sizes,
  className = "",
}: {
  poster: string;
  /** Path without extension; `.webm` and `.mp4` must exist next to it. */
  video?: string;
  /** Seconds into the loop that match the poster (the resting state). */
  startAt?: number;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOK(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK || !video) return;
    const player: Player = { video: el, ratio: 0, start: startAt, started: false };
    players.add(player);
    const io = new IntersectionObserver(
      ([e]) => {
        player.ratio = e.isIntersecting ? e.intersectionRatio : 0;
        schedule();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    io.observe(el);
    const onMeta = () => schedule();
    el.addEventListener("loadedmetadata", onMeta);
    return () => {
      io.disconnect();
      el.removeEventListener("loadedmetadata", onMeta);
      el.pause();
      players.delete(player);
      schedule();
    };
  }, [motionOK, video, startAt]);

  return (
    <div aria-hidden className={`absolute inset-0 ${className}`}>
      <Image src={poster} alt="" fill priority={priority} sizes={sizes} className="object-cover" />
      {video && motionOK && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-200 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={`${video}.webm`} type="video/webm" />
          <source src={`${video}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
