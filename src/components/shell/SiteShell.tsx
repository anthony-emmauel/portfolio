import { MakeItYoursCard, MakeItYoursCollapsed } from "@/components/appearance/MakeItYours";
import { Bio, MetaPills, MetaRows, ProfileHeader, SiteLinks } from "./Profile";
import { MobileMenu } from "./MobileMenu";

/**
 * Two-column page shell (Figma "Home · Desktop", 1440): 360px sticky sidebar +
 * main column (80px left inset, 720px track). Below `lg` it collapses to the
 * single-column mobile layout (Figma "Mobile", 390): profile, pills, filters as
 * chips, then the collapsed "Make it yours" row above the content.
 *
 * `filters.list` sits in the sidebar on desktop; `filters.chips` sits above the
 * collapsed widget on mobile.
 */
export function SiteShell({
  filters,
  children,
}: {
  filters?: { list: React.ReactNode; chips: React.ReactNode };
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex">
      {/* Desktop sidebar */}
      <aside data-intro-part="side" className="sticky top-0 hidden h-screen w-[360px] shrink-0 overflow-y-auto border-r border-subtle px-10 pb-9 pt-10 lg:block">
        <div className="flex w-[280px] flex-col gap-[22px]">
          <ProfileHeader asHeading />
          <Bio />
          <MetaRows />
          <SiteLinks />
          <div className="flex w-full flex-col gap-4">
            {filters?.list}
            <MakeItYoursCard />
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <header data-intro-part="main" className="flex flex-col gap-5 px-4 pt-4 lg:hidden">
        <ProfileHeader asHeading trailing={<MobileMenu />} />
        <Bio />
        <MetaPills />
        <SiteLinks />
        <div className="flex flex-col gap-3">
          {filters?.chips}
          <MakeItYoursCollapsed />
        </div>
      </header>

      <main
        data-intro-part="main"
        id="main"
        tabIndex={-1}
        className="min-w-0 flex-1 px-4 pb-10 pt-5 focus:outline-none lg:pb-20 lg:pl-20 lg:pr-10 lg:pt-12"
      >
        <div className="w-full lg:max-w-[720px]">{children}</div>
      </main>
    </div>
  );
}
