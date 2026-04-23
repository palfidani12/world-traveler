import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-text">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
