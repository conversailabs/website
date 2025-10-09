import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Operator - Autonomous Voice AI Phone Agent',
  description: 'Transform your phone operations with AI Operator. Autonomous AI phone agents that handle calls 24/7, qualify leads, and integrate with your CRM seamlessly.',
  keywords: ['ai phone agent', 'voice ai operator', 'automated phone calls', 'ai call center', 'phone automation', 'ai receptionist'],
  openGraph: {
    title: 'AI Operator - Autonomous Voice AI Phone Agent | ConversAI Labs',
    description: 'Transform your phone operations with AI Operator. Autonomous AI phone agents that handle calls 24/7.',
    url: 'https://conversailabs.com/ai-operator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Operator - Autonomous Voice AI Phone Agent | ConversAI Labs',
    description: 'Transform your phone operations with AI Operator. Autonomous AI phone agents that handle calls 24/7.',
  },
  alternates: {
    canonical: 'https://conversailabs.com/ai-operator',
  },
};

export default function AIOperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
