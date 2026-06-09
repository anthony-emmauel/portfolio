import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import GrowLine from "@/components/GrowLine";

const caseStudies = [
  {
    slug: "onecart-redesign",
    title: "OneCart Redesign",
    description:
      "Redesigning discovery and order transparency for a multi-store grocery marketplace",
    tag: "E-COMMERCE",
    imageBg: "bg-[#B8F2C8]",
    image: "/images/homepage/OneCartHomepagethumbnail.png",
  },
  {
    slug: "spotlight-2",
    title: "Spotlight 2.0",
    description:
      "Rebuilding an internal OMS around status clarity and operational visibility",
    tag: "INTERNAL TOOLS",
    imageBg: "bg-[#1A1F2E]",
    image: "/images/homepage/SpotlightHomepagethumbnail.png",
  },
  {
    slug: "system-one",
    title: "SystemOne",
    description:
      "Unifying a design system across 3 platforms from audit to architecture",
    tag: "DESIGN SYSTEMS",
    imageBg: "bg-[#0F1117]",
    image: "/images/homepage/SystemOneHomepagethumbnail.png",
  },
  {
    slug: "nokgridcore",
    title: "NokGridCore",
    description:
      "An open-source token-driven design system built for dashboards",
    tag: "OPEN SOURCE",
    imageBg: "bg-[#1A1A1A]",
    image: "/images/homepage/NokgridcoreHomepagethumbnail.png",
  },
];

const testimonials = [
  {
    quote:
      "His work is consistently thorough, detailed, and creative. He handles feedback professionally and isn't afraid to push back on scope creep or questionable design decisions when it matters. He's reliable and genuinely easy to work with.",
    name: "Peter Brania",
    role: "Head of Software Development, OneCart",
    linkedin: "https://www.linkedin.com/in/peter-brania-075b69223/",
  },
  {
    quote:
      "He invests significant effort into understanding user behaviour by running surveys, gathering feedback, and continuously refining his approach. One of the most impactful initiatives he led was bringing the development team together to propose building a shared UI framework his goal was to simplify development workflows by standardising components and reducing inconsistencies across platforms.",
    name: "Victor Machimana",
    role: "Head of TechOps, OneCart",
    linkedin: "https://www.linkedin.com/in/victor-m-38259110a/",
  },
  {
    quote:
      "Emmanuel meticulously bridges the gap between complex business requirements and seamless user experiences. He is a rare, tech-oriented designer who doesn't just talk the talk but acts as a strategic asset by deeply understanding the evolving market and the language of tech.",
    name: "Temitope Ogundipe",
    role: "Senior Product Designer, Wema Bank",
    linkedin: "https://www.linkedin.com/in/temitope-ogundipe",
  },
];

export default function Home() {
  return (
    <div className="bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">

        {/* ── Hero — staggered fade-in, skipped by AnimateSections ── */}
        <section data-no-animate className="pt-24 pb-16 md:pt-28 md:pb-24">
          <h1 className="hero-fade hero-fade-1 text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Emmanuel Anthony
          </h1>
          <p className="hero-fade hero-fade-2 text-xs tracking-[0.2em] text-white/50 uppercase mb-6 md:mb-8">
            Senior Product Designer &nbsp;·&nbsp; Design Engineer
          </p>
          <p className="hero-fade hero-fade-3 text-lg md:text-2xl text-white/80 leading-snug max-w-xl font-normal">
            I design complex systems that deliver real outcomes. Products I&apos;ve
            shaped have processed over $25M in transactions across e-commerce
            and operational platforms.
          </p>
        </section>

        {/* ── Selected Case Studies ── */}
        <section className="py-10">
          <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
            Selected Case Study
          </p>
          {/* Growing line */}
          <GrowLine className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, i) => (
              <FadeIn key={study.slug} delay={i * 80}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex flex-col hover:-translate-y-1 transition-transform duration-200"
                >
                  {/* Card image */}
                  <div className={`rounded-lg overflow-hidden mb-4 ${study.imageBg} border border-white/5 group-hover:border-white/15 transition-colors duration-200`}>
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={478}
                      height={269}
                      quality={100}
                      className="object-cover w-full"
                      style={{ aspectRatio: "231/130" }}
                    />
                  </div>

                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-semibold group-hover:text-white/80 transition-colors duration-200">
                      {study.title}
                    </h3>
                    <span className="text-white/40 text-sm mt-0.5 shrink-0">↗</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/50 leading-relaxed mb-3 min-h-[42px]">
                    {study.description}
                  </p>

                  {/* Tag */}
                  <div>
                    <span className="text-[10px] tracking-widest uppercase border border-white/15 text-white/50 px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors duration-150 cursor-default">
                      {study.tag}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-16">
          <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
            What People Say
          </p>
          <GrowLine className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 80}>
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#262626] hover:border-white/20 transition-colors duration-200 rounded-xl p-6 flex flex-col justify-between gap-8 cursor-pointer h-full"
                >
                  <p className="text-sm text-white/55 leading-relaxed">{t.quote}</p>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/40 mt-0.5">{t.role}</p>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Currently Building ── */}
        <section className="py-6">
          <p className="text-xs tracking-[0.2em] text-white/40 uppercase mb-4">
            Currently Building
          </p>
          <GrowLine className="mb-8" />

          <a
            href="https://crowdsynchive.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#262626] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-10 items-center hover:border-white/20 transition-colors duration-200 hover:scale-[1.01] transition-all"
          >
            {/* Left */}
            <div className="flex-1 min-w-0 w-full">
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
              <span className="inline-flex items-center gap-1.5 text-sm text-white/70 link-hover hover:scale-[1.02]">
                View project <span>↗</span>
              </span>
            </div>

            {/* Right: mockup */}
            <div className="shrink-0 rounded-xl border border-white/10 overflow-hidden relative w-full md:w-[375px] h-[260px] md:h-[469px]">
              <Image
                src="/images/homepage/crowdsyncHomepagethumbnail.png"
                alt="CrowdSyncHive"
                fill
                quality={100}
                className="object-cover"
              />
            </div>
          </a>
        </section>

      </div>
    </div>
  );
}
