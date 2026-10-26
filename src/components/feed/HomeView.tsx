import { notes } from "@content/notes";
import { SiteShell } from "@/components/shell/SiteShell";
import { loadFeed } from "@/lib/entries";
import type { FilterId } from "@/lib/feed";
import { Changelog } from "./Changelog";
import { FeedProvider } from "./FeedState";
import { Filters } from "./Filters";
import { IntroOverlay } from "./IntroOverlay";

/** The changelog home. Also rendered under a directly-opened exploration. */
export async function HomeView({ initialFilter }: { initialFilter?: FilterId }) {
  const { entries, counts, latestReleaseSlug } = await loadFeed();
  return (
    <FeedProvider initial={initialFilter}>
      <SiteShell
        filters={{
          list: <Filters layout="list" counts={counts} />,
          chips: <Filters layout="chips" counts={counts} />,
        }}
      >
        <Changelog entries={entries} counts={counts} notes={notes} latestReleaseSlug={latestReleaseSlug} />
      </SiteShell>
      <IntroOverlay />
    </FeedProvider>
  );
}
