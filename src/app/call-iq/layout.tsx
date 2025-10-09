import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CallIQ - Conversation Intelligence Platform',
  description: 'Unlock insights from every customer conversation with CallIQ. AI-powered conversation intelligence for sales, support, and quality assurance teams.',
  keywords: ['conversation intelligence', 'call analytics', 'speech analytics', 'call monitoring', 'conversation ai', 'call center analytics'],
  openGraph: {
    title: 'CallIQ - Conversation Intelligence Platform | ConversAI Labs',
    description: 'Unlock insights from every customer conversation with CallIQ. AI-powered conversation intelligence platform.',
    url: 'https://conversailabs.com/call-iq',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CallIQ - Conversation Intelligence Platform | ConversAI Labs',
    description: 'Unlock insights from every customer conversation with CallIQ.',
  },
  alternates: {
    canonical: 'https://conversailabs.com/call-iq',
  },
};

export default function CallIQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
