'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import AnimatedBackground from './AnimatedBackground'

export default function Guarantee() {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const content = {
    ar: {
      title: 'ضمان DBD – بدون مخاطرة',
      text: 'إذا لم تلاحظ فرقًا حقيقيًا في طريقة إدارة أو تسويق عيادتك خلال 7 أيام، يمكنك استرجاع المبلغ بالكامل — بدون أي أسئلة.',
    },
    en: {
      title: 'DBD Guarantee – No Risk',
      text: 'If you don\'t notice a real difference in how you manage or market your clinic within 7 days, you can get a full refund — no questions asked.',
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="guarantee" className="py-12 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="guarantee" />
      <div ref={inViewRef} className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-green-500/20 backdrop-blur-md rounded-lg p-6 md:p-8 border-2 border-green-500/40 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {text.title}
          </h3>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {text.text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}


