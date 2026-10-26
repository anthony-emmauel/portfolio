import type { DiffLine } from "@content/types";
import type { Block } from "@content/case-studies/types";

/*
 * Case-study blocks (Figma "v2.3 · Case studies"). Every block is responsive to
 * its container, not the viewport: the 920px desktop layout kicks in once the
 * content column is ≥720px wide (`@[720px]:`), otherwise blocks stack as in the
 * 390px frames. The page wraps content in `@container`.
 */

const mono11 = "font-mono text-[11px] text-tertiary";
const card = "rounded-[4px] border border-subtle bg-surface";

export function Diff({ lines }: { lines: DiffLine[] }) {
  return (
    <ul className="flex flex-col gap-1.5 rounded-eb bg-sunken px-3.5 py-3 font-mono text-[12px]">
      {lines.map((l) => (
        <li key={l.text} className="flex gap-2.5">
          <span aria-hidden className={`tracking-[0.12px] ${l.sign === "+" ? "text-live" : "text-tertiary"}`}>
            {l.sign === "+" ? "+" : "−"}
          </span>
          <span className="sr-only">{l.sign === "+" ? "Added: " : "Removed: "}</span>
          <span className="min-w-0 flex-1 text-primary">{l.text}</span>
        </li>
      ))}
    </ul>
  );
}

function Chip({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "soft" | "inverse" }) {
  const tones = {
    plain: "border border-subtle bg-surface text-primary",
    soft: "border border-transparent bg-accent-soft text-primary",
    inverse: "border border-transparent bg-inverse text-on-inverse",
  };
  return <span className={`inline-flex rounded-[3px] px-2.5 py-1.5 font-mono text-[12px] ${tones[tone]}`}>{children}</span>;
}

function Arrow({ size = 16 }: { size?: 12 | 16 }) {
  return (
    <span aria-hidden className={`font-mono text-tertiary ${size === 12 ? "text-[12px]" : "text-[16px]"}`}>
      <span className="@[720px]:hidden">↓</span>
      <span className="hidden @[720px]:inline">→</span>
    </span>
  );
}

const cols = (n: number) =>
  ({ 2: "@[720px]:grid-cols-2", 3: "@[720px]:grid-cols-3", 4: "@[720px]:grid-cols-4" })[n] ?? "@[720px]:grid-cols-4";

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p
          className={`max-w-[680px] text-secondary ${
            block.lead ? "text-[17px] leading-[1.55]" : "text-[15px] leading-[1.6]"
          }`}
        >
          {block.text}
        </p>
      );

    case "rows":
      return (
        <div className="flex w-full flex-col">
          {block.label && <p className={`${mono11} pb-3`}>{block.label}</p>}
          <dl className="flex flex-col">
            {block.rows.map((r) => (
              <div
                key={r.title}
                className="flex flex-col gap-4 border-t border-subtle py-3.5 text-[14px] last:border-b @[720px]:flex-row @[720px]:gap-6"
              >
                <dt className="font-medium leading-[1.45] text-primary @[720px]:w-[260px] @[720px]:shrink-0">{r.title}</dt>
                <dd className="leading-[1.55] text-secondary @[720px]:flex-1">{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      );

    case "stats":
      return (
        <ul className={`grid w-full grid-cols-1 gap-3 ${cols(block.items.length)}`}>
          {block.items.map((s) => (
            <li key={s.label} className={`${card} flex flex-col gap-1.5 px-[18px] py-4`}>
              <span className="text-[22px] font-medium text-primary @[720px]:text-[32px]">{s.value}</span>
              <span className={mono11}>{s.label}</span>
            </li>
          ))}
        </ul>
      );

    case "chips":
      return (
        <div className="flex w-full flex-col gap-3">
          {block.label && <p className={mono11}>{block.label}</p>}
          <ul className="flex flex-wrap gap-2">
            {block.items.map((c) => (
              <li key={c}>
                <Chip>{c}</Chip>
              </li>
            ))}
          </ul>
        </div>
      );

    case "decision": {
      const rows = [
        { label: "+ DECISION", text: block.decision, muted: false },
        { label: "− REJECTED", text: block.rejected, muted: true },
        { label: "→ WHY", text: block.why, muted: false },
      ];
      return (
        <div className={`${card} w-full`}>
          <p className={`${mono11} px-5 py-2.5`}>KEY DECISION</p>
          <dl>
            {rows.map((r) => (
              <div key={r.label} className="flex flex-col gap-4 border-t border-subtle px-5 py-3.5 @[720px]:flex-row">
                <dt className={`font-mono text-[11px] @[720px]:w-[110px] @[720px]:shrink-0 ${r.muted ? "text-tertiary" : "text-primary"}`}>
                  {r.label}
                </dt>
                <dd className={`text-[14px] leading-[1.55] @[720px]:flex-1 ${r.muted ? "text-tertiary" : "text-secondary"}`}>
                  {r.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      );
    }

    case "pipeline":
      return (
        <ol className="flex w-full flex-col gap-2.5 @[720px]:flex-row @[720px]:items-center">
          {block.steps.map((s, i) => (
            <li key={s.label} className="contents">
              {i > 0 && <Arrow />}
              <div className={`${card} flex flex-col gap-1.5 px-4 py-3.5 font-mono @[720px]:min-w-0 @[720px]:flex-1`}>
                <span className="text-[11px] text-tertiary">{s.label}</span>
                <span className="text-[13px] text-primary">{s.value}</span>
              </div>
            </li>
          ))}
        </ol>
      );

    case "outcomes":
      return (
        <figure className="flex w-full flex-col gap-3">
          <figcaption className={mono11}>{block.label}</figcaption>
          <ul
            className={`grid grid-cols-1 gap-2.5 border border-subtle bg-surface @[720px]:gap-0 ${cols(block.items.length)}`}
          >
            {block.items.map((s, i) => (
              <li
                key={s.label}
                className={`flex flex-col gap-1.5 p-5 ${
                  i > 0 ? "border-t border-subtle @[720px]:border-l @[720px]:border-t-0" : ""
                }`}
              >
                <span className="text-[27px] font-medium text-primary @[720px]:text-[36px]">{s.value}</span>
                <span className="text-[13px] text-secondary">{s.label}</span>
              </li>
            ))}
          </ul>
          {block.note && <p className={mono11}>{block.note}</p>}
        </figure>
      );

    case "checklist":
      return (
        <ul className={`${card} w-full`}>
          {block.items.map((c, i) => (
            <li
              key={c.title}
              className={`flex flex-wrap items-center gap-x-3.5 gap-y-2 px-5 py-3.5 ${i > 0 ? "border-t border-subtle" : ""}`}
            >
              <span aria-hidden className="rounded-[3px] bg-inverse px-2.5 py-1.5 font-mono text-[12px] text-on-inverse">
                ✓
              </span>
              <span className="text-[14px] font-medium text-primary @[720px]:w-[200px]">
                {c.title}
                <span className="sr-only"> — done:</span>
              </span>
              <span className="font-mono text-[13px] text-tertiary">{c.detail}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote className="w-full border-l-2 border-primary pl-6">
          <p className="max-w-[680px] font-serif text-[22px] italic leading-[1.3] text-primary @[720px]:text-[28px]">
            {block.text}
          </p>
        </blockquote>
      );

    case "grid":
      return (
        <ul className={`grid w-full grid-cols-1 gap-3 ${block.items.length === 4 ? "@[720px]:grid-cols-2" : cols(block.items.length)}`}>
          {block.items.map((g) => (
            <li key={g.title} className={`${card} flex flex-col gap-2 px-5 py-[18px]`}>
              <span className={mono11}>{g.eyebrow}</span>
              <span className="text-[15px] font-medium leading-[1.4] text-primary">{g.title}</span>
              <span className="text-[13px] leading-[1.55] text-secondary">{g.text}</span>
            </li>
          ))}
        </ul>
      );

    case "diagram":
      return <Diagram block={block} />;
  }
}

function Diagram({ block }: { block: Extract<Block, { type: "diagram" }> }) {
  const frame = `${card} flex w-full flex-col px-7 py-[26px]`;

  if (block.diagram === "status-badges") {
    return (
      <figure className={`${frame} gap-[22px]`}>
        <div className="flex flex-col gap-4 @[720px]:flex-row @[720px]:items-center @[720px]:gap-7">
          <div className="flex flex-col items-start gap-2.5">
            <p className={mono11}>{block.before.label}</p>
            <Chip>{block.before.chip}</Chip>
          </div>
          <Arrow />
          <div className="flex flex-col gap-[18px]">
            <div className="flex flex-col gap-2">
              <p className={mono11}>{block.status.label}</p>
              <ol className="flex flex-col items-start gap-1.5 @[720px]:flex-row @[720px]:items-center">
                {block.status.flow.map((s, i) => (
                  <li key={s} className="flex flex-col items-start gap-1.5 @[720px]:flex-row @[720px]:items-center">
                    {i > 0 && <Arrow size={12} />}
                    <Chip tone={i === block.status.flow.length - 1 ? "inverse" : "plain"}>{s}</Chip>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-2">
              <p className={mono11}>{block.badges.label}</p>
              <ul className="flex flex-col items-start gap-1.5 @[720px]:flex-row @[720px]:flex-wrap">
                {block.badges.items.map((b) => (
                  <li key={b}>
                    <Chip tone="soft">{b}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <figcaption className={mono11}>{block.foot}</figcaption>
      </figure>
    );
  }

  if (block.diagram === "values-to-token") {
    return (
      <figure className={`${frame} gap-5`}>
        <div className="flex flex-col gap-4 @[720px]:flex-row @[720px]:items-center @[720px]:gap-8">
          <div className="flex flex-col gap-2.5">
            <p className={mono11}>{block.before.label}</p>
            <ul className="flex flex-col gap-2.5">
              {block.before.items.map((v) => (
                <li key={v.name} className={`${card} flex items-center gap-3 px-3 py-2.5 @[720px]:w-[300px]`}>
                  <span aria-hidden className="size-[18px] shrink-0 rounded-[3px]" style={{ background: v.value }} />
                  <span className="flex-1 text-[13px] text-primary">{v.name}</span>
                  <span className="font-mono text-[11px] text-tertiary">{v.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <Arrow />
          <div className="flex flex-col gap-2.5">
            <p className={mono11}>{block.after.label}</p>
            <div className={`${card} flex flex-col gap-2 px-[18px] py-4 @[720px]:w-[320px]`}>
              <span className="flex items-center gap-2.5">
                <span aria-hidden className="size-[18px] shrink-0 rounded-[3px]" style={{ background: block.after.swatch }} />
                <span className="font-mono text-[14px] text-primary">{block.after.token}</span>
              </span>
              <span className={mono11}>{block.after.alias}</span>
              <span className={mono11}>{block.after.usedBy}</span>
            </div>
          </div>
        </div>
        <figcaption className={mono11}>{block.foot}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={frame}>
      <div className={`${mono11} flex flex-col gap-4 pb-3 @[720px]:flex-row @[720px]:gap-6`}>
        <p className="@[720px]:w-[340px]">{block.head[0]}</p>
        <span aria-hidden className="hidden w-5 @[720px]:block" />
        <p>{block.head[1]}</p>
      </div>
      <ol>
        {block.rows.map((r) => (
          <li
            key={r.stage}
            className="flex flex-col gap-4 border-t border-subtle py-3 @[720px]:flex-row @[720px]:items-center @[720px]:gap-6"
          >
            <span className="font-mono text-[12px] text-tertiary @[720px]:w-[340px] @[720px]:shrink-0">{r.events}</span>
            <Arrow />
            <span className="flex flex-wrap items-center gap-2.5">
              <span aria-hidden className="size-2 rounded-full bg-inverse" />
              <span className="text-[15px] font-medium text-primary">{r.stage}</span>
              {r.flag && <Chip tone="soft">{r.flag}</Chip>}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className={`${mono11} pt-3`}>{block.foot}</figcaption>
    </figure>
  );
}
