import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Solutions for Every Industry - Voice AI Platform',
  description: 'Discover industry-specific AI voice agents for healthcare, education, real estate, finance, and more. HIPAA-compliant, 24/7 availability, and tailored workflows.',
  keywords: ['industry ai solutions', 'healthcare voice ai', 'education ai assistant', 'real estate ai', 'finance ai automation', 'voice ai by industry'],
  openGraph: {
    title: 'AI Solutions for Every Industry | ConversAI Labs',
    description: 'Discover industry-specific AI voice agents for healthcare, education, real estate, finance, and more.',
    url: 'https://conversailabs.com/industries',
    type: 'website',
    images: [
      {
        url: 'https://conversailabs.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ConversAI Labs - AI Voice Agents for Every Industry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solutions for Every Industry | ConversAI Labs',
    description: 'Discover industry-specific AI voice agents for healthcare, education, real estate, finance, and more.',
    images: ['https://conversailabs.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://conversailabs.com/industries',
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
