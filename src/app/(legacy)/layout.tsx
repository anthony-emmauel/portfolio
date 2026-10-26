import { Inter } from "next/font/google";
import "./legacy.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AnimateSections from "@/components/AnimateSections";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Pre-v2.3 chrome for /about (kept) and the old /work pages (replaced in stage 3).
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`legacy-root ${inter.variable} min-h-screen bg-black text-white antialiased`}
      style={{ fontFamily: "var(--font-inter), 'Inter', system-ui, sans-serif" }}
    >
      <Nav />
      <AnimateSections />
      <main id="main" className="pt-14">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
