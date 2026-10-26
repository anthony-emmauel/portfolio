import { notes } from "@content/notes";
import { SiteShell } from "@/components/shell/SiteShell";
import { FeedProvider } from "@/components/feed/FeedState";
import { Filters } from "@/components/feed/Filters";
import { Changelog } from "@/components/feed/Changelog";
import { counts, entries, latestReleaseSlug } from "@/lib/entries";

// Rebuild daily so new Medium posts appear even without a content commit.
export const revalidate = 86400;

export default function Home() {
  return (
    <FeedProvider>
      <SiteShell
        filters={{
          list: <Filters layout="list" counts={counts} />,
          chips: <Filters layout="chips" counts={counts} />,
        }}
      >
        <Changelog entries={entries} counts={counts} notes={notes} latestReleaseSlug={latestReleaseSlug} />
      </SiteShell>
    </FeedProvider>
  );
}
