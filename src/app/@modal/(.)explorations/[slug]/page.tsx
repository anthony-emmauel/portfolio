import { notFound } from "next/navigation";
import { ExplorationModal } from "@/components/explore/ExplorationModal";
import { explorations, getExploration } from "@/lib/explorations";

/** In-app navigation to /explorations/<slug>: the modal opens over the current page. */
export default function InterceptedExploration({ params }: { params: { slug: string } }) {
  const entry = getExploration(params.slug);
  if (!entry) notFound();
  return <ExplorationModal entry={entry} all={explorations} mode="intercept" />;
}
