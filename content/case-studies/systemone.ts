import type { CaseStudy } from "./types";
import { walkthroughHref } from "./walkthrough";

const study: CaseStudy = {
  slug: "systemone",
  lede: "Unifying OneCart's design across three platforms, from audit to token architecture.",
  tags: ["NDA", "LIVE"],
  meta: [
    { label: "ROLE", value: "Lead · pitched it" },
    { label: "TEAM", value: "Product · Engineering" },
    { label: "PLATFORM", value: "Web · App · Shopper" },
    { label: "TIMELINE", value: "2025 → now" },
  ],
  notice: { tag: "NDA" },
  hero: { src: "/work/systemone/poster.png", alt: "", video: { src: "/work/systemone/cover", startAt: 2 } },
  glance: {
    label: "LIVE",
    diff: [
      { sign: "+", text: "two token layers: primitives and semantic" },
      { sign: "+", text: "one component library across three products" },
      { sign: "+", text: "adoption in tiers, starting with what's already alike" },
      { sign: "+", text: "Spotlight 2.0 built on it from day one" },
      { sign: "-", text: "three values for one brand green" },
      { sign: "-", text: "three builds of every button" },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "OneCart runs three customer-facing platforms: Marketplace Web, the Marketplace app, and the Shopper app used by personal shoppers. There were no shared tokens, no component documentation and no shared design language. I pitched SystemOne to leadership because nobody else was going to.",
        },
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
              title: "Same components, three versions",
              text: "Buttons, inputs, cards and navigation looked, behaved and were named differently on each platform.",
            },
            {
              title: "Brand drift",
              text: "The brand green existed as three different values. The products no longer matched the brand guidelines, or each other.",
            },
            {
              title: "Duplicated effort",
              text: "A button redesign meant three separate builds, with no guarantee they'd match.",
            },
            {
              title: "Fragmented interactions",
              text: "The same form error showed under the field on two platforms and as a toast on the third.",
            },
          ],
        },
      ],
    },
    {
      id: "the-audit",
      title: "The audit",
      blocks: [
        {
          type: "p",
          lead: true,
          text: "With no inventory, I audited everything from the live products and Figma files. Each component family was scored on visual similarity, behavioural similarity and business impact, which sorted them into three tiers.",
        },
        {
          type: "grid",
          items: [
            {
              eyebrow: "UNIVERSAL",
              title: "Near-identical everywhere",
              text: "One source of truth. Search input, buttons, info cards.",
            },
            {
              eyebrow: "PRODUCT-SPECIFIC",
              title: "Same purpose, different needs",
              text: "Shared base, controlled variation. Product cards, forms.",
            },
            {
              eyebrow: "NOT YET",
              title: "Fragmented, low impact",
              text: "Not worth forcing in phase one. Modals, bottom sheets.",
            },
          ],
        },
        {
          type: "decision",
          decision:
            "Adopt in tiers: unify what's already alike, give product-specific parts a shared base, and leave low-impact pieces for later.",
          rejected: "Unify every component in phase one, modals and bottom sheets included.",
          why: "Forcing low-impact components early costs migration time and goodwill before the foundations have proved themselves.",
        },
      ],
    },
    {
      id: "token-architecture",
      title: "Token architecture",
      blocks: [
        {
          type: "p",
          lead: true,
          text: "Foundations first: colour and typography before any component. Two layers: primitives with no opinion about usage, and semantic tokens that components consume. Change a primitive and it cascades everywhere.",
        },
        {
          type: "diagram",
          diagram: "values-to-token",
          before: {
            label: "BEFORE · THREE VALUES",
            // Illustrative values, shown as data in the diagram.
            items: [
              { name: "Marketplace Web", value: "#1fa35b" },
              { name: "Marketplace App", value: "#2db86c" },
              { name: "Shopper App", value: "#17914f" },
            ],
          },
          after: {
            label: "AFTER · ONE TOKEN",
            token: "color.brand.surface",
            swatch: "#1fa35b",
            alias: "→ green.100",
            usedBy: "USED BY · WEB · APP · SHOPPER",
          },
          foot: "ILLUSTRATIVE VALUES · NOT PRODUCTION",
        },
        {
          type: "pipeline",
          steps: [
            { label: "PRIMITIVES", value: "green.100 · grey.900" },
            { label: "SEMANTIC", value: "color.brand.surface" },
            { label: "COMPONENTS", value: "Button · Card · Input" },
          ],
        },
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      blocks: [
        {
          type: "p",
          text: "SystemOne is live and has been validated in two production deployments: the Marketplace web and mobile overhaul, and Spotlight 2.0, the first internal product built on it from the ground up.",
        },
        {
          type: "outcomes",
          label: "RESULTS",
          items: [
            { value: "225+", label: "tokens across three products, in one system" },
            { value: "3 → 1", label: "hex values for the brand green" },
            { value: "2", label: "production deployments" },
            { value: "9", label: "component families audited" },
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
          text: "Audit behaviour, not just visuals. Components that looked alike hid the biggest inconsistencies.",
        },
      ],
    },
  ],
  cta: {
    title: "Want the full story?",
    text: "The real token set, component audit and adoption plan are in a 30-minute walkthrough.",
    button: { label: "Request a walkthrough →", href: walkthroughHref("SystemOne"), walkthrough: "SystemOne" },
  },
};
export default study;
