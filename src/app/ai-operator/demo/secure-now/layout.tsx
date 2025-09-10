import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure AI Voice Demo | ConversAI Labs',
  description: 'Experience our secure AI voice assistant with a live demo call. Enterprise-grade security, no setup required.',
}

export default function DemoCallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}