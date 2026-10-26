import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@content/site";
import { MakeItYoursCard } from "@/components/appearance/MakeItYours";
import { BlockView, Diff } from "@/components/case/Blocks";
import { CoverMedia } from "@/components/media/CoverMedia";
import { OnThisPageDropdown, OnThisPageList } from "@/components/case/OnThisPage";
import { MetaList, ProfileHeader, SiteLinks, StatusDot } from "@/components/shell/Profile";
import { MobileMenu } from "@/components/shell/MobileMenu";
import { caseStudySlugs, getCaseStudy, type NavLink } from "@/lib/case-studies";
import { pad2 } from "@/lib/feed";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const generateStaticParams = () => caseStudySlugs().map((slug) => ({ slug }));

export function generateMetadata({ params }: Props): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  const title = `${cs.entry.title} — ${site.name}`;
  // A page-level openGraph object replaces the inherited one entirely, so the
  // site image is named here. Swap in a per-study image once one exists.
  const image = { url: "/opengraph-image.png", width: 1200, height: 630, alt: site.name };
  return {
    title,
    description: cs.lede,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: { type: "article", url: `/work/${cs.slug}`, siteName: site.name, title, description: cs.lede, images: [image] },
    twitter: { card: "summary_large_image", title, description: cs.lede, images: [image.url] },
  };
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-eb bg-accent px-[9px] py-1 font-mono text-[10px] tracking-[0.1px] text-accent-on">
      {children}
    </span>
  );
}

function External({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function NavCard({ link, align }: { link: NavLink; align: "start" | "end" }) {
  return (
    <Link
      href={link.href}
      className={`flex flex-1 flex-col gap-2 rounded-[4px] border border-subtle bg-surface px-6 py-[22px] transition-colors hover:border-strong ${
        align === "end" ? "@[720px]:items-end @[720px]:text-right" : ""
      }`}
    >
      <span className="font-mono text-[11px] text-tertiary">{link.label}</span>
      <span className="text-[18px] font-medium text-primary @[720px]:text-[22px]">{link.title}</span>
    </Link>
  );
}

export default function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const toc = cs.sections.map((s) => ({ id: s.id, title: s.title }));
  const meta = cs.meta.map((m) => ({
    label: m.label,
    value: m.live ? (
      <span className="flex items-center gap-[7px]">
        <StatusDot />
        {m.value}
      </span>
    ) : (
      m.value
    ),
  }));
  const backLink = (
    <Link href="/" className="text-[13px] text-primary hover:underline">
      <span aria-hidden>← </span>Back to changelog
    </Link>
  );

  return (
    <div className="lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[360px] shrink-0 overflow-y-auto border-r border-subtle px-10 pb-9 pt-10 lg:block">
        <div className="flex w-[280px] flex-col gap-[22px]">
          <ProfileHeader />
          {backLink}
          <MetaList rows={meta} />
          <SiteLinks />
          <div className="flex w-full flex-col gap-4">
            <OnThisPageList items={toc} />
            <MakeItYoursCard />
          </div>
        </div>
      </aside>

      {/* Mobile header + sticky section picker */}
      <div className="flex flex-col gap-5 px-4 pt-4 lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-[14px] font-medium text-primary">
            <span aria-hidden>← </span>Changelog
          </Link>
          <MobileMenu />
        </div>
      </div>
      <div className="sticky top-2 z-20 mx-4 mt-5 lg:hidden">
        <OnThisPageDropdown items={toc} />
      </div>

      <main id="main" tabIndex={-1} className="min-w-0 flex-1 px-4 pb-12 pt-6 focus:outline-none lg:px-20 lg:pb-[140px] lg:pt-12">
        <article className="@container mx-0 flex w-full max-w-[920px] flex-col gap-8 lg:gap-12">
          <header className="flex flex-col gap-[18px]">
            <p className="font-mono text-[12px] text-tertiary">
              <Link href="/" className="hover:text-primary">
                changelog
              </Link>{" "}
              / {cs.entry.version} / {cs.slug}
            </p>
            <div className="flex flex-col items-start gap-3.5 lg:flex-row lg:items-center">
              <h1 className="text-[36px] font-medium text-primary lg:text-[48px]">{cs.entry.title}</h1>
              <span className="flex gap-1.5">
                {cs.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </span>
            </div>
            <p className="max-w-[680px] text-[18px] leading-[1.45] text-secondary lg:text-[20px]">{cs.lede}</p>
          </header>

          <aside
            aria-label={cs.entry.nda ? "NDA notice" : "Project links"}
            className="flex flex-col items-start gap-3 rounded-[4px] border border-subtle bg-surface px-4 py-3 @[720px]:flex-row @[720px]:items-center"
          >
            <Tag>{cs.notice.tag}</Tag>
            <p className="flex-1 text-[13px] text-secondary">{cs.notice.text ?? site.ndaNotice}</p>
            {cs.notice.links?.map((l) => (
              <External key={l.href} href={l.href} className="text-[13px] font-medium text-primary hover:underline">
                {l.label} <span aria-hidden>↗</span>
              </External>
            ))}
            {cs.entry.nda && (
              <a href={cs.cta.button.href} className="text-[13px] font-medium text-primary hover:underline">
                Request a walkthrough <span aria-hidden>→</span>
              </a>
            )}
          </aside>

          <div aria-hidden className="relative aspect-[920/575] overflow-hidden rounded-[6px] bg-stage">
            <CoverMedia
              poster={cs.hero.src}
              video={cs.hero.video?.src}
              startAt={cs.hero.video?.startAt}
              priority
              sizes="(min-width: 1024px) 920px, 100vw"
            />
          </div>

          <section aria-labelledby="glance" className="flex flex-col gap-3.5">
            <h2 id="glance" className="flex gap-3 font-mono text-[11px] text-tertiary">
              <span>AT A GLANCE</span>
              <span>
                {cs.entry.version} · {cs.glance.label}
              </span>
            </h2>
            <Diff lines={cs.glance.diff} />
          </section>

          {cs.sections.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="flex scroll-mt-24 flex-col items-start gap-[22px] border-t border-subtle pt-10 lg:scroll-mt-6"
            >
              <h2 id={`${s.id}-title`} className="flex items-baseline gap-4">
                <span className="font-mono text-[12px] text-tertiary">{pad2(i + 1)}</span>
                <span className="text-[22px] font-medium text-primary lg:text-[28px]">{s.title}</span>
              </h2>
              {s.blocks.map((b, j) => (
                <BlockView key={j} block={b} />
              ))}
            </section>
          ))}

          <aside
            aria-label="Next step"
            className="flex flex-col items-start gap-4 rounded-[4px] border border-subtle bg-surface px-7 py-[26px] @[720px]:flex-row @[720px]:items-center @[720px]:gap-6"
          >
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-[18px] font-medium text-primary @[720px]:text-[22px]">{cs.cta.title}</p>
              <p className="max-w-[520px] text-[14px] leading-[1.55] text-secondary">{cs.cta.text}</p>
            </div>
            {cs.cta.button.external ? (
              <External
                href={cs.cta.button.href}
                className="shrink-0 rounded-[4px] bg-inverse px-[18px] py-3 text-[14px] font-medium text-on-inverse"
              >
                {cs.cta.button.label}
              </External>
            ) : (
              <a
                href={cs.cta.button.href}
                className="shrink-0 rounded-[4px] bg-inverse px-[18px] py-3 text-[14px] font-medium text-on-inverse"
              >
                {cs.cta.button.label}
              </a>
            )}
          </aside>

          <nav aria-label="More case studies" className="flex flex-col gap-3 @[720px]:flex-row">
            <NavCard link={cs.prev} align="start" />
            <NavCard link={cs.next} align="end" />
          </nav>

          {/* Mobile: project meta sits at the bottom */}
          <div className="lg:hidden">
            <MetaList rows={meta} />
          </div>
        </article>
      </main>
    </div>
  );
}
