import type { CaseStudy } from "./types";

const NOKGRID = "https://www.nokgrid.com/";
const REPO = "https://github.com/nokgridcore/nokgrid";

const study: CaseStudy = {
  slug: "nokgridcore",
  lede: "An open-source design system for data-heavy dashboards, researched before a single component was drawn.",
  tags: ["OPEN SOURCE"],
  meta: [
    { label: "ROLE", value: "Design lead · team of 3" },
    { label: "TEAM", value: "Kelvin (FE) · Timmy (PD)" },
    { label: "STACK", value: "Figma · React · Tailwind" },
    { label: "TIMELINE", value: "2025 → Oct 2026" },
  ],
  notice: {
    tag: "MIT",
    text: "69 components · 400+ tokens · light and dark · MIT licence.",
    links: [
      { label: "nokgrid.com", href: NOKGRID },
      { label: "GitHub", href: REPO },
    ],
  },
  hero: { src: "/work/nokgridcore/poster.png", alt: "", video: { src: "/work/nokgridcore/cover", startAt: 2 } },
  glance: {
    label: "1.0 RELEASE",
    diff: [
      { sign: "+", text: "69 components, named like their React props" },
      { sign: "+", text: "400+ tokens in light and dark" },
      { sign: "+", text: "Figma variables to code, automatically" },
      { sign: "+", text: "a research base: 25+ products, 80+ patterns" },
      { sign: "-", text: "hard-coded values drifting away from Figma" },
      { sign: "-", text: "rebuilding the same KPI card for every dashboard" },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "Nearly every product team builds or maintains a dashboard. Generic libraries hand them Card, Table and Input. Dashboards need a KPI with a delta, a cohort table, a filter sidebar. NokGridCore is opinionated about that domain on purpose.",
        },
        { type: "p", text: "I lead design, working with Kelvin on frontend and Timmy on product design." },
      ],
    },
    {
      id: "the-problem",
      title: "The problem",
      blocks: [
        {
          type: "rows",
          rows: [
            {
              title: "Generic systems don't speak dashboard",
              text: "The naming, taxonomy and interaction patterns of dashboards are domain-specific.",
            },
            {
              title: "Design and code drift apart",
              text: "Tokens change in Figma while old values stay hard-coded in CSS, and the gap grows quietly.",
            },
            {
              title: "No research-backed standard",
              text: "Teams rebuild the same KPI cards, filters and tables from scratch every time.",
            },
          ],
        },
      ],
    },
    {
      id: "research",
      title: "Research",
      blocks: [
        {
          type: "p",
          lead: true,
          text: "I audited 25+ dashboard products before designing anything: six hands-on (Amplitude, Looker Studio, Tableau, Grafana, Mixpanel, Heap) and more across marketing, CRM, e-commerce and finance.",
        },
        {
          type: "stats",
          items: [
            { value: "25+", label: "PRODUCTS AUDITED" },
            { value: "88", label: "AUDIT ENTRIES" },
            { value: "80+", label: "PATTERNS" },
          ],
        },
      ],
    },
    {
      id: "taxonomy",
      title: "Taxonomy",
      blocks: [
        {
          type: "p",
          text: "Every variant is named like its React prop, and the same names ship in Figma and in code. A designer and an engineer are always talking about the same thing.",
        },
        { type: "chips", items: ["chart.bar", "chart.line", "chart.donut", "chart.frame", "progress"] },
        {
          type: "decision",
          decision: "Name every variant like its React prop, and ship the same names in Figma and code.",
          rejected: "Generic primitives like Card, Table and Input, with dashboard patterns left to each team.",
          why: "Generic names are why teams keep rebuilding the same KPI card. Shared, domain-specific names make handoff a lookup, not a translation.",
        },
      ],
    },
    {
      id: "token-pipeline",
      title: "Token pipeline",
      blocks: [
        {
          type: "p",
          text: "No component is built without tokens. Values flow automatically from Figma into production code, so a change in one place changes everywhere.",
        },
        {
          type: "pipeline",
          steps: [
            { label: "FIGMA VARIABLES", value: "source of truth" },
            { label: "TOKEN STUDIO", value: "tokens.raw.json" },
            { label: "STYLE DICTIONARY", value: "css · ts" },
            { label: "REACT", value: "components" },
          ],
        },
      ],
    },
    {
      id: "where-it-is",
      title: "Where it is",
      blocks: [
        {
          type: "p",
          text: "1.0 is done: research, taxonomy, the token pipeline and 69 components, with a docs site and a matching Figma library.",
        },
        {
          type: "outcomes",
          label: "RESULTS",
          items: [
            { value: "69", label: "components shipped" },
            { value: "400+", label: "tokens, light and dark" },
            { value: "25+", label: "products audited first" },
            { value: "80+", label: "patterns synthesised" },
          ],
        },
        {
          type: "checklist",
          items: [
            { title: "Research", detail: "88 entries · 80+ patterns" },
            { title: "Taxonomy", detail: "Family.Type.Variant" },
            { title: "Token pipeline", detail: "Figma → code" },
            { title: "Components", detail: "69 · charts, tables, forms, nav" },
            { title: "Docs site", detail: "live" },
          ],
        },
      ],
    },
    {
      id: "what-i-learned",
      title: "What I learned",
      blocks: [
        {
          type: "quote",
          text: "The research was the most important investment. Auditing 25+ products first meant no component was built from assumption.",
        },
      ],
    },
  ],
  cta: {
    title: "Use it, or look under the hood",
    text: "The docs site has every component, token and pattern. The repo has the pipeline.",
    button: { label: "Visit nokgrid.com ↗", href: NOKGRID, external: true },
  },
};
export default study;
