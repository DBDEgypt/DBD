'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { FaTimes } from 'react-icons/fa'
import RegistrationForm from './RegistrationForm'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export default function RegistrationModal({ isOpen, onClose, title }: RegistrationModalProps) {
  const { language } = useLanguage()
  const closeLabel = language === 'ar' ? 'إغلاق' : 'Close'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-primary/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-br from-gray-900 to-gray-800 border-b border-primary/20 p-4 flex justify-between items-center z-10">
                {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label={closeLabel}
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <RegistrationForm onSubmit={onClose} showTitle={!title} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
