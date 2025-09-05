'use client'

import { useEffect } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  industry?: string
  title?: string
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  industry,
  title 
}: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      const phoneNumber = '918076018082'
      const message = encodeURIComponent(`Hi, I'm interested in ${title || 'AI CRM'}${industry ? ` for ${industry}` : ''}`)
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
      onClose()
    }
  }, [isOpen, onClose, industry, title])

  return null
}