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
  metadataBase: new URL("https://babilfinance.com"),
  title: "Babil — Personal finance tracker",
  description:
    "Run yourself like a one-person company. Babil pulls every account, every work day, and every spending pattern into one clear view.",
  openGraph: {
    title: "Babil — Personal finance tracker",
    description:
      "Run yourself like a one-person company. Babil pulls every account, every work day, and every spending pattern into one clear view.",
    url: "https://babilfinance.com",
    siteName: "Babil",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Babil — Personal finance tracker",
    description:
      "Run yourself like a one-person company. See what's earning, what's draining, and what to change next.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
