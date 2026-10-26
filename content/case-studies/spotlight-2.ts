import type { CaseStudy } from "./types";
import { walkthroughHref } from "./walkthrough";

const study: CaseStudy = {
  slug: "spotlight-2",
  lede: "An internal order management system rebuilt around the two questions agents ask all day: where is this order, and does it need me?",
  tags: ["NDA", "IN BUILD"],
  meta: [
    { label: "ROLE", value: "Lead product designer · solo" },
    { label: "TEAM", value: "Head of Eng · PM · Ops" },
    { label: "STAGE", value: "In build · Phase 1", live: true },
    { label: "TIMELINE", value: "2025 → now" },
  ],
  notice: { tag: "NDA" },
  hero: { src: "/work/spotlight-2/poster.png", alt: "", video: { src: "/work/spotlight-2/cover", startAt: 2 } },
  glance: {
    label: "PHASE 1 SCOPE",
    diff: [
      { sign: "+", text: "status and attention split into two layers" },
      { sign: "+", text: "live order list that defaults to today" },
      { sign: "+", text: "search beyond order ID, filters that persist" },
      { sign: "+", text: "confirmation before cancel and reset" },
      { sign: "+", text: "control tower: every count opens its orders" },
      { sign: "+", text: "views that hide what a role can't use" },
      { sign: "-", text: "16-column order table" },
      { sign: "-", text: "“Completed Late” and other two-in-one labels" },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "Spotlight is the tool OneCart's ops team lives in. Agents, leads and supervisors use it to track live orders, shoppers and drivers, and to step in when something goes wrong.",
        },
        { type: "p", text: "I'm the only designer on it, working directly with the head of engineering and a PM." },
      ],
    },
    {
      id: "the-problem",
      title: "The problem",
      blocks: [
        {
          type: "rows",
          rows: [
            { title: "The screen couldn't be trusted", text: "No live updates, so agents refreshed by hand all day." },
            {
              title: "One label, two meanings",
              text: "Statuses like “Completed Late” mixed where an order is with whether it needs attention.",
            },
            { title: "A wall of data", text: "Sixteen equal-weight columns. Nothing said where to look first." },
            { title: "Risky by default", text: "Cancel and Reset fired on one click, with no confirmation." },
            {
              title: "One screen for every role",
              text: "Agents and area managers saw the same actions, whether they could use them or not.",
            },
          ],
        },
      ],
    },
    {
      id: "what-i-did",
      title: "What I did",
      blocks: [
        {
          type: "p",
          lead: true,
          text: "A heuristic review of seven modules and a survey of the ops team set the scope. The core decision: separate status (where is this order?) from badges (does it need attention?).",
        },
        {
          type: "diagram",
          diagram: "status-badges",
          before: { label: "BEFORE · ONE FIELD", chip: "Completed Late" },
          status: { label: "STATUS · WHERE IS IT? · EXACTLY ONE", flow: ["Not started", "In progress", "Pickup", "Completed"] },
          badges: {
            label: "BADGES · DOES IT NEED ME? · ANY NUMBER",
            items: ["Delivered late", "Running late · 15m", "No driver", "On hold"],
          },
          foot: "ILLUSTRATIVE · SIMPLIFIED LABELS, NO PRODUCTION DATA",
        },
        {
          type: "grid",
          items: [
            {
              eyebrow: "01",
              title: "A calmer order list",
              text: "One status column, one attention column, live updates, and today's orders by default.",
            },
            {
              eyebrow: "02",
              title: "Search and filters that remember",
              text: "Search beyond order ID, search inside filters, and filters that survive opening an order.",
            },
            {
              eyebrow: "03",
              title: "A control tower",
              text: "Live counts by status and by attention. Every number opens the orders behind it.",
            },
            {
              eyebrow: "04",
              title: "Views that fit the role",
              text: "Actions a role can't use are hidden, not greyed out. Data is scoped by region or store.",
            },
          ],
        },
        {
          type: "decision",
          decision: "One status per order for progress, any number of badges for attention. Filters work on either, or both.",
          rejected: "Add more combined statuses, like “In Progress Late”.",
          why: "Every new risk would multiply the status list and keep two questions in one field. Engineering agreed straight away.",
        },
      ],
    },
    {
      id: "where-it-is",
      title: "Where it is",
      blocks: [
        {
          type: "p",
          text: "In build, with design and engineering running in parallel. Engineering adopted the status and badge split straight away; it cleared up confusion that had existed since the system was first built.",
        },
        {
          // Survey numbers are research findings, never outcomes.
          type: "outcomes",
          label: "RESEARCH FINDINGS, NOT RESULTS · SURVEY OF 35 OPS USERS BEFORE THE REDESIGN",
          items: [
            { value: "60%", label: "refreshed constantly just to see current orders" },
            { value: "57%", label: "hit friction finding an order" },
            { value: "40%", label: "flagged filtering limits" },
            { value: "54%", label: "cited slow performance" },
          ],
          note: "These are the problems we set out to fix. Spotlight is still in build, so there are no launch results yet.",
        },
        {
          type: "rows",
          label: "VALIDATED SO FAR",
          rows: [
            { title: "Status and badge model", text: "Adopted by engineering. The base for everything else." },
            { title: "Phase 1 scope", text: "Signed off by engineering, PM and business." },
            { title: "Control tower", text: "Designed to work for any client, not just the one who asked for it." },
          ],
        },
        {
          type: "chips",
          label: "WHAT WE'LL MEASURE AT LAUNCH",
          items: [
            "Manual refreshes",
            "Time to resolve an order",
            "Search success",
            "Steps per task",
            "Errors from unclear status",
            "Accidental cancels",
          ],
        },
      ],
    },
    {
      id: "what-i-learned",
      title: "What I learned",
      blocks: [
        { type: "quote", text: "Ops tools don't need intelligence first. They need to be clear, fast and trustworthy." },
        {
          type: "p",
          text: "Phase 1 leaves out auto-assignment, escalation and configurable alerts on purpose. Those need a foundation people already trust.",
        },
      ],
    },
  ],
  cta: {
    title: "Want the full story?",
    text: "Real screens, the survey results and the full decision log are in a 30-minute walkthrough.",
    button: { label: "Request a walkthrough →", href: walkthroughHref("Spotlight 2.0") },
  },
};
export default study;
