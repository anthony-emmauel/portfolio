import { HomeView } from "@/components/feed/HomeView";

// Rebuild daily so new Medium posts appear even without a content commit.
export const revalidate = 86400;

export default function Home() {
  return <HomeView />;
}
