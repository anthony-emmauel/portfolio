import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Not Found" };
  return {
    title: `${study.title} — Your Name`,
    description: study.description,
  };
}

export default function CaseStudy({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const currentIndex = caseStudies.findIndex((cs) => cs.slug === study.slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Back */}
      <div className="pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>All work</span>
        </Link>
      </div>

      {/* Header */}
      <section className="py-16 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
            {study.category}
          </span>
          <span className="text-xs text-white/30">{study.year}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] max-w-2xl">
          {study.title}
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/50 max-w-xl leading-relaxed">
          {study.overview}
        </p>
      </section>

      {/* Meta */}
      <section className="py-10 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Role", value: study.role },
          { label: "Duration", value: study.duration },
          { label: "Year", value: study.year },
          { label: "Outcome", value: study.outcome },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-xs text-white/30 tracking-widest uppercase mb-2">
              {item.label}
            </p>
            <p className="text-sm text-white/80 leading-snug">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Placeholder image */}
      <section className="py-12 border-b border-white/10">
        <div className="w-full aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
          <p className="text-white/20 text-sm">Project visuals</p>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-16 border-b border-white/10">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-14">
            {study.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold mb-4">{section.heading}</h2>
                <p className="text-white/60 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
          <aside className="md:col-span-1">
            <div className="sticky top-20">
              <h3 className="text-xs text-white/30 tracking-widest uppercase mb-4">
                Sections
              </h3>
              <ol className="space-y-2">
                {study.sections.map((section, i) => (
                  <li key={section.heading} className="flex gap-3 items-baseline">
                    <span className="text-xs text-white/20 font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/50">{section.heading}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>

      {/* Next project */}
      <section className="py-16">
        <p className="text-xs text-white/30 tracking-widest uppercase mb-6">
          Next Project
        </p>
        <Link
          href={`/work/${nextStudy.slug}`}
          className="group flex items-center justify-between py-6 border-t border-white/10 hover:border-white/30 transition-colors"
        >
          <div>
            <p className="text-xs text-white/30 mb-2">{nextStudy.category}</p>
            <h3 className="text-2xl md:text-3xl font-semibold group-hover:text-white/80 transition-colors">
              {nextStudy.title}
            </h3>
          </div>
          <span className="text-2xl text-white/30 group-hover:text-white transition-colors">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
