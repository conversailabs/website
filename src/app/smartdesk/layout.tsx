import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SmartDesk - AI-Powered Customer Support Platform',
  description: 'Elevate your customer support with SmartDesk. AI-powered helpdesk that automates responses, resolves tickets faster, and improves customer satisfaction.',
  keywords: ['ai helpdesk', 'customer support ai', 'automated support', 'ai ticket management', 'smart customer service'],
  openGraph: {
    title: 'SmartDesk - AI-Powered Customer Support Platform | ConversAI Labs',
    description: 'Elevate your customer support with SmartDesk. AI-powered helpdesk that automates responses.',
    url: 'https://conversailabs.com/smartdesk',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartDesk - AI-Powered Customer Support Platform | ConversAI Labs',
    description: 'Elevate your customer support with SmartDesk.',
  },
  alternates: {
    canonical: 'https://conversailabs.com/smartdesk',
  },
};

export default function SmartDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
