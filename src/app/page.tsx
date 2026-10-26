import { SiteShell } from "@/components/shell/SiteShell";

// Stage 1 (tokens + layout). The changelog feed and filters land in stage 2.
export default function Home() {
  return (
    <SiteShell>
      <div className="flex w-full justify-between border-b border-subtle pb-3 font-mono text-[11px] text-tertiary">
        <span>changelog</span>
        <span>FEED · STAGE 2</span>
      </div>
    </SiteShell>
  );
}
