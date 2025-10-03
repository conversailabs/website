'use client'

import IndustryHeader from '@/components/layout/IndustryHeader'
import Footer from '@/components/layout/Footer'
import LoanServicingHero from '@/components/loan-servicing/Hero'
import CoreFeatures from '@/components/loan-servicing/CoreFeatures'
import Integration from '@/components/loan-servicing/Integration'
import Security from '@/components/loan-servicing/Security'
import Results from '@/components/loan-servicing/Results'
import FAQ from '@/components/loan-servicing/FAQ'
import CTASection from '@/components/loan-servicing/CTASection'

export default function LoanServicingPage() {
  return (
    <>
      <IndustryHeader />
      <main className="bg-black">
        <LoanServicingHero />
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