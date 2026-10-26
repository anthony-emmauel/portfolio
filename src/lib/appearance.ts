export type Accent = "ink" | "orange" | "blue" | "yellow";
export type ThemePref = "light" | "dark" | "auto";
/** "off" is the visible pause control for moving content (WCAG 2.2.2): covers show posters, the intro is skipped. */
export type MotionPref = "on" | "off";

export type Appearance = { accent: Accent; radius: number; theme: ThemePref; motion: MotionPref };

export const ACCENTS: { id: Accent; label: string; swatch: string }[] = [
  { id: "ink", label: "Ink", swatch: "var(--text-primary)" },
  { id: "orange", label: "Orange", swatch: "var(--eb-orange)" },
  { id: "blue", label: "Blue", swatch: "var(--eb-blue)" },
  { id: "yellow", label: "Yellow", swatch: "var(--eb-yellow)" },
];

export const RADIUS_MIN = 0;
// 0–32 inferred from the Figma slider: 2px sits at 6.25% of the 230px desktop track.
export const RADIUS_MAX = 32;

export const DEFAULT_APPEARANCE: Appearance = { accent: "ink", radius: 2, theme: "auto", motion: "on" };

export const STORAGE_KEY = "ea:appearance";

export function readAppearance(): Appearance {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APPEARANCE;
    return { ...DEFAULT_APPEARANCE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_APPEARANCE;
  }
}

export function writeAppearance(a: Appearance) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* storage unavailable (private mode, blocked) — the change still applies for this page */
  }
}

export function applyAppearance(a: Appearance) {
  const root = document.documentElement;
  // Switch colours without animating every transition-colors element at once.
  root.setAttribute("data-switching", "");
  if (a.theme === "auto") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", a.theme);
  if (a.motion === "off") {
    root.setAttribute("data-motion", "off");
    if (root.dataset.intro === "play") root.dataset.intro = "done";
  } else root.removeAttribute("data-motion");
  if (a.accent === "ink") root.removeAttribute("data-accent");
  else root.setAttribute("data-accent", a.accent);
  root.style.setProperty("--eb-radius", `${a.radius}px`);
  void root.offsetHeight; // flush styles with transitions off
  requestAnimationFrame(() => root.removeAttribute("data-switching"));
}

/**
 * Inline <head> script: applies the saved appearance before first paint so
 * there is no flash of the default theme. Keep in sync with applyAppearance.
 */
export const appearanceBootScript = `(function(){try{var a=JSON.parse(localStorage.getItem(${JSON.stringify(
  STORAGE_KEY,
)})||"{}"),r=document.documentElement;if(a.theme==="light"||a.theme==="dark")r.setAttribute("data-theme",a.theme);if(a.accent&&a.accent!=="ink")r.setAttribute("data-accent",a.accent);if(typeof a.radius==="number")r.style.setProperty("--eb-radius",a.radius+"px");if(a.motion==="off")r.setAttribute("data-motion","off")}catch(e){}})();`;
