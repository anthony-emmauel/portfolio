import { site } from "../site";

// TODO(v2.3): confirm where "Request a walkthrough" should go (email for now).
export const walkthroughHref = (title: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(`Walkthrough: ${title}`)}`;
