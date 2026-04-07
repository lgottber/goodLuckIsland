import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./home.css";
import { Providers } from "./providers.tsx";

export const metadata: Metadata = {
  title: "Good Luck Island Collective",
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
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
