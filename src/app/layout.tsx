import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "What Will My Job Be With AI?",
  description:
    "Discover how 50 tech jobs will transform due to AI and learn what you can do to get ahead.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "What Will My Job Be With AI?",
    description:
      "Discover how 50 tech jobs will transform due to AI and learn what you can do to get ahead.",
    url: "https://whatwillmyjobbewithai.com",
    siteName: "What Will My Job Be With AI?",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "What Will My Job Be With AI? - Discover how 50 tech jobs will transform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Will My Job Be With AI?",
    description:
      "Discover how 50 tech jobs will transform due to AI and learn what you can do to get ahead.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <a href="/" className="font-bold text-xl">
                What Will My Job Be With AI?
              </a>
              <ThemeToggle />
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
