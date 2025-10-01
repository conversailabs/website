'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AICRMHeader from '@/components/layout/AICRMHeader'
import Footer from '@/components/layout/Footer'
import ContactModal from '@/components/forms/ContactModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, TrendingUp, Clock, Target, Zap, Users, Phone, MessageSquare, Star, AlertTriangle, Globe } from 'lucide-react'
import aiCrmIndustries from '@/data/ai-crm-industries.json'
import aiCrmPricing from '@/data/ai-crm-pricing.json'
import { useCurrency, Currency } from '@/hooks/use-currency'

export default function IndustryPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { currency, formatPrice, formatCredits, currencies, setCurrency } = useCurrency()
  const params = useParams()
  const industrySlug = params.industry as string
  const industry = aiCrmIndustries.find(ind => ind.slug === industrySlug)
  
  if (!industry) {
    notFound()
  }

  return (
    <div className="w-full overflow-x-hidden">
      <AICRMHeader />
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/ai-crm" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to AI CRM
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden pt-12 pb-20 min-h-[70vh]">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-4 w-40 h-40 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-4 w-40 h-40 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-white rounded-2xl shadow-lg">
                <span className="text-4xl">{industry.icon}</span>
              </div>
              <Badge className={`${industry.color.replace('bg-', 'bg-gradient-to-r from-')} to-purple-600 text-white px-4 py-2 text-sm font-semibold border-0`}>
                {industry.name} AI CRM
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI CRM for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{industry.name}</span>
              <span className="block text-2xl md:text-3xl font-normal text-gray-600 mt-2">
                Run on Complete Autopilot
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {industry.description}
            </p>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2"
                onClick={() => setIsContactModalOpen(true)}
              >
                <MessageSquare className="w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Industry Stats */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-6">
          <div className="bg-white/90 backdrop-blur rounded-xl px-6 py-4 shadow-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{industry.roiMetrics.leadResponse?.split(' ')[0] || '3min'}</p>
            <p className="text-xs text-gray-600">Response Time</p>
          </div>
          <div className="bg-white/90 backdrop-blur rounded-xl px-6 py-4 shadow-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{industry.roiMetrics.conversionRate?.split(' ')[0] || '35%'}</p>
            <p className="text-xs text-gray-600">Improvement</p>
          </div>
          <div className="bg-white/90 backdrop-blur rounded-xl px-6 py-4 shadow-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{industry.roiMetrics.timesSaved?.split(' ')[0] || '15hrs'}</p>
            <p className="text-xs text-gray-600">Time Saved</p>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Common {industry.name} Challenges
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our AI Solves
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Stop losing revenue to these preventable problems
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industry.painPoints.map((painPoint, index) => (
                <Card key={index} className="group bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-red-500 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">{painPoint}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Autopilot Features */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How AI Autopilot Works for 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {industry.name}</span>
              </h2>
              <p className="text-xl text-gray-600">
                Your AI assistant handles everything while you focus on growth
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  Your AI Assistant Handles:
                </h3>
                <div className="space-y-4">
                  {industry.autopilotFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-600 rounded-xl">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Lead Response Time</h4>
                    </div>
                    <p className="text-3xl font-bold text-blue-600 mb-2">{industry.roiMetrics.leadResponse}</p>
                    <p className="text-gray-600">Never miss another hot lead</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-green-600 rounded-xl">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Conversion Improvement</h4>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-2">{industry.roiMetrics.conversionRate}</p>
                    <p className="text-gray-600">More qualified prospects become customers</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-purple-600 rounded-xl">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">Time Saved</h4>
                    </div>
                    <p className="text-3xl font-bold text-purple-600 mb-2">{industry.roiMetrics.timesSaved}</p>
                    <p className="text-gray-600">Focus on high-value activities</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Real-World {industry.name} 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Automation Scenarios</span>
              </h2>
              <p className="text-xl text-gray-600">
                See how businesses like yours put their sales on autopilot
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {industry.useCases.map((useCase, index) => (
                <Card key={index} className="group h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 rounded-2xl overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                        {useCase.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed text-base">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-6">
                      <p className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Impact:
                      </p>
                      <p className="text-green-700 font-medium">{useCase.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Simple Pricing for 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {industry.name} Businesses</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Start small, scale as you grow. Pay for leads processed, not team size.
              </p>
              
              {/* Currency Selector */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <Globe className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600 mr-3">Currency:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {Object.entries(currencies).map(([code, info]) => (
                    <button
                      key={code}
                      onClick={() => setCurrency(code as Currency)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        currency === code 
                          ? 'bg-blue-600 text-white shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {info.symbol} {code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-300 rounded-2xl bg-white hover:shadow-lg transition-all">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Starter</CardTitle>
                  <div className="py-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatPrice(aiCrmPricing.plans.starter.pricing).formatted}
                      <span className="text-lg font-normal text-gray-600">/month</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Perfect for {industry.name.toLowerCase()} businesses getting started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">3 team seats</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">300 new leads/month</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">{formatCredits(aiCrmPricing.plans.starter.features.credits).toLocaleString()} credits/month</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">All channels: Voice, WhatsApp, Email, SMS</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-8 py-3 text-lg font-semibold border-2 border-gray-300 hover:border-blue-500 bg-white text-gray-900" 
                    variant="outline"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 relative rounded-2xl shadow-xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold">
                    ⭐ Most Popular for {industry.name}
                  </Badge>
                </div>
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">Professional</CardTitle>
                  <div className="py-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatPrice(aiCrmPricing.plans.professional.pricing).formatted}
                      <span className="text-lg font-normal text-gray-600">/month</span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    Complete automation solution for growing {industry.name.toLowerCase()} businesses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">10 team seats</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">1,500 new leads/month</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">{formatCredits(aiCrmPricing.plans.professional.features.credits).toLocaleString()} credits/month</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">All channels + Priority Support</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How Credits Work</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4">
                    <Phone className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold">Voice Calls</p>
                    <p className="text-gray-600">10 credits/minute</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <MessageSquare className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">WhatsApp Utility</p>
                    <p className="text-gray-600">1 credit/message</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Target className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="font-semibold">WhatsApp Marketing</p>
                    <p className="text-gray-600">5 credits/message</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold">Email & SMS</p>
                    <p className="text-gray-600">0.5-2 credits each</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm mb-4">
                14-day free trial • No credit card required • Cancel anytime
              </p>
              <p className="text-gray-600">
                Need more credits? <Link href="#" className="text-blue-600 hover:text-blue-700 font-semibold">Buy additional credits anytime</Link>
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
              <div className="flex justify-center mb-8">
                <span className="text-5xl">{industry.icon}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Automate Your {industry.name} Business?
              </h2>
              
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Join successful {industry.name.toLowerCase()} businesses that capture, qualify, and convert leads automatically 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        industry={industry.slug}
      />
    </div>
  )
}