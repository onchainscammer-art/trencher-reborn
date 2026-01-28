import type { Metadata } from "next";
import { Nosifer, Press_Start_2P } from "next/font/google";
import "./globals.css";

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-glitch",
});

export const metadata: Metadata = {
  title: "THE LITTLE TRENCHER THAT COULDN'T",
  description: "THE MARKET IS RIGGED BUT WE BALL. JUST FARM IT.",
  icons: {
    icon: "/evidence/enginememe5logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nosifer.variable} ${pressStart.variable} noise-bg scanlines`}>
        {children}
      </body>
    </html>
  );
}
