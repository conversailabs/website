import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description: 'Get in touch with ConversAI Labs. Schedule a demo, contact sales, or reach our support team. We are here to help transform your customer operations.',
  keywords: ['contact conversai labs', 'schedule demo', 'voice ai demo', 'customer support'],
  openGraph: {
    title: 'Contact Us - Get in Touch | ConversAI Labs',
    description: 'Get in touch with ConversAI Labs. Schedule a demo, contact sales, or reach our support team.',
    url: 'https://conversailabs.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch | ConversAI Labs',
    description: 'Get in touch with ConversAI Labs. Schedule a demo, contact sales, or reach our support team.',
  },
  alternates: {
    canonical: 'https://conversailabs.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
