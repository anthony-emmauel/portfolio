"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site } from "@content/site";
import { ACCENTS, RADIUS_MAX, RADIUS_MIN, type MotionPref, type ThemePref } from "@/lib/appearance";
import { useAppearance } from "./AppearanceProvider";

const THEMES: { id: ThemePref; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "auto", label: "Auto" },
];

// Off is the pause control for the looping covers and the intro (WCAG 2.2.2).
const MOTION: { id: MotionPref; label: string }[] = [
  { id: "on", label: "On" },
  { id: "off", label: "Off" },
];

/** Segmented radio group (Figma "Theme segment"). */
function Segmented<T extends string>({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <span id={`${name}-label`}>
        <FieldLabel label={label} />
      </span>
      <div role="radiogroup" aria-labelledby={`${name}-label`} className="flex w-full gap-0.5 rounded-[8px] bg-sunken p-[3px]">
        {options.map((o) => (
          <label key={o.id} className="flex-1 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={value === o.id}
              onChange={() => onChange(o.id)}
              className="peer sr-only"
            />
            <span className="flex justify-center rounded-[6px] py-[5px] text-[0.75rem] text-tertiary peer-checked:bg-surface peer-checked:font-medium peer-checked:text-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function AccentDot() {
  return <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />;
}

function FieldLabel({ label, value }: { label: string; value?: string }) {
  return (
    <span className="flex w-full items-start justify-between font-mono text-[0.625rem]">
      <span className="tracking-[0.2px] text-tertiary">{label}</span>
      {value && <span className="text-primary">{value}</span>}
    </span>
  );
}

/** The widget controls. `track` differs between the sidebar card and the sheet in Figma. */
function Controls({ track }: { track: "subtle" | "strong" }) {
  const { appearance, update, reset } = useAppearance();
  const name = useId();
  const accent = ACCENTS.find((a) => a.id === appearance.accent) ?? ACCENTS[0];
  const pct = (appearance.radius - RADIUS_MIN) / (RADIUS_MAX - RADIUS_MIN);

  return (
    <div className="flex w-full flex-col gap-3.5">
      <div className="flex w-full items-center justify-between">
        <h2 className="flex items-center gap-2 text-[0.8125rem] font-medium text-primary">
          <AccentDot />
          Make it yours
        </h2>
        <button
          type="button"
          onClick={reset}
          className="font-mono text-[0.625rem] tracking-[0.2px] text-tertiary hover:text-primary"
        >
          RESET
        </button>
      </div>

      <div className="flex w-full flex-col gap-1.5">
        <span id={`${name}-accent-label`}>
          <FieldLabel label="ACCENT" value={accent.label.toUpperCase()} />
        </span>
        <div role="radiogroup" aria-labelledby={`${name}-accent-label`} className="flex gap-1.5">
          {ACCENTS.map((a) => (
            <label key={a.id} className="relative size-[30px] cursor-pointer">
              <input
                type="radio"
                name={`${name}-accent`}
                value={a.id}
                checked={appearance.accent === a.id}
                onChange={() => update({ accent: a.id })}
                className="peer sr-only"
              />
              <span className="sr-only">{a.label}</span>
              <span
                aria-hidden
                className="absolute inset-0 rounded-full border-[1.5px] border-transparent peer-checked:border-[color:var(--text-primary)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
              />
              <span
                aria-hidden
                className="absolute inset-1 rounded-full"
                style={{ background: a.swatch }}
              />
            </label>
          ))}
        </div>
      </div>

      <label className="flex w-full flex-col gap-1.5">
        <FieldLabel label="RADIUS" value={`${appearance.radius}PX`} />
        <input
          type="range"
          min={RADIUS_MIN}
          max={RADIUS_MAX}
          step={1}
          value={appearance.radius}
          onChange={(e) => update({ radius: Number(e.target.value) })}
          aria-valuetext={`${appearance.radius} pixels`}
          className="eb-range"
          style={
            {
              "--fill": `calc(9px + (100% - 18px) * ${pct})`,
              "--range-track": track === "strong" ? "var(--border-strong)" : "var(--border-subtle)",
            } as React.CSSProperties
          }
        />
      </label>

      <Segmented
        name={`${name}-theme`}
        label="THEME"
        options={THEMES}
        value={appearance.theme}
        onChange={(theme) => update({ theme })}
      />
      <Segmented
        name={`${name}-motion`}
        label="MOTION"
        options={MOTION}
        value={appearance.motion}
        onChange={(motion) => update({ motion })}
      />
    </div>
  );
}

/** Desktop: card in the sidebar, under the filters. */
export function MakeItYoursCard() {
  return (
    <section aria-label="Make it yours" className="flex w-full flex-col gap-2">
      <div className="w-full rounded-[14px] border border-subtle bg-surface px-4 py-3.5">
        <Controls track="strong" />
      </div>
      <p className="font-mono text-[0.5625rem] tracking-[0.18px] text-tertiary">{site.credit.long}</p>
    </section>
  );
}

/** Mobile: collapsed row that opens a bottom sheet. */
export function MakeItYoursCollapsed() {
  const { appearance } = useAppearance();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-[12px] border border-subtle bg-surface py-2.5 pl-3.5 pr-2.5 text-left"
      >
        <span className="flex flex-col gap-0.5">
          <span className="flex items-center gap-2 text-[0.8125rem] font-medium text-primary">
            <AccentDot />
            Make it yours
          </span>
          <span className="font-mono text-[0.5625rem] tracking-[0.09px] text-tertiary">
            {site.credit.short}
          </span>
        </span>
        <span aria-hidden className="flex items-center gap-0.5">
          {ACCENTS.map((a) => (
            <span
              key={a.id}
              className={`relative size-6 rounded-full border-[1.5px] ${
                appearance.accent === a.id ? "border-[color:var(--text-primary)]" : "border-transparent"
              }`}
            >
              <span className="absolute inset-[2.5px] rounded-full" style={{ background: a.swatch }} />
            </span>
          ))}
        </span>
      </button>
      <BottomSheet
        open={open}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      />
    </>
  );
}

function BottomSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label="Make it yours"
      onClose={onClose}
      onClick={(e) => {
        // A click on the <dialog> itself (not its contents) is a click on the backdrop.
        if (e.target === e.currentTarget) onClose();
      }}
      className="sheet-in fixed inset-x-0 bottom-0 top-auto m-0 w-full max-w-none rounded-t-[20px] bg-surface p-0 text-primary shadow-sheet backdrop:bg-scrim"
    >
      <div className="flex flex-col items-center gap-3.5 px-5 pb-[34px] pt-2.5">
        <span aria-hidden className="h-1 w-10 rounded-[2px] bg-line-strong" />
        <div className="w-full py-3.5">
          <Controls track="subtle" />
        </div>
        <p className="font-mono text-[0.5625rem] tracking-[0.18px] text-tertiary">{site.credit.long}</p>
      </div>
    </dialog>
  );
}
