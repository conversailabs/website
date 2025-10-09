import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/utilities/ErrorBoundary";
import GoogleAnalytics from "@/components/tracking/GoogleAnalytics";
import MicrosoftClarity from "@/components/tracking/MicrosoftClarity";
import FacebookSDK from "@/components/tracking/FacebookSDK";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production'
    ? 'https://conversailabs.com'
    : 'http://localhost:3002'),
  title: {
    default: "Voice AI Platform for Customer Operations | ConversAI Labs",
    template: "%s | ConversAI Labs"
  },
  description: "ConversAI Labs helps businesses automate conversations with AI across voice, WhatsApp, email and more, increasing customer satisfaction and reducing response times.",
  keywords: ["voice ai platform", "ai phone agent", "conversation intelligence", "customer operations AI", "voice automation", "AI customer service", "conversational AI"],
  authors: [{ name: "ConversAI Labs" }],
  creator: "ConversAI Labs",
  publisher: "ConversAI Labs",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://conversailabs.com',
    title: 'Voice AI Platform for Customer Operations | ConversAI Labs',
    description: 'ConversAI Labs helps businesses automate conversations with AI across voice, WhatsApp, email and more, increasing customer satisfaction and reducing response times.',
    siteName: 'ConversAI Labs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ConversAI Labs - Voice AI Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voice AI Platform for Customer Operations | ConversAI Labs',
    description: 'ConversAI Labs helps businesses automate conversations with AI across voice, WhatsApp, email and more, increasing customer satisfaction and reducing response times.',
    images: ['/og-image.jpg'],
    creator: '@conversailabs',
  },
  alternates: {
    canonical: 'https://conversailabs.com',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: '/apple-icon.svg',
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
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        <FacebookSDK />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <MicrosoftClarity projectId={process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID} />
        )}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
