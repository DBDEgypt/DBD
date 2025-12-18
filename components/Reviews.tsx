'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function Reviews() {
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

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const content = {
    ar: {
      title: 'ماذا يقول الأطباء عن DBD؟',
      reviews: [
        'طبّقت الأدوات بعد أسبوع واحد فقط، وشفت فرق حقيقي في الإيراد.',
        'لأول مرة أفهم تسعير العلاجات وأحسب التكاليف بدقة.',
        'الفريق بقى منظم، وأنا بقيت أشتغل مرتاح.',
      ],
    },
    en: {
      title: 'What Doctors Say About DBD?',
      reviews: [
        'I applied the tools after just one week, and I saw a real difference in revenue.',
        'For the first time, I understand treatment pricing and calculate costs accurately.',
        'The team became organized, and I work comfortably now.',
      ],
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="reviews" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="reviews" />
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
          {text.reviews.map((review, index) => (
            <motion.div
              key={index}
              style={{ y: useTransform(scrollYProgress, [0, 1], [30 * (index + 1), -30 * (index + 1)]) }}
              initial={{ opacity: 0, x: language === 'ar' ? 100 : -100, rotateY: -15 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ delay: index * 0.2, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.02, rotateY: 5, z: 50 }}
              className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 relative perspective-1000"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="text-4xl text-primary mb-4"
              >
                <FaQuoteLeft />
              </motion.div>
              <p className="text-xl text-white leading-relaxed mb-4">{review}</p>
              <div className="flex text-primary gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                  >
                    <FaStar />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
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

