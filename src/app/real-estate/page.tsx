import { Metadata } from 'next'
import IndustryHeader from '@/components/layout/IndustryHeader'
import Footer from '@/components/layout/Footer'
import RealEstateHero from '@/components/real-estate/Hero'
import CoreFeatures from '@/components/real-estate/CoreFeatures'
import Integration from '@/components/real-estate/Integration'
import Security from '@/components/real-estate/Security'
import Results from '@/components/real-estate/Results'
import FAQ from '@/components/real-estate/FAQ'
import CTASection from '@/components/real-estate/CTASection'

export const metadata: Metadata = {
  title: 'AI Agents for UK Property Companies | ConversAI Labs',
  description: 'AI agents that handle tenant inquiries, property viewings, maintenance requests, and lead qualification 24/7 across voice, WhatsApp, email, and web chat for UK property companies.',
  keywords: 'AI agents, UK property management, real estate automation, tenant support, property technology, PropTech',
}

export default function RealEstatePage() {
  return (
    <>
      <IndustryHeader />
      <main className="bg-black">
        <RealEstateHero />
        <CoreFeatures />
        <Integration />
        <Security />
        <Results />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}