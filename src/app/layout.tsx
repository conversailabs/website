import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/utilities/ErrorBoundary";
import GoogleAnalytics from "@/components/tracking/GoogleAnalytics";
import MicrosoftClarity from "@/components/tracking/MicrosoftClarity";
import FacebookSDK from "@/components/tracking/FacebookSDK";

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
  title: "Accelerating AI-Powered Conversations",
  description: "ConversAI Labs helps businesses automate conversations with AI across voice, WhatsApp, email and more, increasing customer satisfaction and reducing response times.",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
