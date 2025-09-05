'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, ArrowRight } from 'lucide-react'
import { useLeadCapture } from '@/hooks/use-lead-capture'
import { useToast } from '@/hooks/use-toast'

interface DemoRequestFormProps {
  industry?: string
  title?: string
  description?: string
}

export default function DemoRequestForm({ 
  industry, 
  title = "Request a Demo",
  description = "See AI CRM in action for your business"
}: DemoRequestFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    company: '',
    industry: industry || '',
    business_size: '',
    current_crm: '',
    notes: ''
  })

  const { submitLead, isSubmitting, error } = useLeadCapture({
    onSuccess: () => {
      toast({
        title: "Demo Requested!",
        description: "We'll contact you within 24 hours to schedule your personalized demo.",
      })
      // Reset form
      setFormData({
        email: '',
        name: '',
        phone: '',
        company: '',
        industry: industry || '',
        business_size: '',
        current_crm: '',
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
        business_size: formData.business_size as 'small' | 'medium' | 'large' | undefined,
        form_type: 'demo_request',
        interest_level: 'high',
        notes: formData.notes || `Demo request for ${industry || 'AI CRM'}`
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit demo request. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="max-w-lg mx-auto border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          <CardTitle className="text-xl font-bold text-gray-900">
            {title}
          </CardTitle>
        </div>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="demo_email">Business Email *</Label>
            <Input
              id="demo_email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="you@company.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="demo_name">Name *</Label>
              <Input
                id="demo_name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="demo_phone">Phone</Label>
              <Input
                id="demo_phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Your phone"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="demo_company">Company Name</Label>
            <Input
              id="demo_company"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              placeholder="Your company"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="demo_business_size">Team Size</Label>
              <Select value={formData.business_size} onValueChange={(value) => setFormData({...formData, business_size: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">1-10 people</SelectItem>
                  <SelectItem value="medium">11-50 people</SelectItem>
                  <SelectItem value="large">50+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="demo_current_crm">Current CRM</Label>
              <Input
                id="demo_current_crm"
                value={formData.current_crm}
                onChange={(e) => setFormData({...formData, current_crm: e.target.value})}
                placeholder="HubSpot, Salesforce..."
              />
            </div>
          </div>

          {!industry && (
            <div>
              <Label htmlFor="demo_industry">Industry</Label>
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

          <div>
            <Label htmlFor="demo_notes">Specific Needs (Optional)</Label>
            <Textarea
              id="demo_notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Tell us about your specific automation needs..."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Requesting...' : 'Request Demo'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}