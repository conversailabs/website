"use client"

import React from 'react'
import DarkHeader from '@/components/ai-operator/DarkHeader'
import Footer from '@/components/Footer'
import SupportCallsHero from '@/components/support-calls/Hero'
import StatsSection from '@/components/support-calls/StatsSection'
import MeetYourAgent from '@/components/support-calls/MeetYourAgent'
import ROIComparison from '@/components/support-calls/ROIComparison'
import PricingSection from '@/components/support-calls/PricingSection'
import CTASection from '@/components/support-calls/CTASection'

export default function SupportCallsPage() {
  
  return (
    <div className="min-h-screen bg-black !text-white">
      <DarkHeader />
      <SupportCallsHero />
      <StatsSection />
      <MeetYourAgent />
      <ROIComparison />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}