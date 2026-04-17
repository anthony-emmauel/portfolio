import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Your Name",
  description: "About Your Name, product designer.",
};

const skills = [
  "Brand Identity",
  "Product Design",
  "UX Research",
  "Design Systems",
  "Prototyping",
  "Motion Design",
  "Figma",
  "Framer",
];

const experience = [
  {
    role: "Senior Product Designer",
    company: "Acme Corp",
    period: "2022 — Present",
    description:
      "Leading design for the core product, a B2B SaaS platform with 50k+ users. Own the design system and drive cross-functional design reviews.",
  },
  {
    role: "Product Designer",
    company: "Studio XYZ",
    period: "2020 — 2022",
    description:
      "Worked with early-stage startups on 0→1 product design. Shipped 10+ products across fintech, health, and e-commerce.",
  },
  {
    role: "UX Designer",
    company: "Agency Co.",
    period: "2018 — 2020",
    description:
      "Client-facing design for brands including FMCG and retail. Built skills in design sprints, research, and rapid prototyping.",
  },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Header */}
      <section className="py-28 md:py-40 border-b border-white/10">
        <p className="text-sm text-white/50 mb-6 tracking-widest uppercase">
          About
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] max-w-2xl">
          Designer, thinker,{" "}
          <span className="text-white/40">occasional over-engineer.</span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-white/50 max-w-xl leading-relaxed">
          I&apos;ve spent 7 years designing products for startups and scale-ups.
          I care about clarity — in interfaces, in communication, and in
          process.
        </p>
      </section>

      {/* Bio */}
      <section className="py-16 border-b border-white/10 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xs text-white/40 tracking-widest uppercase mb-6">
            Background
          </h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              I started designing at 19, building websites for local businesses
              in exchange for coffee and (occasionally) actual money. That
              scrappiness stuck — I still approach every project like the budget
              is smaller than it should be and the deadline is tighter than
              anyone admits.
            </p>
            <p>
              I studied Graphic Design at university, then spent three years at
              a digital agency before going in-house at a Series A startup.
              That transition changed how I think about design — less about
              aesthetics, more about outcomes.
            </p>
            <p>
              These days I split my time between a full-time role and select
              freelance projects. I&apos;m particularly interested in the
              intersection of brand and product — companies that do both well
              are rare, and that gap is interesting.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xs text-white/40 tracking-widest uppercase mb-6">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-sm text-white/70 border border-white/15 px-3 py-1.5 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-xs text-white/40 tracking-widest uppercase mb-6">
              Currently
            </h2>
            <p className="text-white/70 leading-relaxed text-sm">
              Based in London. Open to remote and hybrid projects worldwide.
              Available for brand, product, and design system work.
            </p>
            <a
              href="mailto:hello@yourname.com"
              className="inline-block mt-6 text-sm bg-white text-black font-medium px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Say hello
            </a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <h2 className="text-xs text-white/40 tracking-widest uppercase mb-12">
          Experience
        </h2>
        <div className="flex flex-col divide-y divide-white/10">
          {experience.map((job) => (
            <div key={job.company} className="py-8 grid md:grid-cols-3 gap-4">
              <div>
                <p className="font-medium">{job.role}</p>
                <p className="text-sm text-white/50 mt-1">{job.company}</p>
                <p className="text-xs text-white/30 mt-1 font-mono">
                  {job.period}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 leading-relaxed text-sm">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-white/50 text-sm">
            Want to see my work first?
          </p>
          <Link
            href="/"
            className="text-sm border border-white/20 hover:border-white/60 px-5 py-2.5 rounded-full transition-colors self-start sm:self-auto"
          >
            View case studies
          </Link>
        </div>
      </section>
    </div>
  );
}
