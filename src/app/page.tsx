import { HomeView } from "@/components/feed/HomeView";

// Regenerate daily (ISR) so new Medium posts appear even before the sync commits them.
export const revalidate = 86400;

export default function Home() {
  return <HomeView />;
}
