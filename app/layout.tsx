import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalyan & Sravanthi | Wedding Invitation",
  description: "A celebration of love, family, and tradition."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
