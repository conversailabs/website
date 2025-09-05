'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PromptBuilderDemo from './PromptBuilderDemo'
import DebtCollectionDemo from './DebtCollectionDemo'
import DermaClinicDemo from './DermaClinicDemo'

type DemoType = 'prompt-builder' | 'debt-collection' | 'derma-clinic'

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('prompt-builder')

  const handleSwitchDemo = (demo: DemoType) => {
    setActiveDemo(demo)
  }

  return (
    <AnimatePresence mode="wait">
      {activeDemo === 'prompt-builder' && (
        <motion.div
          key="prompt-builder"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <PromptBuilderDemo 
            onSwitchToDebtCollection={() => handleSwitchDemo('debt-collection')}
            onSwitchToDermaClinic={() => handleSwitchDemo('derma-clinic')}
          />
        </motion.div>
      )}
      
      {activeDemo === 'debt-collection' && (
        <motion.div
          key="debt-collection"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DebtCollectionDemo 
            onSwitchToPromptBuilder={() => handleSwitchDemo('prompt-builder')}
            onSwitchToDermaClinic={() => handleSwitchDemo('derma-clinic')}
          />
        </motion.div>
      )}
      
      {activeDemo === 'derma-clinic' && (
        <motion.div
          key="derma-clinic"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <DermaClinicDemo 
            onSwitchToPromptBuilder={() => handleSwitchDemo('prompt-builder')}
            onSwitchToDebtCollection={() => handleSwitchDemo('debt-collection')}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}