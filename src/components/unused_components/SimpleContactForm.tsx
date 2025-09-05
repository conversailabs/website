'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, ArrowRight } from 'lucide-react'
import { useLeadCapture } from '@/hooks/use-lead-capture'
import { useToast } from '@/hooks/use-toast'

interface SimpleContactFormProps {
  industry?: string
  title?: string
  description?: string
}

export default function SimpleContactForm({ 
  industry, 
  title = "Get Started with AI CRM",
  description = "Tell us about your business and we'll get in touch"
}: SimpleContactFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    company: '',
    industry: industry || '',
    notes: ''
  })

  const { submitLead, isSubmitting, error } = useLeadCapture({
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "We'll get in touch with you within 24 hours.",
      })
      // Reset form
      setFormData({
        email: '',
        name: '',
        phone: '',
        company: '',
        industry: industry || '',
        notes: ''
      })
    }
  })
  
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await submitLead({
        ...formData,
        form_type: 'contact_form',
        interest_level: 'medium',
        notes: formData.notes || `Contact form submission for ${industry || 'AI CRM'}`
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
    <Card className="max-w-lg mx-auto border-0 bg-white shadow-2xl rounded-3xl overflow-hidden">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {title}
          </CardTitle>
        </div>
        <p className="text-gray-600 text-base leading-relaxed">
          {description}
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="contact_email" className="text-sm font-semibold text-gray-700 mb-2 block">
              Business Email *
            </Label>
            <Input
              id="contact_email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="you@company.com"
              className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_name" className="text-sm font-semibold text-gray-700 mb-2 block">
                Name *
              </Label>
              <Input
                id="contact_name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Your name"
                className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            <div>
              <Label htmlFor="contact_phone" className="text-sm font-semibold text-gray-700 mb-2 block">
                Phone
              </Label>
              <Input
                id="contact_phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Your phone"
                className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="contact_company" className="text-sm font-semibold text-gray-700 mb-2 block">
              Company Name
            </Label>
            <Input
              id="contact_company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              placeholder="Your company"
              className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {!industry && (
            <div>
              <Label htmlFor="contact_industry" className="text-sm font-semibold text-gray-700 mb-2 block">
                Industry
              </Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200 bg-white shadow-xl max-h-60 overflow-y-auto">
                  <SelectItem value="real-estate">🏠 Real Estate</SelectItem>
                  <SelectItem value="insurance">🛡️ Insurance</SelectItem>
                  <SelectItem value="home-services">🔧 Home Services</SelectItem>
                  <SelectItem value="saas-technology">💻 SaaS & Technology</SelectItem>
                  <SelectItem value="healthcare-wellness">🏥 Healthcare & Wellness</SelectItem>
                  <SelectItem value="automotive">🚗 Automotive & Dealerships</SelectItem>
                  <SelectItem value="finance-banking">🏦 Finance & Banking</SelectItem>
                  <SelectItem value="legal-services">⚖️ Legal Services</SelectItem>
                  <SelectItem value="education">🎓 Education & Training</SelectItem>
                  <SelectItem value="construction">🏗️ Construction</SelectItem>
                  <SelectItem value="manufacturing">🏭 Manufacturing</SelectItem>
                  <SelectItem value="retail-ecommerce">🛒 Retail & E-commerce</SelectItem>
                  <SelectItem value="consulting">💼 Professional Services</SelectItem>
                  <SelectItem value="other">📋 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="contact_notes" className="text-sm font-semibold text-gray-700 mb-2 block">
              Tell us about your needs
            </Label>
            <Textarea
              id="contact_notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="What are you looking to automate? How many leads do you get per month?"
              rows={4}
              className="border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Get In Touch'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}