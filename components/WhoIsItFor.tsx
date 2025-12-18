'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function WhoIsItFor() {
  const { language } = useLanguage()
  const { openModal } = useModal()
  const ref = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const content = {
    ar: {
      title: 'لمن هذا النظام؟',
      items: [
        'لأصحاب العيادات الباحثين عن نظام إدارة وتسويق احترافي',
        'للأطباء الذين يريدون زيادة دخلهم وتنظيم وقتهم',
        'للأطباء الشباب الذين يستعدون لافتتاح عياداتهم بثقة',
      ],
      closing: 'مهما كان مستواك الحالي… هذا النظام سيأخذ عيادتك من "العشوائية" إلى "الاستقرار والربح".',
    },
    en: {
      title: 'Who Is This System For?',
      items: [
        'For clinic owners seeking a professional management and marketing system',
        'For doctors who want to increase their income and organize their time',
        'For young doctors preparing to open their clinics with confidence',
      ],
      closing: 'Whatever your current level… this system will take your clinic from "chaos" to "stability and profit".',
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="who-is-it-for" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="who-is-it-for" />
      <div ref={inViewRef} className="container mx-auto max-w-5xl relative z-10">
        <motion.h2
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          {text.title}
        </motion.h2>

        <div className="space-y-6 mb-12">
          {text.items.map((item, index) => (
            <motion.div
              key={index}
              style={{ y: useTransform(scrollYProgress, [0, 1], [30 * (index + 1), -30 * (index + 1)]) }}
              initial={{ opacity: 0, x: language === 'ar' ? 100 : -100, rotateY: -15 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10, rotateY: 5 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 perspective-1000"
            >
              <p className="text-xl text-white flex items-center">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className="text-primary text-2xl mr-3 ml-3"
                >
                  <FaCheckCircle />
                </motion.span>
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-2xl text-center text-white/90 font-semibold mb-12"
        >
          {text.closing}
        </motion.p>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={openModal}
            className="px-8 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-lg transition-all shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {language === 'ar' ? 'سجل الآن' : 'Enroll Now'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

