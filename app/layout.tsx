import type { Metadata } from "next";
import { Geist, Geist_Mono, Zain } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const zain = Zain({
  variable: "--font-zain",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "JobPortal - Find Your Dream Job",
  description:
    "Discover and apply to thousands of job opportunities. Search jobs by location, experience level, and job type. Connect with top employers worldwide.",
  keywords: [
    "jobs",
    "careers",
    "employment",
    "job search",
    "hiring",
    "recruitment",
    "job portal",
    "career opportunities",
  ],
  authors: [{ name: "JobPortal Team" }],
  creator: "JobPortal",
  publisher: "JobPortal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jobportal-nu-three.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JobPortal - Find Your Dream Job",
    description:
      "Discover and apply to thousands of job opportunities. Search jobs by location, experience level, and job type.",
    url: "https://jobportal-nu-three.vercel.app",
    siteName: "JobPortal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "JobPortal - Find Your Dream Job",
    description:
      "Discover and apply to thousands of job opportunities. Search jobs by location, experience level, and job type.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BK1Z79VXKC"
        />
        <Script id="google-analytics">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-BK1Z79VXKC');
`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zain.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
