// Site-wide copy and config. Copy marked EXACT must not be reworded.

export const site = {
  name: "Emmanuel Anthony",
  role: "Senior product designer · design systems, ops tools & design engineering",
  // EXACT
  bio: "6 years in product design, 4 on an enterprise ops platform: 100+ agents, 20,000+ orders a day, on platforms that processed $25M+ in transactions. I design the systems behind it, and I build in code.",
  url: "https://emmanuelanthony.site",

  /** Version of the oldest entry; every later entry bumps from here. */
  startVersion: "3.0.0",

  /** Writing filter shows Medium posts from this date on (older posts stay stored). */
  writing: { since: "2026-01-01", feed: "https://medium.com/feed/@antorneejnr" },

  meta: {
    // EXACT
    now: "Senior Product Designer · Scrums.com, embedded at OneCart",
    focus: "Design systems · ops tools",
  },

  status: {
    open: true,
    label: "Open to senior roles · remote / hybrid",
  },

  location: { city: "Lisbon", timeZone: "Europe/Lisbon" },

  links: [
    { label: "Email", href: "mailto:antorneejnr@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/emmanuel-anthony-639b07122/" },
    { label: "GitHub", href: "https://github.com/anthony-emmauel" },
    { label: "CV", href: "/resume/Emmanuel Anthony CVpdf.pdf" },
  ],

  credit: {
    long: "BUILT ON NOKGRIDCORE TOKENS · DESIGNED AND CODED BY ME",
    short: "BUILT ON NOKGRIDCORE TOKENS · CODED BY ME",
  },
} as const;
