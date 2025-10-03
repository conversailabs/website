'use client'

import IndustryHeader from '@/components/layout/IndustryHeader'
import Footer from '@/components/layout/Footer'
import RealEstateHero from '@/components/real-estate/Hero'
import CoreFeatures from '@/components/real-estate/CoreFeatures'
import Integration from '@/components/real-estate/Integration'
import Security from '@/components/real-estate/Security'
import Results from '@/components/real-estate/Results'
import FAQ from '@/components/real-estate/FAQ'
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
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}