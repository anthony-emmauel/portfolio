import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Newsreader } from "next/font/google";
import "./globals.css";
import { AppearanceProvider } from "@/components/appearance/AppearanceProvider";
import { appearanceBootScript } from "@/lib/appearance";
import { site } from "@content/site";

// Testimonial quotes (Figma: Newsreader Italic 400).
const newsreader = Newsreader({
  subsets: ["latin"],
  style: "italic",
  // Variable font with optical sizing, like Figma: the 28px quote uses a different cut than 17px notes.
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Senior Product Designer`,
  description: site.bio,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    // data-theme / data-accent / --eb-radius are set by the boot script before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceBootScript }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable} bg-page font-sans text-primary`}>
        <a
          href="#main"
          className="sr-only z-50 rounded-eb bg-accent px-3 py-2 text-[13px] text-accent-on focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <AppearanceProvider>
          {children}
          {modal}
        </AppearanceProvider>
      </body>
    </html>
  );
}
