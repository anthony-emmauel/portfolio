import { site } from "../site";

// "Request a walkthrough" (NDA notice bar + closing CTA) opens an email to me
// with the case study in the subject and a short template to fill in.
export const walkthroughHref = (title: string) => {
  const subject = `Walkthrough: ${title}`;
  const body = [
    "Hi Emmanuel,",
    "",
    `I'd like a 30-minute walkthrough of ${title}.`,
    "",
    "Name:",
    "Company / role:",
    "A few times that work for me:",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
