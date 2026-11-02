import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/lib/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://daxtera.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Daxtera — Ground truth for physical AI",
    template: "%s — Daxtera",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    title: "Daxtera — Ground truth for physical AI",
    description: site.description,
    url: "/",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Daxtera — Ground truth for physical AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daxtera — Ground truth for physical AI",
    description: site.description,
    images: ["/og/home.png"],
  },
  icons: {
    icon: "/brand/daxtera-icon.png",
    apple: "/brand/daxtera-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#A55704",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  legalName: site.name,
  url: SITE_URL,
  description: site.description,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/brand/daxtera-icon.png`,
    width: 512,
    height: 512,
  },
  knowsAbout: [
    "Physical AI",
    "Real-world data",
    "Simulation calibration",
    "Benchmarking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bench text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <SkipLink />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
