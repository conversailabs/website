'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import StatusModal from '@/components/ui/StatusModal';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  industry?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  industry
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    company: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    message: ''
  });

  // Check if email already submitted when email changes
  useEffect(() => {
    if (formData.email && validateEmail(formData.email)) {
      setAlreadySubmitted(isEmailAlreadySubmitted(formData.email));
    } else {
      setAlreadySubmitted(false);
    }
  }, [formData.email]);

  const isEmailAlreadySubmitted = (email: string): boolean => {
    if (typeof window === 'undefined') return false;

    const stored = localStorage.getItem('contactFormSubmissions');
    if (!stored) return false;

    try {
      const submissions = JSON.parse(stored);
      return submissions.includes(email.toLowerCase());
    } catch {
      return false;
    }
  };

  const markEmailAsSubmitted = (email: string) => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('contactFormSubmissions');
    let submissions: string[] = [];

    if (stored) {
      try {
        submissions = JSON.parse(stored);
      } catch {
        submissions = [];
      }
    }

    if (!submissions.includes(email.toLowerCase())) {
      submissions.push(email.toLowerCase());
      localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if email already submitted
    if (alreadySubmitted) {
      setStatusModal({
        isOpen: true,
        type: 'error',
        message: "You have already submitted an enquiry with this email. We&apos;ll contact you within 24 hours!"
      });
      onClose();
      return;
    }

    const newErrors = {
      name: '',
      company: '',
      phone: '',
      email: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    if (!Object.values(newErrors).some(error => error)) {
      // Form is valid, submit to API
      setIsSubmitting(true);

      try {
        // Submit to Next.js API route (which proxies to backend)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            message: industry ? `Interested in ${industry}` : 'Contact modal submission',
            source: industry ? `industries/${industry}` : 'contact_modal',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit form');
        }

        const result = await response.json();
        console.log('✅ Form submitted successfully:', result);

        // Mark email as submitted
        markEmailAsSubmitted(formData.email);

        // Close contact form
        onClose();

        // Show success modal
        setStatusModal({
          isOpen: true,
          type: 'success',
          message: result.message || "We&apos;ve confirmed your submission. We&apos;ll reach out to you within 24 hours!"
        });

        // Reset form
        setFormData({ name: '', company: '', phone: '', email: '' });
      } catch (error) {
        console.error('❌ Submission error:', error);

        // Show simple alert for errors
        const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
        alert(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg border-0 shadow-2xl">
          <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Sales
          </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              {industry ? `Get started with AI agents for ${industry}` : 'Get started with our AI agent solutions'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Your Name</label>
              <Input
                type="text"
                placeholder="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 font-medium ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.name}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Company Name</label>
              <Input
                type="text"
                placeholder="company name"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 font-medium ${errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              />
              {errors.company && <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.company}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Phone Number</label>
              <Input
                type="tel"
                placeholder="phone number"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 font-medium ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''}`}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.phone}
              </p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 block">Email Address</label>
              <Input
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-900 font-medium ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''} ${alreadySubmitted ? 'border-orange-400 focus:border-orange-500 focus:ring-orange-200' : ''}`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1.5 flex items-center gap-1">
                <span className="text-xs">⚠</span> {errors.email}
              </p>}
              {alreadySubmitted && !errors.email && (
                <p className="text-sm text-orange-600 mt-1.5 flex items-center gap-1 font-medium">
                  <span className="text-xs">ℹ️</span> This email has already been submitted. We&apos;ll contact you soon!
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-8 py-3 h-12 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-900 transition-all shadow-sm hover:shadow-md"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || alreadySubmitted}
                className="px-8 py-3 h-12 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : alreadySubmitted ? 'Already Submitted' : 'Submit'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal({ ...statusModal, isOpen: false })}
        type={statusModal.type}
        message={statusModal.message}
      />
    </div>
  );
}
