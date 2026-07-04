import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sarı Site - Türkiye'nin En Büyük İlan Platformu",
  description: "Emlak, vasıta, alışveriş ve daha fazlası için ücretsiz ilan platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
