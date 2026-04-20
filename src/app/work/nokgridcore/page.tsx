import Link from "next/link";
import type { Metadata } from "next";
import ClickableImage from "@/components/ClickableImage";

export const metadata: Metadata = {
  title: "NokGridCore — Emmanuel Anthony",
  description:
    "An open-source design system built specifically for dashboards. 25+ products audited, 80+ patterns synthesised, zero components built from assumption.",
};

const pills = [
  "Open Source",
  "System Thinking",
  "Product Design",
  "Research",
  "Solo Designer",
  "State Architecture",
];

const meta = [
  { label: "COMPANY", value: "Open-source" },
  { label: "ROLE", value: "Lead (solo project)" },
  { label: "TIMELINE", value: "2025 – Present" },
  { label: "STATUS", value: "Ongoing" },
];

/* ─────────────── Shared primitives ─────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] leading-5 tracking-[0.2em] uppercase text-white/80">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] font-bold leading-10 tracking-[-0.9px] text-white">
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-6 text-[#A1A1AA]">{children}</p>;
}

function FindingRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-base leading-6 text-[#A1A1AA]">
      <span className="font-semibold text-white">{label}:</span>{" "}
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────── */

export default function NokGridCoreCaseStudy() {
  return (
    <div className="bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-20 md:pt-[90px] pb-20">

        {/* ── Header ── */}
        <div className="flex flex-col gap-10 mb-12 md:mb-20">

          {/* Title + subtitle + pills */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[24px] md:text-[36px] font-bold leading-tight md:leading-10 tracking-[-0.9px] text-white">
              NokGridCore
            </h1>
            <p className="text-base md:text-xl leading-[26px] md:leading-[30px] text-[#A1A1AA]">
              An open-source design system built specifically for dashboards.
              25+ products audited, 80+ patterns synthesised, zero components
              built from assumption.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              {pills.map((p) => (
                <span
                  key={p}
                  className="text-[10px] tracking-[-0.9px] uppercase text-[#A1A1AA] border border-[#A1A1AA] rounded-full px-2 py-1 hover:bg-white/5 transition-colors duration-150"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex flex-row flex-wrap items-center gap-6 md:gap-14 py-9 border-y border-[#262626]">
            {meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <span className="text-[12px] tracking-[0.2em] text-[#A1A1AA]">
                  {m.label}
                </span>
                <span className="text-sm text-white">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col gap-20">

          {/* Outcome stat + hero image */}
          <div className="flex flex-col gap-20">
            <div className="flex flex-col items-center justify-center gap-4 py-10 bg-white/5 border border-[#262626] rounded-[6px]">
              <p className="text-[32px] font-bold leading-10 tracking-[-0.9px] text-white text-center">
                80+
              </p>
              <p className="text-sm leading-5 text-[#A1A1AA] text-center">
                Patterns synthesised across twenty-five (25+) products.
              </p>
            </div>
            <ClickableImage src="/images/nokgridcore/nokgrid.1.png" height="387px" />
          </div>

          {/* ── Sections ── */}
          <div className="flex flex-col gap-20">

            {/* Context */}
            <section className="flex flex-col gap-2">
              <SectionLabel>context</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>NokGridCore</SectionHeading>
                <Body>
                  NokGridCore is an open-source design system built for
                  dashboards. Tokens flow through an automated pipeline from
                  Figma into code, so when a value changes in one place, it
                  changes everywhere. No hard-coded values, no manual syncing.
                </Body>
                <Body>
                  I chose dashboards as the domain because nearly every product
                  team builds or maintains one. Over{" "}
                  <a
                    href="https://b-eye.com/blog/business-intelligence-data-analytics-trends/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    60%
                  </a>{" "}
                  of organisations now embed analytics directly into their
                  business applications, and roughly{" "}
                  <a
                    href="https://erpsoftwareblog.com/2025/04/10-must-know-analytics-bi-trends-for-2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-white transition-colors"
                  >
                    61%
                  </a>{" "}
                  of professionals prioritise visual dashboards over traditional
                  spreadsheets for data-driven decisions. Dashboards are
                  everywhere — and they&apos;re one of the most component-heavy
                  interface types: KPI cards, data tables, filter systems, chart
                  containers, navigation shells, all relying heavily on colour
                  semantics for status indicators, severity levels, and chart
                  palettes. If the pipeline handles dashboard complexity, it
                  generalises to simpler interfaces.
                </Body>
              </div>
            </section>

            {/* Why This Needs to Exist */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Why this needs to exist</SectionLabel>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    Generic design systems don&apos;t serve dashboards
                  </p>
                  <Body>
                    Libraries like MUI or Radix provide Card, Table, Input.
                    Dashboards need KPI.Value.Delta, Table.Analytics.Cohort,
                    Filter.Sidebar.Accordion. The naming, the component
                    taxonomy, and the interaction patterns are domain-specific.
                  </Body>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    Design-code drift has no automated fix
                  </p>
                  <Body>
                    Designers update tokens in Figma, developers hard-code old
                    values in CSS. No pipeline keeps them in sync, and the gap
                    compounds silently.
                  </Body>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    No research-backed dashboard component standard exists
                  </p>
                  <Body>
                    Teams building dashboards start from scratch every time,
                    recreating the same KPI cards, filter systems, and table
                    patterns without any shared reference for what&apos;s
                    universal and what&apos;s domain-specific.
                  </Body>
                </div>
              </div>
            </section>

            {/* Constraints */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Constraints</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Key Constraints</SectionHeading>
                <Body>
                  Solo project, no team, no funding — every decision has to be
                  high-leverage. Must be open-source and credible enough for
                  real adoption. Must bridge design and code with an automated
                  pipeline. Dashboard specialisation is deliberate — the system
                  is opinionated about dashboard patterns, not trying to serve
                  every possible UI.
                </Body>
              </div>
            </section>

            {/* Research & Design Strategy */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Research &amp; Design Strategy</SectionLabel>
              <div className="flex flex-col gap-4">

                {/* Dashboard Audit */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <SectionHeading>Dashboard Audit &amp; Pattern Synthesis</SectionHeading>
                    <Body>
                      Before designing a single component, I{" "}
                      <a
                        href="https://honeysuckle-potato-c77.notion.site/25ea7773a5b1805a80d2f94891746e1d?v=25ea7773a5b18061b598000ca7482637"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 text-[#A1A1AA] hover:text-white transition-colors"
                      >
                        audited
                      </a>{" "}
                      25+ dashboard products to understand what patterns actually
                      recur, how they vary, and which are universal enough to
                      standardise.
                    </Body>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Core audit (6 tools, full hands-on):</span>{" "}
                      Amplitude, Looker Studio, Tableau, Grafana, Mixpanel, and
                      Heap. I used each tool directly and documented 40+
                      distinct pattern types across navigation, tables, charts,
                      KPI cards, filters, inputs, and forms.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Extended validation (15+ tools, lighter review):</span>{" "}
                      Semrush, HubSpot, Shopify, Stripe, Databox, Geckoboard,
                      Klipfolio, Xero, and others across Marketing, CRM,
                      E-commerce, Finance, and Dashboard Builder categories.
                      Reviewed through screenshots, demos, and docs to confirm
                      that the patterns from the core six generalise across
                      domains.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <ClickableImage src="/images/nokgridcore/nokgrid.2.png" height="387px" />
                    <ClickableImage src="/images/nokgridcore/nokgrid.3.png" height="387px" />
                    <ClickableImage src="/images/nokgridcore/nokgrid.4.png" height="387px" />
                  </div>
                </div>

                {/* Pattern Synthesis */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>Pattern synthesis</SectionHeading>
                  <Body>
                    The raw audit produced 88 entries. I{" "}
                    <a
                      href="https://honeysuckle-potato-c77.notion.site/Pattern-Synthesis-25ca7773a5b18008a546c356a550a89f"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 text-[#A1A1AA] hover:text-white transition-colors"
                    >
                      synthesised
                    </a>{" "}
                    these into distinct patterns grouped by component family:
                  </Body>
                  <FindingRow label="Tables (7 patterns)">
                    The most structurally varied family — data tables, breakdown
                    tables, heatmaps, log tables, contextual dashboard tables,
                    record tables, and cohort/funnel tables. Each has a
                    different data model, not just a different visual layout.
                  </FindingRow>
                  <FindingRow label="KPI Cards (5 patterns)">
                    The most dashboard-specific component — they don&apos;t
                    exist in generic UI libraries at all. Value, Trend, Grouped,
                    Status, and Summary variants, each serving a different
                    analytical purpose.
                  </FindingRow>
                  <FindingRow label="Charts (19 patterns)">
                    Audited as container and interaction patterns, not charting
                    library implementations. Line, Area, Bar, Pie, Funnel,
                    Heatmap, Scatter, Gauge, Map, Combined, Treemap, Progress —
                    the variation is mostly visual, unlike tables where the
                    underlying data model changes.
                  </FindingRow>
                  <FindingRow label="Filters, Dropdowns, Inputs & Forms (37 patterns)">
                    The largest synthesis. Filter systems are the most complex
                    interaction patterns in the dashboard domain — they combine
                    dropdowns, date pickers, toggles, and search into compound
                    UI that generic libraries don&apos;t model at all.
                  </FindingRow>
                  <Body>
                    Navigation (5 patterns) and Feedback (4 patterns) rounded
                    out the inventory.
                  </Body>
                </div>

                {/* Strategy: Component Taxonomy & Priority */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>Strategy: Component Taxonomy &amp; Priority</SectionHeading>
                  <Body>
                    Generic component libraries name things generically: Card,
                    Table, Input, Select. NokGridCore serves one domain —
                    dashboards — and the naming reflects that. The taxonomy uses
                    a three-part convention: Family.Type.Variant.
                  </Body>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">KPI.Value.Delta:</span>{" "}
                      A KPI card showing a single metric with a comparison
                      delta. Not &ldquo;Card with number and subtitle.&rdquo;
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Table.Log.Expandable:</span>{" "}
                      A table for chronological event data with expandable rows.
                      Not &ldquo;Table with accordion.&rdquo;
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Table.Analytics.Cohort:</span>{" "}
                      A table for retention or funnel analysis with
                      colour-encoded progress. Not &ldquo;Table with coloured
                      cells.&rdquo;
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Filter.Sidebar.Accordion:</span>{" "}
                      A persistent sidebar filter container with collapsible
                      sections. Not &ldquo;Panel with dropdowns.&rdquo;
                    </li>
                  </ul>
                  <Body>
                    A developer searching for &ldquo;KPI&rdquo; finds every KPI
                    pattern. A designer looking for &ldquo;Table.Analytics&rdquo;
                    finds analytical table variants without wading through log
                    tables. The names were extracted from what 25+ real products
                    actually build.
                  </Body>
                  <Body>
                    With 80+ patterns, building everything at once wasn&apos;t
                    possible solo. I split the taxonomy into two priority tiers
                    based on how frequently each pattern appeared across audited
                    products:
                  </Body>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">P1 — Core Functional:</span>{" "}
                      Appeared in nearly every dashboard. Inputs, Dropdowns,
                      Filters, Tables, KPI Cards, and core Charts. A dashboard
                      missing a KPI card is broken.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">P2 — Experience Layer:</span>{" "}
                      Appeared in most but not all products. Navigation,
                      Feedback, Cards, Layout templates. A dashboard missing a
                      breadcrumb is usable but rough.
                    </li>
                  </ul>
                  <Body>
                    KPI cards and tables appeared in every product audited.
                    Breadcrumbs appeared in fewer than half. The research
                    frequency data drives what gets built first.
                  </Body>
                </div>
              </div>
            </section>

            {/* Architecture */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Architecture</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Token-First Architecture</SectionHeading>
                <Body>
                  No component gets built without tokens defining its visual
                  properties. The pipeline runs from Figma through to production
                  React components:
                </Body>
                <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Figma Variables:</span>{" "}
                    Tokens defined for colour, typography, spacing, border, and
                    icons. The single source of truth for all design decisions.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Token Studio:</span>{" "}
                    Exports everything as <span className="font-mono text-sm">tokens.raw.json</span>,
                    the structured handoff between design and code.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Style Dictionary:</span>{" "}
                    Transforms raw tokens into three outputs: CSS variables, a
                    Tailwind theme extension, and a TypeScript token map.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">React 18+ components:</span>{" "}
                    Consume tokens through props. No hard-coded values anywhere
                    in the component layer.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Storybook:</span>{" "}
                    Documents every component with live token values so the
                    design and code representations stay visually verifiable.
                  </li>
                </ul>
                <Body>
                  The token system follows a two-layer architecture: global
                  primitives (raw values) and semantic tokens (purpose-driven
                  mappings like Chart.1–10 for data visualisation colours).
                  Components consume semantic tokens only — no hard-coded
                  values. So if you update <span className="font-mono text-sm text-white/80">chart-blue-500</span>{" "}
                  at the primitive level, the semantic token{" "}
                  <span className="font-mono text-sm text-white/80">Chart.3</span>{" "}
                  updates, and every line chart, bar chart, and legend using
                  that colour picks up the change automatically.
                </Body>
                <Body>
                  The architecture uses a monorepo with two npm packages:{" "}
                  <span className="font-mono text-sm text-white/80">@nokgridcore/tokens</span>{" "}
                  (CSS variables + Tailwind theme + TypeScript map) and{" "}
                  <span className="font-mono text-sm text-white/80">@nokgridcore/ui</span>{" "}
                  (React 18+, TypeScript, TailwindCSS). Build tooling runs on
                  Turborepo with pnpm workspaces.
                </Body>
              </div>
            </section>

            {/* Impact */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Impact</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Outcomes</SectionHeading>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white capitalize">
                    Current state
                  </p>
                  <Body>
                    To be direct: the research and architecture are complete,
                    but no components have shipped yet. Implementation is queued
                    for development. Where things stand:
                  </Body>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Research (Audit + Synthesis) — complete:</span>{" "}
                      88 audit entries, 80+ synthesised patterns, Figma
                      screenshot archive, Notion database.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Taxonomy (Naming + Tiers) — complete:</span>{" "}
                      Full component hierarchy, P1/P2 classification,
                      Family.Type.Variant naming convention.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Token Architecture — defined:</span>{" "}
                      Pipeline design, monorepo structure,{" "}
                      <span className="font-mono text-sm">@nokgridcore/tokens</span>{" "}
                      and{" "}
                      <span className="font-mono text-sm">@nokgridcore/ui</span>{" "}
                      packages scoped.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Component Implementation — queued:</span>{" "}
                      P1 components in Figma and React, Storybook
                      documentation, npm publish.
                    </li>
                  </ul>
                  <Body>
                    One design decision worth noting: chart patterns are defined
                    as container and interaction patterns rather than rendering
                    implementations. This keeps the system from being tied to
                    any specific charting library.
                  </Body>
                  <p className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white/80">Target metrics (implementation phase):</span>{" "}
                    Component coverage ≥90% of dashboard UI patterns.
                    Design-to-code visual variance ≤5%. Design handoff velocity
                    ≥30% faster than building from generic libraries. At least 1
                    production dashboard built on NokGridCore. npm packages
                    published. Storybook documentation live.
                  </p>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="flex flex-col gap-2">
              <SectionLabel>reflection</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Conclusion</SectionHeading>
                <Body>
                  NokGridCore started from a frustration with how design systems
                  actually work in practice. I&apos;d seen the disconnect
                  firsthand — design tokens in Figma, hard-coded values in CSS,
                  and no pipeline keeping them in sync. NokGridCore is my
                  attempt to build a system from scratch, in the open, with the
                  pipeline as the core product.
                </Body>
                <Body>
                  The research phase was the most important investment. Auditing
                  25+ products before designing anything forced me to ground the
                  library in evidence. The pattern synthesis revealed things I
                  wouldn&apos;t have predicted — tables are more structurally
                  varied than charts (7 distinct table types with different data
                  models vs. 19 chart types that are mostly visual variations of
                  the same axis-and-series pattern). That shaped both the
                  taxonomy and the priority tiers.
                </Body>
                <Body>
                  The domain-aware naming was a deliberate bet. Calling
                  something <span className="font-mono text-sm text-white/80">KPI.Trend.Sparkline</span>{" "}
                  instead of{" "}
                  <span className="font-mono text-sm text-white/80">Card.WithChart</span>{" "}
                  makes NokGridCore immediately legible to anyone building
                  dashboards, but it limits the system&apos;s applicability
                  outside that domain. The specialisation is what makes the
                  research credible and the components useful.
                </Body>
                <Body>
                  Implementation is queued for after I complete my frontend
                  engineering foundations. I want to build the React components
                  myself, not hand off specs. The case study will be updated as
                  implementation progresses.
                </Body>
              </div>
            </section>

          </div>{/* end sections */}

          {/* ── CTA ── */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#262626]">
            {/* Previous project */}
            <Link href="/work/system-one" className="inline-flex flex-col items-start gap-2 group">
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Previous Project
              </span>
              <span className="flex items-center gap-3">
                <span className="text-white group-hover:text-white/80 transition-colors text-2xl">←</span>
                <span className="text-[20px] md:text-[28px] font-bold leading-tight md:leading-10 tracking-[-0.9px] text-white group-hover:text-white/80 transition-colors">
                  SystemOne
                </span>
              </span>
            </Link>

            {/* Back to home */}
            <Link href="/" className="inline-flex flex-col items-end gap-2 group">
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Back to home
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[28px] font-bold leading-10 tracking-[-0.9px] text-[#A1A1AA] group-hover:text-white transition-colors">
                  Home
                </span>
                <span className="text-[#A1A1AA] group-hover:text-white transition-colors text-2xl">→</span>
              </span>
            </Link>
          </div>

        </div>{/* end body */}
      </div>
    </div>
  );
}
