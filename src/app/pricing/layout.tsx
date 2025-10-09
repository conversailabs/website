import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans - AI Voice Agent Platform',
  description: 'Transparent pricing for ConversAI Labs AI voice agents. Choose from Starter, Professional, or Enterprise plans. 14-day free trial, no credit card required.',
  keywords: ['AI voice agent pricing', 'voice AI cost', 'conversation AI plans', 'AI phone agent pricing'],
  openGraph: {
    title: 'Pricing Plans - AI Voice Agent Platform | ConversAI Labs',
    description: 'Transparent pricing for ConversAI Labs AI voice agents. Choose from Starter, Professional, or Enterprise plans. 14-day free trial.',
    url: 'https://conversailabs.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Plans - AI Voice Agent Platform | ConversAI Labs',
    description: 'Transparent pricing for ConversAI Labs AI voice agents. Choose from Starter, Professional, or Enterprise plans.',
  },
  alternates: {
    canonical: 'https://conversailabs.com/pricing',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
