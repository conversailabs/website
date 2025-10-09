import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Building the Future of Voice AI',
  description: 'Learn about ConversAI Labs mission to transform business communications with AI-powered voice agents. Discover our team, values, and commitment to innovation.',
  keywords: ['about conversai labs', 'voice ai company', 'ai conversation platform', 'voice automation company'],
  openGraph: {
    title: 'About Us - Building the Future of Voice AI | ConversAI Labs',
    description: 'Learn about ConversAI Labs mission to transform business communications with AI-powered voice agents.',
    url: 'https://conversailabs.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Building the Future of Voice AI | ConversAI Labs',
    description: 'Learn about ConversAI Labs mission to transform business communications with AI-powered voice agents.',
  },
  alternates: {
    canonical: 'https://conversailabs.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
