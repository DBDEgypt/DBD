'use client'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhoIsItFor from '@/components/WhoIsItFor'
import WhyEnroll from '@/components/WhyEnroll'
import WhatResultYouGet from '@/components/WhatResultYouGet'
import Results from '@/components/Results'
import WhatItProvides from '@/components/WhatItProvides'
import AboutDrOmar from '@/components/AboutDrOmar'
import Reviews from '@/components/Reviews'
import Guarantee from '@/components/Guarantee'
import Packages from '@/components/Packages'
import FAQ from '@/components/FAQ'
import EmotionalClose from '@/components/EmotionalClose'
import Contact from '@/components/Contact'
import FloatingButtons from '@/components/FloatingButtons'
import RegistrationModal from '@/components/RegistrationModal'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import { useModal } from '@/context/ModalContext'
import { useExitIntent } from '@/hooks/useExitIntent'

function HomeContent() {
  const { isModalOpen, openModal, closeModal } = useModal()
  const { language } = useLanguage()

  useExitIntent(() => {
    openModal()
  })

  const modalTitle = language === 'ar' 
    ? 'عرض خاص! سجل الآن واحصل على خصم حصري'
    : 'Special Offer! Register Now and Get an Exclusive Discount'

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <WhoIsItFor />
        <WhyEnroll />
        <WhatResultYouGet />
        <Results />
        <WhatItProvides />
        <AboutDrOmar />
        <Reviews />
        <Guarantee />
        <Packages />
        <FAQ />
        <EmotionalClose />
        <Contact />
        <FloatingButtons />
      </div>
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} title={modalTitle} />
    </>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  )
}

