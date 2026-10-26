import Image from "next/image";
import { CoverMedia } from "@/components/media/CoverMedia";
import Link from "next/link";
import type {
  DiffLine,
  ExplorationEntry,
  Note,
  NoteEntry,
  ReleaseEntry,
  Versioned,
  WritingEntry,
} from "@content/types";
import { formatEntryDate } from "@/lib/feed";

/*
 * One changelog row. Desktop (lg): 100px gutter with version + date, then the
 * body with the timeline as its left border. Mobile: no gutter — version and
 * "DATE · TYPE" sit on a row inside the body.
 */

const TYPE_LABEL = { release: "RELEASE", exploration: "EXPLORATION", writing: "WRITING", note: "NOTES" } as const;

function Marker({ size, filled }: { size: "release" | "patch"; filled?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute rounded-full ${
        filled ? "bg-accent" : "border-[1.5px] border-strong bg-page"
      } ${
        size === "release"
          ? "-left-1 top-7 size-[9px] lg:left-24 lg:top-[29px]"
          : "-left-[3px] top-5 size-[7px] lg:left-[97px] lg:top-[21px]"
      }`}
    />
  );
}

function VersionTag({ version, latest }: { version: string; latest: boolean }) {
  return (
    <span
      // The intro's v4.3.0 tag flies to whichever of these is visible (FLIP target).
      data-intro-target={latest || undefined}
      className={`inline-flex rounded-eb px-[7px] py-[3px] font-mono text-[11px] tracking-[0.11px] ${
        latest ? "bg-accent text-accent-on" : "bg-sunken text-primary"
      }`}
    >
      {version}
    </span>
  );
}

function Row({
  entry,
  latest,
  children,
}: {
  entry: Versioned;
  latest: boolean;
  children: React.ReactNode;
}) {
  const release = entry.type === "release";
  const date = formatEntryDate(entry);
  const typeLabel = entry.type === "exploration" && entry.kind === "side project" ? "SIDE PROJECT" : TYPE_LABEL[entry.type];

  return (
    <article className="relative flex" aria-labelledby={`${entry.type}-${entry.slug}`}>
      {/* Desktop gutter */}
      <div
        className={`hidden w-[100px] shrink-0 flex-col gap-1.5 font-mono lg:flex ${release ? "pt-6" : "pt-[18px]"}`}
      >
        {release ? (
          <span>
            <VersionTag version={entry.version} latest={latest} />
          </span>
        ) : (
          <span className="text-[11px] text-secondary">{entry.version}</span>
        )}
        <span className="text-[9px] tracking-[0.09px] text-tertiary">{date}</span>
      </div>

      <div
        data-intro-line={latest || undefined}
        className={`flex min-w-0 flex-1 flex-col border-l border-strong pl-4 lg:pl-6 ${
          release ? "gap-3 pb-[30px] pt-[22px] lg:gap-3.5 lg:pb-10 lg:pt-7" : "gap-3 pb-5 pt-4 lg:gap-2.5 lg:pb-6 lg:pt-[18px]"
        }`}
      >
        {/* Mobile version row */}
        <p className="flex items-center gap-2 font-mono lg:hidden">
          {release ? (
            <VersionTag version={entry.version} latest={latest} />
          ) : (
            <span className="text-[11px] text-secondary">{entry.version}</span>
          )}
          <span className="text-[9px] tracking-[0.09px] text-tertiary">
            {date} · {typeLabel}
          </span>
        </p>
        {children}
      </div>

      <Marker size={release ? "release" : "patch"} filled={latest} />
    </article>
  );
}

/** Desktop-only label row above a card: "EXPLORATION · DASHBOARD  Title". */
function DesktopLabel({ label, title }: { label: string; title?: string }) {
  return (
    <p className="hidden items-center gap-2 lg:flex">
      <span className={`font-mono text-[10px] tracking-[0.2px] ${title ? "text-secondary" : "text-tertiary"}`}>
        {label}
      </span>
      {title && <span className="text-[14px] font-medium text-primary">{title}</span>}
    </p>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="pt-1 lg:pt-1.5">
      <span className="inline-flex rounded-eb bg-accent px-[9px] py-1 font-mono text-[10px] tracking-[0.1px] text-accent-on">
        {children}
      </span>
    </span>
  );
}

function Diff({ label, lines }: { label?: string; lines: DiffLine[] }) {
  return (
    <>
      {label && <p className="font-mono text-[9px] tracking-[0.09px] text-tertiary lg:text-[10px] lg:tracking-[0.2px]">{label}</p>}
      <ul className="flex flex-col gap-[5px] rounded-eb bg-sunken px-3 py-2.5 font-mono text-[11px] lg:gap-1.5 lg:px-3.5 lg:py-3 lg:text-[12px]">
        {lines.map((l) => (
          <li key={l.text} className="flex gap-2 lg:gap-2.5">
            <span aria-hidden className={`tracking-[0.12px] ${l.sign === "+" ? "text-live" : "text-tertiary"}`}>
              {l.sign === "+" ? "+" : "−"}
            </span>
            <span className="sr-only">{l.sign === "+" ? "Added: " : "Removed: "}</span>
            <span className="min-w-0 flex-1 text-primary">{l.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Release and exploration card. The title link stretches over the whole card. */
function MediaCard({
  entry,
  href,
  badge,
  tag,
  coverIndex,
}: {
  entry: Versioned<ReleaseEntry> | Versioned<ExplorationEntry>;
  href: string;
  badge: string;
  tag?: string;
  /** Position among the covers in the current view: drives eager loading and the intro's skeleton stagger. */
  coverIndex: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-eb border border-subtle bg-surface transition-colors hover:border-strong">
      <div aria-hidden className="relative aspect-[596/373] bg-stage">
        <CoverMedia
          poster={entry.cover}
          video={entry.coverVideo?.src}
          startAt={entry.coverVideo?.startAt}
          priority={coverIndex === 0}
          sizes="(min-width: 1024px) 596px, calc(100vw - 48px)"
        />
        <span className="intro-skeleton" style={{ "--i": coverIndex } as React.CSSProperties} />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-eb bg-surface px-2 py-1 font-mono text-[10px] tracking-[0.1px] text-primary lg:left-3 lg:top-3">
          <span className="size-1.5 rounded-full bg-accent" />
          {badge}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-3.5 pb-3.5 pt-3 lg:gap-2 lg:px-[18px] lg:pb-[18px] lg:pt-4">
        <h3
          id={`${entry.type}-${entry.slug}`}
          className="text-[19px] font-medium tracking-[-0.19px] text-primary lg:text-[22px] lg:tracking-[-0.22px]"
        >
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-primary">
            {entry.title}
          </Link>
        </h3>
        <p className="text-[13px] leading-[1.5] text-secondary lg:text-[14px]">
          {entry.summaryShort ? (
            <>
              <span className="lg:hidden">{entry.summaryShort}</span>
              <span className="hidden lg:inline">{entry.summary}</span>
            </>
          ) : (
            entry.summary
          )}
        </p>
        <p className="font-mono text-[11px] text-secondary">{entry.role}</p>
        {tag && <Tag>{tag}</Tag>}
      </div>
    </div>
  );
}

export function ReleaseItem({
  entry,
  latest,
  coverIndex,
}: {
  entry: Versioned<ReleaseEntry>;
  latest: boolean;
  coverIndex: number;
}) {
  return (
    <Row entry={entry} latest={latest}>
      <DesktopLabel label={`RELEASE · ${entry.kind.toUpperCase()}`} />
      <MediaCard
        entry={entry}
        href={`/work/${entry.slug}`}
        badge={entry.nda ? "CASE STUDY · NDA" : "CASE STUDY"}
        tag={entry.tag}
        coverIndex={coverIndex}
      />
      {entry.diff && <Diff label={entry.diffLabel} lines={entry.diff} />}
    </Row>
  );
}

export function ExplorationItem({ entry, coverIndex }: { entry: Versioned<ExplorationEntry>; coverIndex: number }) {
  if (entry.kind === "side project") return <SideProjectItem entry={entry} />;
  return (
    <Row entry={entry} latest={false}>
      <DesktopLabel label={`EXPLORATION · ${entry.kind.toUpperCase()}`} title={entry.title} />
      <MediaCard
        entry={entry}
        href={`/explorations/${entry.slug}`}
        badge="EXPLORATION"
        tag={entry.tag}
        coverIndex={coverIndex}
      />
    </Row>
  );
}

function SideProjectItem({ entry }: { entry: Versioned<ExplorationEntry> }) {
  return (
    <Row entry={entry} latest={false}>
      <DesktopLabel label="SIDE PROJECT" title={entry.title} />
      <div className="flex items-center gap-3 rounded-eb border border-subtle bg-surface py-2.5 pl-2.5 pr-3 lg:gap-4 lg:py-3 lg:pl-3 lg:pr-4">
        <div aria-hidden className="relative h-16 w-24 shrink-0 overflow-hidden rounded-eb bg-sunken lg:h-[94px] lg:w-[150px]">
          <Image
            src={entry.cover}
            alt=""
            width={134}
            height={86}
            className="absolute left-1.5 top-1.5 h-[58px] w-[84px] object-contain lg:left-2 lg:top-2 lg:h-[86px] lg:w-[134px]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-[5px]">
          <h3 id={`${entry.type}-${entry.slug}`} className="text-[15px] font-medium text-primary lg:sr-only">
            {entry.title}
          </h3>
          <p className="hidden text-[14px] text-secondary lg:block">{entry.summary}</p>
          <p className="font-mono text-[11px] text-secondary">
            <span className="lg:hidden">{entry.roleShort ?? entry.role}</span>
            <span className="hidden lg:inline">{entry.role}</span>
          </p>
          <p className="flex gap-3.5 text-[13px] font-medium text-primary lg:pt-0.5">
            {entry.links?.live && (
              <a href={entry.links.live} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Visit live <span aria-hidden>↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            <Link href={`/explorations/${entry.slug}`} className="hidden hover:underline lg:inline">
              Notes <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </Row>
  );
}

export function WritingItem({ entry }: { entry: Versioned<WritingEntry> }) {
  return (
    <Row entry={entry} latest={false}>
      <DesktopLabel label="WRITING" title={entry.title} />
      <div className="relative flex flex-col gap-1.5 rounded-eb border border-subtle bg-surface px-3.5 pb-3.5 pt-3 transition-colors hover:border-strong lg:gap-2 lg:px-[18px] lg:py-4">
        <p className="font-mono text-[10px] tracking-[0.2px] text-tertiary">
          {entry.kind.toUpperCase()} · {entry.readingMinutes} MIN READ
        </p>
        <h3
          id={`${entry.type}-${entry.slug}`}
          className="text-[17px] font-medium tracking-[-0.17px] text-primary lg:text-[19px] lg:tracking-[-0.19px]"
        >
          {entry.title}
        </h3>
        <p className="text-[13px] leading-[1.5] text-secondary lg:text-[14px]">{entry.excerpt}</p>
        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium text-primary after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline after:focus-visible:outline-2 after:focus-visible:-outline-offset-2 after:focus-visible:outline-primary"
        >
          Read on Medium <span aria-hidden>↗</span>
          <span className="sr-only">: {entry.title} (opens in a new tab)</span>
        </a>
      </div>
    </Row>
  );
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Quote({ note, size }: { note: Note; size: "group" | "full" }) {
  return (
    <blockquote
      className={`font-serif italic leading-[1.4] text-primary ${
        size === "group" ? "text-[15px] lg:text-[17px]" : "text-[17px]"
      }`}
    >
      “{note.quote}”
    </blockquote>
  );
}

/** Collapsed: first note, avatars of the rest and "Read all". Expanded (Notes filter): every note. */
export function NotesItem({
  entry,
  notes,
  expanded,
  onReadAll,
}: {
  entry: Versioned<NoteEntry>;
  notes: Note[];
  expanded: boolean;
  onReadAll: () => void;
}) {
  const [first, ...rest] = notes;
  const companies = [...new Set(rest.map((n) => n.company))];
  const companyList =
    companies.length > 1 ? `${companies.slice(0, -1).join(", ")} and ${companies.at(-1)}` : companies[0];

  return (
    <Row entry={entry} latest={false}>
      <DesktopLabel label="NOTES" title={`${notes.length} ${entry.title}`} />
      <h3 id={`${entry.type}-${entry.slug}`} className="sr-only">
        {notes.length} {entry.title}
      </h3>
      {expanded ? (
        <ul className="flex flex-col gap-2.5">
          {notes.map((n) => (
            <li key={n.name}>
              <figure className="flex flex-col gap-3 rounded-eb border border-subtle bg-surface px-[19px] py-[18px]">
                <Quote note={n} size="full" />
                <figcaption className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium text-primary">{n.name}</span>
                  <span className="text-[12px] text-tertiary">
                    {n.role}, {n.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <figure className="flex flex-col gap-2.5 rounded-eb border border-subtle bg-surface px-3.5 pb-3.5 pt-3 lg:gap-3 lg:px-[18px] lg:py-4">
          <Quote note={first} size="group" />
          <figcaption className="text-[12px] text-tertiary lg:flex lg:flex-col lg:gap-px">
            <span className="lg:text-[13px] lg:font-medium lg:text-primary">{first.name}</span>
            <span className="lg:hidden"> · </span>
            <span>
              {first.role}, {first.company}
            </span>
          </figcaption>
          <div className="flex items-center justify-between lg:border-t lg:border-subtle lg:pt-3">
            <div className="hidden items-center gap-2.5 lg:flex">
              <span aria-hidden className="flex">
                {rest.map((n) => (
                  <span
                    key={n.name}
                    className="-mr-1.5 flex size-[26px] items-center justify-center rounded-full border border-[color:var(--bg-surface)] bg-sunken font-mono text-[9px] text-secondary last:mr-0"
                  >
                    {initials(n.name)}
                  </span>
                ))}
              </span>
              <span className="text-[12px] text-secondary">
                +{rest.length} more from {companyList}
              </span>
            </div>
            <button type="button" onClick={onReadAll} className="text-[13px] font-medium text-primary hover:underline">
              Read all {notes.length}
              <span className="lg:hidden"> notes</span> <span aria-hidden>→</span>
            </button>
          </div>
        </figure>
      )}
    </Row>
  );
}
