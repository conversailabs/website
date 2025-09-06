"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const IntegrationSection = () => {
  const integrations = [
    { name: 'Shopify', logo: '🛍️', category: 'E-commerce' },
    { name: 'Salesforce', logo: '☁️', category: 'CRM' },
    { name: 'HubSpot', logo: '🔶', category: 'CRM' },
    { name: 'Zendesk', logo: '🎯', category: 'Support' },
    { name: 'Intercom', logo: '💬', category: 'Chat' },
    { name: 'Stripe', logo: '💳', category: 'Payments' },
    { name: 'Slack', logo: '💼', category: 'Communication' },
    { name: 'Microsoft Teams', logo: '🏢', category: 'Communication' },
    { name: 'WhatsApp', logo: '📱', category: 'Messaging' },
    { name: 'Twilio', logo: '📞', category: 'Voice' },
    { name: 'Google Workspace', logo: '📧', category: 'Productivity' },
    { name: 'Zapier', logo: '⚡', category: 'Automation' }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-purple-900/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Seamlessly Integrates with Your Stack
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Connect Alex to your existing tools in minutes. No coding required.
            </p>
          </motion.div>

          {/* Integration Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-900/20 to-black/50 backdrop-blur-xl rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{integration.logo}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{integration.name}</p>
                    <p className="text-gray-500 text-xs">{integration.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* API Section */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Developer-Friendly API
                </h3>
                <p className="text-gray-300 mb-6">
                  Build custom integrations with our comprehensive REST API. Full documentation, 
                  SDKs for popular languages, and webhook support for real-time events.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-black/50 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    REST API
                  </span>
                  <span className="px-3 py-1 bg-black/50 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    Webhooks
                  </span>
                  <span className="px-3 py-1 bg-black/50 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    SDKs
                  </span>
                  <span className="px-3 py-1 bg-black/50 rounded-full text-purple-300 text-sm border border-purple-500/30">
                    GraphQL
                  </span>
                </div>
                <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                  <span>View API Documentation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Code Preview */}
              <div className="bg-black/50 rounded-xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`// Initialize ConversAI Client
const client = new ConversAI({
  apiKey: 'your-api-key',
  agentId: 'alex-support'
});

// Handle incoming call
const response = await client.handleCall({
  from: '+1234567890',
  intent: 'order-status',
  context: { orderId: '12345' }
});`}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default IntegrationSection