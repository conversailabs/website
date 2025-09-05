'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Clock, TrendingUp, Shield } from 'lucide-react'

const industries = [
  {
    slug: 'healthcare-and-wellness',
    name: 'Healthcare & Wellness',
    description: 'HIPAA-compliant AI agents for patient care, appointments, and medical support',
    icon: '🏥',
    color: 'from-blue-500 to-blue-600',
    stats: { satisfaction: '95%', support: '24/7', savings: '60%' }
  },
  {
    slug: 'education',
    name: 'Education',
    description: 'AI assistants for student support, admissions, and administrative tasks',
    icon: '🎓',
    color: 'from-purple-500 to-purple-600',
    stats: { satisfaction: '88%', support: '24/7', savings: '40%' }
  },
  {
    slug: 'home-services',
    name: 'Home Services',
    description: 'Emergency response, booking, and customer support for service businesses',
    icon: '🏠',
    color: 'from-orange-500 to-orange-600',
    stats: { satisfaction: '92%', support: '24/7', savings: '55%' }
  },
  {
    slug: 'finance-and-legal',
    name: 'Finance & Legal',
    description: 'Secure consultations and compliance-ready client management',
    icon: '⚖️',
    color: 'from-green-500 to-green-600',
    stats: { satisfaction: '87%', support: '99.9%', savings: '45%' }
  },
  {
    slug: 'real-estate-and-housing',
    name: 'Real Estate & Housing',
    description: 'Property inquiries, viewings, and tenant management automation',
    icon: '🏘️',
    color: 'from-indigo-500 to-indigo-600',
    stats: { satisfaction: '91%', support: '24/7', savings: '55%' }
  },
  {
    slug: 'travel-and-hospitality',
    name: 'Travel & Hospitality',
    description: 'Booking management, concierge services, and guest support',
    icon: '✈️',
    color: 'from-cyan-500 to-cyan-600',
    stats: { satisfaction: '94%', support: '24/7', savings: '48%' }
  },
  {
    slug: 'retail',
    name: 'Retail',
    description: 'Voice commerce, product support, and customer service automation',
    icon: '🛍️',
    color: 'from-pink-500 to-pink-600',
    stats: { satisfaction: '89%', support: '24/7', savings: '52%' }
  },
  {
    slug: 'technology',
    name: 'Technology',
    description: 'Technical support, onboarding, and user account management',
    icon: '💻',
    color: 'from-blue-500 to-blue-600',
    stats: { satisfaction: '86%', support: '24/7', savings: '62%' }
  },
  {
    slug: 'events-and-entertainment',
    name: 'Events & Entertainment',
    description: 'Event booking, venue information, and guest services',
    icon: '🎭',
    color: 'from-purple-500 to-purple-600',
    stats: { satisfaction: '92%', support: '24/7', savings: '58%' }
  },
  {
    slug: 'fitness-and-lifestyle',
    name: 'Fitness & Lifestyle',
    description: 'Class booking, wellness coaching, and membership management',
    icon: '💪',
    color: 'from-red-500 to-red-600',
    stats: { satisfaction: '90%', support: '24/7', savings: '55%' }
  },
  {
    slug: 'public-services',
    name: 'Public Services',
    description: 'Citizen services, government inquiries, and public information',
    icon: '🏛️',
    color: 'from-blue-500 to-blue-600',
    stats: { satisfaction: '77%', support: '24/7', savings: '60%' }
  },
  {
    slug: 'automotive-and-transport',
    name: 'Automotive & Transport',
    description: 'Vehicle services, roadside assistance, and logistics support',
    icon: '🚗',
    color: 'from-gray-500 to-gray-600',
    stats: { satisfaction: '87%', support: '24/7', savings: '58%' }
  }
]

const keyBenefits = [
  {
    icon: Users,
    title: 'Industry-Specific Expertise',
    description: 'Pre-built templates and workflows tailored for each industry\'s unique needs'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock AI agents that never miss a call or inquiry'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Grow from startup to enterprise with AI that scales with your business'
  },
  {
    icon: Shield,
    title: 'Compliance Ready',
    description: 'HIPAA, SOX, PCI DSS, and other industry-specific compliance built-in'
  }
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              AI Agents for Every Industry
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Discover how ConversAI Labs transforms business operations across 12+ industries with 
              intelligent voice agents designed for your specific sector&apos;s needs.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg"
                onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Building Your Agent
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('industries-grid')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Industries
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Industry-Specific AI Agents?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each industry has unique requirements. Our AI agents are pre-trained with 
                industry-specific knowledge and compliance standards.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section id="industries-grid" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From healthcare to retail, our AI agents are tailored for your industry&apos;s 
                specific workflows, compliance requirements, and customer expectations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Link href={`/industries/${industry.slug}`}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer border border-gray-100 hover:border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${industry.color} rounded-lg flex items-center justify-center text-2xl`}>
                          {industry.icon}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {industry.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {industry.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">Satisfaction</span>
                          <span className="font-semibold text-green-600">{industry.stats.satisfaction}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">Support</span>
                          <span className="font-semibold text-blue-600">{industry.stats.support}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">Cost Savings</span>
                          <span className="font-semibold text-purple-600">{industry.stats.savings}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cross-Industry Success</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Proven results across all industries with consistently high performance and satisfaction rates.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">12+</div>
                <div className="text-lg opacity-90">Industries Served</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">89%</div>
                <div className="text-lg opacity-90">Average Satisfaction</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-4xl font-bold mb-2">54%</div>
                <div className="text-lg opacity-90">Average Cost Savings</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-lg opacity-90">Always Available</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Industry?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses already using ConversAI Labs to revolutionize 
              their customer interactions with industry-specific AI agents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => window.open('https://dashboard.conversailabs.com/', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Build Your First Agent
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('/contact', '_self')}
              >
                Talk to Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}