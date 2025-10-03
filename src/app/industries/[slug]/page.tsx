import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { CTABanner } from '@/components/sections/CTABanner';

import industriesData from '@/data/industriesfinal.json';

// ----------- Types
type IndustryData = {
  name: string;
  description: string;
  color: string;
  icon: string;
  features: string[];
  useCases: Array<{ title: string; description: string; impact: string }>;
  stats: Array<{ number: string; label: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

// ----------- Static Slug Generation
export function generateStaticParams() {
  // Exclude ed-tech since it has its own static page
  return Object.keys(industriesData)
    .filter(slug => slug !== 'ed-tech')
    .map((slug) => ({ slug }));
}

// ----------- Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryFromSlug(slug);
  if (!industry) return {};

  return {
    metadataBase: new URL(process.env.NODE_ENV === 'production'
      ? 'https://conversailabs.com'
      : 'http://localhost:3002'),
    title: `${industry.name} Voice Bot Solutions | ConversAI Labs`,
    description: `Transform your ${industry.name.toLowerCase()} business with AI-powered voice bots. ${industry.description}`,
    keywords: [
      `${industry.name.toLowerCase()} voice bots`,
      `AI automation ${industry.name.toLowerCase()}`,
      'voice AI solutions',
      'customer service automation',
      'conversational AI',
    ],
    openGraph: {
      title: `${industry.name} Voice Bot Solutions`,
      description: `AI-powered automation for the ${industry.name.toLowerCase()} sector.`,
      type: 'website',
      images: [
        {
          url: `/images/industries/${slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${industry.name} Voice Bot Solutions`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.name} Voice Bot Solutions`,
      description: `Enhance your ${industry.name.toLowerCase()} services with AI voice automation.`,
      images: [`/images/industries/${slug}-twitter.jpg`],
    },
  };
}

// ----------- Main Page Component
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryFromSlug(slug);
  if (!industry) return notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFBFC]">
        <HeroSection
          industry={industry.name}
          description={industry.description}
          color={industry.color}
        />
        <FeaturesSection
          industry={industry.name}
          features={industry.features}
          color={industry.color}
        />
        <CTABanner industry={industry.name} color={industry.color} />
      </main>
    </>
  );
}

// ----------- Helper to Fetch Industry Data
function getIndustryFromSlug(slug: string): IndustryData | null {
  const typedData = industriesData as Record<string, IndustryData>;
  const data = typedData[slug];
  if (data) return data;
  return null;
}
