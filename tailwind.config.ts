import type { Config } from "tailwindcss";

// Every colour resolves to a CSS custom property from globals.css (Figma "v2 / Theme"
// and "v2 / EB accent"). No hex values belong in components.
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
      },
      colors: {
        accent: { DEFAULT: "var(--eb-accent)", on: "var(--eb-on-accent)" },
        live: "var(--status-live)",
        scrim: "rgb(0 0 0 / 0.35)",
      },
      backgroundColor: {
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        sunken: "var(--bg-sunken)",
        stage: "var(--bg-stage)",
        inverse: "var(--bg-inverse)",
        "line-subtle": "var(--border-subtle)",
        "line-strong": "var(--border-strong)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        inverse: "var(--text-inverse)",
      },
      borderColor: {
        subtle: "var(--border-subtle)",
        strong: "var(--border-strong)",
      },
      outlineColor: {
        primary: "var(--text-primary)",
      },
      borderRadius: {
        eb: "var(--eb-radius)",
      },
      boxShadow: {
        sheet: "0 -8px 30px 0 rgb(0 0 0 / 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
