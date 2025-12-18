'use client'

import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  sectionId?: string
}

export default function AnimatedBackground({ sectionId = 'default' }: AnimatedBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, #0a0a14 0%, #050508 40%, #000000 100%)' }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(54, 52, 227, 0.12) 0%, transparent 70%)',
          willChange: 'opacity, transform',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(54, 52, 227, 0.35) 0%, rgba(54, 52, 227, 0.1) 50%, transparent 100%)',
        }}
        animate={{ x: [0, 100, -50, 0], y: [0, 80, -40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-30"
      />

      <motion.div
        style={{
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(54, 52, 227, 0.5) 0%, rgba(54, 52, 227, 0.2) 40%, transparent 80%)',
        }}
        animate={{ x: [0, -120, 60, 0], y: [0, -60, 100, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-3xl opacity-25"
      />

      <motion.div
        style={{
          willChange: 'transform',
          background: 'radial-gradient(circle, rgba(90, 88, 255, 0.25) 0%, rgba(54, 52, 227, 0.1) 50%, transparent 100%)',
        }}
        animate={{ x: [0, 80, -80, 0], y: [0, -100, 60, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"
      />

      <motion.div
        style={{
          willChange: 'transform, opacity',
          background: 'radial-gradient(circle, rgba(90, 88, 255, 0.3) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl"
      />

      <motion.div
        style={{
          willChange: 'transform, opacity',
          background: 'radial-gradient(circle, rgba(54, 52, 227, 0.35) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full blur-2xl"
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.85) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(10, 10, 20, 0.85) 100%)',
          willChange: 'opacity',
        }}
        animate={{ opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(54, 52, 227, 0.03) 60deg, transparent 120deg, rgba(90, 88, 255, 0.03) 180deg, transparent 240deg, rgba(54, 52, 227, 0.03) 300deg, transparent 360deg)',
          willChange: 'transform',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
