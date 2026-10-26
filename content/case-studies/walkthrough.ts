import { site } from "../site";

// "Request a walkthrough" (NDA notice bar + closing CTA). Desktop browsers only
// open mailto: links when a mail app is set up, so the button offers Gmail and
// copy-address as well (see src/components/case/WalkthroughButton.tsx).
export function walkthrough(title: string) {
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
  const q = (params: Record<string, string>) => new URLSearchParams(params).toString().replace(/\+/g, "%20");
  return {
    email: site.email,
    mailto: `mailto:${site.email}?${q({ subject, body })}`,
    gmail: `https://mail.google.com/mail/?${q({ view: "cm", fs: "1", to: site.email, su: subject, body })}`,
  };
}

export const walkthroughHref = (title: string) => walkthrough(title).mailto;
