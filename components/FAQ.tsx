'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'

export default function FAQ() {
  const { language } = useLanguage()
  const { openModal } = useModal()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const content = {
    ar: {
      title: 'الأسئلة الأكثر شيوعًا',
      questions: [
        {
          q: 'هل النظام مناسب للعيادات الصغيرة؟',
          a: 'نعم، مصمم ليناسب العيادات الفردية والمراكز الكبيرة.',
        },
        {
          q: 'هل أحتاج خبرة سابقة بالإدارة أو التسويق؟',
          a: 'لا إطلاقًا، المحتوى بسيط وتطبيقي خطوة بخطوة.',
        },
        {
          q: 'هل أستطيع التعلم في وقتي الخاص؟',
          a: 'نعم، الكورسات مسجّلة ويمكنك مشاهدتها في أي وقت مدى الحياة.',
        },
        {
          q: 'هل يمكن تطبيق الأدوات فورًا؟',
          a: 'نعم، جميع النماذج جاهزة للطباعة أو التعديل مباشرة.',
        },
      ],
    },
    en: {
      title: 'Most Frequently Asked Questions',
      questions: [
        {
          q: 'Is the system suitable for small clinics?',
          a: 'Yes, designed to suit individual clinics and large centers.',
        },
        {
          q: 'Do I need previous experience in management or marketing?',
          a: 'Not at all, the content is simple and practical step by step.',
        },
        {
          q: 'Can I learn at my own time?',
          a: 'Yes, the courses are recorded and you can watch them anytime for life.',
        },
        {
          q: 'Can the tools be applied immediately?',
          a: 'Yes, all templates are ready for printing or editing directly.',
        },
      ],
    },
  }

  const text = content[language]

  return (
    <section id="faq" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="faq" />
      <div ref={ref} className="container mx-auto max-w-4xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
        >
          {text.title}
        </motion.h2>

        <div className="space-y-4 mb-12">
          {text.questions.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-right flex items-center justify-between text-white font-semibold hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-2xl transform transition-transform">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 py-4 text-white/90 border-t border-white/10"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
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

