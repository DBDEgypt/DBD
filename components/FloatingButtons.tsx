'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useRef } from 'react'
import { FaWhatsapp, FaFacebook } from 'react-icons/fa'

export default function FloatingButtons() {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <motion.div
      ref={containerRef}
      style={{ y }}
      className={`fixed bottom-6 z-50 flex flex-col gap-4 ${language === 'ar' ? 'left-6' : 'right-6'}`}
    >
      <motion.a
        href="https://wa.me/201022185383"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl flex items-center gap-3 group backdrop-blur-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <FaWhatsapp className="w-6 h-6" />
        </motion.div>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: 'auto', opacity: 1 }}
          className="hidden md:block whitespace-nowrap overflow-hidden"
        >
          {language === 'ar' ? 'احجز الآن' : 'Reserve Now'}
        </motion.span>
      </motion.a>

      <motion.a
        href="https://www.facebook.com/DentalBusinessDev"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0, rotate: 180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center gap-3 group backdrop-blur-md"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <FaFacebook className="w-6 h-6" />
        </motion.div>
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: 'auto', opacity: 1 }}
          className="hidden md:block whitespace-nowrap overflow-hidden"
        >
          {language === 'ar' ? 'فيسبوك' : 'Facebook'}
        </motion.span>
      </motion.a>
    </motion.div>
  )
}
