'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import Image from 'next/image'
import AnimatedBackground from './AnimatedBackground'
import { useModal } from '@/context/ModalContext'
import { FaCheck } from 'react-icons/fa'

export default function AboutDrOmar() {
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
      title: 'عن د. عمر الشربيني',
      achievementsTitle: 'الإنجازات الرئيسية:',
      achievements: [
        'مؤسس شركة DBD - Dental Business Development',
        'محاضر في التسويق الطبي بجامعة المنصورة',
        'استشاري تطوير العيادات في مصر والخليج',
        'قدم استشارات لأكثر من 1000 طبيب وعيادة',
      ],
    },
    en: {
      title: 'About Dr. Omar El Sherbiny',
      achievementsTitle: 'Key Achievements:',
      achievements: [
        'Founder of DBD - Dental Business Development',
        'Instructor in Medical Marketing at Mansoura University',
        'Clinic Development Consultant in Egypt and the Gulf',
        'Provided consultations to over 1,000 doctors and clinics',
      ],
    },
  }

  const text = content[language]

  return (
    <section ref={ref} id="about" className="py-20 px-4 relative overflow-hidden">
      <AnimatedBackground sectionId="about" />
      <div ref={inViewRef} className="container mx-auto relative z-10">
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">{text.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
              initial={{ opacity: 0, x: language === 'ar' ? -100 : 100, rotateY: -15 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.2, type: 'spring' }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-full h-96 rounded-lg overflow-hidden shadow-2xl"
            >
              <Image
                src="/dr-omar.jpg"
                alt={language === 'ar' ? 'د. عمر الشربيني' : 'Dr. Omar El Sherbiny'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-0 left-0 right-0 text-center p-8 z-10"
              >
                <p className="text-white text-xl font-semibold">
                  {language === 'ar' ? 'د. عمر الشربيني' : 'Dr. Omar El Sherbiny'}
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              initial={{ opacity: 0, x: language === 'ar' ? 100 : -100, rotateY: 15 }}
              animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.4, type: 'spring' }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className={`text-2xl md:text-3xl font-bold text-white mb-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}
                >
                  <span className="text-primary">{text.achievementsTitle}</span>
                </motion.h3>
                <div className="space-y-4">
                  {text.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: language === 'ar' ? 50 : -50, scale: 0.9 }}
                      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.15, type: 'spring', stiffness: 100 }}
                      whileHover={{ scale: 1.05, x: language === 'ar' ? -10 : 10 }}
                      className={`group relative bg-gradient-to-r ${
                        language === 'ar' 
                          ? 'from-transparent via-primary/15 to-primary/20' 
                          : 'from-transparent via-primary/15 to-primary/20'
                      } backdrop-blur-md rounded-xl p-5 border-2 border-primary/30 hover:border-primary/60 transition-all shadow-lg hover:shadow-2xl`}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <FaCheck className="text-white text-lg" />
                        </div>
                        <p className={`text-white font-bold text-lg md:text-xl leading-relaxed flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                          {achievement}
                        </p>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${
                        language === 'ar'
                          ? 'from-transparent via-transparent to-primary/10'
                          : 'from-transparent via-transparent to-primary/10'
                      } rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
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
        </motion.div>
      </div>
    </section>
  )
}
