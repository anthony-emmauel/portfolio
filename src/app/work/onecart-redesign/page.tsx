import Link from "next/link";
import type { Metadata } from "next";
import ClickableImage from "@/components/ClickableImage";

export const metadata: Metadata = {
  title: "OneCart Redesign — Emmanuel Anthony",
  description:
    "Redesigning discovery and order transparency for a multi-store grocery marketplace.",
};

const pills = [
  "Product Design",
  "Research",
  "Systems Thinking",
  "State Architecture",
  "Multi-platform",
  "E-commerce",
];

const meta = [
  { label: "COMPANY", value: "OneCart" },
  { label: "ROLE", value: "Lead Product Designer" },
  { label: "TIMELINE", value: "2022 – 2023" },
  { label: "TEAM", value: "Cross functional departments" },
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

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-base leading-6 text-[#A1A1AA] ${className}`}>{children}</p>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-6 font-semibold text-white">{children}</p>
  );
}

function ImagePlaceholder({ height = "387px", className = "", src }: { height?: string; className?: string; src: string }) {
  return <ClickableImage src={src} height={height} className={className} />;
}

/* ─────────────────────────────────────────────────── */

export default function OneCartCaseStudy() {
  return (
    <div className="bg-black">
      <div className="max-w-5xl mx-auto px-12 pt-[90px] pb-20">

        {/* ── Header ── */}
        <div className="flex flex-col gap-10 mb-20">

          {/* Title + subtitle + pills */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[36px] font-bold leading-10 tracking-[-0.9px] text-white">
              Redesigning Product Discovery &amp; Order Transparency at OneCart
            </h1>
            <p className="text-xl leading-[30px] text-[#A1A1AA]">
              Redesigning how customers find products and track orders across a
              multi-store grocery marketplace.
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
                29%
              </p>
              <p className="text-xl leading-[30px] text-[#A1A1AA] text-center">
                Average Returning User Growth (YoY 2023 – 2025)
              </p>
            </div>
            <ImagePlaceholder src="/images/onecart/oc.1.png" />
          </div>

          {/* ── Sections ── */}
          <div className="flex flex-col gap-20">

            {/* Context */}
            <section className="flex flex-col gap-2">
              <SectionLabel>context</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionHeading>The Grocery Delivery Ecosystem</SectionHeading>
                  <Body>
                    OneCart is a multi-store grocery marketplace in South Africa,
                    aggregating products from 6–7 retailers (Woolworths, Pick n Pay,
                    Makro, Dis-Chem, Clicks) with same-day delivery through personal
                    shoppers and drivers. Most customers come to compare prices across
                    stores.
                  </Body>
                  <Body>
                    Operationally, things were solid — shoppers, drivers, retailer
                    partnerships all functioned. But the customer-facing experience
                    hadn&apos;t kept up. The homepage was static. Search broke on misspellings.
                    Every retailer organised products differently. After checkout, customers
                    had no idea what was happening with their order until it showed up — or
                    didn&apos;t.
                  </Body>
                  <Body>
                    We were brought in for a visual redesign. Customer interviews and
                    Baymard benchmarking showed the problems were structural, not cosmetic.
                    My PM and I reframed the scope around three specific gaps: fragmented
                    discovery, broken search, and post-purchase silence. Business backed it
                    once we walked them through the evidence.
                  </Body>
                </div>
                <ImagePlaceholder src="/images/onecart/oc.2.png" />
              </div>
            </section>

            {/* Problem */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Problem</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  {/* Problem 1 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      Discovery was fragmented
                    </p>
                    <Body>
                      Each retailer had its own category structure. Customers relearned
                      how products were organised every time they switched stores. The
                      homepage had no dynamic content, no promotions. Comparison — the
                      main reason people used OneCart — was harder than it should have been.
                    </Body>
                  </div>
                  {/* Problem 2 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      Search was brittle
                    </p>
                    <Body>
                      Exact spelling required, no autocomplete, unstructured results.
                      Customers used search to work around bad taxonomy, but search itself
                      was unreliable.
                    </Body>
                  </div>
                  {/* Problem 3 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      Post-checkout was invisible
                    </p>
                    <Body>
                      Backend systems tracked everything — shopper assigned, items found,
                      driver dispatched — but none of it reached customers. The most common
                      support query was &ldquo;Where is my order?&rdquo; App store reviews said the same thing.
                    </Body>
                  </div>
                </div>
              </div>
            </section>

            {/* Constraints */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Constraints</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Key Constraints</SectionHeading>
                <Body>
                  We had to work within the existing backend — no greenfield rebuilds.
                  Product data quality varied across retailers, making automated category
                  mapping unreliable. Delivery partners didn&apos;t support real-time GPS,
                  so live tracking was off the table. There was no user testing
                  infrastructure, and everything had to ship on both web and mobile.
                </Body>
              </div>
            </section>

            {/* Research & Design Strategy */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Research &amp; Design Strategy</SectionLabel>
              <div className="flex flex-col gap-4">

                {/* Baymard */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <SectionHeading>External research — Baymard Institute</SectionHeading>
                    <div className="flex flex-col gap-3">
                      <Body>
                        We reviewed Baymard&apos;s published e-commerce UX research to
                        benchmark OneCart&apos;s experience against industry standards. Three
                        findings were directly relevant:
                      </Body>
                      <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                        <li className="text-base leading-6 text-[#A1A1AA]">
                          Product sub-types are often misused as categories instead of
                          filters — this validated what we saw in retailer category structures
                          and shaped how we designed the unified taxonomy.
                        </li>
                        <li className="text-base leading-6 text-[#A1A1AA]">
                          Search must tolerate spelling variation and intent mismatch — this
                          made autocomplete and fuzzy matching non-negotiable in our search
                          redesign.
                        </li>
                        <li className="text-base leading-6 text-[#A1A1AA]">
                          Category-aware filtering after search is critical for findability —
                          this informed our decision to group search results by OneCart
                          categories and add filter components.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <ImagePlaceholder src="/images/onecart/oc.3.png" height="366px" />
                </div>

                {/* Customer interviews */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <SectionHeading>Internal research — Customer interviews</SectionHeading>
                    <div className="flex flex-col gap-3">
                      <Body>
                        We interviewed 12 customers across three segments: new users,
                        frequent users, and low-frequency users.
                      </Body>
                      <p className="text-base leading-6 text-[#A1A1AA]">
                        <span className="font-semibold text-white">Most users cared deeply about promotions and price comparison across stores:</span>{" "}
                        The homepage needed to surface deals dynamically, and discovery had
                        to work across retailers, not within them. This directly drove the
                        Sanity CMS integration and unified taxonomy.
                      </p>
                      <p className="text-base leading-6 text-[#A1A1AA]">
                        <span className="font-semibold text-white">Search was used primarily to compare prices, not to browse:</span>{" "}
                        Search results needed to group by product across stores, not by
                        store. The results page and filters needed to support comparison as
                        the primary behaviour.
                      </p>
                      <p className="text-base leading-6 text-[#A1A1AA]">
                        <span className="font-semibold text-white">Lack of order visibility created anxiety and reduced repeat usage:</span>{" "}
                        Post-purchase communication was directly linked to retention. This
                        made the order status translation layer a priority.
                      </p>
                      <p className="text-base leading-6 text-[#A1A1AA]">
                        <span className="font-semibold text-white">Users preferred proactive communication over having to &ldquo;check manually&rdquo;:</span>{" "}
                        The notification strategy needed to be event-driven and
                        channel-aware. Customers shouldn&apos;t have to open the app to know
                        what was happening.
                      </p>
                    </div>
                  </div>
                  <ImagePlaceholder src="/images/onecart/oc.4.png" height="366px" />
                </div>

                {/* Strategy */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>Strategy</SectionHeading>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">Discovery, checkout, and post-purchase are one experience. Treat them as a system.</li>
                    <li className="text-base leading-6 text-[#A1A1AA]">Work within existing backend systems. Only push for investment where customer impact clearly justifies it.</li>
                    <li className="text-base leading-6 text-[#A1A1AA]">Web and mobile reach parity.</li>
                    <li className="text-base leading-6 text-[#A1A1AA]">Every status and notification answers a customer question, not a backend event.</li>
                  </ul>
                </div>

                {/* What we excluded */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>What We Excluded &amp; Why</SectionHeading>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Full backend restructuring:</span>{" "}
                      Business vetoed against a new backend restructuring
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Live map tracking:</span>{" "}
                      Delivery partner APIs didn&apos;t support real-time GPS
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Advanced notification preferences:</span>{" "}
                      Needed the foundation before adding complexity
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Solution: Discovery & Search */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Solution</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionHeading>Rebuilding Product Discovery &amp; Search</SectionHeading>
                  <Body>
                    Discovery and search were two sides of the same problem: customers
                    couldn&apos;t reliably find and compare products across retailers.
                  </Body>
                  <p className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Taxonomy:</span>{" "}
                    We introduced a OneCart-level category system that mapped all retailer
                    inventories into one structure. Categories followed how customers think
                    (&ldquo;Beverages &amp; Juices&rdquo;, &ldquo;Bread, Bakery &amp; Desserts&rdquo;), not how stores
                    organise shelves. NLP handled most of the mapping; our PM and an
                    engineer filled gaps manually so we could ship without waiting for
                    automation to mature.
                  </p>
                  <p className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Homepage:</span>{" "}
                    Sanity CMS replaced the static homepage with dynamic content feeds —
                    promotions, &ldquo;Top Deals&rdquo;, seasonal collections. Marketing could update
                    what customers saw without filing engineering tickets.
                  </p>
                  <p className="text-base leading-6 text-[#A1A1AA]">
                    <span className="font-semibold text-white">Search:</span>{" "}
                    We redesigned the entire search experience: autocomplete with spelling
                    tolerance, cross-store results in a single view (searching &ldquo;milk&rdquo;
                    showed every retailer&apos;s options in one list), new filter and sort
                    components, and all search states designed properly (empty, loading,
                    results, no results).
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <ImagePlaceholder src="/images/onecart/oc.5.png" />
                  <ImagePlaceholder src="/images/onecart/oc.6.png" />
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-base leading-6 font-bold text-white">Decisions that mattered</p>
                  <Body>
                    Unified taxonomy was non-negotiable. Layering filters on top of seven
                    different retailer category structures would have preserved exactly the
                    inconsistency customers were complaining about. One browsing model, period.
                  </Body>
                  <Body>
                    We shipped with manual category mapping alongside NLP. Waiting for
                    automation to get accurate enough would have blocked the entire redesign
                    with no clear timeline. Manual mapping filled the gaps while NLP improved
                    in the background.
                  </Body>
                  <Body>
                    Sanity CMS for the homepage was a pragmatic call — marketing needed
                    independence from engineering, and building a custom content system for
                    that would have been overkill.
                  </Body>
                  <Body>
                    Search results show all stores in one view rather than separated by
                    retailer. The whole point of searching on OneCart is to compare —
                    siloing results by store would have defeated that.
                  </Body>
                </div>

                <div className="flex flex-col gap-4">
                  <ImagePlaceholder src="/images/onecart/oc.7.png" />
                  <ImagePlaceholder src="/images/onecart/oc.8.png" />
                </div>
              </div>
            </section>

            {/* Solution: Order Status & Notifications */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Designing the Order Status &amp; Notification System</SectionHeading>
                <Body>
                  This was the most complex piece of the project.
                </Body>
                <Body>
                  A single customer order could contain multiple sub-orders across
                  different retailers, each with its own personal shopper. Shoppers and
                  drivers operated independently.
                </Body>
                <Body>
                  The backend tracked dozens of operational events, but customers saw
                  almost none of it. We couldn&apos;t restructure the backend — business vetoed
                  that on time and cost.
                </Body>
                <p className="text-base leading-6 text-[#A1A1AA]">
                  <span className="font-medium text-white">The translation layer:</span>{" "}
                  Through workshops with business and engineering, we mapped every backend
                  event to what it meant for the customer. I designed a finite set of
                  customer-facing states, each answering: what&apos;s happening now, and what
                  comes next?
                </p>
                <p className="text-base leading-6 text-[#A1A1AA]">
                  <span className="font-medium text-white">Seven primary states:</span>{" "}
                  Order placed → Shopper assigned → Shopping in progress (with item-level
                  indicators: found, partially found, not found, substituted) → Shopping
                  completed → Handover to driver → Driver on the way (ETA + driver details
                  + call button) → Delivered (with rating prompt).
                </p>
                <p className="text-base leading-6 text-[#A1A1AA]">
                  <span className="font-medium text-white">Four exception states:</span>{" "}
                  Order running late (with updated ETA), delivery rescheduled (with cancel
                  option), unable to find order (all items out of stock), driver couldn&apos;t
                  find you (contact info surfaced).
                </p>
                <p className="text-base leading-6 text-[#A1A1AA]">
                  <span className="font-medium text-white">Notifications:</span>{" "}
                  Rather than notifying on every backend event, we mapped urgency to
                  channels. Push notifications for time-sensitive moments (shopper
                  assigned, driver on the way). SMS with tracking URL as the default for
                  web users. Email for confirmation and post-delivery feedback. In-app as
                  the persistent, full-detail view. The idea was that if you got a
                  notification, it meant something actually changed — not just a system
                  event firing.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <ImagePlaceholder src="/images/onecart/oc.9.png" />
                <ImagePlaceholder src="/images/onecart/oc.10.png" />
                <ImagePlaceholder src="/images/onecart/oc.11.png" height="366px" />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-base leading-6 font-bold text-white">Decisions that mattered</p>
                <Body>
                  Engineering had proposed restructuring the event system. Business said
                  no — too expensive, too slow. The translation layer was the alternative:
                  an abstraction that shipped within existing sprint cycles and gave
                  customers what they needed without touching backend architecture.
                </Body>
                <Body>
                  A subtle but important rule: &ldquo;Shopping completed&rdquo; only fires when the
                  last active sub-order finishes. If a sub-order gets cancelled or
                  rescheduled, it doesn&apos;t count. Without that, customers would see
                  &ldquo;completed&rdquo; while items were still being picked up in another store.
                </Body>
                <Body>
                  For the driver stage, we had a choice between a live map and an
                  information-based approach (ETA, driver name, call button). The GPS data
                  from delivery partners wasn&apos;t reliable enough for a map — so we went
                  with information and direct contact. A laggy, inaccurate map would have
                  made things worse.
                </Body>
                <Body>
                  Exception states are shown explicitly with explanations, not hidden
                  behind happy-path screens. When a delivery gets rescheduled, you see why.
                  When items can&apos;t be found, you see that too. We&apos;d seen what happens when
                  platforms hide delays — customers call support, leave bad reviews, and
                  stop coming back.
                </Body>
              </div>

              <ImagePlaceholder src="/images/onecart/oc.12.png" />
            </section>

            {/* Impact */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Impact</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Outcomes</SectionHeading>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white capitalize">
                      27% Avg New user growth (YoY, 2023–2025)
                    </p>
                    <Body>
                      Sustained year-over-year growth in new user acquisition across the
                      redesign and post-launch period.
                    </Body>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      29% Avg Returning User Growth (YoY, 2023–2025)
                    </p>
                    <Body>
                      Consistent year-over-year growth in returning users, supported by
                      improved order visibility and notifications.
                    </Body>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white capitalize">
                      18% Avg. revenue growth (YoY, 2023–2025)
                    </p>
                    <Body>
                      Steady year-over-year revenue growth during and after the platform
                      redesign.
                    </Body>
                  </div>
                  <Body>
                    The redesign was the primary product change during this period, though
                    other factors contributed to growth. Support reported fewer &ldquo;where is my
                    order&rdquo; queries after the status and notification systems went live. App
                    store sentiment around order tracking improved. Marketing started running
                    promotional campaigns through Sanity without waiting on engineering.
                    Cross-store comparison got noticeably easier.
                  </Body>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="flex flex-col gap-2">
              <SectionLabel>reflection</SectionLabel>
              <div className="flex flex-col gap-6">
                <SectionHeading>Conclusion</SectionHeading>

                {/* What worked */}
                <div className="flex flex-col gap-3">
                  <p className="text-base leading-6 font-bold text-white">What worked</p>
                  <Body>
                    The research reframed the project. Without customer interviews and
                    Baymard benchmarking, this would have stayed a visual redesign. The
                    evidence let us expand the scope without friction — every design went
                    to business with the reasoning behind it. By the time we were
                    presenting the order status model, the team had enough trust in the
                    process that scope conversations were quick — we weren&apos;t relitigating
                    decisions from three sprints ago.
                  </Body>
                  <Body>
                    The translation layer was the right call. A backend restructure would
                    have taken months and might not have happened. The abstraction gave
                    customers clarity on top of what already existed.
                  </Body>
                </div>

                {/* What I'd do differently */}
                <div className="flex flex-col gap-3">
                  <p className="text-base leading-6 font-bold text-white">What I&apos;d do differently</p>
                  <Body>
                    Do research before starting design, not alongside it. We discovered
                    structural problems mid-execution, which meant some early work had to
                    be revisited. Research first, scope second, design third.
                  </Body>
                  <Body>
                    Test designs with customers before development. We shipped based on
                    research and internal validation. Even lightweight usability testing
                    would have caught things earlier.
                  </Body>
                </div>
              </div>
            </section>

          </div>{/* end sections */}

          {/* ── CTA ── */}
          <div className="flex flex-row items-center justify-between pt-6 border-t border-[#262626]">
            {/* Back */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-base text-[#A1A1AA] hover:text-white transition-colors"
            >
              <span>←</span>
              <span>Back to home</span>
            </Link>

            {/* Next project */}
            <Link
              href="/work/spotlight-2"
              className="inline-flex flex-col items-end gap-2 group"
            >
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Next Project
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[28px] font-bold leading-10 tracking-[-0.9px] text-white group-hover:text-white/80 transition-colors">
                  Spotlight 2.0
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
