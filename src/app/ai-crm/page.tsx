'use client'

import { useState } from 'react'
import Link from 'next/link'
import AICRMHeader from '@/components/layout/AICRMHeader'
import Footer from '@/components/layout/Footer'
import ContactModal from '@/components/forms/ContactModal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, TrendingUp, Clock, Target, Zap, Users, Phone, MessageSquare, Mail, Star, Globe } from 'lucide-react'
import aiCrmIndustries from '@/data/ai-crm-industries.json'
import aiCrmPricing from '@/data/ai-crm-pricing.json'
import { useCurrency, Currency } from '@/hooks/use-currency'

// Note: Metadata export removed due to 'use client' directive

export default function AICRMPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const { currency, formatPrice, formatCredits, currencies, setCurrency } = useCurrency()
  return (
    <div className="w-full overflow-x-hidden">
      <AICRMHeader />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden pt-24 pb-20 min-h-[80vh]">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-4 w-40 h-40 sm:w-72 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-4 w-40 h-40 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-8 left-20 w-40 h-40 sm:w-72 sm:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0 text-sm px-4 py-2">
                🚀 Run Your Business on Autopilot
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                AI CRM That 
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Never Sleeps
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Complete AI sales automation that captures leads, nurtures prospects, manages deals, and drives revenue — 
                across voice, WhatsApp, and email — <strong>from first contact to closed sale</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
              
              <p className="text-sm text-gray-500 italic">
                14-day free trial • No credit card required • Setup in 5 minutes
              </p>
            </div>

            {/* Right: AI CRM Dashboard Preview */}
            <div className="relative mt-8 lg:mt-0 w-full">
              <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">AI CRM Autopilot</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">24/7 Active</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Complete Sales Agent</p>
                        <p className="text-xs text-gray-600">47 deals managed today • $127k pipeline</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Deal Progression</p>
                        <p className="text-xs text-gray-600">23 deals advanced • 89% close rate</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">Auto</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Revenue Operations</p>
                        <p className="text-xs text-gray-600">12 deals closed • $89k this week</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 text-xs">Running</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="text-lg font-bold">$12,450</p>
                        <p className="text-xs opacity-90">Revenue this month</p>
                      </div>
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-8">
          <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
            <p className="text-2xl font-bold text-gray-900">24/7</p>
            <p className="text-xs text-gray-600">Never Miss a Lead</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
            <p className="text-2xl font-bold text-gray-900">3x</p>
            <p className="text-xs text-gray-600">Faster Response</p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-lg">
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-xs text-gray-600">Lead Conversion</p>
          </div>
        </div>
      </section>

      {/* Autopilot Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Business Runs Itself
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete sales automation from prospecting to customer success — AI manages the entire revenue cycle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiCrmPricing.autopilotBenefits.map((benefit, index) => (
              <Card key={index} className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Industry-Specific 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Autopilot Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI adapts to your industry&apos;s unique needs and customer behaviors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiCrmIndustries.map((industry) => (
              <Link key={industry.slug} href={`/ai-crm/${industry.slug}`}>
                <Card className="group h-full bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gray-200 rounded-2xl overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${industry.color.replace('bg-', 'from-')} to-purple-600`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                        <span className="text-2xl">{industry.icon}</span>
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-blue-600 transition-colors text-lg">
                          {industry.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">Popular Choice</span>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-800 mb-3">Key Automations:</p>
                      <div className="space-y-2">
                        {industry.autopilotFeatures.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                            <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                            <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-white"></div>
                          </div>
                          <span className="text-xs text-gray-500">Multi-channel</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Need a custom solution for your industry?</p>
            <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-500 px-8 py-3 text-lg font-semibold">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Chat for Custom Industry Setup
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Pay for results, not seats. Your AI CRM scales with your business.
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

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(aiCrmPricing.plans).map(([key, plan]) => (
              <Card key={key} className={`relative rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${plan.highlighted ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200 hover:border-blue-300'}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold">
                      ⭐ Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="py-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {typeof plan.pricing.USD === 'number' ? formatPrice(plan.pricing as { USD: number; GBP: number; INR: number }).formatted : plan.pricing.USD}
                    </div>
                    {typeof plan.pricing.USD === 'number' && (
                      <p className="text-gray-600 mt-1">per month</p>
                    )}
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{plan.features.seats} team seats</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">{plan.features.leads} new leads/month</span>
                    </div>
                    {plan.features.credits && (
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">
                          {typeof plan.features.credits === 'object' && 'USD' in plan.features.credits 
                            ? `${formatCredits(plan.features.credits as { USD: number; GBP: number; INR: number }).toLocaleString()} credits/month`
                            : `${plan.features.credits} credits`
                          }
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-600">
                      <MessageSquare className="w-5 h-5" />
                      <span className="text-sm">All channels: Voice, WhatsApp, Email, SMS</span>
                    </div>
                  </div>
                  <Button 
                    className={`w-full mt-8 py-3 text-lg font-semibold ${
                      plan.highlighted 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
                        : 'border-2 border-gray-300 hover:border-blue-500 bg-white text-gray-900'
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                  Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Credit System</h3>
              <p className="text-gray-600 mb-6">One unified credit system for all communications - use credits however you need them</p>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-4">
                  <Phone className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="font-semibold">Voice Calls</p>
                  <p className="text-gray-600">10 credits/minute</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <MessageSquare className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-gray-600">1-5 credits/message</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Phone className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold">SMS</p>
                  <p className="text-gray-600">2 credits/message</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Target className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">0.5 credits/email</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm">
              All plans include unlimited old lead interactions • 24/7 support • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-200">
              <div className="flex justify-center mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Put Your Business on 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Autopilot?</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join hundreds of businesses that never miss a lead and convert prospects while they sleep.
              </p>
              
              <div className="flex justify-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Chat on WhatsApp
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Get Started with AI CRM"
      />
    </div>
  )
}