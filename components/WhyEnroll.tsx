'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function WhyEnroll() {
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

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100])

  const content = {
    ar: {
      title: 'لماذا تحتاج للتسجيل في النظام؟',
      intro: 'إذا كنت طبيبًا صاحب عيادة في مصر أو الخليج، فغالبًا تواجه هذه التحديات:',
      challenges: [
        'تسويق غير فعّال رغم صرف مبالغ كبيرة',
        'تشتت في الإدارة اليومية وضياع الوقت',
        'صعوبة في ضبط التسعير والمصاريف',
        'فقدان الحماس أو الإرهاق الذهني بسبب الفوضى',
      ],
      solution: 'DBD System هو الحل الجاهز الذي يُنظم عمل العيادة من الداخل إلى الخارج. بخطة عملية مجرّبة من استشاريي تطوير العيادات.',
    },
    en: {
      title: 'Why You Need to Enroll in the System',
      intro: 'If you are a clinic owner doctor in Egypt or the Gulf, you likely face these challenges:',
      challenges: [
        'Ineffective marketing despite spending large amounts',
        'Scattered daily management and wasted time',
        'Difficulty in controlling pricing and expenses',
        'Loss of enthusiasm or mental exhaustion due to chaos',
      ],
      solution: 'DBD System is the ready solution that organizes clinic operations from the inside out. With a practical plan tested by clinic development consultants.',
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="why-enroll" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="why-enroll" />
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

        <motion.p
          style={{ y: useTransform(scrollYProgress, [0, 1], [30, -30]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-xl text-center text-white/90 mb-8"
        >
          {text.intro}
        </motion.p>

        <div className="space-y-4 mb-12">
          {text.challenges.map((challenge, index) => (
            <motion.div
              key={index}
              style={{ y: useTransform(scrollYProgress, [0, 1], [20 * (index + 1), -20 * (index + 1)]) }}
              initial={{ opacity: 0, x: language === 'ar' ? 100 : -100, rotateZ: -5 }}
              animate={inView ? { opacity: 1, x: 0, rotateZ: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, type: 'spring' }}
              whileHover={{ scale: 1.02, rotateZ: 2, x: language === 'ar' ? -5 : 5 }}
              className="bg-red-500/20 backdrop-blur-md rounded-lg p-6 border border-red-500/30"
            >
              <p className="text-lg text-white flex items-center">
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className="text-red-400 text-xl mr-3 ml-3"
                >
                  <FaExclamationTriangle />
                </motion.span>
                {challenge}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="bg-primary/20 backdrop-blur-md rounded-lg p-8 border border-primary/30 mb-12"
        >
          <p className="text-xl text-white text-center leading-relaxed">
            {text.solution}
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
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

