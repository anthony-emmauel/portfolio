export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  overview: string;
  role: string;
  duration: string;
  outcome: string;
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "brand-identity",
    title: "Brand Identity System",
    category: "Branding",
    year: "2024",
    description:
      "A complete visual identity for a fintech startup — logo, color system, typography, and a 60-page brand guidelines document.",
    overview:
      "Finova needed a brand that communicated trust without feeling stale. The brief called for something modern yet grounded, distinct in a crowded market.",
    role: "Lead Designer",
    duration: "8 weeks",
    outcome: "Brand adopted across all product surfaces and investor decks.",
    sections: [
      {
        heading: "Discovery",
        body: "Audited 12 direct competitors and ran stakeholder workshops to surface brand values: clarity, confidence, and progress.",
      },
      {
        heading: "Visual Direction",
        body: "Explored three directions — Geometric, Editorial, and Minimal. Geometric tested best with the target demographic and became the foundation.",
      },
      {
        heading: "System Design",
        body: "Built a scalable token system: 6 typefaces narrowed to 1, a 5-color primary palette, and icon guidelines covering 80 core symbols.",
      },
      {
        heading: "Delivery",
        body: "Handed off Figma component libraries, a Notion-based guidelines hub, and onboarding docs for the in-house design team.",
      },
    ],
  },
  {
    slug: "mobile-ux",
    title: "Mobile App Redesign",
    category: "UX / Product",
    year: "2024",
    description:
      "End-to-end UX redesign of a health tracking app, cutting task completion time by 40% and boosting retention by 25%.",
    overview:
      "The existing app had a 62% drop-off at onboarding. Users reported feeling overwhelmed. The goal was to simplify without losing depth.",
    role: "UX Lead",
    duration: "12 weeks",
    outcome: "40% faster task completion, 25% improvement in 30-day retention.",
    sections: [
      {
        heading: "Research",
        body: "Ran 20 user interviews and reviewed 6 months of session recordings. Three core pain points emerged: information overload, unclear navigation, and broken data entry flows.",
      },
      {
        heading: "Information Architecture",
        body: "Restructured the app from a 5-tab bottom nav to a context-sensitive 3-tab model. Reduced primary actions from 14 to 5.",
      },
      {
        heading: "Prototyping & Testing",
        body: "Iterated through 4 prototype rounds with 8 users each. Major insight: users wanted streaks surfaced earlier — moved to top of home screen.",
      },
      {
        heading: "Outcome",
        body: "Shipped to 100k users over 3 weeks. Metrics confirmed the research hypothesis. App Store rating moved from 3.2 to 4.6.",
      },
    ],
  },
  {
    slug: "ecommerce-redesign",
    title: "E-Commerce Redesign",
    category: "Web Design",
    year: "2023",
    description:
      "Full redesign of a fashion retailer's web store, increasing conversion rate from 1.2% to 3.8% over three months post-launch.",
    overview:
      "A heritage fashion brand wanted a digital presence worthy of their physical stores. The existing site was slow, visually dated, and losing mobile customers.",
    role: "Design Lead",
    duration: "16 weeks",
    outcome: "Conversion rate tripled. Mobile revenue up 180%.",
    sections: [
      {
        heading: "Audit",
        body: "Heatmaps, funnel analysis, and 15 usability sessions revealed three leaks: product discovery, size guidance, and checkout friction.",
      },
      {
        heading: "Design System",
        body: "Built a custom design system — 40+ components — with editorial and commerce contexts coexisting cleanly. Typography-led layout inspired by print.",
      },
      {
        heading: "Key Decisions",
        body: "Replaced the mega-menu with a curated filter system. Added a fit guide integrated directly into product pages. Simplified checkout from 5 steps to 3.",
      },
      {
        heading: "Launch & Iteration",
        body: "Soft-launched with A/B tests on the PDP and cart pages. Winning variants rolled out site-wide over 4 weeks.",
      },
    ],
  },
  {
    slug: "design-system",
    title: "Design System",
    category: "Systems Design",
    year: "2023",
    description:
      "Built a shared design system for a SaaS company, unifying 4 product teams and reducing design-to-dev handoff time by 60%.",
    overview:
      "Four product teams, four different component libraries, zero shared standards. Inconsistency was slowing shipping and confusing users.",
    role: "Systems Designer",
    duration: "20 weeks",
    outcome: "Single source of truth adopted by all 4 teams. Handoff time down 60%.",
    sections: [
      {
        heading: "Audit & Alignment",
        body: "Catalogued 800+ components across all four products. Identified 60 canonical patterns and eliminated redundancy through stakeholder workshops.",
      },
      {
        heading: "Token Architecture",
        body: "Defined a three-tier token system: global → semantic → component. Built for multi-theme support from day one.",
      },
      {
        heading: "Component Library",
        body: "Shipped 90 components with full documentation, variant coverage, accessibility annotations, and Storybook integration.",
      },
      {
        heading: "Adoption",
        body: "Ran internal training, embedded champions in each team, and maintained a weekly office hours cadence for the first 6 months.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
