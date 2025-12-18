'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function EmotionalClose() {
  const { language } = useLanguage()
  const { openModal } = useModal()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const content = {
    ar: {
      title: 'أنت لم تصل إلى هنا صدفة.',
      messages: [
        'النجاح في العيادة لا يعتمد فقط على المهارة السنية،',
        'بل على الإدارة، التسويق، والنظام.',
        'العيادة المنظمة تربح أكثر وتعيش أطول.',
        'خذ الخطوة الآن — لأنك تستحق عيادة تليق باسمك.',
      ],
      cta: 'ابدأ تطوير عيادتك اليوم',
    },
    en: {
      title: 'You didn\'t get here by chance.',
      messages: [
        'Success in the clinic doesn\'t depend only on dental skills,',
        'but on management, marketing, and system.',
        'An organized clinic earns more and lasts longer.',
        'Take the step now — because you deserve a clinic worthy of your name.',
      ],
      cta: 'Start Developing Your Clinic Today',
    },
  }

  const text = content[language]

  return (
    <section id="emotional-close" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="emotional-close" />
      <div ref={ref} className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-white"
        >
          {text.title}
        </motion.h2>

        <div className="space-y-6 mb-12">
          {text.messages.map((message, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="text-2xl md:text-3xl text-white/90 leading-relaxed"
            >
              {message}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={openModal}
            className="px-12 py-6 bg-primary hover:bg-primary/80 text-white text-xl font-bold rounded-lg transition-all shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {text.cta}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

