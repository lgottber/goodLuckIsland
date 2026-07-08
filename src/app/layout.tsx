import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond as CormorantGaramond, DM_Sans as DMSans } from "next/font/google";
import "./globals.css";
import "./home.css";
import { Providers } from "./providers.tsx";
import Footer from "../components/Footer";
import { PageViewTracker } from "../components/PageViewTracker";

const cormorantGaramond = CormorantGaramond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DMSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://goodluckislandcollective.com"),
  title: {
    template: "%s | Good Luck Island Collective",
    default: "Good Luck Island Collective",
  },
  description: "A self-help education platform for Gen X professionals",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable}`} data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
        <PageViewTracker />
        <Footer />
      </body>
    </html>
  );
}
