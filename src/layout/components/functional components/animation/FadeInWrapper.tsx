import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

export interface FadeInWrapperProps {
  children: React.ReactNode;
  className?: string
}

export default function FadeInWrapper({ children, className }: FadeInWrapperProps) {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        
        transition={{
          duration: 0.5,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}