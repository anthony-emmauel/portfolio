"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/images/about/about image right - 1.png",
    label: "Location",
    line1: "Cais Do Sodré",
    line2: "Lisbon, Portugal",
  },
  {
    src: "/images/about/about image right - 2.png",
    label: "Location",
    line1: "Lisbon Eco Marathon 2026",
    line2: "Parque Eduardo VII, Portugal",
  },
];

export default function AboutRightImage() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <div className="flex flex-col gap-8">
      {/* Image */}
      <div
        className="relative w-full rounded-[4px] overflow-hidden cursor-pointer h-[320px] md:h-[545px]"
        onClick={() => {
          setFading(true);
          setTimeout(() => {
            setActive((prev) => (prev + 1) % slides.length);
            setFading(false);
          }, 300);
        }}
      >
        <Image
          src={slide.src}
          alt={slide.line1}
          fill
          quality={100}
          className="object-cover transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        />
      </div>

      {/* Location badge */}
      <div
        className="flex flex-col gap-3 pl-5 py-3 border-l-2 border-[#262626]"
        style={{ transition: "opacity 0.3s", opacity: fading ? 0 : 1 }}
      >
        <p className="text-[10px] font-semibold tracking-[1px] uppercase text-white/80">
          {slide.label}
        </p>
        <div className="flex flex-col gap-0.5">
          <p className="text-[12px] font-medium tracking-[0.9px] capitalize text-white/80">
            {slide.line1}
          </p>
          <p className="text-[12px] font-medium tracking-[0.9px] capitalize text-white/80">
            {slide.line2}
          </p>
        </div>
      </div>
    </div>
  );
}
