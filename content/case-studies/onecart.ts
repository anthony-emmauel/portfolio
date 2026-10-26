import type { CaseStudy } from "./types";
import { walkthroughHref } from "./walkthrough";

const study: CaseStudy = {
  slug: "onecart",
  lede: "Product discovery and order transparency for a multi-store grocery marketplace.",
  tags: ["NDA", "SHIPPED"],
  meta: [
    { label: "ROLE", value: "Lead product designer" },
    { label: "TEAM", value: "Product · Eng · Ops" },
    { label: "PLATFORM", value: "iOS · Android · Web" },
    { label: "TIMELINE", value: "2022 → 2023" },
  ],
  notice: { tag: "NDA" },
  hero: { src: "/work/onecart/poster.png", alt: "", video: { src: "/work/onecart/cover", startAt: 6 } },
  glance: {
    label: "SHIPPED",
    diff: [
      { sign: "+", text: "one product taxonomy across every retailer" },
      { sign: "+", text: "comparison-first search with autocomplete" },
      { sign: "+", text: "order status in stages customers understand" },
      { sign: "+", text: "proactive notifications at every stage" },
      { sign: "-", text: "relearning the shop for each retailer" },
      { sign: "-", text: "opening the app to find out where an order is" },
    ],
  },
  sections: [
    {
      id: "context",
      title: "Context",
      blocks: [
        {
          type: "p",
          text: "OneCart lets people fill one basket from several South African retailers, with same-day delivery by personal shoppers. Most customers come to compare prices across stores.",
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
              title: "Discovery was fragmented",
              text: "Every retailer organised products differently, so customers relearned the shop each time they switched stores.",
            },
            { title: "Search was brittle", text: "Exact spelling, no autocomplete, unstructured results." },
            {
              title: "After checkout, silence",
              text: "The system knew everything about an order. The customer knew nothing. “Where is my order?” was the top support question.",
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
          text: "Research first. Industry benchmarks and customer interviews turned a visual refresh into a product change, built on two moves.",
        },
        {
          type: "grid",
          items: [
            {
              eyebrow: "01",
              title: "One way to shop every store",
              text: "A shared taxonomy and comparison-first search, so switching retailers doesn't mean relearning the app.",
            },
            {
              eyebrow: "02",
              title: "An order you can follow",
              text: "A status layer that turns backend events into stages customers understand, with notifications instead of manual checking.",
            },
          ],
        },
        {
          type: "diagram",
          diagram: "events-to-stages",
          head: ["WHAT THE SYSTEM KNOWS", "WHAT THE CUSTOMER SEES"],
          rows: [
            { events: "order.created · payment.captured", stage: "Order confirmed" },
            { events: "shopper.assigned · picking.started", stage: "Shopping your items" },
            { events: "item.substituted", stage: "Check your substitutions", flag: "Needs you" },
            { events: "driver.assigned · driver.en_route", stage: "On the way" },
            { events: "order.delivered", stage: "Delivered" },
          ],
          foot: "ILLUSTRATIVE · SIMPLIFIED EVENT NAMES, NO PRODUCTION DATA",
        },
        {
          type: "decision",
          decision: "Treat it as a product change: one taxonomy, comparison-first search and an order-status layer.",
          rejected: "The original brief: a visual refresh of the existing app.",
          why: "Benchmarks and interviews showed the problems were structural: how products were organised, and what customers could see after checkout. A new coat of paint wouldn't touch either.",
        },
      ],
    },
    {
      id: "outcome",
      title: "Outcome",
      blocks: [
        {
          type: "p",
          text: "The redesign became the main product change of its period. Support saw fewer “where is my order?” queries, app-store sentiment on tracking improved, and growth held up after launch.",
        },
        {
          // EXACT (matches the CV): +29% customer growth, +27% returning users, +18% revenue (YoY 2023–2025)
          type: "outcomes",
          label: "RESULTS · YEAR ON YEAR, 2023–2025",
          items: [
            { value: "+29%", label: "average customer growth" },
            { value: "+27%", label: "average returning-user growth" },
            { value: "+18%", label: "average revenue growth" },
          ],
          note: "The redesign was the main product change in this period, though other factors contributed to growth.",
        },
      ],
    },
    {
      id: "what-i-learned",
      title: "What I learned",
      blocks: [{ type: "quote", text: "Evidence buys scope. Without the research, this would have stayed a visual redesign." }],
    },
  ],
  cta: {
    title: "Want the full story?",
    text: "Real screens and the research are in a 30-minute walkthrough.",
    button: { label: "Request a walkthrough →", href: walkthroughHref("OneCart"), walkthrough: "OneCart" },
  },
};
export default study;
