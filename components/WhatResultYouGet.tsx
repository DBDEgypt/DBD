'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function WhatResultYouGet() {
  const { language } = useLanguage()
  const { openModal } = useModal()
  const ref = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const content = {
    ar: {
      title: 'النتيجة التي ستحصل عليها:',
      description: 'حوّل عيادتك إلى منظومة مربحة ومنظّمة تعمل بذكاء — في خلال 30 يوم فقط —',
      subtitle: 'باستخدام نظام DBD العملي المجرب.',
      details: 'ستتعلم وتطبّق نظامًا متكاملاً للتسويق، الإدارة، التسعير، وتحسين تجربة المريض —',
      note: 'حتى لو لم تدرس الإدارة أو التسويق من قبل.',
      cta: 'ابدأ تطوير عيادتك الآن',
    },
    en: {
      title: 'What Result You Will Get:',
      description: 'Transform your clinic into a profitable and organized smart system — in just 30 days —',
      subtitle: 'Using the proven practical DBD system.',
      details: 'You will learn and apply an integrated system for marketing, management, pricing, and improving patient experience —',
      note: 'Even if you have never studied management or marketing before.',
      cta: 'Start Developing Your Clinic Now',
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="what-result-you-get" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="what-result-you-get" />
      <div ref={inViewRef} className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
        >
          {text.title}
        </motion.h2>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-primary/20 backdrop-blur-md rounded-lg p-8 md:p-12 border border-primary/30 mb-8"
        >
          <p className="text-2xl md:text-3xl text-white font-bold text-center mb-4 leading-relaxed">
            {text.description}
          </p>
          <p className="text-xl text-white/90 text-center mb-6">{text.subtitle}</p>
          <p className="text-lg md:text-xl text-white/90 text-center leading-relaxed mb-4">{text.details}</p>
          <p className="text-lg text-primary font-semibold text-center">{text.note}</p>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            onClick={openModal}
            className="px-8 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all shadow-lg text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {text.cta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
