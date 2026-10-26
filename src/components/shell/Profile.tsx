import Image from "next/image";
import { site } from "@content/site";
import { LocalTime } from "./LocalTime";

function StatusDot() {
  return <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-live" />;
}

/** Avatar + name + role. Desktop 48px avatar, mobile 44px with a MENU slot. */
export function ProfileHeader({ trailing }: { trailing?: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex min-w-0 flex-1 items-center gap-2.5 lg:gap-3">
        <Image
          src="/avatar/avatar-192.png"
          alt=""
          width={48}
          height={48}
          priority
          className="size-11 shrink-0 rounded-full lg:size-12"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-px lg:gap-0.5">
          <p className="text-[15px] font-medium text-primary lg:text-[16px]">{site.name}</p>
          <p className="text-[12px] text-secondary">{site.role}</p>
        </div>
      </div>
      {trailing}
    </div>
  );
}

export function Bio() {
  return (
    <p className="text-[16px] leading-[1.5] text-primary lg:text-[15px] lg:leading-[1.55]">
      {site.bio}
    </p>
  );
}

/** Desktop: labelled rows with top borders. */
export function MetaRows() {
  const rows: { label: string; value: React.ReactNode; align?: "start" }[] = [
    { label: "NOW", value: site.meta.now, align: "start" },
    { label: "FOCUS", value: site.meta.focus },
    {
      label: "STATUS",
      value: (
        <span className="flex items-center gap-[7px]">
          {site.status.open && <StatusDot />}
          {site.status.label}
        </span>
      ),
    },
    {
      label: "BASED",
      value: (
        <>
          {site.location.city} · <LocalTime timeZone={site.location.timeZone} />
        </>
      ),
    },
  ];

  return (
    <dl className="flex w-full flex-col">
      {rows.map((r) => (
        <div
          key={r.label}
          className={`flex w-full justify-between gap-4 border-t border-subtle py-2.5 ${
            r.align === "start" ? "items-start" : "items-center"
          }`}
        >
          <dt className="font-mono text-[10px] tracking-[0.2px] text-tertiary">{r.label}</dt>
          <dd className="text-right text-[12px] text-secondary">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Mobile: the same facts as wrapping pills. In Figma the NOW pill is 2px wider
 * than the 358px column and stays on one line, so pills don't wrap from 380px up.
 */
export function MetaPills() {
  const pill = "flex items-center gap-1.5 rounded-full border border-subtle bg-surface px-2.5 py-1.5 text-[12px] text-secondary min-[380px]:whitespace-nowrap";
  return (
    <ul className="flex flex-wrap gap-1.5">
      <li className={pill}>{site.meta.now}</li>
      <li className={pill}>{site.meta.focus}</li>
      <li className={pill}>
        {site.status.open && <StatusDot />}
        {site.status.label}
      </li>
      <li className={pill}>
        {site.location.city} <LocalTime timeZone={site.location.timeZone} />
      </li>
    </ul>
  );
}

export function SiteLinks() {
  return (
    <ul className="flex gap-3.5 text-[12px] text-secondary">
      {site.links.map((l) => {
        const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
        return (
          <li key={l.label}>
            <a
              href={l.href}
              className="hover:text-primary"
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {l.label} <span aria-hidden>↗</span>
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
