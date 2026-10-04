import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SVIRCEVIC.HU",
  description: "Svircevic családi és személyes oldal.",
  metadataBase: new URL("https://svircevic.hu"),
  openGraph: {
    title: "SVIRCEVIC.HU",
    description: "Svircevic családi és személyes oldal.",
    type: "website",
    locale: "hu_HU"
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}
