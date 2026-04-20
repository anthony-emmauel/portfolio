import Link from "next/link";
import type { Metadata } from "next";
import ClickableImage from "@/components/ClickableImage";

export const metadata: Metadata = {
  title: "SystemOne — Emmanuel Anthony",
  description:
    "Unifying a multi-platform design system from audit to architecture across 3 platforms with no shared tokens, no component documentation, and 3 different hex values for the same brand green.",
};

const pills = [
  "Design System",
  "System Thinking",
  "Product Design",
  "Research",
  "Solo Designer",
  "State Architecture",
];

const meta = [
  { label: "COMPANY", value: "OneCart" },
  { label: "ROLE", value: "Lead Product Designer" },
  { label: "TIMELINE", value: "2025 – Present" },
  { label: "TEAM", value: "Product & Engineering" },
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

/* label: bold white — description: gray */
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

export default function SystemOneCaseStudy() {
  return (
    <div className="bg-black">
      <div className="max-w-5xl mx-auto px-12 pt-[90px] pb-20">

        {/* ── Header ── */}
        <div className="flex flex-col gap-10 mb-20">

          {/* Title + subtitle + pills */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[36px] font-bold leading-10 tracking-[-0.9px] text-white">
              SystemOne
            </h1>
            <p className="text-xl leading-[30px] text-[#A1A1AA]">
              Unifying a multi-platform design system from audit to architecture
              — across 3 platforms with no shared tokens, no component
              documentation, and 3 different hex values for the same brand green.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-1">
              {pills.map((p) => (
                <span
                  key={p}
                  className="text-[10px] tracking-[-0.9px] uppercase text-[#A1A1AA] border border-[#A1A1AA] rounded-full px-2 py-1"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex flex-row flex-wrap items-center gap-14 py-9 border-y border-[#262626]">
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
              <p className="text-[44px] font-bold leading-10 tracking-[-0.9px] text-white text-center">
                225+
              </p>
              <p className="text-xl leading-[30px] text-[#A1A1AA] text-center">
                Tokens across three(3) products into one system.
              </p>
            </div>
            <ClickableImage src="/images/systemone/system 1.png" height="387px" />
          </div>

          {/* ── Sections ── */}
          <div className="flex flex-col gap-20">

            {/* Context */}
            <section className="flex flex-col gap-2">
              <SectionLabel>context</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionHeading>The platform divergence problem</SectionHeading>
                  <Body>
                    OneCart runs three customer-facing platforms: Marketplace Web,
                    Marketplace Mobile App, and the Shopper App (used by personal
                    shoppers fulfilling orders). No shared tokens. No component
                    documentation. No shared design language. The platforms were a
                    mess, and the gap between the digital experience and the updated
                    brand identity was getting wider.
                  </Body>
                  <Body>
                    I pitched SystemOne to leadership because nobody else was going
                    to. I built the case, designed and ran the audit, defined the
                    architecture, and led the transition into implementation.
                  </Body>
                </div>
                <ClickableImage src="/images/systemone/system 2.png" height="387px" />
              </div>
            </section>

            {/* Problem */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Problem</SectionLabel>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    Three platforms, no shared system
                  </p>
                  <Body>
                    Buttons, inputs, product cards, navigation — all looked
                    different, behaved differently, and were named differently
                    across the three platforms.
                  </Body>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    Brand inconsistency
                  </p>
                  <Body>
                    The brand&apos;s green had three different hex values across
                    platforms. Neutrals diverged even further. The digital products
                    didn&apos;t match the updated brand guidelines, and the platforms
                    didn&apos;t match each other.
                  </Body>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    Duplicated effort
                  </p>
                  <Body>
                    Each platform team built and maintained its own version of the
                    same components. A button redesign meant three separate
                    implementations with no guarantee they&apos;d align.
                  </Body>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl font-semibold leading-6 text-white">
                    Interaction fragmentation
                  </p>
                  <Body>
                    Components that looked similar behaved differently. A form field
                    error showed below the input on Shopper, below the input on
                    Marketplace App, and as a toast on Marketplace Web. Someone
                    switching between apps would encounter three different feedback
                    patterns for the same action.
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
                  No existing documentation or component inventory — everything had
                  to be audited from live products and Figma files. No dedicated
                  design system team; this ran alongside active product work on
                  Spotlight. Three distinct codebases with different tech stacks.
                  The Shopper App serves a fundamentally different user (personal
                  shoppers vs. customers), so full visual unification wasn&apos;t always
                  appropriate. Brand guidelines had recently been updated but the
                  digital products hadn&apos;t caught up.
                </Body>
              </div>
            </section>

            {/* Research & Design Strategy */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Research &amp; Design Strategy</SectionLabel>
              <div className="flex flex-col gap-4">

                {/* The Component Audit */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <SectionHeading>The Component Audit</SectionHeading>
                    <Body>
                      I designed a structured audit covering 7 component families
                      and 2 foundation layers (colour and typography) across all
                      three platforms. Each family was scored on visual similarity
                      (1–5), behavioural similarity (1–5), and consolidation
                      potential.
                    </Body>
                    <FindingRow label="High similarity, high impact — unify first">
                      Product Cards (visual 4+, impact 5), Typography (visual 5),
                      Information Cards (visual 4). Nearly identical across platforms
                      and used everywhere. Straight into the universal tier.
                    </FindingRow>
                    <FindingRow label="Low similarity, high impact — consolidate carefully">
                      Colour (visual 3.5, impact 5), Buttons (visual 3.25, impact
                      4), Forms (visual 3.25, impact 4), Alerts (visual 3, impact
                      4). Visually and behaviourally divergent across platforms, but
                      too critical to ignore. These needed the audit data to guide
                      how they came together.
                    </FindingRow>
                    <FindingRow label="Low similarity, low impact — don't force it">
                      Modals &amp; Bottom Sheets (visual score 2.7, business impact 3).
                      Most fragmented, but also least critical. Not worth the
                      consolidation effort in the first phase.
                    </FindingRow>
                  </div>
                </div>

                {/* What the data showed */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <Body>What the data showed:</Body>
                    <FindingRow label="A one-size-fits-all consolidation wouldn't work">
                      Some components were nearly identical across platforms (Search
                      Input scored 5). Others were deeply fragmented (Icon Button
                      scored 1, Action Modals scored 2).
                    </FindingRow>
                    <FindingRow label="Behavioural divergence was often worse than visual divergence">
                      Forms looked similar (score 3) but their active and error
                      states varied significantly (score 2–3). The behavioural
                      scores caught problems the visual scores missed entirely.
                    </FindingRow>
                    <FindingRow label="Business impact didn't always track with similarity">
                      Modals had the lowest visual similarity (2.7) but also the
                      lowest business impact (3). Product cards had high similarity
                      (4+) and the highest business impact (5). So prioritisation
                      had to factor in both.
                    </FindingRow>
                  </div>
                  <div className="flex flex-col gap-4">
                    <ClickableImage src="/images/systemone/container.png" height="387px" />
                    <ClickableImage src="/images/systemone/system 4.png" height="387px" />
                    <ClickableImage src="/images/systemone/system 5.png" height="387px" />
                  </div>
                </div>

                {/* Strategy: Three-Tier Classification */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>Strategy: Three-Tier Classification</SectionHeading>
                  <Body>
                    I defined three tiers based on the audit scores:
                  </Body>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Universal (similarity 4–5):</span>{" "}
                      Components functionally and visually equivalent across all
                      platforms. Single source of truth. Examples: Search Input
                      (score 5), Primary/Secondary/Ghost Buttons (score 4),
                      Information Cards (score 4).
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Product-Specific:</span>{" "}
                      Same purpose, structurally different requirements per product.
                      Shared base architecture with controlled variation. Examples:
                      Product Cards (shared base + signature variants for Marketplace
                      and Shopper), Hamburger Menu (different content per app).
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Device-Specific:</span>{" "}
                      Platform constraints (mobile vs. web) drive legitimate
                      divergence. Designed independently but follow shared token
                      foundations. Examples: Marketplace Web navigation
                      (desktop-specific), Bottom sheet behaviour (mobile-only).
                    </li>
                  </ul>
                  <Body>
                    If the audit scored a component 4–5, it belonged in the
                    universal tier. If it scored 1–2, forcing unification would
                    create a component that&apos;s correct nowhere. The Icon Button was
                    the clearest example — Marketplace uses a rounded, stroked,
                    outlined pattern and Shopper uses a borderless, cornerless,
                    outline-free pattern. Merging them would mean Shopper&apos;s minimal
                    UI gets a bordered button that doesn&apos;t belong, or Marketplace
                    loses the visual weight its buttons need.
                  </Body>
                </div>
              </div>
            </section>

            {/* Solution: Foundations First */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Solution</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionHeading>Foundations First</SectionHeading>
                  <Body>
                    With 9 component families audited and limited bandwidth,
                    sequencing mattered. I started with colour and typography before
                    touching any components. Every component depends on these
                    foundations — building components first means hard-coding values
                    that get refactored once tokens land.
                  </Body>
                  <p className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Colour:</span>{" "}
                    The brand&apos;s primary green existed as three different hex values
                    (#BCDDB5 on Marketplace, #D6F1DA on Shopper for Green 100
                    alone). Neutrals were worse — Grey/Neutral 600 scored just 2
                    across platforms. The digital colours didn&apos;t match the updated
                    brand guidelines. Colour scored 5 on business impact, the
                    highest in the entire audit.
                  </p>
                  <p className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Typography:</span>{" "}
                    Visual alignment already scored 5 — the platforms were close.
                    But there was no shared typescale; each pulled from its own
                    definitions. Codifying a single token-driven typescale was low
                    effort since things were already nearly aligned, and it meant
                    every component built afterward would pick up correct typography
                    automatically.
                  </p>
                  <Body>
                    Both foundations are now implemented in design and code. When
                    the first component — the button — was built, it inherited
                    correct colour and type values from day one instead of
                    hard-coding them.
                  </Body>
                </div>
                <div className="flex flex-col gap-4">
                  <ClickableImage src="/images/systemone/system 6.png" height="387px" />
                  <ClickableImage src="/images/systemone/system 7.png" height="387px" />
                  <ClickableImage src="/images/systemone/system 8.png" height="387px" />
                  <ClickableImage src="/images/systemone/system 9.png" height="387px" />
                  <ClickableImage src="/images/systemone/system 10.png" height="387px" />
                </div>
              </div>
            </section>

            {/* Solution: Component Decisions in Practice */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Component Decisions in Practice</SectionHeading>
                <FindingRow label="Behavioural standardisation">
                  Most design system audits compare how components look. I added a
                  behavioural layer because the audit data kept showing that visual
                  similarity masked interaction problems. Forms looked similar
                  (visual score 3) but active state behaviour scored 2 — on
                  Shopper, the background and border stay the same on focus. On
                  Marketplace App, the background stays but the border disappears.
                  On Marketplace Web, the background disappears and the border turns
                  green. Error handling was just as fragmented. The decision was to
                  standardise interaction per device type (mobile vs. web) rather
                  than forcing identical behaviour everywhere.
                </FindingRow>
                <FindingRow label="Shared base, signature variants">
                  For components like Product Cards — highest business impact,
                  appearing on every major surface — the audit showed a dual nature.
                  Some parts were common across platforms (image, name, price, tag),
                  others were structurally unique (Marketplace needs vendor logos and
                  18+ badges; Shopper needs substitute states and multiple action
                  buttons). The approach: a single shared base component with
                  optional slots, plus signature variants per product. One
                  mega-component handling every variation would need conditional
                  logic for badges, substitute states, and quantity controls —
                  unmaintainable for everyone using it.
                </FindingRow>
                <FindingRow label="Button — first component, fully token-driven">
                  The button is SystemOne&apos;s first production component and the proof
                  of concept for the architecture. Four variants (primary, secondary,
                  ghost, icon), four states each (default, hover, active, disabled),
                  every visual property consuming tokens — no hard-coded values.
                  Built in Figma and code in parallel, with the React component
                  pulling directly from buttonTokens so design and code stay in sync
                  by construction, not by discipline.
                </FindingRow>
              </div>
              <ClickableImage src="/images/systemone/system 11.png" height="387px" />
            </section>

            {/* Solution: Token Architecture */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Token Architecture</SectionHeading>
                <Body>
                  SystemOne&apos;s foundations use a two-layer token system: global
                  primitives (raw values with no opinion about usage) and semantic
                  tokens (purpose-driven mappings). Components never reference
                  primitives directly — they consume semantic tokens, so a change at
                  the primitive level cascades correctly through everything.
                </Body>
                <Body>
                  The system started with zero structured tokens and three different
                  hex values for the same brand green. The current system has 225+
                  tokens across 10 collections:
                </Body>
                <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Colour (113 tokens)</span>{" "}
                    — 52 global primitives mapped to 61 semantic tokens. The largest
                    collection, reflecting colour&apos;s role as the highest-impact
                    foundation in the audit.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Spacing (47 tokens)</span>{" "}
                    — 15 global primitives mapped to 32 semantic tokens. Semantic
                    tokens cover layout, component padding, and spacing
                    relationships.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Typography (25 tokens)</span>{" "}
                    — Global tokens for the unified Campton typescale: 3 weights, 11
                    sizes.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Border-radius (22 tokens)</span>{" "}
                    — 9 global primitives mapped to 13 semantic tokens for
                    component-level radius decisions.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Border-width (12 tokens)</span>{" "}
                    — 4 global primitives mapped to 8 semantic tokens.
                  </li>
                  <li className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Icon (6 tokens)</span>{" "}
                    — Global sizing tokens for icon scale.
                  </li>
                </ul>
                <Body>
                  Global primitives → Semantic tokens → Component consumption:{" "}
                  <span className="font-mono text-sm">green-100 (#00DF88)</span>{" "}
                  →{" "}
                  <span className="font-mono text-sm">action.primary-default</span>{" "}
                  → Button primary fill. If OneCart&apos;s brand green changes, updating
                  the green-100 primitive updates every semantic token that
                  references it, which updates every component consuming those
                  tokens. No component needs individual editing.
                </Body>
              </div>
              <div className="flex flex-col gap-4">
                <ClickableImage src="/images/systemone/system 12.png" height="387px" />
                <ClickableImage src="/images/systemone/system 13.png" height="387px" />
              </div>
            </section>

            {/* Impact */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Impact</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Outcomes</SectionHeading>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white capitalize">
                      Current state
                    </p>
                    <Body>
                      SystemOne has been validated through two production
                      deployments. The Marketplace Web and Mobile apps went through a
                      full design overhaul using SystemOne foundations and the button
                      component across all surfaces. Spotlight OMS adopted SystemOne
                      foundations and the button for its Phase 1 redesign — the
                      first internal product built on the system from the ground up.
                    </Body>
                    <Body>
                      The audit itself was the first comprehensive component
                      inventory OneCart had ever done — 7 families + 2 foundations
                      across 3 platforms. The three-tier classification model is now
                      the framework for all component decisions. The unified colour
                      palette (55 values across 6 ramps) and typography scale
                      (Campton, 3 weights, 11-step size scale) are live in both
                      design and code. The two-layer token architecture is
                      operational in Figma and code, and the button component —
                      primary, secondary, ghost, icon variants — ships with every
                      property token-driven, no hard-coded values.
                    </Body>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Target metrics (ongoing):</span>{" "}
                      Design-to-code visual variance ≤5%. Component coverage ≥90%.
                      Design handoff velocity ≥30% improvement from token-driven
                      specs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="flex flex-col gap-2">
              <SectionLabel>reflection</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Conclusion</SectionHeading>
                <Body>
                  The platforms were diverging and nobody was tracking the cost
                  because there was no inventory to measure against. The audit
                  turned a vague sense that &ldquo;things don&apos;t look consistent&rdquo; into
                  specific scores, severity ratings, and a prioritised action plan.
                </Body>
                <Body>
                  The most important decision was auditing behaviour alongside
                  visuals. Visual audits are straightforward — screenshot components
                  side by side. Behavioural audits require interacting with live
                  products across platforms and documenting how things respond, not
                  just how they look. That extra layer caught problems that would
                  have shipped as &ldquo;unified&rdquo; components that actually confused users.
                </Body>
                <Body>
                  Building Spotlight on SystemOne from day one proved the
                  token-driven approach works — the hard-coded value problem the
                  audit identified doesn&apos;t exist in Spotlight&apos;s codebase.
                </Body>
                <Body>
                  If I were starting again, I&apos;d push for engineering representation
                  in the audit from day one. The technical alignment and migration
                  difficulty scores are still pending joint review for some
                  families, and having engineering earlier would have given a more
                  complete picture. The design-side audit was thorough, but
                  SystemOne succeeds or fails at the code level.
                </Body>
                <Body>
                  One principle this project reinforced: systems thinking isn&apos;t
                  about making everything the same. The three-tier model doesn&apos;t
                  eliminate platform differences — it classifies them so the team
                  knows which differences are bugs and which are features.
                </Body>
              </div>
            </section>

          </div>{/* end sections */}

          {/* ── CTA ── */}
          <div className="flex flex-row items-center justify-between pt-6 border-t border-[#262626]">
            {/* Previous project */}
            <Link href="/work/spotlight-2" className="inline-flex flex-col items-start gap-2 group">
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Previous Project
              </span>
              <span className="flex items-center gap-3">
                <span className="text-white group-hover:text-white/80 transition-colors text-2xl">←</span>
                <span className="text-[28px] font-bold leading-10 tracking-[-0.9px] text-white group-hover:text-white/80 transition-colors">
                  Spotlight 2.0
                </span>
              </span>
            </Link>

            {/* Next project */}
            <Link href="/work/nokgridcore" className="inline-flex flex-col items-end gap-2 group">
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Next Project
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[28px] font-bold leading-10 tracking-[-0.9px] text-white group-hover:text-white/80 transition-colors">
                  NokGridCore
                </span>
                <span className="text-white group-hover:text-white/80 transition-colors text-2xl">→</span>
              </span>
            </Link>
          </div>

        </div>{/* end body */}
      </div>
    </div>
  );
}
