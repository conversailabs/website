'use client'

import TapToTalkButton from '@/components/shared/TapToTalkButton'

interface IndustryPageClientProps {
  slug: string
}

export default function IndustryPageClient({ slug }: IndustryPageClientProps) {
  return (
    <TapToTalkButton
      source={`${slug}_page_tap_to_talk`}
      agentId="agent_fdb605cbf88227c104786cd227"
    />
  )
}
