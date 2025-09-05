'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, Calculator, ArrowRight } from 'lucide-react'
import { useLeadCapture } from '@/hooks/use-lead-capture'
import { useToast } from '@/hooks/use-toast'

interface CreditCalculatorProps {
  industry?: string
}

export default function CreditCalculator({ industry }: CreditCalculatorProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    industry: industry || '',
    business_size: '',
    voice_minutes_needed: '',
    whatsapp_messages_needed: '',
    monthly_leads: ''
  })

  const [showResults, setShowResults] = useState(false)
  const [calculatedCredits, setCalculatedCredits] = useState(0)
  
  const { submitLead, isSubmitting, error } = useLeadCapture({
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "We'll send your custom quote to your email shortly.",
      })
    }
  })
  
  const { toast } = useToast()

  const calculateCredits = () => {
    const voiceMinutes = parseInt(formData.voice_minutes_needed) || 0
    const whatsappMessages = parseInt(formData.whatsapp_messages_needed) || 0
    
    // US pricing: 10 credits/voice minute, 1-5 credits/whatsapp message
    const voiceCredits = voiceMinutes * 10
    const whatsappCredits = whatsappMessages * 2 // Average between utility and marketing
    
    return voiceCredits + whatsappCredits
  }

  const handleCalculate = () => {
    const credits = calculateCredits()
    setCalculatedCredits(credits)
    setShowResults(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await submitLead({
        ...formData,
        business_size: formData.business_size as 'small' | 'medium' | 'large' | undefined,
        monthly_leads: formData.monthly_leads ? parseInt(formData.monthly_leads) : undefined,
        voice_minutes_needed: formData.voice_minutes_needed ? parseInt(formData.voice_minutes_needed) : undefined,
        whatsapp_messages_needed: formData.whatsapp_messages_needed ? parseInt(formData.whatsapp_messages_needed) : undefined,
        form_type: 'quote_calculator',
        interest_level: 'high',
        notes: `Calculated ${calculatedCredits} credits needed per month`
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="max-w-2xl mx-auto border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          <CardTitle className="text-2xl font-bold text-gray-900">
            AI CRM Credit Calculator
          </CardTitle>
        </div>
        <p className="text-gray-600">
          Get your personalized quote based on your business needs
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Business Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder="you@company.com"
              />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="Your company"
              />
            </div>
            <div>
              <Label htmlFor="business_size">Business Size</Label>
              <Select value={formData.business_size} onValueChange={(value) => setFormData({...formData, business_size: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-10 employees)</SelectItem>
                  <SelectItem value="medium">Medium (11-50 employees)</SelectItem>
                  <SelectItem value="large">Large (50+ employees)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Usage Estimates */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-3">Monthly Usage Estimates</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="monthly_leads">New Leads/Month</Label>
                <Input
                  id="monthly_leads"
                  type="number"
                  value={formData.monthly_leads}
                  onChange={(e) => setFormData({...formData, monthly_leads: e.target.value})}
                  placeholder="300"
                />
              </div>
              <div>
                <Label htmlFor="voice_minutes">Voice Minutes Needed</Label>
                <Input
                  id="voice_minutes"
                  type="number"
                  value={formData.voice_minutes_needed}
                  onChange={(e) => setFormData({...formData, voice_minutes_needed: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="whatsapp_messages">WhatsApp Messages</Label>
                <Input
                  id="whatsapp_messages"
                  type="number"
                  value={formData.whatsapp_messages_needed}
                  onChange={(e) => setFormData({...formData, whatsapp_messages_needed: e.target.value})}
                  placeholder="500"
                />
              </div>
            </div>
          </div>

          {/* Industry Selection */}
          {!industry && (
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="home-services">Home Services</SelectItem>
                  <SelectItem value="saas-technology">SaaS & Technology</SelectItem>
                  <SelectItem value="healthcare-wellness">Healthcare & Wellness</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Calculate Button */}
          {!showResults && (
            <Button 
              type="button" 
              onClick={handleCalculate}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!formData.voice_minutes_needed && !formData.whatsapp_messages_needed}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate My Credits
            </Button>
          )}

          {/* Results */}
          {showResults && (
            <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-8 h-8 text-purple-600" />
                  <span className="text-3xl font-bold text-gray-900">{calculatedCredits.toLocaleString()}</span>
                </div>
                <p className="text-gray-600">Credits needed per month</p>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Voice calls ({formData.voice_minutes_needed} mins × 10 credits):</span>
                  <span>{(parseInt(formData.voice_minutes_needed) || 0) * 10} credits</span>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp ({formData.whatsapp_messages_needed} msgs × 2 credits):</span>
                  <span>{(parseInt(formData.whatsapp_messages_needed) || 0) * 2} credits</span>
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-lg font-semibold text-gray-900">
                  Recommended Plan: {calculatedCredits <= 1000 ? 'Starter ($79/mo)' : 'Professional ($249/mo)'}
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Get My Custom Quote'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}