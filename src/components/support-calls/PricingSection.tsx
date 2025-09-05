"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses",
      monthlyPrice: 299,
      annualPrice: 249,
      features: [
        { text: "Up to 500 calls/month", included: true },
        { text: "Basic AI agent customization", included: true },
        { text: "Email & chat support", included: true },
        { text: "Standard integrations", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Custom voice selection", included: false },
        { text: "Advanced workflows", included: false },
        { text: "API access", included: false }
      ],
      icon: Sparkles,
      color: "from-blue-600 to-cyan-600",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing companies",
      monthlyPrice: 799,
      annualPrice: 666,
      features: [
        { text: "Up to 2,500 calls/month", included: true },
        { text: "Advanced AI customization", included: true },
        { text: "Priority support", included: true },
        { text: "All integrations", included: true },
        { text: "Advanced analytics & insights", included: true },
        { text: "Custom voice selection", included: true },
        { text: "Advanced workflows", included: true },
        { text: "Full API access", included: false }
      ],
      icon: TrendingUp,
      color: "from-purple-600 to-pink-600",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        { text: "Unlimited calls", included: true },
        { text: "Full customization", included: true },
        { text: "Dedicated success manager", included: true },
        { text: "Custom integrations", included: true },
        { text: "White-label options", included: true },
        { text: "Multiple custom voices", included: true },
        { text: "Complex workflow builder", included: true },
        { text: "Full API access", included: true }
      ],
      icon: Zap,
      color: "from-orange-600 to-red-600",
      popular: false
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-purple-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-purple-100/[0.03] bg-grid" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start free for 14 days. No credit card required. Scale as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className="relative w-14 h-7 bg-purple-200 rounded-full border border-purple-300 transition-colors"
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                  animate={{ left: billingPeriod === 'monthly' ? '4px' : '32px' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </button>
              <span className={`text-sm ${billingPeriod === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
                <span className="ml-2 text-green-600 text-xs">Save 20%</span>
              </span>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`bg-white rounded-2xl p-8 border-2 ${
                  plan.popular ? 'border-purple-400 shadow-xl' : 'border-gray-200 shadow-lg'
                } hover:border-purple-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                  {/* Plan Header */}
                  <div className="mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mb-4`}>
                      <plan.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    {plan.monthlyPrice ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                        </span>
                        <span className="text-gray-600 ml-2">/{billingPeriod === 'monthly' ? 'month' : 'month'}</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-gray-900">Custom Pricing</div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full py-6 text-lg font-medium ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg' 
                        : 'bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300'
                    }`}
                    onClick={() => window.open('/schedule-demo', '_self')}
                  >
                    {plan.monthlyPrice ? 'Start Free Trial' : 'Contact Sales'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-gray-600">
              <span className="text-green-600 font-medium">30-day money-back guarantee</span>
              {' • '}
              <span>No setup fees</span>
              {' • '}
              <span>Cancel anytime</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection