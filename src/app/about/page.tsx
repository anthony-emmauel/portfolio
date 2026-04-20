import type { Metadata } from "next";
import Image from "next/image";
import AboutRightImage from "@/components/AboutRightImage";

export const metadata: Metadata = {
  title: "About — Emmanuel Anthony",
  description:
    "Senior Product Designer based in Lisbon. Designing systems at the edge of code.",
};

const testimonials = [
  {
    quote:
      "Emmanuel meticulously bridges the gap between complex business requirements and seamless user experiences. He is a rare, tech-oriented designer who doesn't just talk the talk but acts as a strategic asset by deeply understanding the evolving market and the language of tech.",
    name: "Temitope Ogundipe",
    role: "Senior Product Designer, Wema Bank",
    linkedin: "https://www.linkedin.com/in/temitope-ogundipe",
  },
  {
    quote:
      "I have collaborated very well with Emmanuel. We have exchanged a lot of good feedback from technical and user experience side. Emmanuel is very user centric in his craft.",
    name: "Luntu Mavukuza",
    role: "Senior Software Engineer, Mr D",
    linkedin: "https://www.linkedin.com/in/luntu-m-474ab5116",
  },
  {
    quote:
      "He invests significant effort into understanding user behaviour by running surveys, gathering feedback, and continuously refining his approach. One of the most impactful initiatives he led was bringing the development team together to propose building a shared UI framework — his goal was to simplify development workflows by standardising components and reducing inconsistencies across platforms.",
    name: "Victor Machimana",
    role: "Head of TechOps, OneCart",
    linkedin: "https://www.linkedin.com/in/victor-m-38259110a/",
  },
  {
    quote:
      "Anthony is a very talented designer with a rare tendency of questioning the status quo, which helps other people on the team to always dig deeper into their deliverables. Design for him isn't just about pushing pixels.",
    name: "Frank Kyambadde",
    role: "Senior UI/UX Designer, Fingo Global",
    linkedin: "https://www.linkedin.com/in/kyambadde-frank-5a58b9a7",
  },
  {
    quote:
      "His work is consistently thorough, detailed, and creative. He handles feedback professionally and isn't afraid to push back on scope creep or questionable design decisions when it matters. He's reliable and genuinely easy to work with.",
    name: "Peter Brania",
    role: "Head of Software Development, OneCart",
    linkedin: "https://www.linkedin.com/in/peter-brania-075b69223/",
  },
  {
    quote:
      "Everything he works on needs to solve the intended problem as effectively as possible. If it doesn't work, he's not afraid to revise the designs.",
    name: "Theto Mokganya",
    role: "Mobile App Engineer, OneCart",
    linkedin: "https://www.linkedin.com/in/theto-mokganya/",
  },
  {
    quote:
      "His ability to turn complex ideas into intuitive, user-friendly designs that made both engineering and user experience better is exceptional. He's a thoughtful collaborator who brings clarity and impact to every project.",
    name: "Philip Onyango",
    role: "Senior Software Engineer, OneCart",
    linkedin: "https://www.linkedin.com/in/philip-onyango",
  },
];

const skillGroups = [
  [
    ["Design Ops", "UX Strategy", "Product Design"],
    ["User Research", "Design Management", "Figma"],
    ["Design System", "System Thinking", "Prototyping"],
    ["Visual Design", "Information Architecture"],
  ],
  [
    ["JavaScript", "HTML", "CSS", "AI-assisted development"],
    ["Claude Code", "Codex"],
  ],
  [
    ["Vercel", "Git", "Style Dictionary", "Storybook"],
  ],
];

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-12 pt-16 pb-0">

        {/* ── Hero ── */}
        <section className="flex flex-col md:flex-row md:items-start gap-10 md:gap-0 pt-10">

          {/* Left column */}
          <div className="flex flex-col gap-0 flex-1 min-w-0">
            {/* Heading */}
            <h1 className="text-[36px] font-bold leading-10 tracking-[-0.9px] text-white mb-6">
              Designing systems at the edge of code
            </h1>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-0">
              <div className="pt-4 pb-0">
                <p className="text-xl leading-[30px] text-[#A1A1AA]">
                  I&apos;m a Senior Product Designer based in Lisbon, originally
                  from Nigeria. For the past four years I&apos;ve been embedded
                  with OneCart, designing their marketplace experience,
                  rebuilding their internal OMS, and initiating their first
                  cross-platform design system. I think in systems — tokens,
                  state architecture, design-to-code pipelines.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-xl leading-[30px] text-[#A1A1AA]">
                  I&apos;m building toward a Design Engineer role where I can
                  own both the design and the implementation. When I&apos;m not
                  designing, I&apos;m running 10Ks around Lisbon or working on
                  CrowdSync, my event operations startup.
                </p>
              </div>
            </div>

            {/* Left image */}
            <div
              className="relative w-full mt-8 rounded-[6px] overflow-hidden"
              style={{ height: "555px" }}
            >
              <Image
                src="/images/about/about image left.png"
                alt="Emmanuel Anthony"
                fill
                quality={100}
                className="object-cover"
              />
            </div>
          </div>

          {/* Right column — interactive image */}
          <div className="md:ml-10 shrink-0 w-full md:w-[314px]">
            <AboutRightImage />
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="mt-20">
          {/* Section header */}
          <div className="pb-4 mb-12 border-b border-[#262626]">
            <p className="text-[12px] leading-5 tracking-[2px] uppercase text-white/80">
              What people say
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {testimonials.map((t) => (
              <a
                key={t.name}
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-8 p-4 border border-[#262626] hover:border-white/20 transition-colors rounded-[6px]"
              >
                <p className="text-sm text-white/55 leading-relaxed flex-1">
                  {t.quote}
                </p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[14px] font-medium leading-[17px] tracking-[-0.9px] text-white">
                    {t.name}
                  </p>
                  <p className="text-[12px] leading-[15px] tracking-[-0.9px] text-white/50">
                    {t.role}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Tools & Skills ── */}
        <section className="mt-20 pb-20">
          {/* Section header */}
          <div className="pb-4 mb-8 border-b border-[#262626]">
            <p className="text-[12px] leading-5 tracking-[2px] uppercase text-white/80">
              Tools &amp; Skills
            </p>
          </div>

          {/* Three-column skill groups */}
          <div className="flex flex-col md:flex-row gap-[22px]">
            {skillGroups.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-3 flex-1">
                {group.map((row, ri) => (
                  <div key={ri} className="flex flex-wrap gap-3">
                    {row.map((pill) => (
                      <span
                        key={pill}
                        className="text-[10px] tracking-[-0.9px] uppercase text-[#A1A1AA] border border-[#A1A1AA] rounded-full px-2 py-1"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
