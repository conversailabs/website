'use client'

import IndustryHeader from '@/components/layout/IndustryHeader'
import RealEstateHero from '@/components/real-estate/Hero'
import CoreFeatures from '@/components/real-estate/CoreFeatures'
import Integration from '@/components/real-estate/Integration'
import Security from '@/components/real-estate/Security'
import Results from '@/components/real-estate/Results'
import CTASection from '@/components/real-estate/CTASection'

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
        <CTASection />
      </main>
      
    </>
  )
}