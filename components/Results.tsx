'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { FaDollarSign, FaUsers, FaClock, FaBullseye } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function Results() {
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
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const icons = [
    { Icon: FaDollarSign, color: 'text-primary' },
    { Icon: FaUsers, color: 'text-accent-light' },
    { Icon: FaClock, color: 'text-primary' },
    { Icon: FaBullseye, color: 'text-accent-light' },
  ]

  const content = {
    ar: {
      title: 'نتائج الأطباء المسجلين في النظام',
      results: [
        { text: 'زيادة في الأرباح بنسبة +55% إلى +80% خلال أول 90 يوم' },
        { text: 'زيادة عدد المرضى الجدد بنسبة +60%' },
        { text: 'تقليل الفوضى الإدارية بنسبة 70%' },
        { text: 'نظام عمل يومي واضح للفريق والمرضى' },
      ],
      note: 'النظام أثبت فعاليته في أكثر من 30 عيادة في مصر والخليج.',
    },
    en: {
      title: 'Results of Dentists Enrolled in the System',
      results: [
        { text: 'Profit increase of +55% to +80% within the first 90 days' },
        { text: 'Increase in new patients by +60%' },
        { text: 'Reduction in administrative chaos by 70%' },
        { text: 'Clear daily work system for team and patients' },
      ],
      note: 'The system has proven its effectiveness in more than 30 clinics in Egypt and the Gulf.',
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="results" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="results" />
      <div ref={inViewRef} className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          {text.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {text.results.map((result, index) => {
            const { Icon, color } = icons[index]
            return (
              <motion.div
                key={index}
                style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center hover:bg-white/15 transition-all perspective-1000"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className={`text-5xl mb-4 flex justify-center ${color}`}
                >
                  <Icon />
                </motion.div>
                <p className="text-xl text-white font-semibold">{result.text}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          style={{ opacity }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-2xl text-center text-white/90 font-semibold mb-12"
        >
          {text.note}
        </motion.p>

        <motion.div
          style={{ opacity }}
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

