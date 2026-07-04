import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SarıSite - Türkiye'nin En Büyük İlan Platformu",
  description: "Emlak, vasıta, alışveriş ve daha fazlası için binlerce ilan. Hemen ücretsiz üye ol.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#f0f0f0] antialiased">
        {children}
      </body>
    </html>
  );
}
