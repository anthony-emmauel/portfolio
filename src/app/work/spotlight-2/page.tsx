import Link from "next/link";
import type { Metadata } from "next";
import ClickableImage from "@/components/ClickableImage";

export const metadata: Metadata = {
  title: "Spotlight OMS — Emmanuel Anthony",
  description:
    "Redesigning an internal OMS around status clarity, search, and operational visibility for ops users.",
};

const pills = [
  "Dashboard",
  "Internal Tool",
  "Product Design",
  "Research",
  "Solo Designer",
  "State Architecture",
];

const meta = [
  { label: "COMPANY", value: "OneCart" },
  { label: "ROLE", value: "Lead Product Designer" },
  { label: "TIMELINE", value: "2025 – Present" },
  { label: "TEAM", value: "Product, Engineering & Ops" },
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

/* ─────────────────────────────────────────────────── */

export default function SpotlightCaseStudy() {
  return (
    <div className="bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-20 md:pt-[90px] pb-20">

        {/* ── Header ── */}
        <div className="flex flex-col gap-10 mb-12 md:mb-20">

          {/* Title + subtitle + pills */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[24px] md:text-[36px] font-bold leading-tight md:leading-10 tracking-[-0.9px] text-white">
              Redesigning Spotlight OMS for Operational Clarity
            </h1>
            <p className="text-base md:text-xl leading-[26px] md:leading-[30px] text-[#A1A1AA]">
              Redesigning an internal OMS around status clarity, search, and
              operational visibility for ops users.
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
                60%
              </p>
              <p className="text-sm leading-5 text-[#A1A1AA] text-center">
                Agents refreshed manually just to see current orders.
              </p>
            </div>
            <ClickableImage src="/images/spotlight/spotlight 1.png" height="387px" />
          </div>

          {/* ── Sections ── */}
          <div className="flex flex-col gap-20">

            {/* Context */}
            <section className="flex flex-col gap-2">
              <SectionLabel>context</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionHeading>Order Management System</SectionHeading>
                  <Body>
                    Spotlight is OneCart&apos;s internal Order Management System — the
                    tool agents, leads, area managers, and supervisors use to track
                    live orders, monitor shoppers and drivers, handle exceptions, and
                    intervene when things go wrong. Hundreds of orders per day, across
                    multiple malls, all managed through this one system.
                  </Body>
                  <Body>
                    I&apos;m the sole product designer on Spotlight. I work directly with
                    the head of engineering and my PM, and present to business at each
                    stage. Engineering raised the initial concern: the system was being
                    pushed beyond what it was built for. Features had been added
                    reactively over time and the UX hadn&apos;t kept pace. The interface was
                    dense, the terminology was confusing, and agents were using it on
                    their phones despite it being designed for desktop.
                  </Body>
                  <Body>
                    Rather than jumping straight to a redesign, I ran a heuristic
                    evaluation and user survey to understand exactly what was broken and
                    how badly. That research shaped every decision that followed. This is
                    an active project. Some pieces are in development, others are
                    designed and pending, and some modules are still ahead.
                  </Body>
                </div>
                <ClickableImage src="/images/spotlight/spotlight 2.png" height="387px" />
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
                      The system didn&apos;t update in real time
                    </p>
                    <Body>
                      60% of surveyed agents reported refreshing constantly just to
                      see current orders. 54% cited slow performance. The tool felt
                      manual — agents were checking every few minutes instead of
                      trusting the screen.
                    </Body>
                  </div>
                  {/* Problem 2 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      Search required too much precision
                    </p>
                    <Body>
                      57% reported friction. Finding an order meant entering an exact
                      order ID plus a specific date. No search by customer name or
                      phone. Filters reset after viewing an order detail, so agents
                      re-applied them every time they navigated back.
                    </Body>
                  </div>
                  {/* Problem 3 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      Status labels were confusing
                    </p>
                    <Body>
                      The system merged two different types of information into one
                      field. An order could show as &ldquo;Completed Late&rdquo; — but is
                      &ldquo;Completed&rdquo; the workflow status and &ldquo;Late&rdquo; the attention flag?
                      Or is &ldquo;Completed Late&rdquo; its own status? Agents had to mentally
                      decode every label to understand what was actually happening and
                      what needed their attention.
                    </Body>
                  </div>
                  {/* Problem 4 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      The order list was a wall of data
                    </p>
                    <Body>
                      The most-used page in the system showed 16+ columns per order —
                      Order ID, Amount, Status, Progress, Timeslot, Shopper, Driver,
                      Store, multiple timestamps, and more. Nothing stood out. Critical
                      information like &ldquo;Running Late&rdquo; had the same visual weight as a
                      Store name or an External ID.
                    </Body>
                  </div>
                  {/* Problem 5 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      Actions were buried, safeguards were missing
                    </p>
                    <Body>
                      &ldquo;Assign to Me&rdquo; was hidden inside order details. Cancel Order and
                      Reset Order had no confirmation dialogs — a single click could
                      trigger a destructive action with no undo. This was the worst
                      thing we found.
                    </Body>
                  </div>
                  {/* Problem 6 */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white">
                      All users saw the same interface
                    </p>
                    <Body>
                      View-only users saw action buttons they couldn&apos;t use. Agents saw
                      modules irrelevant to their work. No role-based filtering.
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
                  We had to work within the existing backend and API structure.
                  Driver data comes from third-party delivery partners, limiting what
                  we can surface. No baseline metrics existed. The system had to stay
                  operational throughout the redesign — no &ldquo;stop the world&rdquo;
                  migration. Agents were using a desktop-designed tool on their phones.
                </Body>
              </div>
            </section>

            {/* Research & Design Strategy */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Research &amp; Design Strategy</SectionLabel>
              <div className="flex flex-col gap-4">

                {/* Heuristic evaluation */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <SectionHeading>Heuristic evaluation</SectionHeading>
                    <Body>
                      I evaluated all seven core modules using Nielsen&apos;s 10 heuristics
                      plus criteria specific to Spotlight&apos;s operational context.
                    </Body>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Critical (Severity 4):</span>{" "}
                      No confirmation for destructive actions. Cancel Order and Reset
                      Order could fire accidentally with no undo.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Major (Severity 3):</span>{" "}
                      Overlapping status fields creating ambiguity. Key actions hidden
                      in menus. UI didn&apos;t adapt to user roles. Workflow stages
                      (shopping, handover, delivery) weren&apos;t clearly separated.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Minor (Severity 2):</span>{" "}
                      Non-intuitive module naming (&ldquo;Action Orders&rdquo; actually means
                      completed/cancelled orders). 16+ column tables. Filter and search
                      limitations. No contextual help anywhere.
                    </p>
                  </div>
                </div>

                {/* User survey */}
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <SectionHeading>User survey — 35 ops respondents</SectionHeading>
                    <Body>
                      We surveyed 35 ops users (30 agents, 4 leads, 1 other). The
                      results quantified what the heuristic evaluation had found:
                    </Body>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">60% reported needing constant refreshing just to see current orders:</span>{" "}
                      The system had no real-time updates — agents were manually
                      refreshing every few minutes instead of trusting the screen.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">57% experienced search friction:</span>{" "}
                      Finding an order required an exact order ID plus a specific date.
                      No search by customer name or phone, and filters reset after
                      viewing an order detail.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">54% cited slow system performance:</span>{" "}
                      Load times and responsiveness were a persistent source of
                      frustration across all roles.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">40% flagged filtering limitations:</span>{" "}
                      No date range filtering, no persistent filters — agents
                      re-applied their filters every time they navigated back from an
                      order.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">34% wanted communication tools like a call button:</span>{" "}
                      Agents had to switch between Spotlight and other tools to contact
                      shoppers or drivers.
                    </p>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">31% needed basic automation like auto-refresh:</span>{" "}
                      The system required manual effort for things that should have
                      been automatic.
                    </p>
                  </div>
                  <ClickableImage src="/images/spotlight/spotlight 3.png" height="387px" />
                </div>

                {/* Strategy */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>Strategy</SectionHeading>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      Fix the fundamentals first. Terminology, status visibility,
                      search, role alignment — before any automation or smart features.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      Deterministic automation only. Auto-refresh, default to today&apos;s
                      date, session-scoped behaviours. No auto-assignment, no
                      escalation, no customer-facing notifications.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      Separate workflow progress from attention signals. &ldquo;Where is
                      this order?&rdquo; and &ldquo;Does this order need attention?&rdquo; are
                      different questions. The system has to treat them differently.
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      Role-aware, not role-generic. Show each user what&apos;s relevant to
                      their job.
                    </li>
                  </ul>
                </div>

                {/* What we excluded */}
                <div className="flex flex-col gap-3">
                  <SectionHeading>What We Excluded &amp; Why</SectionHeading>
                  <ul className="flex flex-col gap-2 list-disc list-outside pl-5">
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Auto-assignment of orders:</span>{" "}
                      Too high-risk without validated assignment logic
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Customer-facing notifications from Spotlight:</span>{" "}
                      Internal tool — customer notifications belong in customer-facing
                      systems
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Escalation logic:</span>{" "}
                      Needs the clarity foundation first
                    </li>
                    <li className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white">Full driver data integration:</span>{" "}
                      Third-party APIs still being negotiated
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Solution: Status & Badge Separation */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Solution</SectionLabel>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <SectionHeading>Status and Badge Separation</SectionHeading>
                  <Body>
                    The existing system merged workflow progress and attention signals
                    into a single status field. &ldquo;Completed Late&rdquo; looked like one
                    status, but it was actually two pieces of information jammed
                    together — where the order is (Completed) and what needs attention
                    (Late). Agents couldn&apos;t quickly answer two basic questions: where is
                    this order in its lifecycle, and does it need my attention?
                  </Body>
                  <Body>
                    I dug into the existing status system with the head of engineering.
                    He walked me through what each status meant in the backend, and it
                    became clear the system was conflating two distinct layers.
                  </Body>
                  <Body>
                    <span className="font-semibold text-white">Status = workflow progress:</span>{" "}
                    Each order has exactly one status at any time: Not Started → In
                    Progress → Pickup Started → Pickup Completed → Completed.
                  </Body>
                  <Body>
                    <span className="font-semibold text-white">Badge = attention/risk layer:</span>{" "}
                    An order can carry multiple badges simultaneously: Late, Running
                    Late (15/30/45 min), On Hold, Cancelled, No Items Found, Pickup
                    Exception, Drop-off Exception, Driver Assigned, No Driver, Returned
                    to Store, Refund Required.
                  </Body>
                  <Body>
                    <span className="font-semibold text-white">Filter logic:</span>{" "}
                    Status filter shows workflow stage (all orders in progress). Badge
                    filter shows attention need (all orders running late). Combined
                    filter gives you the intersection (in-progress orders that are
                    running late).
                  </Body>
                  <Body>
                    I proposed the separation and engineering agreed immediately. It had
                    been a source of confusion since the system was first built.
                  </Body>
                  <Body>
                    <span className="font-semibold text-white">How this transformed the order page:</span>{" "}
                    Once status and attention were separated, the table didn&apos;t need 16+
                    columns anymore. The redesigned order page has a clean Status
                    column, a separate Needs Attention column with badge chips
                    (&ldquo;Running Late · 15m&rdquo;, &ldquo;Delivered Late&rdquo;), and KPI summary cards at
                    the top showing Not Started, Active, and Completed counts. The page
                    went from a wall of data to something agents could actually scan.
                  </Body>
                </div>
                <div className="flex flex-col gap-4">
                  <ClickableImage src="/images/spotlight/spotlight 4.png" height="387px" />
                  <ClickableImage src="/images/spotlight/spotlight 5.png" height="387px" />
                </div>
              </div>
            </section>

            {/* Solution: Search, Filter & Automation */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Search, Filter, and Automation Overhaul</SectionHeading>
                <Body>
                  The filter experience was worse than the survey numbers suggested.
                  There was no search within filters — agents had to manually scroll
                  through long lists of options to find what they wanted to filter by.
                  Combined with filters resetting every time you navigated to an order
                  detail and back, even basic workflows became multi-step frustrations.
                </Body>
                <Body>
                  We redesigned search and filtering around the most common agent
                  tasks. Search now supports lookup beyond exact order ID. Filters
                  persist across navigation so agents don&apos;t lose their working context.
                  Status and badge filters are separated (following the separation
                  model), letting agents filter by workflow stage, attention signals,
                  or both. Active filters are always visible so you know what subset of
                  data you&apos;re looking at. And filter dropdowns now have inline search —
                  you type to find what you need instead of scrolling.
                </Body>
                <Body>
                  The system defaults to today&apos;s date on login. Previously it sometimes
                  retained yesterday&apos;s date after refresh, causing agents to miss
                  current orders. Small fix, but 60% of respondents had flagged
                  refresh-related issues, and this eliminated one of the daily friction
                  points.
                </Body>
              </div>
              <div className="flex flex-col gap-4">
                <ClickableImage src="/images/spotlight/spotlight 6.png" height="387px" />
                <ClickableImage src="/images/spotlight/spotlight 7.png" height="387px" />
                <ClickableImage src="/images/spotlight/spotlight 8.png" height="387px" />
                <ClickableImage src="/images/spotlight/spotlight 9.png" height="387px" />
              </div>
            </section>

            {/* Solution: Operational Control Tower */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Operational Control Tower</SectionHeading>
                <Body>
                  Agents and leads had no high-level view of operational health. To
                  understand what was happening, they had to navigate between modules
                  and mentally assemble the picture.
                </Body>
                <Body>
                  We designed a live dashboard that surfaces real-time operational
                  signals: orders grouped by workflow state (using the status model),
                  orders grouped by attention need (using the badge model), a
                  timeliness snapshot (on-time, at-risk, late), shopper availability,
                  and mall-level activity. Every number is clickable — clicking &ldquo;12
                  Running Late&rdquo; takes you straight to a filtered order list showing
                  those 12 orders.
                </Body>
                <Body>
                  The feature originated from a client request, but we designed it to
                  work across any OneCart client. The data structure follows the
                  status/badge model, so it stays consistent regardless of context.
                  Driver availability was scoped for the control tower but full
                  integration depends on delivery partner APIs that are still being
                  negotiated. We pushed for it alongside engineering — it&apos;s planned for
                  a later phase.
                </Body>
              </div>
              <ClickableImage src="/images/spotlight/spotlight 10.png" height="387px" />
            </section>

            {/* Solution: Role-Based Visibility */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Role-Based Visibility</SectionHeading>
                <Body>
                  All users saw the same interface regardless of role. We introduced
                  role-based visibility — hiding modules and controls that aren&apos;t
                  relevant to each role. The principle: an agent doesn&apos;t need Mall
                  Slots. A viewer shouldn&apos;t see Cancel Order buttons. A store manager
                  needs their store&apos;s data, not the entire operation.
                </Body>
                <Body>
                  Non-applicable actions and modules are hidden entirely, not greyed
                  out. Greyed-out buttons still create cognitive load — people see them
                  and wonder why they can&apos;t click.
                </Body>
                <Body>
                  Beyond module visibility, the system scopes data by access level:
                  national, regional, or store. A client&apos;s staff can have read-only
                  access to their own data without seeing other clients&apos; operations.
                </Body>
                <Body>
                  This is visibility-only for now — no role editing UI. Building role
                  management would have required consensus on permission structures
                  that don&apos;t exist yet. Hiding irrelevant modules and actions covers
                  most of the problem without the scope explosion.
                </Body>
              </div>
            </section>

            {/* Solution: Operational Notifications */}
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <SectionHeading>Operational Notifications</SectionHeading>
                <Body>
                  Agents had no way to be alerted when something needed attention. The
                  only way to know an order was running late was to be looking at the
                  right part of the screen at the right time.
                </Body>
                <Body>
                  We scoped notifications deliberately narrow for the first phase:
                  surface time-sensitive risks, nothing else. The system notifies when
                  orders cross Running Late thresholds at 15, 30, and 45 minutes. These
                  match escalating urgency levels that ops already uses informally — 15
                  minutes is a heads-up, 30 needs active attention, 45 is critical.
                </Body>
                <Body>
                  Channels are browser notifications (opt-in) and an in-app
                  notification bell. Clicking a notification takes you to a filtered
                  order view scoped to your region, store, or access level — not a
                  generic &ldquo;orders are late&rdquo; message, but the actual orders you need to
                  look at.
                </Body>
                <Body>
                  No configurable thresholds, no escalation chains, no SMS or email.
                  Fixed thresholds ship faster and establish the pattern. Configurable
                  alerts would need a preferences UI, per-user state management, and
                  operational consensus on what the thresholds mean. That&apos;s future
                  work, after the foundation proves out.
                </Body>
              </div>
            </section>

            {/* Impact */}
            <section className="flex flex-col gap-2">
              <SectionLabel>Impact</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Outcomes</SectionHeading>
                <div className="flex flex-col gap-5">

                  {/* Current state */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white capitalize">
                      Current state
                    </p>
                    <Body>
                      This is an active project with design and development running in
                      parallel.
                    </Body>
                  </div>

                  {/* Validated */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold leading-6 text-white capitalize">
                      What&apos;s been validated
                    </p>
                    <Body>
                      The status/badge separation was accepted immediately by
                      engineering — it resolved confusion that had existed since the
                      system was first built. That single decision gave us the
                      foundation for the control tower, the filter redesign, and the
                      order list restructure.
                    </Body>
                  </div>

                  {/* What's approved */}
                  <div className="flex flex-col gap-5">
                    <Body>
                      The Phase 1 approach (clarity, efficiency, reliability — no
                      intelligence) was approved by engineering, PM, and business. The
                      control tower design is complete and adaptable across clients.
                      Search and filter overhaul is in active development, directly
                      addressing the top pain points from the survey.
                    </Body>
                    <p className="text-base leading-6 text-[#A1A1AA]">
                      <span className="font-semibold text-white/80">Metrics we&apos;ll measure against once the system is live:</span>{" "}
                      Page load time and manual refresh frequency. Time to resolve an
                      order. Successful search rate without external tools. Reduction in
                      manual steps. Agent satisfaction. Reduction in errors from unclear
                      statuses or accidental destructive actions.
                    </p>
                    <div className="flex flex-col gap-4">
                      <ClickableImage src="/images/spotlight/spotlight 11.png" height="387px" />
                      <ClickableImage src="/images/spotlight/spotlight 12.png" height="387px" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="flex flex-col gap-2">
              <SectionLabel>reflection</SectionLabel>
              <div className="flex flex-col gap-3">
                <SectionHeading>Conclusion</SectionHeading>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <p className="text-base leading-6 font-semibold text-white">
                      What&apos;s working
                    </p>
                    <Body>
                      The research earned the redesign scope. Engineering flagged that
                      the system was outgrowing its design, but the heuristic evaluation
                      and survey gave us specific numbers. 60% refreshing constantly.
                      57% frustrated with search. That evidence made every conversation
                      with PM and business concrete.
                    </Body>
                    <Body>
                      The status/badge model unlocked everything else. Once that
                      separation was clear, filters, the control tower, the order list,
                      role-based views — all of it had a foundation. Without that model,
                      each piece would have inherited the old system&apos;s ambiguity.
                    </Body>
                    <Body>
                      Being the sole designer forced discipline. Every decision had to
                      be documented and justified because I was the one presenting to
                      engineering, PM, and business. No handing off ambiguity.
                    </Body>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-base leading-6 font-semibold text-white">
                      What&apos;s ahead
                    </p>
                    <Body>
                      Mall slots and shopper status modules are still in the design
                      queue. Driver data integration for the control tower is a priority
                      being negotiated with delivery partners. Phase 2 possibilities
                      include auto-assignment triggers, advanced filtering with saved
                      views, and admin panel integration — all dependent on Phase 1
                      shipping successfully and baseline metrics being established.
                    </Body>
                  </div>
                </div>
              </div>
            </section>

          </div>{/* end sections */}

          {/* ── CTA ── */}
          <div className="flex flex-row flex-wrap items-center justify-between gap-6 pt-6 border-t border-[#262626]">
            {/* Previous project */}
            <Link href="/work/onecart-redesign" className="inline-flex flex-col items-start gap-2 group">
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Previous Project
              </span>
              <span className="flex items-center gap-3">
                <span className="text-white group-hover:text-white/80 transition-colors text-2xl">←</span>
                <span className="text-[20px] md:text-[28px] font-bold leading-tight md:leading-10 tracking-[-0.9px] text-white group-hover:text-white/80 transition-colors">
                  OneCart Redesign
                </span>
              </span>
            </Link>

            {/* Next project */}
            <Link href="/work/system-one" className="inline-flex flex-col items-end gap-2 group">
              <span className="text-[12px] tracking-[0.2em] uppercase text-white/80">
                Next Project
              </span>
              <span className="flex items-center gap-3">
                <span className="text-[20px] md:text-[28px] font-bold leading-tight md:leading-10 tracking-[-0.9px] text-white group-hover:text-white/80 transition-colors">
                  SystemOne
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
