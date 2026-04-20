import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emmanuel Anthony — Product Designer & Design Engineer",
  description:
    "I design products, then I build them. Product Designer and Design Engineer crafting digital experiences that bridge the gap between design and code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-black text-white`}
      >
        <Nav />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
