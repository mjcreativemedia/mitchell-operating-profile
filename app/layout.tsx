import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mitchell Argamasilla — Software Developer & Builder",
  description: "The operating profile of Mitchell Argamasilla: software, operations, maintenance, delivery intelligence, physical performance, and practical problem solving in Chicago.",
  openGraph: {
    title: "Mitchell Argamasilla — Software Developer & Builder",
    description: "A builder across software, operations, maintenance, delivery, and practical systems in Chicago.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Mitchell Argamasilla operating profile" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mitchell Argamasilla — Software Developer & Builder",
    description: "A builder across software, operations, maintenance, delivery, and practical systems in Chicago.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/profile.jpeg",
    shortcut: "/profile.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
