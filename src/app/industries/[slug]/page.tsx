import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import UseCaseSection from '@/components/sections/UseCaseSection';
import StatsSection from '@/components/sections/StatsSection';
import FAQSection from '@/components/sections/FAQSection';
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
    // metadataBase: new URL('https://conversai.vercel.app'),
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
      <main className="min-h-screen">
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
        {slug !== 'education' && slug !== 'ed-tech' && (
          <UseCaseSection
            industry={industry.name}
            useCases={industry.useCases}
          />
        )}
        <StatsSection
          industry={industry.name}
          color={industry.color as 'blue' | 'purple' | 'green' | 'indigo' | 'orange' | 'default'}
          stats={industry.stats.map((stat) => ({
            label: stat.label,
            value: stat.number,
          }))}
        />
        <FAQSection industry={industry.name} faqs={industry.faqs} />
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
