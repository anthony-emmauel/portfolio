import Link from "next/link";

const caseStudies = [
  {
    slug: "onecart-redesign",
    title: "OneCart Redesign",
    description:
      "Redesigning discovery and order transparency for a multi-store grocery marketplace",
    tag: "E-COMMERCE",
    imageBg: "bg-[#B8F2C8]",
    imageContent: (
      <div className="w-full h-full flex items-center justify-center bg-[#B8F2C8]">
        <div className="text-[#0D0D0D]/20 text-xs">Project preview</div>
      </div>
    ),
  },
  {
    slug: "spotlight-2",
    title: "Spotlight 2.0",
    description:
      "Rebuilding an internal OMS around status clarity and operational visibility",
    tag: "INTERNAL TOOLS",
    imageBg: "bg-[#1A1F2E]",
    imageContent: null,
  },
  {
    slug: "system-one",
    title: "SystemOne",
    description:
      "Unifying a design system across 3 platforms from audit to architecture",
    tag: "DESIGN SYSTEMS",
    imageBg: "bg-[#0F1117]",
    imageContent: null,
  },
  {
    slug: "nokgridcore",
    title: "NokGridCore",
    description:
      "An open-source token-driven design system built for dashboards",
    tag: "OPEN SOURCE",
    imageBg: "bg-[#1A1A1A]",
    imageContent: null,
  },
];

const testimonials = [
  {
    quote:
      "His work is consistently thorough, detailed, and creative. He handles feedback professionally and isn't afraid to push back on scope creep or questionable design decisions when it matters. He's reliable and genuinely easy to work with.",
    name: "Peter Brania",
    role: "Head of Software Development, OneCart",
  },
  {
    quote:
      "He invests significant effort into understanding user behaviour by running surveys, gathering feedback, and continuously refining his approach. One of the most impactful initiatives he led was bringing the development team together to propose building a shared UI framework his goal was to simplify development workflows by standardising components and reducing inconsistencies across platforms.",
    name: "Victor Machimana",
    role: "Head of TechOps, OneCart",
  },
  {
    quote:
      "Emmanuel meticulously bridges the gap between complex business requirements and seamless user experiences. He is a rare, tech-oriented designer who doesn't just talk the talk but acts as a strategic asset by deeply understanding the evolving market and the language of tech.",
    name: "Temitope Ogundipe",
    role: "Senior Product Designer, Wema Bank",
  },
];

export default function Home() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-28 pb-24">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Emmanuel Anthony
          </h1>
          <p className="text-xs tracking-[0.2em] text-white/50 uppercase mb-8">
            Product Designer &nbsp;·&nbsp; Design Engineer
          </p>
          <p className="text-xl md:text-2xl text-white/80 leading-snug max-w-xl font-normal">
            I design products, then I build them — not prototypes, products.
            Currently crafting digital experiences that bridge the gap between
            design and code.
          </p>
        </section>

        {/* ── Selected Case Studies ── */}
        <section className="py-10">
          <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6">
            Selected Case Study
          </p>
          <div className="border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col"
              >
                {/* Card image */}
                <div
                  className={`w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 ${study.imageBg} border border-white/5`}
                />

                {/* Title row */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-base font-semibold group-hover:text-white/80 transition-colors">
                    {study.title}
                  </h3>
                  <span className="text-white/40 text-sm mt-0.5 shrink-0">↗</span>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-3">
                  {study.description}
                </p>

                {/* Tag */}
                <div>
                  <span className="text-[10px] tracking-widest uppercase border border-white/15 text-white/50 px-2.5 py-1 rounded-full">
                    {study.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16">
          <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-8">
            What People Say
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-[#161616] border border-white/5 rounded-xl p-6 flex flex-col justify-between gap-8"
              >
                <p className="text-sm text-white/55 leading-relaxed">{t.quote}</p>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Currently Building ── */}
        <section className="py-6">
          <div className="bg-[#161616] border border-white/5 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-10 items-start">
            {/* Left */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">
                Currently Building
              </p>
              <h2 className="text-2xl font-bold mb-4">CrowdSyncHive</h2>
              <p className="text-sm text-white/55 leading-relaxed mb-6">
                I&apos;m building the{" "}
                <span className="text-white font-medium">Operational</span>{" "}
                backbone for serious{" "}
                <span className="text-white font-medium">Events</span>.
                CrowdSync is an event execution and ops platform — ticketing,
                check-ins, payouts, and on-ground coordination for agencies,
                promoter collectives, and high-traffic venues. Not a generic
                ticketing tool. An execution insurance layer.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                View project <span>↗</span>
              </a>
            </div>

            {/* Right: mockup placeholder */}
            <div className="w-full md:w-72 shrink-0 aspect-[4/3] bg-[#0D0D0D] rounded-xl border border-white/10 flex items-center justify-center">
              <p className="text-white/15 text-xs">App preview</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
