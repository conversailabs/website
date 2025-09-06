"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses",
      monthlyPrice: 99,
      annualPrice: 49,
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
      monthlyPrice: 199,
      annualPrice: 199,
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
    <section className="py-24 bg-gradient-to-b from-gray-950 via-black to-gray-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={mounted ? {
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={mounted ? {
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -50, 0],
          } : {}}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      <div className="absolute inset-0 bg-grid-gray-800/[0.03] bg-grid" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold !text-white mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Start free for 14 days. No credit card required. Scale as you grow.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div 
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span 
                className={`text-sm ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}`}
                animate={{ opacity: billingPeriod === 'monthly' ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              >
                Monthly
              </motion.span>
              <motion.button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className="relative w-14 h-7 bg-gray-700 rounded-full border border-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
                  animate={{ 
                    left: billingPeriod === 'monthly' ? '4px' : '32px',
                    rotate: billingPeriod === 'monthly' ? 0 : 180
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.button>
              <motion.span 
                className={`text-sm ${billingPeriod === 'annual' ? 'text-white' : 'text-gray-500'}`}
                animate={{ opacity: billingPeriod === 'annual' ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              >
                Annual
                <motion.span 
                  className="ml-2 text-green-600 text-xs"
                  animate={mounted ? { scale: billingPeriod === 'annual' ? [1, 1.2, 1] : 1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Save 20%
                </motion.span>
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
                whileHover={{ y: -10 }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg"
                      animate={mounted ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Most Popular
                    </motion.span>
                  </motion.div>
                )}

                <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 ${
                  plan.popular ? 'border-blue-500/50 shadow-xl' : 'border-gray-800 shadow-lg'
                } hover:border-blue-500/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                  {/* Plan Header */}
                  <div className="mb-6">
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <plan.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold !text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    {plan.monthlyPrice ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold !text-white">
                          ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                        </span>
                        <span className="text-gray-400 ml-2">/{billingPeriod === 'monthly' ? 'month' : 'month'}</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold !text-white">Custom Pricing</div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: feature.included ? 360 : 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                          )}
                        </motion.div>
                        <span className={`${feature.included ? 'text-gray-300 group-hover:text-white' : 'text-gray-500'} transition-colors`}>
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl' 
                          : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => window.open('/schedule-demo', '_self')}
                    >
                      {plan.monthlyPrice ? 'Start Free Trial' : 'Contact Sales'}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.p 
              className="text-gray-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className="text-green-600 font-medium"
                animate={mounted ? { opacity: [1, 0.7, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                30-day money-back guarantee
              </motion.span>
              {' • '}
              <span className="hover:text-gray-400 transition-colors">No setup fees</span>
              {' • '}
              <span className="hover:text-gray-400 transition-colors">Cancel anytime</span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default PricingSection