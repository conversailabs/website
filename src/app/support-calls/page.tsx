"use client"

import React from 'react'
import DarkHeader from '@/components/ai-operator/DarkHeader'
import Footer from '@/components/layout/Footer'
import SupportCallsHero from '@/components/support-calls/Hero'
import MeetYourAgent from '@/components/support-calls/MeetYourAgent'
import ROIComparison from '@/components/support-calls/ROIComparison'
import PricingSection from '@/components/support-calls/PricingSection'
export default function SupportCallsPage() {
  
  return (
    <div className="min-h-screen bg-black !text-white">
      <DarkHeader />
      <SupportCallsHero />
      <MeetYourAgent />
      <ROIComparison />
      <PricingSection />
      <Footer />
    </div>
  )
}