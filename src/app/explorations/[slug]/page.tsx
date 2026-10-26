import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@content/site";
import { ExplorationModal } from "@/components/explore/ExplorationModal";
import { HomeView } from "@/components/feed/HomeView";
import { explorations, getExploration } from "@/lib/explorations";

type Props = { params: { slug: string } };

export const dynamicParams = false;
export const revalidate = 86400;
export const generateStaticParams = () => explorations.map((e) => ({ slug: e.slug }));

export function generateMetadata({ params }: Props): Metadata {
  const e = getExploration(params.slug);
  if (!e) return {};
  const title = `${e.title} — ${site.name}`;
  const description = e.modal?.context ?? e.summary;
  const image = { url: "/opengraph-image.png", width: 1200, height: 630, alt: site.name };
  return {
    title,
    description,
    alternates: { canonical: `/explorations/${e.slug}` },
    openGraph: { url: `/explorations/${e.slug}`, siteName: site.name, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

/** Direct visit / shared link: the Explorations view with the modal open on top. */
export default function ExplorationPage({ params }: Props) {
  const entry = getExploration(params.slug);
  if (!entry) notFound();
  return (
    <>
      <HomeView initialFilter="explorations" />
      <ExplorationModal entry={entry} all={explorations} mode="page" />
    </>
  );
}
